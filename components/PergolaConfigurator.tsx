"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Grid } from "@react-three/drei";

// EN AW-6060 200x100x4 aluminum profile, used for both pillars and perimeter
// beams per the technical drawing (2026-03-VŽ-01).
const PILLAR_WIDTH = 0.1;
const PILLAR_DEPTH = 0.2;
const BEAM_HEIGHT = 0.2;
const BEAM_DEPTH = 0.1;
const WALL_THICKNESS = 0.3;
const MAX_SPAN = 3; // max unsupported distance between two pillars, in meters

type MountType = "freestanding" | "single-wall" | "l-corner" | "corner-touch";

type ColorOption = {
  id: string;
  label: string;
  frame: string;
  slat: string;
  swatch: string;
};

const COLOR_OPTIONS: ColorOption[] = [
  { id: "antracit", label: "Antracit", frame: "#3a3c3f", slat: "#484b4f", swatch: "#3a3c3f" },
  { id: "crna", label: "Crna mat", frame: "#1c1c1f", slat: "#26262a", swatch: "#1c1c1f" },
  { id: "bijela", label: "Bijela", frame: "#f2f2ef", slat: "#e6e6e2", swatch: "#f2f2ef" },
  { id: "bronca", label: "Bronca", frame: "#453329", slat: "#54402f", swatch: "#453329" },
  { id: "srebrna", label: "Srebrna", frame: "#b7bbbe", slat: "#a5a9ac", swatch: "#b7bbbe" },
];

const MOUNT_OPTIONS: { id: MountType; label: string; description: string }[] = [
  {
    id: "freestanding",
    label: "Samostojeća",
    description: "Pergola stoji slobodno, poduprta stupovima sa svih strana.",
  },
  {
    id: "single-wall",
    label: "Uza zid",
    description: "Jedna cijela strana oslonjena je na zid kuće, nasuprotna strana stoji na stupovima.",
  },
  {
    id: "l-corner",
    label: "U kutu (L-oblik)",
    description: "Dva zida kuće spajaju se pod pravim kutom, a suprotni ugao pridržavaju stupovi.",
  },
  {
    id: "corner-touch",
    label: "Dodiruje kut",
    description: "Pergola dodiruje kuću samo u jednom uglu, dok su preostali uglovi poduprti stupovima.",
  },
];

function dedupe(points: [number, number][]) {
  const seen = new Map<string, [number, number]>();
  for (const p of points) {
    const key = `${p[0].toFixed(3)}:${p[1].toFixed(3)}`;
    if (!seen.has(key)) seen.set(key, p);
  }
  return Array.from(seen.values());
}

function pillarsAlongEdge(
  from: [number, number],
  to: [number, number],
  excludeFrom = false,
  excludeTo = false
) {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const count = Math.max(2, Math.ceil(length / MAX_SPAN) + 1);
  const points: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    if (i === 0 && excludeFrom) continue;
    if (i === count - 1 && excludeTo) continue;
    const t = i / (count - 1);
    points.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]);
  }
  return points;
}

function getPillarPositions(widthM: number, depthM: number, mount: MountType) {
  const left = -widthM / 2;
  const right = widthM / 2;
  const front = depthM / 2;
  const back = -depthM / 2;
  const FL: [number, number] = [left, front];
  const FR: [number, number] = [right, front];
  const BL: [number, number] = [left, back];
  const BR: [number, number] = [right, back];

  switch (mount) {
    case "single-wall":
      // back edge (BL-BR) is a house wall; only the open front edge needs pillars
      return pillarsAlongEdge(FL, FR);
    case "l-corner":
      // back and left walls meet at BL; front and right edges are open,
      // their wall-side ends are already supported by the walls
      return dedupe([
        ...pillarsAlongEdge(FL, FR, true, false),
        ...pillarsAlongEdge(FR, BR, false, true),
      ]);
    case "corner-touch":
      // house touches only the BL corner; the other three sides are open
      return dedupe([
        ...pillarsAlongEdge(FL, FR),
        ...pillarsAlongEdge(FR, BR),
        ...pillarsAlongEdge(BL, BR, true, false),
      ]);
    default:
      return dedupe([...pillarsAlongEdge(FL, FR), ...pillarsAlongEdge(BL, BR)]);
  }
}

