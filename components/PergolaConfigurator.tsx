"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
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
const SKY_COLOR = "#cbd5e1";

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

// A real sliding roof module is ~1m wide with two layers per the SKL-04
// assembly: a FIXED lower comb of solid "Donji Puni" rungs (~170mm) with
// gaps between them, and a single CONNECTED, SLIDING upper sheet of
// "Gornji Pattern" segments (~300mm pitch, half solid / half perforated)
// that slides over the comb. Depending on where it's slid to, the solid
// half of the sheet covers the comb's gaps (closed) or the perforated half
// lines up with them (open).
const MODULE_WIDTH = 1.0;
const MODULE_GAP = 0.03;
const BASE_PITCH = 0.3;
const BASE_SOLID = 0.17;
const PATTERN_LIFT = 0.025; // the sliding sheet sits this much higher than the fixed comb
const MAX_SLIDE = 0.15; // matches the slider's range, so the sheet always fully covers the roof
const PANEL_THICKNESS = 0.03;

function getModuleXRanges(widthM: number) {
  const moduleCount = Math.max(1, Math.round(widthM / MODULE_WIDTH));
  const moduleWidth = (widthM - MODULE_GAP * (moduleCount - 1)) / moduleCount;
  return Array.from({ length: moduleCount }, (_, i) => {
    const startX = -widthM / 2 + i * (moduleWidth + MODULE_GAP);
    return { centerX: startX + moduleWidth / 2, width: moduleWidth };
  });
}

