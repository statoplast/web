"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Grid } from "@react-three/drei";
import { Locale, localizedPath } from "@/lib/i18n";

// EN AW-6060 200x100x4 aluminum profile, used for both pillars and perimeter
// beams per the technical drawing (2026-03-VŽ-01).
const PILLAR_WIDTH = 0.1;
const PILLAR_DEPTH = 0.2;
const BEAM_HEIGHT = 0.2;
const BEAM_DEPTH = 0.1;
const WALL_THICKNESS = 0.3;
// Max unsupported distance between two pillars, in meters. E.g. up to 5000mm
// needs only 2 pillars (the two ends); 5001mm-10000mm needs 3; 10001mm-15000mm
// needs 4, and so on every additional 5m.
const MAX_SPAN = 5;
const SKY_COLOR = "#cbd5e1";

type MountType = "freestanding" | "single-wall" | "l-corner" | "corner-touch";

type ColorOption = {
  id: string;
  label: string;
  frame: string;
  slat: string;
  swatch: string;
  isCustom?: boolean;
};

const COLOR_OPTIONS: Record<Locale, ColorOption[]> = {
  hr: [
    { id: "antracit", label: "Antracit", frame: "#3a3c3f", slat: "#484b4f", swatch: "#3a3c3f" },
    { id: "crna", label: "Crna mat", frame: "#1c1c1f", slat: "#26262a", swatch: "#1c1c1f" },
    { id: "bijela", label: "Bijela", frame: "#f2f2ef", slat: "#e6e6e2", swatch: "#f2f2ef" },
    { id: "bronca", label: "Bronca", frame: "#453329", slat: "#54402f", swatch: "#453329" },
    { id: "srebrna", label: "Srebrna", frame: "#b7bbbe", slat: "#a5a9ac", swatch: "#b7bbbe" },
    {
      id: "ral",
      label: "Bilo koja boja po RAL-u",
      frame: "#5a5e62",
      slat: "#686c70",
      swatch: "",
      isCustom: true,
    },
  ],
  en: [
    { id: "antracit", label: "Anthracite", frame: "#3a3c3f", slat: "#484b4f", swatch: "#3a3c3f" },
    { id: "crna", label: "Matte black", frame: "#1c1c1f", slat: "#26262a", swatch: "#1c1c1f" },
    { id: "bijela", label: "White", frame: "#f2f2ef", slat: "#e6e6e2", swatch: "#f2f2ef" },
    { id: "bronca", label: "Bronze", frame: "#453329", slat: "#54402f", swatch: "#453329" },
    { id: "srebrna", label: "Silver", frame: "#b7bbbe", slat: "#a5a9ac", swatch: "#b7bbbe" },
    {
      id: "ral",
      label: "Any RAL colour",
      frame: "#5a5e62",
      slat: "#686c70",
      swatch: "",
      isCustom: true,
    },
  ],
  de: [
    { id: "antracit", label: "Anthrazit", frame: "#3a3c3f", slat: "#484b4f", swatch: "#3a3c3f" },
    { id: "crna", label: "Mattschwarz", frame: "#1c1c1f", slat: "#26262a", swatch: "#1c1c1f" },
    { id: "bijela", label: "Weiß", frame: "#f2f2ef", slat: "#e6e6e2", swatch: "#f2f2ef" },
    { id: "bronca", label: "Bronze", frame: "#453329", slat: "#54402f", swatch: "#453329" },
    { id: "srebrna", label: "Silber", frame: "#b7bbbe", slat: "#a5a9ac", swatch: "#b7bbbe" },
    {
      id: "ral",
      label: "Beliebige RAL-Farbe",
      frame: "#5a5e62",
      slat: "#686c70",
      swatch: "",
      isCustom: true,
    },
  ],
};

const MOUNT_OPTIONS: Record<Locale, { id: MountType; label: string; description: string }[]> = {
  hr: [
    {
      id: "freestanding",
      label: "Samostojeća",
      description: "Pergola stoji slobodno, poduprta stupovima sa svih strana.",
    },
    {
      id: "single-wall",
      label: "Uza zid",
      description:
        "Jedna cijela strana oslonjena je na zid kuće, nasuprotna strana stoji na stupovima.",
    },
    {
      id: "l-corner",
      label: "U kutu (L-oblik)",
      description: "Dva zida kuće spajaju se pod pravim kutom, a suprotni ugao pridržavaju stupovi.",
    },
    {
      id: "corner-touch",
      label: "Dodiruje kut",
      description:
        "Pergola dodiruje kuću samo u jednom uglu, dok su preostali uglovi poduprti stupovima.",
    },
  ],
  en: [
    {
      id: "freestanding",
      label: "Freestanding",
      description: "The pergola stands freely, supported by pillars on all sides.",
    },
    {
      id: "single-wall",
      label: "Wall-mounted",
      description:
        "One full side rests against the house wall, the opposite side stands on pillars.",
    },
    {
      id: "l-corner",
      label: "In a corner (L-shape)",
      description: "Two house walls meet at a right angle, and the opposite corner is held by pillars.",
    },
    {
      id: "corner-touch",
      label: "Touches corner",
      description:
        "The pergola touches the house at only one corner, while the remaining corners are supported by pillars.",
    },
  ],
  de: [
    {
      id: "freestanding",
      label: "Freistehend",
      description: "Die Pergola steht frei und wird an allen Seiten von Stützen getragen.",
    },
    {
      id: "single-wall",
      label: "An der Wand",
      description:
        "Eine ganze Seite liegt an der Hauswand an, die gegenüberliegende Seite steht auf Stützen.",
    },
    {
      id: "l-corner",
      label: "In der Ecke (L-Form)",
      description:
        "Zwei Hauswände treffen im rechten Winkel aufeinander, die gegenüberliegende Ecke wird von Stützen getragen.",
    },
    {
      id: "corner-touch",
      label: "Berührt Ecke",
      description:
        "Die Pergola berührt das Haus nur an einer Ecke, während die übrigen Ecken von Stützen getragen werden.",
    },
  ],
};