function insetPillarPosition(
  [x, z]: [number, number],
  widthM: number,
  depthM: number
): [number, number] {
  const halfW = widthM / 2;
  const halfD = depthM / 2;
  const insetX = PILLAR_WIDTH / 2;
  const insetZ = PILLAR_DEPTH / 2;
  const nx = Math.abs(x - halfW) < 0.01 ? x - insetX : Math.abs(x + halfW) < 0.01 ? x + insetX : x;
  const nz = Math.abs(z - halfD) < 0.01 ? z - insetZ : Math.abs(z + halfD) < 0.01 ? z + insetZ : z;
  return [nx, nz];
}

// A real sliding roof panel module is ~1m wide and made of ~300mm-deep rungs
// (alternating solid and perforated sheet metal segments) per the SKL-04
// assembly drawing - not continuous depth-spanning boards.
const MODULE_WIDTH = 1.0;
const MODULE_GAP = 0.03;
const RUNG_SPACING = 0.31;
const RUNG_GAP = 0.02;

function getModuleXRanges(widthM: number) {
  const moduleCount = Math.max(1, Math.round(widthM / MODULE_WIDTH));
  const moduleWidth = (widthM - MODULE_GAP * (moduleCount - 1)) / moduleCount;
  return Array.from({ length: moduleCount }, (_, i) => {
    const startX = -widthM / 2 + i * (moduleWidth + MODULE_GAP);
    return { centerX: startX + moduleWidth / 2, width: moduleWidth };
  });
}

type Rung = { z: number; thickness: number; patterned: boolean };

// Rungs keep a fixed ~310mm pitch (matching the real assembly) regardless of
// depth - we don't stretch/compress the spacing to fit a round number.
// Whatever distance is left over at the end gets one filler rung sized to
// cover exactly that remainder, instead of resizing every other rung.
function getRungs(depthM: number): Rung[] {
  const usableDepth = depthM - 0.1;
  const start = -usableDepth / 2;
  const end = usableDepth / 2;
  const rungs: Rung[] = [];
  let z = start;
  let index = 0;
  while (z + RUNG_SPACING <= end + 0.001) {
    rungs.push({
      z: z + RUNG_SPACING / 2,
      thickness: RUNG_SPACING - RUNG_GAP,
      patterned: index % 2 === 1,
    });
    z += RUNG_SPACING;
    index++;
  }
  const remainder = end - z;
  if (remainder > 0.08) {
    rungs.push({
      z: z + remainder / 2,
      thickness: remainder - RUNG_GAP,
      patterned: index % 2 === 1,
    });
  }
  return rungs;
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
      <mesh position={[left - 0.4, cornerHeight / 2, back - 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.4, cornerHeight, 0.4]} />
        <meshStandardMaterial color="#e2ded3" roughness={0.9} />
      </mesh>
    );
  }

  return null;
}

