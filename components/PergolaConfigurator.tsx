"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Grid } from "@react-three/drei";

const FRAME_COLOR = "#1c1c1f";
const SLAT_COLOR = "#232326";
// EN AW-6060 200x100x4 aluminum profile, used for both pillars and perimeter
// beams per the technical drawing (2026-03-VŽ-01).
const PILLAR_WIDTH = 0.1;
const PILLAR_DEPTH = 0.2;
const BEAM_HEIGHT = 0.2;
const BEAM_DEPTH = 0.1;
const WALL_THICKNESS = 0.3;

type MountType = "freestanding" | "single-wall" | "l-corner" | "corner-touch";

function getMountType(pillarCount: number): MountType {
  if (pillarCount >= 4) return "freestanding";
  if (pillarCount === 3) return "corner-touch";
  if (pillarCount === 2) return "single-wall";
  return "l-corner";
}

function xsFor(widthM: number, count: number) {
  return count === 2
    ? [-widthM / 2, widthM / 2]
    : Array.from({ length: count }, (_, i) => -widthM / 2 + i * (widthM / (count - 1)));
}

function getPillarPositions(widthM: number, depthM: number, pillarCount: number) {
  const left = -widthM / 2;
  const right = widthM / 2;
  const front = depthM / 2;
  const back = -depthM / 2;
  const mount = getMountType(pillarCount);

  switch (mount) {
    case "single-wall":
      // house wall spans the back edge, both pillars on the open edge facing the camera
      return [
        [left, front],
        [right, front],
      ] as [number, number][];
    case "l-corner":
      // two house walls meet at the back-left corner, one pillar at the opposite corner
      return [[right, front]] as [number, number][];
    case "corner-touch":
      // house touches only the back-left corner, pillars at the other three corners
      return [
        [right, back],
        [left, front],
        [right, front],
      ] as [number, number][];
    default: {
      const perSide = Math.max(2, Math.round(pillarCount / 2));
      const positions: [number, number][] = [];
      for (const x of xsFor(widthM, perSide)) {
        positions.push([x, back]);
        positions.push([x, front]);
      }
      return positions;
    }
  }
}

function getSlatXPositions(widthM: number) {
  const spacing = 0.17;
  const count = Math.max(6, Math.round(widthM / spacing));
  const usableWidth = widthM - 0.3;
  return Array.from(
    { length: count },
    (_, i) => -usableWidth / 2 + i * (usableWidth / (count - 1))
  );
}

function getRailZPositions(depthM: number, modules: number) {
  return Array.from(
    { length: modules - 1 },
    (_, i) => -depthM / 2 + (i + 1) * (depthM / modules)
  );
}

function WallPanel({
  length,
  heightM,
  center,
  axis,
  withOpenings,
}: {
  length: number;
  heightM: number;
  center: [number, number];
  axis: "x" | "z";
  withOpenings?: boolean;
}) {
  const wallHeight = heightM + 1.4;
  const size: [number, number, number] =
    axis === "x" ? [length, wallHeight, WALL_THICKNESS] : [WALL_THICKNESS, wallHeight, length];
  const capSize: [number, number, number] =
    axis === "x"
      ? [length + 0.3, 0.16, WALL_THICKNESS + 0.2]
      : [WALL_THICKNESS + 0.2, 0.16, length + 0.3];

  return (
    <group position={[center[0], 0, center[1]]}>
      <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#e2ded3" roughness={0.9} />
      </mesh>
      <mesh position={[0, wallHeight + 0.08, 0]} castShadow>
        <boxGeometry args={capSize} />
        <meshStandardMaterial color="#4b4b4b" roughness={0.8} />
      </mesh>
      {withOpenings && axis === "x" && (
        <>
          <mesh position={[-length / 4, 1.05, WALL_THICKNESS / 2 + 0.01]}>
            <boxGeometry args={[0.9, 2.1, 0.02]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.6} />
          </mesh>
          <mesh position={[length / 4, wallHeight * 0.6, WALL_THICKNESS / 2 + 0.01]}>
            <boxGeometry args={[1.1, 1.1, 0.02]} />
            <meshStandardMaterial color="#9fbfd8" roughness={0.2} metalness={0.3} />
          </mesh>
        </>
      )}
    </group>
  );
}

function HouseStructure({
  mount,
  widthM,
  depthM,
  heightM,
}: {
  mount: MountType;
  widthM: number;
  depthM: number;
  heightM: number;
}) {
  const left = -widthM / 2;
  const back = -depthM / 2;
  const backWallZ = back - WALL_THICKNESS / 2;
  const leftWallX = left - WALL_THICKNESS / 2;

  if (mount === "single-wall") {
    return (
      <WallPanel
        length={widthM + 1}
        heightM={heightM}
        center={[0, backWallZ]}
        axis="x"
        withOpenings
      />
    );
  }

  if (mount === "l-corner") {
    return (
      <>
        <WallPanel
          length={widthM + 0.5}
          heightM={heightM}
          center={[0, backWallZ]}
          axis="x"
          withOpenings
        />
        <WallPanel length={depthM + 0.5} heightM={heightM} center={[leftWallX, 0]} axis="z" />
      </>
    );
  }

  if (mount === "corner-touch") {
    const cornerHeight = heightM + 0.3;
    return (
      <mesh
        position={[left - 0.4, cornerHeight / 2, back - 0.4]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.4, cornerHeight, 0.4]} />
        <meshStandardMaterial color="#e2ded3" roughness={0.9} />
      </mesh>
    );
  }

  return null;
}