type PatternType = "rectangles" | "squares" | "triangles" | "other";

const PATTERN_OPTIONS: Record<Locale, { id: PatternType; label: string }[]> = {
  hr: [
    { id: "rectangles", label: "3 pravokutnika" },
    { id: "squares", label: "Mreža kvadrata" },
    { id: "triangles", label: "Cik-cak trokuti" },
    { id: "other", label: "Neki drugi" },
  ],
  en: [
    { id: "rectangles", label: "3 rectangles" },
    { id: "squares", label: "Square grid" },
    { id: "triangles", label: "Zigzag triangles" },
    { id: "other", label: "Something else" },
  ],
  de: [
    { id: "rectangles", label: "3 Rechtecke" },
    { id: "squares", label: "Quadratraster" },
    { id: "triangles", label: "Zickzack-Dreiecke" },
    { id: "other", label: "Etwas anderes" },
  ],
};

const UI_TEXT: Record<
  Locale,
  {
    slidePanels: string;
    slideDesc: string;
    width: string;
    depth: string;
    height: string;
    mountLabel: string;
    pillarsNeeded: string;
    pillarsAuto: string;
    colorLabel: string;
    ralNote: string;
    patternLabel: string;
    patternNote: string;
    totalArea: string;
    ctaButton: string;
    disclaimer: string;
    inquiry: (
      width: number,
      depth: number,
      height: number,
      mount: string,
      pillars: number,
      color: string,
      pattern: string
    ) => string;
  }