function RoofRung({
  centerX,
  moduleWidth,
  z,
  thickness,
  y,
  patterned,
  color,
}: {
  centerX: number;
  moduleWidth: number;
  z: number;
  thickness: number;
  y: number;
  patterned: boolean;
  color: ColorOption;
}) {
  if (!patterned) {
    return (
      <mesh position={[centerX, y, z]} castShadow receiveShadow>
        <boxGeometry args={[moduleWidth, 0.03, thickness]} />
        <meshStandardMaterial color={color.frame} metalness={0.3} roughness={0.5} />
      </mesh>
    );
  }

  // perforated "Gornji Pattern Kvadratni" look: 3 slotted segments with gaps
  const segments = 3;
  const gap = 0.03;
  const segWidth = (moduleWidth - gap * (segments - 1)) / segments;
  return (
    <group>
      {Array.from({ length: segments }, (_, i) => {
        const segX = centerX - moduleWidth / 2 + segWidth / 2 + i * (segWidth + gap);
        return (
          <mesh key={i} position={[segX, y, z]} castShadow receiveShadow>
            <boxGeometry args={[segWidth, 0.03, thickness]} />
            <meshStandardMaterial color={color.slat} metalness={0.3} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

function PergolaModel({
  widthM,
  depthM,
  heightM,
  mount,
  color,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
}) {
  const pillarPositions = useMemo(
    () =>
      getPillarPositions(widthM, depthM, mount).map((p) =>
        insetPillarPosition(p, widthM, depthM)
      ),
    [widthM, depthM, mount]
  );
  const moduleRanges = useMemo(() => getModuleXRanges(widthM), [widthM]);
  const rungs = useMemo(() => getRungs(depthM), [depthM]);
  const roofY = heightM + BEAM_HEIGHT + 0.02;

  return (
    <group>
      {mount !== "freestanding" && (
        <HouseStructure mount={mount} widthM={widthM} depthM={depthM} heightM={heightM} />
      )}

      {pillarPositions.map(([x, z], i) => (
        <mesh key={i} position={[x, heightM / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[PILLAR_WIDTH, heightM, PILLAR_DEPTH]} />
          <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}

      {/* Front/back beams span the full nominal width, with their OUTER face
          (not their center) sitting exactly on the widthM/depthM boundary -
          matching where the pillars' outer faces sit. Side beams are inset by
          the same amount and shortened to fit snugly between the inner faces
          of the front/back beams, so every corner butts flush with no
          overlap and no gap. */}
      <mesh
        position={[0, heightM + BEAM_HEIGHT / 2, depthM / 2 - BEAM_DEPTH / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh
        position={[0, heightM + BEAM_HEIGHT / 2, -(depthM / 2 - BEAM_DEPTH / 2)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh
        position={[-(widthM / 2 - BEAM_DEPTH / 2), heightM + BEAM_HEIGHT / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM - 2 * BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh
        position={[widthM / 2 - BEAM_DEPTH / 2, heightM + BEAM_HEIGHT / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM - 2 * BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>

      {/* sliding roof: each module is a row of fixed-pitch rungs spanning the
          module's width, matching the SKL-04 sliding-panel assembly. Every
          second rung shows the perforated "Gornji Pattern" look (3 slotted
          segments) from the drawing; the rest are solid "Donji Puni" rungs. */}
      {moduleRanges.map(({ centerX, width: moduleW }, m) =>
        rungs.map((rung, r) => (
          <RoofRung
            key={`${m}-${r}`}
            centerX={centerX}
            moduleWidth={moduleW}
            z={rung.z}
            thickness={rung.thickness}
            y={roofY}
            patterned={rung.patterned}
            color={color}
          />
        ))
      )}
    </group>
  );
}

function Scene({
  widthM,
  depthM,
  heightM,
  mount,
  color,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
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

      <PergolaModel widthM={widthM} depthM={depthM} heightM={heightM} mount={mount} color={color} />

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

export default function PergolaConfigurator() {
  const [width, setWidth] = useState(400);
  const [depth, setDepth] = useState(300);
  const [height, setHeight] = useState(250);
  const [mount, setMount] = useState<MountType>("freestanding");
  const [colorId, setColorId] = useState(COLOR_OPTIONS[0].id);

  const widthM = width / 100;
  const depthM = depth / 100;
  const heightM = height / 100;
  const area = (widthM * depthM).toFixed(1);
  const color = COLOR_OPTIONS.find((c) => c.id === colorId) ?? COLOR_OPTIONS[0];
  const pillarCount = useMemo(
    () => getPillarPositions(widthM, depthM, mount).length,
    [widthM, depthM, mount]
  );
  const mountOption = MOUNT_OPTIONS.find((m) => m.id === mount)!;

  const inquiryMessage = `Zanima me ponuda za bioklimatsku pergolu s dimenzijama ${width}cm (širina) x ${depth}cm (dubina) x ${height}cm (visina). Način oslanjanja: ${mountOption.label} (${pillarCount} stupova). Boja: ${color.label}.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 h-[400px] md:h-[550px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200">
        <Canvas shadows camera={{ position: [7, 5, 9], fov: 45 }}>
          <Scene widthM={widthM} depthM={depthM} heightM={heightM} mount={mount} color={color} />
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

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              Način oslanjanja
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MOUNT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMount(option.id)}
                  className={`text-left px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors ${
                    mount === option.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mt-3">
              {mountOption.description} Potrebno stupova pri ovim dimenzijama:{" "}
              <span className="font-bold text-zinc-700">{pillarCount}</span>. Broj stupova
              automatski raste s većim dimenzijama pergole.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              Boja konstrukcije
            </label>
            <div className="flex items-center gap-3">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setColorId(option.id)}
                  aria-label={option.label}
                  title={option.label}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    colorId === option.id
                      ? "border-zinc-900 scale-110"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                  style={{ backgroundColor: option.swatch }}
                />
              ))}
            </div>
          </div>
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