function PergolaModel({
  widthM,
  depthM,
  heightM,
  pillarCount,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  pillarCount: number;
}) {
  const mount = getMountType(pillarCount);
  const pillarPositions = useMemo(
    () => getPillarPositions(widthM, depthM, pillarCount),
    [widthM, depthM, pillarCount]
  );
  const slatXPositions = useMemo(() => getSlatXPositions(widthM), [widthM]);
  const railZPositions = useMemo(
    () => getRailZPositions(depthM, Math.max(2, Math.min(5, Math.round(depthM / 1.3)))),
    [depthM]
  );
  const roofY = heightM + BEAM_HEIGHT + 0.02;

  return (
    <group>
      {mount !== "freestanding" && (
        <HouseStructure mount={mount} widthM={widthM} depthM={depthM} heightM={heightM} />
      )}

      {pillarPositions.map(([x, z], i) => (
        <mesh key={i} position={[x, heightM / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[PILLAR_WIDTH, heightM, PILLAR_DEPTH]} />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}

      <mesh position={[0, heightM + BEAM_HEIGHT / 2, -depthM / 2]} castShadow receiveShadow>
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[0, heightM + BEAM_HEIGHT / 2, depthM / 2]} castShadow receiveShadow>
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[-widthM / 2, heightM + BEAM_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[widthM / 2, heightM + BEAM_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
      </mesh>

      {/* flat sliding roof lamellas, laid closed and flush */}
      {slatXPositions.map((x, i) => (
        <mesh key={i} position={[x, roofY, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 0.03, depthM + 0.1]} />
          <meshStandardMaterial color={SLAT_COLOR} metalness={0.3} roughness={0.5} />
        </mesh>
      ))}

      {/* rails dividing the roof into sliding panel modules */}
      {railZPositions.map((z, i) => (
        <mesh key={i} position={[0, roofY + 0.02, z]} castShadow receiveShadow>
          <boxGeometry args={[widthM, 0.06, 0.08]} />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({
  widthM,
  depthM,
  heightM,
  pillarCount,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  pillarCount: number;
}) {
  return (
    <>
      <color attach="background" args={["#cbd5e1"]} />
      <fog attach="fog" args={["#cbd5e1", 18, 30]} />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#ffffff", "#8a8a8a", 0.9]} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <PergolaModel widthM={widthM} depthM={depthM} heightM={heightM} pillarCount={pillarCount} />

      <Grid
        args={[30, 30]}
        cellSize={1}
        cellColor="#d4d4d8"
        sectionColor="#a1a1aa"
        fadeDistance={20}
        infiniteGrid
        position={[0, 0, 0]}
      />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={20} blur={2} far={heightM + 2} />

      <OrbitControls
        makeDefault
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, heightM / 2, 0]}
      />
    </>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {label}
        </label>
        <span className="text-sm font-bold text-zinc-900">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-900"
      />
    </div>
  );
}

const MOUNT_DESCRIPTIONS: Record<MountType, string> = {
  "l-corner":
    "1 stup: pergola se oslanja na dva zida kuće koja se spajaju pod pravim kutom (L-oblik), a samo suprotni ugao pridržava jedan stup.",
  "single-wall":
    "2 stupa: pergola se s jedne strane cijelom dužinom oslanja na zid kuće, a s druge strane stoji na dva stupa.",
  "corner-touch":
    "3 stupa: pergola dodiruje kuću samo u jednom uglu (npr. na spoju dva krila objekta), dok su preostala tri ugla poduprta stupovima.",
  freestanding: "",
};

export default function PergolaConfigurator() {
  const [width, setWidth] = useState(400);
  const [depth, setDepth] = useState(300);
  const [height, setHeight] = useState(250);
  const [pillars, setPillars] = useState(4);

  const widthM = width / 100;
  const depthM = depth / 100;
  const heightM = height / 100;
  const area = (widthM * depthM).toFixed(1);
  const mount = getMountType(pillars);

  const inquiryMessage = `Zanima me ponuda za bioklimatsku pergolu s dimenzijama ${width}cm (širina) x ${depth}cm (dubina) x ${height}cm (visina), s ${pillars} stupova.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 h-[400px] md:h-[550px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200">
        <Canvas shadows camera={{ position: [7, 5, 9], fov: 45 }}>
          <Scene widthM={widthM} depthM={depthM} heightM={heightM} pillarCount={pillars} />
        </Canvas>
      </div>

      <div className="lg:col-span-4 flex flex-col justify-between">
        <div className="space-y-8">
          <Field
            label="Širina"
            value={width}
            min={200}
            max={800}
            step={10}
            unit="cm"
            onChange={setWidth}
          />
          <Field
            label="Dubina"
            value={depth}
            min={200}
            max={600}
            step={10}
            unit="cm"
            onChange={setDepth}
          />
          <Field
            label="Visina"
            value={height}
            min={220}
            max={300}
            step={5}
            unit="cm"
            onChange={setHeight}
          />
          <Field
            label="Broj stupova"
            value={pillars}
            min={1}
            max={12}
            step={1}
            unit=""
            onChange={setPillars}
          />
          {MOUNT_DESCRIPTIONS[mount] && (
            <p className="text-xs text-zinc-500 leading-relaxed -mt-4">
              {MOUNT_DESCRIPTIONS[mount]}
            </p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Ukupna površina
            </span>
            <span className="text-2xl font-bold text-zinc-900">{area} m²</span>
          </div>
          <Link
            href={`/kontakt?poruka=${encodeURIComponent(inquiryMessage)}`}
            className="block w-full text-center bg-black hover:bg-zinc-800 text-white py-4 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
          >
            Zatražite ponudu za ovu konfiguraciju
          </Link>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Prikazani model je okvirna 3D vizualizacija namijenjena boljem uvidu u proporcije i
            veličinu. Konačan izgled, materijali i točne mjere definiraju se s našim inženjerskim
            timom.
          </p>
        </div>
      </div>
    </div>
  );
}