> = {
  hr: {
    slidePanels: "Pomak kliznih panela",
    slideDesc:
      "Gornji, prorezani paneli (300mm) klize preko donjih, punih panela (170mm). Pomicanjem ovog klizača simulirate zatvaranje ili otvaranje krova pergole.",
    width: "Širina",
    depth: "Dubina",
    height: "Visina",
    mountLabel: "Način oslanjanja",
    pillarsNeeded: "Potrebno stupova pri ovim dimenzijama:",
    pillarsAuto: "Broj stupova automatski raste s većim dimenzijama pergole.",
    colorLabel: "Boja konstrukcije",
    ralNote: "Ne izrađujemo samo standardne nijanse — dostupna je bilo koja boja po RAL karti, po vašem izboru.",
    patternLabel: "Uzorak prorezanih panela",
    patternNote: "Ovo su samo primjeri uzoraka — nismo ograničeni na ova tri, moguća je izrada bilo kojeg uzorka po vašoj želji.",
    totalArea: "Ukupna površina",
    ctaButton: "Zatražite ponudu za ovu konfiguraciju",
    disclaimer:
      "Prikazani model je okvirna 3D vizualizacija namijenjena boljem uvidu u proporcije i veličinu. Konačan izgled, materijali i točne mjere definiraju se s našim inženjerskim timom.",
    inquiry: (width, depth, height, mount, pillars, color, pattern) =>
      `Zanima me ponuda za bioklimatsku pergolu s dimenzijama ${width}cm (širina) x ${depth}cm (dubina) x ${height}cm (visina). Način oslanjanja: ${mount} (${pillars} stupova). Boja: ${color}. Uzorak: ${pattern}.`,
  },
  en: {
    slidePanels: "Sliding panel offset",
    slideDesc:
      "The upper, perforated panels (300mm) slide over the lower, solid panels (170mm). Move this slider to simulate opening or closing the pergola roof.",
    width: "Width",
    depth: "Depth",
    height: "Height",
    mountLabel: "Mounting type",
    pillarsNeeded: "Pillars needed at these dimensions:",
    pillarsAuto: "The number of pillars grows automatically with larger pergola dimensions.",
    colorLabel: "Frame colour",
    ralNote: "We don't just make standard shades — any colour from the RAL chart is available, to your choice.",
    patternLabel: "Perforated panel pattern",
    patternNote: "These are just example patterns — we're not limited to these three, any pattern can be made to your requirements.",
    totalArea: "Total area",
    ctaButton: "Request a quote for this configuration",
    disclaimer:
      "The model shown is an approximate 3D visualisation intended to give a better sense of proportions and size. The final look, materials and exact measurements are defined together with our engineering team.",
    inquiry: (width, depth, height, mount, pillars, color, pattern) =>
      `I'm interested in a quote for a bioclimatic pergola with dimensions ${width}cm (width) x ${depth}cm (depth) x ${height}cm (height). Mounting type: ${mount} (${pillars} pillars). Colour: ${color}. Pattern: ${pattern}.`,
  },
  de: {
    slidePanels: "Verschiebung der Schiebepaneele",
    slideDesc:
      "Die oberen, geschlitzten Paneele (300mm) gleiten über die unteren, vollen Paneele (170mm). Bewegen Sie diesen Regler, um das Öffnen oder Schließen des Pergoladachs zu simulieren.",
    width: "Breite",
    depth: "Tiefe",
    height: "Höhe",
    mountLabel: "Befestigungsart",
    pillarsNeeded: "Benötigte Stützen bei diesen Abmessungen:",
    pillarsAuto: "Die Anzahl der Stützen wächst automatisch mit größeren Pergola-Abmessungen.",
    colorLabel: "Rahmenfarbe",
    ralNote: "Wir fertigen nicht nur Standardtöne — jede Farbe der RAL-Karte ist nach Ihrer Wahl verfügbar.",
    patternLabel: "Muster der geschlitzten Paneele",
    patternNote: "Dies sind nur Beispielmuster — wir sind nicht auf diese drei beschränkt, jedes gewünschte Muster ist möglich.",
    totalArea: "Gesamtfläche",
    ctaButton: "Angebot für diese Konfiguration anfordern",
    disclaimer:
      "Das gezeigte Modell ist eine ungefähre 3D-Visualisierung für einen besseren Eindruck von Proportionen und Größe. Das endgültige Aussehen, die Materialien und die genauen Maße werden gemeinsam mit unserem Engineering-Team festgelegt.",
    inquiry: (width, depth, height, mount, pillars, color, pattern) =>
      `Ich interessiere mich für ein Angebot für eine bioklimatische Pergola mit den Abmessungen ${width}cm (Breite) x ${depth}cm (Tiefe) x ${height}cm (Höhe). Befestigungsart: ${mount} (${pillars} Stützen). Farbe: ${color}. Muster: ${pattern}.`,
  },
};

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
      // back edge (BL-BR) is a house wall; front, left, and right edges are
      // all open, so each also gets intermediate pillars if it runs longer
      // than MAX_SPAN (this is what was missing for large "Dubina" values)
      return dedupe([
        ...pillarsAlongEdge(FL, FR),
        ...pillarsAlongEdge(FL, BL, false, true),
        ...pillarsAlongEdge(FR, BR, false, true),
      ]);
    case "l-corner":
      // back and left walls meet at BL; front and right edges are open,
      // their wall-side ends are already supported by the walls
      return dedupe([
        ...pillarsAlongEdge(FL, FR, true, false),
        ...pillarsAlongEdge(FR, BR, false, true),
      ]);
    case "corner-touch":
      // house touches only the BL corner; the other three edges are open
      return dedupe([
        ...pillarsAlongEdge(FL, FR),
        ...pillarsAlongEdge(FR, BR),
        ...pillarsAlongEdge(BL, BR, true, false),
        ...pillarsAlongEdge(FL, BL, false, true),
      ]);
    default:
      // freestanding: all four edges are open
      return dedupe([
        ...pillarsAlongEdge(FL, FR),
        ...pillarsAlongEdge(BL, BR),
        ...pillarsAlongEdge(FL, BL),
        ...pillarsAlongEdge(FR, BR),
      ]);
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
// Both layers share one fixed grid, anchored at the pergola's own center
// (z=0), rather than a grid re-based on each side's edge - so the phase
// between the two layers is a fixed, calculable relationship instead of an
// accident of depth/overhang math. On this grid, slide=0 is "the beginning":
// the perforated half of the sliding sheet sits centered exactly over the
// gap in the fixed comb below it (fully open). Sliding by exactly half a
// pitch (150mm) moves the perforated half onto the solid comb instead,
// meaning the sheet's own solid half now covers the comb's gap (fully
// closed).
const SLIDE_MIN = 0; // cm - fully open (the unshifted, "beginning" position)
const SLIDE_MAX = (BASE_PITCH / 2) * 100; // cm - fully closed, exactly half a pitch away
const MAX_SLIDE = BASE_PITCH / 2; // meters - matches SLIDE_MAX, so the sheet always fully covers the roof
const PANEL_THICKNESS = 0.03;
const END_CAP_LENGTH = 0.2; // cover cap hiding the sliding sheet's cut edge
const END_CAP_LIFT = 0.04; // sits above the base comb, covering both roof layers
const MID_BEAM_HEIGHT = 0.15; // 150x50 connecting beam per middle "field"
const MID_BEAM_DEPTH = 0.05;

// Modules span only the space between the INSIDE faces of the left/right
// beams, not the pergola's full nominal width - otherwise the roof
// literally overlaps the side beam's own thickness and z-fights with it.
function getModuleXRanges(widthM: number) {
  const usableWidth = widthM - 2 * BEAM_DEPTH;
  const moduleCount = Math.max(1, Math.round(usableWidth / MODULE_WIDTH));
  const moduleWidth = (usableWidth - MODULE_GAP * (moduleCount - 1)) / moduleCount;
  return Array.from({ length: moduleCount }, (_, i) => {
    const startX = -usableWidth / 2 + i * (moduleWidth + MODULE_GAP);
    return { centerX: startX + moduleWidth / 2, width: moduleWidth };
  });
}

