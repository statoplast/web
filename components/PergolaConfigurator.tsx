"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Grid } from "@react-three/drei";

const FRAME_COLOR = "#52525b";
const SLAT_COLOR = "#71717a";
const PILLAR_SIZE = 0.12;
const BEAM_HEIGHT = 0.15;
const BEAM_DEPTH = 0.12;
const WALL_MOUNT_THRESHOLD = 4;

function isWallMounted(pillarCount: number) {
  return pillarCount < WALL_MOUNT_THRESHOLD;
}

function getPillarPositions(widthM: number, depthM: number, pillarCount: number) {
  const xsFor = (count: number) =>
    count === 2
      ? [-widthM / 2, widthM / 2]
      : Array.from({ length: count }, (_, i) => -widthM / 2 + i * (widthM / (count - 1)));

  if (isWallMounted(pillarCount)) {
    // fewer than 4 pillars: only the edge facing the camera is freestanding,
    // the far edge attaches directly to the house wall instead
    return xsFor(Math.max(2, pillarCount)).map((x) => [x, depthM / 2] as [number, number]);
  }

  const perSide = Math.max(2, Math.round(pillarCount / 2));
  const positions: [number, number][] = [];
  for (const x of xsFor(perSide)) {
    positions.push([x, -depthM / 2]);
    positions.push([x, depthM / 2]);
  }
  return positions;
}

function getSlatXPositions(widthM: number) {
  const spacing = 0.22;
  const count = Math.max(5, Math.round(widthM / spacing));
  const usableWidth = widthM - 0.3;
  return Array.from(
    { length: count },
    (_, i) => -usableWidth / 2 + i * (usableWidth / (count - 1))
  );
}

function HouseWall({
  widthM,
  depthM,
  heightM,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
}) {
  const wallThickness = 0.3;
  const wallHeight = heightM + 1.4;
  const wallZ = -(depthM / 2 + wallThickness / 2);
  const faceZ = wallZ + wallThickness / 2 + 0.01;

  return (
    <group>
      <mesh position={[0, wallHeight / 2, wallZ]} castShadow receiveShadow>
        <boxGeometry args={[widthM + 1, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#e2ded3" roughness={0.9} />
      </mesh>
      <mesh position={[0, wallHeight + 0.08, wallZ]} castShadow>
        <boxGeometry args={[widthM + 1.3, 0.16, wallThickness + 0.2]} />
        <meshStandardMaterial color="#4b4b4b" roughness={0.8} />
      </mesh>
      <mesh position={[-widthM / 4, 1.05, faceZ]}>
        <boxGeometry args={[0.9, 2.1, 0.02]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.6} />
      </mesh>
      <mesh position={[widthM / 4, wallHeight * 0.6, faceZ]}>
        <boxGeometry args={[1.1, 1.1, 0.02]} />
        <meshStandardMaterial color="#9fbfd8" roughness={0.2} metalness={0.3} />
      </mesh>
    </group>
  );
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
  const pillarPositions = useMemo(
    () => getPillarPositions(widthM, depthM, pillarCount),
    [widthM, depthM, pillarCount]
  );
  const slatXPositions = useMemo(() => getSlatXPositions(widthM), [widthM]);

  return (
    <group>
      {isWallMounted(pillarCount) && (
        <HouseWall widthM={widthM} depthM={depthM} heightM={heightM} />
      )}

      {pillarPositions.map(([x, z], i) => (
        <mesh key={i} position={[x, heightM / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[PILLAR_SIZE, heightM, PILLAR_SIZE]} />
          <meshStandardMaterial color={FRAME_COLOR} metalness={0.25} roughness={0.55} />
        </mesh>
      ))}

      <mesh position={[0, heightM + BEAM_HEIGHT / 2, -depthM / 2]} castShadow receiveShadow>
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[0, heightM + BEAM_HEIGHT / 2, depthM / 2]} castShadow receiveShadow>
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[-widthM / 2, heightM + BEAM_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[widthM / 2, heightM + BEAM_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM]} />
        <meshStandardMaterial color={FRAME_COLOR} metalness={0.25} roughness={0.55} />
      </mesh>

      {slatXPositions.map((x, i) => (
        <mesh
          key={i}
          position={[x, heightM + BEAM_HEIGHT + 0.1, 0]}
          rotation={[Math.PI / 7, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.16, 0.02, depthM + 0.1]} />
          <meshStandardMaterial color={SLAT_COLOR} metalness={0.2} roughness={0.6} />
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
        intensity={2.2}
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

export default function PergolaConfigurator() {
  const [width, setWidth] = useState(400);
  const [depth, setDepth] = useState(300);
  const [height, setHeight] = useState(250);
  const [pillars, setPillars] = useState(4);

  const widthM = width / 100;
  const depthM = depth / 100;
  const heightM = height / 100;
  const area = (widthM * depthM).toFixed(1);

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
            min={2}
            max={12}
            step={2}
            unit=""
            onChange={setPillars}
          />
          {isWallMounted(pillars) && (
            <p className="text-xs text-zinc-500 leading-relaxed -mt-4">
              Manje od 4 stupa: pergola se s druge strane oslanja na zid kuće ili drugog objekta,
              umjesto na dodatne stupove.
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