// Fixed lower comb: a full-size (170mm) solid rung every 300mm, leaving a
// gap between each. Never shrinks to fit - if there's leftover room at the
// end, one more full-size rung is placed flush against the boundary,
// overlapping the previous one rather than being resized.
function getBaseRungs(depthM: number): number[] {
  const usableDepth = depthM - 0.1;
  const start = -usableDepth / 2;
  const end = usableDepth / 2;
  const rungs: number[] = [];
  let z = start;
  while (z + BASE_PITCH <= end + 0.001) {
    rungs.push(z + BASE_SOLID / 2);
    z += BASE_PITCH;
  }
  if (z < end - 0.01) {
    rungs.push(end - BASE_SOLID / 2);
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

function BaseRung({
  centerX,
  moduleWidth,
  z,
  y,
  color,
}: {
  centerX: number;
  moduleWidth: number;
  z: number;
  y: number;
  color: ColorOption;
}) {
  return (
    <mesh position={[centerX, y, z]} castShadow receiveShadow>
      <boxGeometry args={[moduleWidth, PANEL_THICKNESS, BASE_SOLID]} />
      <meshStandardMaterial color={color.frame} metalness={0.3} roughness={0.5} />
    </mesh>
  );
}

// The sliding upper sheet: ONE connected, continuous piece per module - not
// separate pieces with gaps - built by repeating a [solid half][perforated
// half] cycle (per the "Gornji Pattern Kvadratni" drawing, where only part
// of each panel is cut) along its whole length, then cutting 3 real
// through-holes into every perforated half. It's made longer than the roof
// itself so that sliding it within MAX_SLIDE never exposes a bare edge.
function usePatternedSheetGeometry(moduleWidth: number, depthM: number) {
  return useMemo(() => {
    const usableDepth = depthM - 0.1;
    const totalLength = usableDepth + 2 * MAX_SLIDE + 0.1;
    const perforatedLength = BASE_PITCH - BASE_SOLID;
    const seamZs: number[] = [];

    const shape = new THREE.Shape();
    shape.moveTo(-moduleWidth / 2, -totalLength / 2);
    shape.lineTo(moduleWidth / 2, -totalLength / 2);
    shape.lineTo(moduleWidth / 2, totalLength / 2);
    shape.lineTo(-moduleWidth / 2, totalLength / 2);
    shape.closePath();

    const holeCount = 3;
    const sideMargin = moduleWidth * 0.1;
    const usableWidth = moduleWidth - sideMargin * 2;
    const holeGapX = usableWidth * 0.08;
    const holeWidth = (usableWidth - holeGapX * (holeCount - 1)) / holeCount;
    const holeDepth = perforatedLength * 0.7;

    let z = -totalLength / 2 + BASE_SOLID;
    while (z + perforatedLength <= totalLength / 2) {
      const cz = z + perforatedLength / 2;
      for (let i = 0; i < holeCount; i++) {
        const hx = -usableWidth / 2 + holeWidth / 2 + i * (holeWidth + holeGapX);
        const hole = new THREE.Path();
        hole.moveTo(hx - holeWidth / 2, cz - holeDepth / 2);
        hole.lineTo(hx + holeWidth / 2, cz - holeDepth / 2);
        hole.lineTo(hx + holeWidth / 2, cz + holeDepth / 2);
        hole.lineTo(hx - holeWidth / 2, cz + holeDepth / 2);
        hole.closePath();
        shape.holes.push(hole);
      }
      // mark the boundary between this panel and the next as a visible seam
      seamZs.push(z + BASE_PITCH);
      z += BASE_PITCH;
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: PANEL_THICKNESS,
      bevelEnabled: false,
    });
    geometry.center();
    return { geometry, totalLength, seamZs };
  }, [moduleWidth, depthM]);
}

function PatternedSheet({
  centerX,
  moduleWidth,
  depthM,
  y,
  slideOffset,
  color,
  clippingPlanes,
}: {
  centerX: number;
  moduleWidth: number;
  depthM: number;
  y: number;
  slideOffset: number;
  color: ColorOption;
  clippingPlanes: THREE.Plane[];
}) {
  const { geometry, seamZs } = usePatternedSheetGeometry(moduleWidth, depthM);
  return (
    <group position={[centerX, y, slideOffset]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={color.slat}
          metalness={0.3}
          roughness={0.5}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
      {/* raised seam ridges every 300mm - visible via real shading/shadow
          rather than a flat decal, so the connected sheet still reads as
          individual panels, not one seamless piece */}
      {seamZs.map((z, i) => (
        <mesh key={i} position={[0, z, -(PANEL_THICKNESS / 2 + 0.004)]} castShadow>
          <boxGeometry args={[moduleWidth * 0.97, 0.02, 0.008]} />
          <meshStandardMaterial
            color="#9a9a9e"
            metalness={0.6}
            roughness={0.3}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
    </group>
  );
}

function PergolaModel({
  widthM,
  depthM,
  heightM,
  mount,
  color,
  slideOffset,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
  slideOffset: number;
}) {
  const pillarPositions = useMemo(
    () =>
      getPillarPositions(widthM, depthM, mount).map((p) =>
        insetPillarPosition(p, widthM, depthM)
      ),
    [widthM, depthM, mount]
  );
  const moduleRanges = useMemo(() => getModuleXRanges(widthM), [widthM]);
  const baseRungZs = useMemo(() => getBaseRungs(depthM), [depthM]);
  // 80mm below the beam's top surface, so the roof sits recessed inside the
  // frame instead of perched above it.
  const roofY = heightM + BEAM_HEIGHT - 0.08;
  // hard-clip the sliding sheet so it can never visibly extend past the
  // frame's inner boundary, no matter how far it's slid
  const roofClipPlanes = useMemo(() => {
    const half = (depthM - 0.1) / 2;
    return [
      new THREE.Plane(new THREE.Vector3(0, 0, -1), half),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), half),
    ];
  }, [depthM]);

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

      {/* sliding roof: a fixed lower comb of solid rungs (with gaps) per
          module, plus one connected sliding sheet per module on top that
          opens/closes the gaps as it moves - matching the SKL-04 assembly. */}
      {moduleRanges.map(({ centerX, width: moduleW }, m) => (
        <group key={m}>
          {baseRungZs.map((z, r) => (
            <BaseRung key={r} centerX={centerX} moduleWidth={moduleW} z={z} y={roofY} color={color} />
          ))}
          <PatternedSheet
            centerX={centerX}
            moduleWidth={moduleW}
            depthM={depthM}
            y={roofY + PATTERN_LIFT}
            slideOffset={slideOffset}
            color={color}
            clippingPlanes={roofClipPlanes}
          />
        </group>
      ))}
    </group>
  );
}

function Scene({
  widthM,
  depthM,
  heightM,
  mount,
  color,
  slideOffset,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
  slideOffset: number;
}) {
  return (
    <>
      <color attach="background" args={[SKY_COLOR]} />
      <fog attach="fog" args={[SKY_COLOR, 18, 30]} />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#ffffff", "#8a8a8a", 0.9]} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <PergolaModel
        widthM={widthM}
        depthM={depthM}
        heightM={heightM}
        mount={mount}
        color={color}
        slideOffset={slideOffset}
      />

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
  const [slidePosition, setSlidePosition] = useState(0);

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
        <Canvas
          shadows
          gl={{ localClippingEnabled: true }}
          camera={{ position: [7, 5, 9], fov: 45 }}
        >
          <Scene
            widthM={widthM}
            depthM={depthM}
            heightM={heightM}
            mount={mount}
            color={color}
            slideOffset={slidePosition / 100}
          />
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

          <div>
            <Field
              label="Pomak kliznih panela"
              value={slidePosition}
              min={-15}
              max={15}
              step={1}
              unit="cm"
              onChange={setSlidePosition}
            />
            <p className="text-xs text-zinc-500 leading-relaxed mt-3">
              Gornji, prorezani paneli (300mm) klize preko donjih, punih panela (170mm). Pomicanjem
              ovog klizača simulirate zatvaranje ili otvaranje krova pergole.
            </p>
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