// X position of the boundary between each pair of adjacent sliding modules -
// "the other side": a connecting beam here runs the other way (spanning the
// depth), complementing the width-spanning beams at the middle of each
// pillar bay.
function getModuleBoundaries(moduleRanges: { centerX: number; width: number }[]) {
  const boundaries: number[] = [];
  for (let i = 0; i < moduleRanges.length - 1; i++) {
    const a = moduleRanges[i];
    const b = moduleRanges[i + 1];
    boundaries.push(((a.centerX + a.width / 2) + (b.centerX - b.width / 2)) / 2);
  }
  return boundaries;
}

// Fixed lower comb: a full-size (170mm) solid rung every 300mm, leaving a
// gap between each. Never shrinks to fit - if there's leftover room at the
// end, one more full-size rung is placed flush against the boundary,
// overlapping the previous one rather than being resized.
function getBaseRungs(depthM: number): number[] {
  const usableDepth = depthM - 0.1;
  const start = -usableDepth / 2;
  const end = usableDepth / 2;
  // anchored to the absolute grid (rung k occupies [k*BASE_PITCH, k*BASE_PITCH+BASE_SOLID]),
  // not re-based on this depth's own edge - any rung overlapping the visible
  // window is included; clipping (applied where this is rendered) trims the
  // overhanging bit at the boundary rather than this function resizing it.
  const kStart = Math.floor(start / BASE_PITCH) - 1;
  const kEnd = Math.ceil(end / BASE_PITCH) + 1;
  const rungs: number[] = [];
  for (let k = kStart; k <= kEnd; k++) {
    const rungStart = k * BASE_PITCH;
    const rungEnd = rungStart + BASE_SOLID;
    if (rungEnd < start || rungStart > end) continue;
    rungs.push(rungStart + BASE_SOLID / 2);
  }
  return rungs;
}

// Fixed, real-world house dimensions - deliberately NOT derived from the
// pergola's own height. A house wall, its window, and its door don't move
// just because someone drags the pergola height slider.
const HOUSE_WALL_HEIGHT = 3.0;
const HOUSE_WINDOW_Y = 1.5;
const HOUSE_DOOR_HEIGHT = 2.1;

function WallPanel({
  length,
  center,
  axis,
  withOpenings,
}: {
  length: number;
  center: [number, number];
  axis: "x" | "z";
  withOpenings?: boolean;
}) {
  const wallHeight = HOUSE_WALL_HEIGHT;
  const size: [number, number, number] =
    axis === "x" ? [length, wallHeight, WALL_THICKNESS] : [WALL_THICKNESS, wallHeight, length];
  const plinthSize: [number, number, number] =
    axis === "x" ? [length, 0.16, WALL_THICKNESS + 0.04] : [WALL_THICKNESS + 0.04, 0.16, length];
  const fasciaSize: [number, number, number] =
    axis === "x"
      ? [length + 0.34, 0.06, WALL_THICKNESS + 0.26]
      : [WALL_THICKNESS + 0.26, 0.06, length + 0.34];
  const capSize: [number, number, number] =
    axis === "x"
      ? [length + 0.3, 0.14, WALL_THICKNESS + 0.2]
      : [WALL_THICKNESS + 0.2, 0.14, length + 0.3];

  return (
    <group position={[center[0], 0, center[1]]}>
      {/* stucco wall body */}
      <mesh position={[0, wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#ece7db" roughness={0.95} />
      </mesh>
      {/* plinth / base trim */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={plinthSize} />
        <meshStandardMaterial color="#9a9484" roughness={0.9} />
      </mesh>
      {/* fascia trim just under the roofline */}
      <mesh position={[0, wallHeight - 0.03, 0]} castShadow>
        <boxGeometry args={fasciaSize} />
        <meshStandardMaterial color="#46474a" roughness={0.7} />
      </mesh>
      {/* roof cap */}
      <mesh position={[0, wallHeight + 0.07, 0]} castShadow>
        <boxGeometry args={capSize} />
        <meshStandardMaterial color="#2f3032" roughness={0.6} />
      </mesh>

      {withOpenings && axis === "x" && (
        <>
          {/* door, with a small handle */}
          <group position={[-length / 4, 0, WALL_THICKNESS / 2 + 0.01]}>
            <mesh position={[0, HOUSE_DOOR_HEIGHT / 2, 0]}>
              <boxGeometry args={[0.9, HOUSE_DOOR_HEIGHT, 0.03]} />
              <meshStandardMaterial color="#2c2c30" roughness={0.5} metalness={0.2} />
            </mesh>
            <mesh position={[0.32, HOUSE_DOOR_HEIGHT / 2, 0.02]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>

          {/* window, with a frame and cross mullions */}
          <group position={[length / 4, HOUSE_WINDOW_Y, WALL_THICKNESS / 2 + 0.01]}>
            <mesh>
              <boxGeometry args={[1.2, 1.2, 0.04]} />
              <meshStandardMaterial color="#fdfdfc" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.021]}>
              <boxGeometry args={[1.04, 1.04, 0.02]} />
              <meshStandardMaterial color="#bcd9ec" roughness={0.1} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.032]}>
              <boxGeometry args={[0.04, 1.04, 0.01]} />
              <meshStandardMaterial color="#fdfdfc" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.032]}>
              <boxGeometry args={[1.04, 0.04, 0.01]} />
              <meshStandardMaterial color="#fdfdfc" roughness={0.6} />
            </mesh>
          </group>
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
    return <WallPanel length={widthM + 1} center={[0, backWallZ]} axis="x" withOpenings />;
  }

  if (mount === "l-corner") {
    return (
      <>
        <WallPanel length={widthM + 0.5} center={[0, backWallZ]} axis="x" withOpenings />
        <WallPanel length={depthM + 0.5} center={[leftWallX, 0]} axis="z" />
      </>
    );
  }

  if (mount === "corner-touch") {
    // sized and positioned so its inner corner face actually meets the
    // pergola's own corner point, instead of floating a gap away from it;
    // height still tracks the pergola so it always visibly reaches the roof
    const stubHeight = heightM + 0.3;
    const stubSize = 0.6;
    return (
      <mesh
        position={[left - stubSize / 2, stubHeight / 2, back - stubSize / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[stubSize, stubHeight, stubSize]} />
        <meshStandardMaterial color="#ece7db" roughness={0.95} />
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
  clippingPlanes,
}: {
  centerX: number;
  moduleWidth: number;
  z: number;
  y: number;
  color: ColorOption;
  clippingPlanes: THREE.Plane[];
}) {
  return (
    <mesh position={[centerX, y, z]} castShadow receiveShadow>
      <boxGeometry args={[moduleWidth, PANEL_THICKNESS, BASE_SOLID]} />
      <meshStandardMaterial
        color={color.frame}
        metalness={0.05}
        roughness={0.85}
        clippingPlanes={clippingPlanes}
      />
    </mesh>
  );
}

// Cover cap hiding the sliding sheet's clipped edge at each end, so the
// mechanism disappears behind a finished trim piece instead of visibly
// cutting off - matching the "Lim2-Poklopac" cover parts on the drawing.
function EndCaps({
  centerX,
  moduleWidth,
  depthM,
  y,
  color,
}: {
  centerX: number;
  moduleWidth: number;
  depthM: number;
  y: number;
  color: ColorOption;
}) {
  // matches the roof's own clip boundary (the inside face of the front/back
  // beams) so the cap's outer edge sits flush there, not further out where
  // it would overlap the beam.
  const usableDepth = depthM - 2 * BEAM_DEPTH;
  const capZ = usableDepth / 2 - END_CAP_LENGTH / 2;
  return (
    <>
      <mesh position={[centerX, y, capZ]} castShadow receiveShadow>
        <boxGeometry args={[moduleWidth, PANEL_THICKNESS, END_CAP_LENGTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.05} roughness={0.85} />
      </mesh>
      <mesh position={[centerX, y, -capZ]} castShadow receiveShadow>
        <boxGeometry args={[moduleWidth, PANEL_THICKNESS, END_CAP_LENGTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.05} roughness={0.85} />
      </mesh>
    </>
  );
}

function addRectHole(shape: THREE.Shape, hx: number, cz: number, w: number, d: number) {
  const hole = new THREE.Path();
  hole.moveTo(hx - w / 2, cz - d / 2);
  hole.lineTo(hx + w / 2, cz - d / 2);
  hole.lineTo(hx + w / 2, cz + d / 2);
  hole.lineTo(hx - w / 2, cz + d / 2);
  hole.closePath();
  shape.holes.push(hole);
}

// Hand-traced from the reference drawing: a fixed, irregular sequence of
// 10 cut shapes (not a generated/repeating formula) - triangles of varying
// width and lean, two kite-shaped quads, a small floating notch, a diamond,
// and a tiny sliver at the very end. Each entry is [weight, points], where
// weight is that shape's share of the row's total width and points are
// local coordinates within its own slot: x in [0,1] (left to right), y in
// [0,1] (0 = bottom edge, 1 = top edge).
const ZIGZAG_SHAPES: { weight: number; points: [number, number][] }[] = [
  { weight: 0.09, points: [[0, 0], [1, 0], [0.15, 1]] },
  { weight: 0.2, points: [[0, 0], [0.1, 0.55], [0.55, 1], [1, 0]] },
  { weight: 0.06, points: [[0.1, 1], [0.9, 1], [0.5, 0.35]] },
  { weight: 0.16, points: [[0, 0], [1, 0], [0.5, 1]] },
  { weight: 0.1, points: [[0, 1], [1, 1], [0.5, 0]] },
  { weight: 0.11, points: [[0, 0], [1, 0], [0.35, 1]] },
  { weight: 0.12, points: [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]] },
  { weight: 0.1, points: [[0, 0], [1, 0], [0.6, 1]] },
  { weight: 0.07, points: [[0.15, 0], [0.85, 0], [1, 0.5], [0.5, 1], [0, 0.5]] },
  { weight: 0.03, points: [[0.2, 0], [0.8, 0], [0.5, 1]] },
];

function addZigzagHoles(shape: THREE.Shape, usableWidth: number, cz: number, height: number) {
  const totalWeight = ZIGZAG_SHAPES.reduce((s, z) => s + z.weight, 0);
  const gapFrac = 0.015;
  const gapTotal = gapFrac * usableWidth * (ZIGZAG_SHAPES.length - 1);
  const availWidth = usableWidth - gapTotal;
  let cursorX = -usableWidth / 2;
  for (const s of ZIGZAG_SHAPES) {
    const w = (s.weight / totalWeight) * availWidth;
    const hole = new THREE.Path();
    s.points.forEach(([px, py], i) => {
      const x = cursorX + px * w;
      const y = cz - height / 2 + py * height;
      if (i === 0) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    });
    hole.closePath();
    shape.holes.push(hole);
    cursorX += w + gapFrac * usableWidth;
  }
}

// Cuts one perforated cell's worth of holes into `shape`, centered at `cz` -
// the "3 pravokutnika" wide-rectangle look (current SKL-04 build), the
// "Mreža kvadrata" 2-row grid of small squares, or "Cik-cak trokuti", a row
// of alternating up/down triangles (the alternate "Gornji Pattern"
// drawings).
function addPatternCell(
  shape: THREE.Shape,
  pattern: PatternType,
  moduleWidth: number,
  cz: number,
  perforatedLength: number
) {
  // rectangles keeps a wider centered margin; squares and triangles use a
  // much tighter one so their grid fills almost the whole panel width
  // instead of leaving big bare strips on either side. "other" has no
  // geometry of its own - it renders as a placeholder using the rectangles
  // cut, matching how the RAL "any colour" swatch still shows a real
  // (placeholder) colour rather than nothing.
  const sideMargin = moduleWidth * (pattern === "rectangles" || pattern === "other" ? 0.1 : 0.03);
  const usableWidth = moduleWidth - sideMargin * 2;

  if (pattern === "rectangles" || pattern === "other") {
    const holeCount = 3;
    const holeGapX = usableWidth * 0.08;
    const holeWidth = (usableWidth - holeGapX * (holeCount - 1)) / holeCount;
    // widened ~32mm over the base 70% fraction, on the shorter (depth) side
    // of the hole - clamped so it never eats into the solid lead-in strip
    const holeDepth = Math.min(perforatedLength * 0.7 + 0.032, perforatedLength - 0.006);
    for (let i = 0; i < holeCount; i++) {
      const hx = -usableWidth / 2 + holeWidth / 2 + i * (holeWidth + holeGapX);
      addRectHole(shape, hx, cz, holeWidth, holeDepth);
    }
    return;
  }

  if (pattern === "triangles") {
    addZigzagHoles(shape, usableWidth, cz, perforatedLength * 0.9);
    return;
  }

  // squares: 2 rows, each square's gap is 30% of its own size, and the row
  // height is solved so 2 rows + 1 gap exactly fill the perforated band.
  const rowHeight = perforatedLength / 2.3;
  const rowGap = perforatedLength - rowHeight * 2;
  const squareGap = rowHeight * 0.3;
  const squareCount = Math.max(3, Math.round((usableWidth + squareGap) / (rowHeight + squareGap)));
  const actualGap = squareCount > 1 ? (usableWidth - squareCount * rowHeight) / (squareCount - 1) : 0;
  for (let row = 0; row < 2; row++) {
    const rz = cz - perforatedLength / 2 + rowHeight / 2 + row * (rowHeight + rowGap);
    for (let i = 0; i < squareCount; i++) {
      const hx = -usableWidth / 2 + rowHeight / 2 + i * (rowHeight + actualGap);
      addRectHole(shape, hx, rz, rowHeight, rowHeight);
    }
  }
}

// The sliding upper sheet: ONE connected, continuous piece per module - not
// separate pieces with gaps - built by repeating a [solid half][perforated
// half] cycle (per the "Gornji Pattern Kvadratni" drawing, where only part
// of each panel is cut) along its whole length, then cutting the chosen
// hole pattern into every perforated half. It's made longer than the roof
// itself so that sliding it within MAX_SLIDE never exposes a bare edge.
function usePatternedSheetGeometry(moduleWidth: number, depthM: number, pattern: PatternType) {
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

    // anchored to the SAME absolute grid as the fixed comb (cycle k occupies
    // [k*BASE_PITCH, (k+1)*BASE_PITCH), solid lead-in then perforated half) -
    // not re-based on this sheet's own edge, so the phase between the two
    // layers is a fixed, predictable relationship rather than depending on
    // depth/overhang.
    const kStart = Math.floor(-totalLength / 2 / BASE_PITCH) - 1;
    const kEnd = Math.ceil(totalLength / 2 / BASE_PITCH) + 1;
    for (let k = kStart; k <= kEnd; k++) {
      const cycleStart = k * BASE_PITCH;
      const perfStart = cycleStart + BASE_SOLID;
      const perfEnd = cycleStart + BASE_PITCH;
      if (perfStart < -totalLength / 2 || perfEnd > totalLength / 2) continue;
      const cz = perfStart + perforatedLength / 2;
      addPatternCell(shape, pattern, moduleWidth, cz, perforatedLength);
      // mark the boundary between this panel and the next as a visible seam
      seamZs.push(perfEnd);
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: PANEL_THICKNESS,
      bevelEnabled: false,
    });
    geometry.center();
    return { geometry, totalLength, seamZs };
  }, [moduleWidth, depthM, pattern]);
}

function PatternedSheet({
  centerX,
  moduleWidth,
  depthM,
  y,
  slideOffset,
  color,
  pattern,
  clippingPlanes,
}: {
  centerX: number;
  moduleWidth: number;
  depthM: number;
  y: number;
  slideOffset: number;
  color: ColorOption;
  pattern: PatternType;
  clippingPlanes: THREE.Plane[];
}) {
  const { geometry, seamZs } = usePatternedSheetGeometry(moduleWidth, depthM, pattern);
  return (
    <group position={[centerX, y, slideOffset]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={color.slat}
          metalness={0.05}
          roughness={0.85}
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
            metalness={0.15}
            roughness={0.6}
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
  pattern,
  slideOffset,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
  pattern: PatternType;
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
  // INSIDE face of the front/back beams (not just their mid-thickness),
  // otherwise the roof overlaps the beam's own volume and z-fights with it.
  const roofClipPlanes = useMemo(() => {
    const half = depthM / 2 - BEAM_DEPTH;
    return [
      new THREE.Plane(new THREE.Vector3(0, 0, -1), half),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), half),
    ];
  }, [depthM]);
  const moduleBoundaries = useMemo(() => getModuleBoundaries(moduleRanges), [moduleRanges]);

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
      <mesh position={[0, heightM + BEAM_HEIGHT / 2, depthM / 2 - BEAM_DEPTH / 2]} castShadow>
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh
        position={[0, heightM + BEAM_HEIGHT / 2, -(depthM / 2 - BEAM_DEPTH / 2)]}
        castShadow
      >
        <boxGeometry args={[widthM, BEAM_HEIGHT, BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[-(widthM / 2 - BEAM_DEPTH / 2), heightM + BEAM_HEIGHT / 2, 0]} castShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM - 2 * BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[widthM / 2 - BEAM_DEPTH / 2, heightM + BEAM_HEIGHT / 2, 0]} castShadow>
        <boxGeometry args={[BEAM_DEPTH, BEAM_HEIGHT, depthM - 2 * BEAM_DEPTH]} />
        <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
      </mesh>

      {/* sliding roof: a fixed lower comb of solid rungs (with gaps) per
          module, plus one connected sliding sheet per module on top that
          opens/closes the gaps as it moves - matching the SKL-04 assembly. */}
      {moduleRanges.map(({ centerX, width: moduleW }, m) => (
        <group key={m}>
          {baseRungZs.map((z, r) => (
            <BaseRung
              key={r}
              centerX={centerX}
              moduleWidth={moduleW}
              z={z}
              y={roofY}
              color={color}
              clippingPlanes={roofClipPlanes}
            />
          ))}
          <PatternedSheet
            centerX={centerX}
            moduleWidth={moduleW}
            depthM={depthM}
            y={roofY + PATTERN_LIFT}
            slideOffset={slideOffset}
            color={color}
            pattern={pattern}
            clippingPlanes={roofClipPlanes}
          />
          <EndCaps
            centerX={centerX}
            moduleWidth={moduleW}
            depthM={depthM}
            y={roofY + END_CAP_LIFT}
            color={color}
          />
        </group>
      ))}

      {/* 150x50 connecting beam spanning the depth at the middle of each
          pair of adjacent sliding modules - matching the "Spoj-Greda
          150x50" connector on the drawing. */}
      {moduleBoundaries.map((x, i) => (
        <mesh
          key={i}
          position={[x, heightM + BEAM_HEIGHT - MID_BEAM_HEIGHT / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[MID_BEAM_DEPTH, MID_BEAM_HEIGHT, depthM - 2 * BEAM_DEPTH]} />
          <meshStandardMaterial color={color.frame} metalness={0.35} roughness={0.45} />
        </mesh>
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
  pattern,
  slideOffset,
}: {
  widthM: number;
  depthM: number;
  heightM: number;
  mount: MountType;
  color: ColorOption;
  pattern: PatternType;
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
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />

      <PergolaModel
        widthM={widthM}
        depthM={depthM}
        heightM={heightM}
        mount={mount}
        color={color}
        pattern={pattern}
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

export default function PergolaConfigurator({ locale = "hr" }: { locale?: Locale }) {
  const colorOptions = COLOR_OPTIONS[locale];
  const mountOptions = MOUNT_OPTIONS[locale];
  const patternOptions = PATTERN_OPTIONS[locale];
  const t = UI_TEXT[locale];

  const [width, setWidth] = useState(400);
  const [depth, setDepth] = useState(300);
  const [height, setHeight] = useState(250);
  const [mount, setMount] = useState<MountType>("freestanding");
  const [colorId, setColorId] = useState(colorOptions[0].id);
  const [patternId, setPatternId] = useState<PatternType>(patternOptions[0].id);
  const [slidePosition, setSlidePosition] = useState(0);

  // The 3D rebuild (especially the extruded roof geometry) is expensive
  // enough that updating it synchronously on every drag event makes the
  // slider itself feel stuck. Deferring these values keeps the slider
  // thumb and its number label instantly responsive, while the heavy 3D
  // update is allowed to lag a frame or two behind under the hood.
  const deferredWidth = useDeferredValue(width);
  const deferredDepth = useDeferredValue(depth);
  const deferredHeight = useDeferredValue(height);
  const deferredSlidePosition = useDeferredValue(slidePosition);

  const widthM = deferredWidth / 100;
  const depthM = deferredDepth / 100;
  const heightM = deferredHeight / 100;
  const area = (widthM * depthM).toFixed(1);
  const color = colorOptions.find((c) => c.id === colorId) ?? colorOptions[0];
  const pillarCount = useMemo(
    () => getPillarPositions(widthM, depthM, mount).length,
    [widthM, depthM, mount]
  );
  const mountOption = mountOptions.find((m) => m.id === mount)!;
  const patternOption = patternOptions.find((p) => p.id === patternId)!;

  const inquiryMessage = t.inquiry(
    width,
    depth,
    height,
    mountOption.label,
    pillarCount,
    color.label,
    patternOption.label
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-4">
        <div className="h-[400px] md:h-[550px] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200">
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
              pattern={patternId}
              slideOffset={deferredSlidePosition / 100}
            />
          </Canvas>
        </div>

        {/* right beside the 3D view (below it on both mobile and desktop),
            so you can drag this while watching the roof open/close without
            losing sight of the model */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200">
          <Field
            label={t.slidePanels}
            value={slidePosition}
            min={SLIDE_MIN}
            max={SLIDE_MAX}
            step={1}
            unit="cm"
            onChange={setSlidePosition}
          />
          <p className="text-xs text-zinc-500 leading-relaxed mt-3">{t.slideDesc}</p>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col justify-between">
        <div className="space-y-8">
          <Field
            label={t.width}
            value={width}
            min={200}
            max={800}
            step={10}
            unit="cm"
            onChange={setWidth}
          />
          <Field
            label={t.depth}
            value={depth}
            min={200}
            max={600}
            step={10}
            unit="cm"
            onChange={setDepth}
          />
          <Field
            label={t.height}
            value={height}
            min={200}
            max={300}
            step={5}
            unit="cm"
            onChange={setHeight}
          />

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              {t.mountLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mountOptions.map((option) => (
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
              {mountOption.description} {t.pillarsNeeded}{" "}
              <span className="font-bold text-zinc-700">{pillarCount}</span>. {t.pillarsAuto}
            </p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              {t.colorLabel}
            </label>
            <div className="flex items-center flex-wrap gap-3">
              {colorOptions.map((option) => (
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
                  style={
                    option.isCustom
                      ? {
                          background:
                            "conic-gradient(from 0deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
                        }
                      : { backgroundColor: option.swatch }
                  }
                />
              ))}
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mt-3">{t.ralNote}</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
              {t.patternLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {patternOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPatternId(option.id)}
                  aria-label={option.label}
                  className={`flex flex-col items-center gap-2 px-2 py-3 rounded-lg border transition-colors ${
                    patternId === option.id
                      ? "bg-zinc-900 border-zinc-900"
                      : "bg-white border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <svg
                    viewBox="0 0 64 28"
                    className="w-full h-6"
                    fill="none"
                    stroke={patternId === option.id ? "#ffffff" : "#71717a"}
                    strokeWidth="2"
                  >
                    {option.id === "rectangles" ? (
                      <>
                        <rect x="3" y="6" width="16" height="16" rx="1" />
                        <rect x="24" y="6" width="16" height="16" rx="1" />
                        <rect x="45" y="6" width="16" height="16" rx="1" />
                      </>
                    ) : option.id === "triangles" ? (
                      <>
                        <polygon points="2,22 12,22 7,6" />
                        <polygon points="14,6 24,6 19,22" />
                        <polygon points="26,22 36,22 31,6" />
                        <polygon points="38,6 48,6 43,22" />
                        <polygon points="50,22 60,22 55,6" />
                      </>
                    ) : option.id === "squares" ? (
                      Array.from({ length: 18 }, (_, i) => {
                        const col = i % 9;
                        const row = Math.floor(i / 9);
                        return (
                          <rect
                            key={i}
                            x={2 + col * 7}
                            y={row === 0 ? 4 : 16}
                            width="5"
                            height="8"
                            rx="0.5"
                          />
                        );
                      })
                    ) : (
                      <>
                        <circle cx="20" cy="14" r="2.4" fill={patternId === option.id ? "#ffffff" : "#71717a"} stroke="none" />
                        <circle cx="32" cy="14" r="2.4" fill={patternId === option.id ? "#ffffff" : "#71717a"} stroke="none" />
                        <circle cx="44" cy="14" r="2.4" fill={patternId === option.id ? "#ffffff" : "#71717a"} stroke="none" />
                      </>
                    )}
                  </svg>
                  <span
                    className={`text-xs font-semibold text-center ${
                      patternId === option.id ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mt-3">{t.patternNote}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {t.totalArea}
            </span>
            <span className="text-2xl font-bold text-zinc-900">{area} m²</span>
          </div>
          <Link
            href={`${localizedPath("/kontakt", locale)}?poruka=${encodeURIComponent(inquiryMessage)}`}
            className="block w-full text-center bg-black hover:bg-zinc-800 text-white py-4 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
          >
            {t.ctaButton}
          </Link>
          <p className="text-xs text-zinc-400 leading-relaxed">{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
