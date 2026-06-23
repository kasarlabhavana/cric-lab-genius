// Interactive diagram with clickable hotspots.
// Click a part of the ground / pitch / ball / bat / wickets to learn what it does.

import { useState } from "react";
import { MousePointerClick, X } from "lucide-react";

export type DiagramKind = "ground" | "pitch" | "ball" | "bat" | "wickets" | "fielding";

type Hotspot = {
  id: string;
  label: string;
  description: string;
  // shape — either a circle (cx, cy, r) or rect (x, y, w, h). Coords are 0–100.
  shape:
    | { kind: "circle"; cx: number; cy: number; r: number }
    | { kind: "rect"; x: number; y: number; w: number; h: number };
};

type Diagram = {
  title: string;
  caption: string;
  // SVG background (rendered behind hotspots) — uses the same 0–100 viewBox.
  background: React.ReactNode;
  hotspots: Hotspot[];
};

const DIAGRAMS: Record<DiagramKind, Diagram> = {
  ground: {
    title: "The Cricket Ground",
    caption: "Tap a region to learn what happens there.",
    background: (
      <>
        {/* outer boundary */}
        <ellipse cx="50" cy="50" rx="48" ry="46" fill="#1f6b3a" stroke="#fff" strokeWidth="0.4" />
        <ellipse cx="50" cy="50" rx="48" ry="46" fill="url(#grass)" opacity="0.35" />
        {/* 30-yard inner circle */}
        <ellipse cx="50" cy="50" rx="22" ry="20" fill="none" stroke="#fff" strokeWidth="0.3" strokeDasharray="1 1" />
        {/* pitch strip */}
        <rect x="47" y="38" width="6" height="24" fill="#c9a87a" stroke="#fff" strokeWidth="0.2" />
        {/* close-catchers ring */}
        <ellipse cx="50" cy="50" rx="9" ry="8" fill="none" stroke="#fff" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
        <defs>
          <pattern id="grass" width="2" height="2" patternUnits="userSpaceOnUse">
            <path d="M0 2 L1 0 L2 2" stroke="#2f8a4f" strokeWidth="0.15" fill="none" />
          </pattern>
        </defs>
      </>
    ),
    hotspots: [
      { id: "pitch", label: "Pitch / Wicket", description: "22-yard strip where bowling and batting happen. Its hardness and grass cover dictate bounce, pace and turn.", shape: { kind: "rect", x: 47, y: 38, w: 6, h: 24 } },
      { id: "close", label: "Close-catching ring", description: "Slips, gully, short-leg and silly point sit here. Used in attacking field-sets to take edges and bat-pad chances.", shape: { kind: "circle", cx: 50, cy: 50, r: 9 } },
      { id: "inner", label: "30-yard circle", description: "In limited-overs cricket, fielding restrictions cap how many fielders can stay outside this ring during the powerplay.", shape: { kind: "circle", cx: 50, cy: 50, r: 22 } },
      { id: "outfield", label: "Outfield", description: "The grass between the inner ring and the rope. Sweepers and deep fielders patrol here to cut off boundaries.", shape: { kind: "circle", cx: 50, cy: 18, r: 6 } },
      { id: "boundary", label: "Boundary rope", description: "Crosses the rope on the full = six; on the bounce = four. Modern ropes are pulled in 3–5 m from the fence for safety.", shape: { kind: "circle", cx: 95, cy: 50, r: 4 } },
    ],
  },
  pitch: {
    title: "The Pitch",
    caption: "Tap a line or zone on the 22-yard strip.",
    background: (
      <>
        <rect x="5" y="20" width="90" height="60" fill="#c9a87a" stroke="#7a5a36" strokeWidth="0.3" />
        {/* popping creases */}
        <line x1="20" y1="20" x2="20" y2="80" stroke="#fff" strokeWidth="0.5" />
        <line x1="80" y1="20" x2="80" y2="80" stroke="#fff" strokeWidth="0.5" />
        {/* bowling creases */}
        <line x1="10" y1="20" x2="10" y2="80" stroke="#fff" strokeWidth="0.5" />
        <line x1="90" y1="20" x2="90" y2="80" stroke="#fff" strokeWidth="0.5" />
        {/* return creases */}
        <line x1="10" y1="35" x2="20" y2="35" stroke="#fff" strokeWidth="0.4" />
        <line x1="10" y1="65" x2="20" y2="65" stroke="#fff" strokeWidth="0.4" />
        <line x1="80" y1="35" x2="90" y2="35" stroke="#fff" strokeWidth="0.4" />
        <line x1="80" y1="65" x2="90" y2="65" stroke="#fff" strokeWidth="0.4" />
        {/* stumps */}
        <rect x="9.4" y="48" width="1.2" height="4" fill="#3a2410" />
        <rect x="89.4" y="48" width="1.2" height="4" fill="#3a2410" />
        {/* good length zone */}
        <rect x="60" y="20" width="14" height="60" fill="#7a4a22" opacity="0.18" />
      </>
    ),
    hotspots: [
      { id: "popping", label: "Popping crease", description: "The batter must ground bat or foot behind this line to avoid being stumped or run out.", shape: { kind: "rect", x: 19, y: 20, w: 2, h: 60 } },
      { id: "bowling", label: "Bowling crease", description: "Runs through the stumps. The bowler's back foot must land inside the return crease region for a legal delivery.", shape: { kind: "rect", x: 9, y: 20, w: 2, h: 60 } },
      { id: "return", label: "Return crease", description: "The two perpendicular lines that bound where the bowler's back foot can land — overstep them and it's a no-ball.", shape: { kind: "rect", x: 10, y: 34, w: 10, h: 2 } },
      { id: "good-length", label: "Good-length zone", description: "Roughly 6–8 m from the stumps. Forces the batter to commit to neither front nor back foot — the bowler's percentage area.", shape: { kind: "rect", x: 60, y: 20, w: 14, h: 60 } },
      { id: "stumps", label: "Stumps", description: "Three vertical wooden poles 28 inches tall, 9 inches wide overall. Hit these and the batter is bowled.", shape: { kind: "rect", x: 9, y: 46, w: 2, h: 8 } },
    ],
  },
  ball: {
    title: "The Cricket Ball",
    caption: "Tap a part of the ball to learn its role.",
    background: (
      <>
        <circle cx="50" cy="50" r="38" fill="#8a1a1a" stroke="#3a0a0a" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="38" fill="url(#leather)" opacity="0.4" />
        {/* seam — six rows of stitches */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="12" y1={44 + i * 2.4} x2="88" y2={44 + i * 2.4} stroke="#f5e9c8" strokeWidth="0.35" />
        ))}
        {/* highlight (shiny side) */}
        <ellipse cx="38" cy="38" rx="14" ry="9" fill="#fff" opacity="0.18" />
        {/* rough side hint */}
        <ellipse cx="65" cy="62" rx="14" ry="9" fill="#000" opacity="0.18" />
        <defs>
          <pattern id="leather" width="1.4" height="1.4" patternUnits="userSpaceOnUse">
            <circle cx="0.7" cy="0.7" r="0.15" fill="#5a0c0c" />
          </pattern>
        </defs>
      </>
    ),
    hotspots: [
      { id: "seam", label: "Seam", description: "Six rows of raised stitches. The seam grips the pitch on landing for seam movement and tilts to bias swing in the air.", shape: { kind: "rect", x: 12, y: 47, w: 76, h: 6 } },
      { id: "shiny", label: "Shiny side", description: "Polished to keep airflow laminar. Pointed away from the batter for conventional swing, toward them for reverse.", shape: { kind: "circle", cx: 38, cy: 38, r: 10 } },
      { id: "rough", label: "Rough side", description: "Worn deliberately. Trips airflow into turbulence; the pressure difference vs. the shiny side drags the ball sideways.", shape: { kind: "circle", cx: 65, cy: 62, r: 10 } },
      { id: "quarter", label: "Quarter seam", description: "Secondary stitching where the four leather panels meet. Skilled seamers can land on this for unpredictable nibble.", shape: { kind: "circle", cx: 82, cy: 50, r: 5 } },
      { id: "core", label: "Cork & yarn core", description: "Layered cork wound with wet worsted yarn. Compressed under leather to give the ball its hardness and ~155 g weight.", shape: { kind: "circle", cx: 50, cy: 50, r: 6 } },
    ],
  },
  bat: {
    title: "The Cricket Bat",
    caption: "Tap a part of the bat to learn what it does.",
    background: (
      <>
        {/* handle */}
        <rect x="46" y="6" width="8" height="28" rx="1.5" fill="#3a2410" />
        {/* grip ribs */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x="46" y={9 + i * 3.2} width="8" height="1.6" fill="#0a0a0a" opacity="0.5" />
        ))}
        {/* shoulder + blade */}
        <path d="M 38 34 Q 50 30 62 34 L 64 90 Q 50 94 36 90 Z" fill="#e9d8a8" stroke="#8a6a3a" strokeWidth="0.4" />
        {/* spine */}
        <line x1="50" y1="36" x2="50" y2="88" stroke="#b89868" strokeWidth="0.6" />
        {/* sweet spot oval */}
        <ellipse cx="50" cy="72" rx="8" ry="6" fill="#b89868" opacity="0.25" />
        {/* toe edge */}
        <rect x="36" y="88" width="28" height="3" fill="#b89868" />
      </>
    ),
    hotspots: [
      { id: "handle", label: "Handle", description: "Cane and rubber laminations absorb shock. Round handles favour wristy play; oval handles encourage straight-bat shots.", shape: { kind: "rect", x: 45, y: 6, w: 10, h: 22 } },
      { id: "shoulder", label: "Shoulder", description: "Where handle meets blade. Defines pickup feel — a higher shoulder shifts mass toward the hands and lightens the swing.", shape: { kind: "rect", x: 38, y: 30, w: 24, h: 8 } },
      { id: "sweet", label: "Sweet spot", description: "Vibration node where energy transfer to the ball is maximal. Usually 10–15 cm above the toe on a modern bat.", shape: { kind: "circle", cx: 50, cy: 72, r: 7 } },
      { id: "edge", label: "Edge", description: "Modern thick edges (38–42 mm) keep balls flying for six even on mishits — the main driver of T20 scoring inflation.", shape: { kind: "rect", x: 36, y: 50, w: 4, h: 30 } },
      { id: "toe", label: "Toe", description: "Most fragile part of the blade. Yorkers strike here — a toe guard or sock helps prevent splitting on hard surfaces.", shape: { kind: "rect", x: 36, y: 88, w: 28, h: 3 } },
      { id: "spine", label: "Spine", description: "The thick central ridge on the back. A higher spine pushes the sweet spot up; a lower spine suits front-foot drivers.", shape: { kind: "rect", x: 49, y: 38, w: 2, h: 50 } },
    ],
  },
  wickets: {
    title: "Wickets & Stumps",
    caption: "Tap a part of the wicket to learn its job.",
    background: (
      <>
        {/* ground line */}
        <line x1="10" y1="86" x2="90" y2="86" stroke="#7a5a36" strokeWidth="0.5" />
        {/* three stumps */}
        <rect x="28" y="22" width="6" height="64" fill="#d8c598" stroke="#7a5a36" strokeWidth="0.4" />
        <rect x="47" y="22" width="6" height="64" fill="#d8c598" stroke="#7a5a36" strokeWidth="0.4" />
        <rect x="66" y="22" width="6" height="64" fill="#d8c598" stroke="#7a5a36" strokeWidth="0.4" />
        {/* bails */}
        <rect x="26" y="18" width="22" height="3" rx="0.8" fill="#3a2410" />
        <rect x="52" y="18" width="22" height="3" rx="0.8" fill="#3a2410" />
        {/* spigots (bail prongs) */}
        <circle cx="30" cy="20" r="0.8" fill="#0a0a0a" />
        <circle cx="46" cy="20" r="0.8" fill="#0a0a0a" />
        <circle cx="54" cy="20" r="0.8" fill="#0a0a0a" />
        <circle cx="72" cy="20" r="0.8" fill="#0a0a0a" />
      </>
    ),
    hotspots: [
      { id: "off", label: "Off stump", description: "Closest to the batter's off side. The 'off-stump channel' is the bowler's prime line — forces tough leave-or-play decisions.", shape: { kind: "rect", x: 27, y: 20, w: 8, h: 66 } },
      { id: "middle", label: "Middle stump", description: "The reference for batting guard. Knocking it back is the most decisive form of bowled — beats both sides of the bat.", shape: { kind: "rect", x: 46, y: 20, w: 8, h: 66 } },
      { id: "leg", label: "Leg stump", description: "On the batter's leg side. Yorkers aimed here exploit blocked sight-lines and are deadly at the death.", shape: { kind: "rect", x: 65, y: 20, w: 8, h: 66 } },
      { id: "bails", label: "Bails", description: "Two wooden (or LED 'zing') crosspieces. Must be fully dislodged for an out — a shaved bail that stays put is not out.", shape: { kind: "rect", x: 26, y: 16, w: 48, h: 6 } },
      { id: "base", label: "Base in the ground", description: "Stumps are driven so the tops sit 28 inches (71 cm) above the playing surface — the standard hit-wicket height.", shape: { kind: "rect", x: 26, y: 80, w: 48, h: 6 } },
    ],
  },
  fielding: {
    title: "Field Placement Map",
    caption: "Tap a position to see what it covers.",
    background: (
      <>
        <ellipse cx="50" cy="50" rx="48" ry="46" fill="#1f6b3a" />
        <ellipse cx="50" cy="50" rx="22" ry="20" fill="none" stroke="#fff" strokeWidth="0.25" strokeDasharray="1 1" />
        <rect x="47" y="38" width="6" height="24" fill="#c9a87a" />
      </>
    ),
    hotspots: [
      { id: "slip", label: "Slips", description: "Stand behind the batter on the off side, catching edges from quick bowling. First slip is the wicketkeeper's twin.", shape: { kind: "circle", cx: 60, cy: 30, r: 4 } },
      { id: "point", label: "Point", description: "Square on the off side, ~15 m out. Cuts off square drives and cuts; saves a single but can also dive for catches.", shape: { kind: "circle", cx: 72, cy: 50, r: 4 } },
      { id: "mid-off", label: "Mid-off", description: "Straight on the off side. Stops the drive and is often where the captain stands to chat with the bowler.", shape: { kind: "circle", cx: 56, cy: 28, r: 4 } },
      { id: "mid-on", label: "Mid-on", description: "Mirror of mid-off on the leg side. Blocks the on-drive and the flick.", shape: { kind: "circle", cx: 44, cy: 28, r: 4 } },
      { id: "square-leg", label: "Square leg", description: "Square on the leg side. Catches pulls and hooks; also the umpire's secondary position for stumpings.", shape: { kind: "circle", cx: 28, cy: 50, r: 4 } },
      { id: "fine-leg", label: "Fine leg", description: "Deep behind square on the leg side. Saves boundaries from glances and top edges off short balls.", shape: { kind: "circle", cx: 22, cy: 72, r: 4 } },
      { id: "third-man", label: "Third man", description: "Deep behind square on the off side. Covers thick edges and ramps — almost mandatory in T20.", shape: { kind: "circle", cx: 78, cy: 72, r: 4 } },
    ],
  },
};

// Map topic slugs to a diagram.
export const TOPIC_DIAGRAMS: Record<string, DiagramKind> = {
  "cricket-ground": "ground",
  "the-pitch": "pitch",
  "cricket-ball": "ball",
  "cricket-bat": "bat",
  "wickets-and-stumps": "wickets",
  fielding: "fielding",
  wicketkeeping: "wickets",
  // bowling topics use the ball diagram
  "leg-break": "ball",
  "off-break": "ball",
  doosra: "ball",
  yorker: "pitch",
  "reverse-swing": "ball",
};

export function TopicHotspotDiagram({ kind }: { kind: DiagramKind }) {
  const diagram = DIAGRAMS[kind];
  const [active, setActive] = useState<string | null>(null);
  const activeHotspot = diagram.hotspots.find(h => h.id === active);

  return (
    <section className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <MousePointerClick className="size-3.5" /> Interactive diagram
          </div>
          <h3 className="mt-1 font-display text-lg font-bold text-foreground">
            {diagram.title}
          </h3>
          <p className="text-xs text-muted-foreground">{diagram.caption}</p>
        </div>
        {active && (
          <button
            onClick={() => setActive(null)}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="size-3" /> Clear
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <svg
            viewBox="0 0 100 100"
            className="block h-auto w-full"
            role="img"
            aria-label={diagram.title}
          >
            {diagram.background}
            {diagram.hotspots.map(h => {
              const isActive = h.id === active;
              const common = {
                onClick: () => setActive(h.id),
                className:
                  "cursor-pointer transition-opacity focus:outline-none",
                style: {
                  fill: isActive ? "#ff7a1a" : "#ffffff",
                  fillOpacity: isActive ? 0.55 : 0.0,
                  stroke: isActive ? "#ff7a1a" : "#ffffff",
                  strokeOpacity: isActive ? 1 : 0.55,
                  strokeWidth: isActive ? 0.8 : 0.4,
                  strokeDasharray: isActive ? undefined : "0.8 0.8",
                },
              } as const;
              return h.shape.kind === "circle" ? (
                <circle
                  key={h.id}
                  cx={h.shape.cx}
                  cy={h.shape.cy}
                  r={h.shape.r}
                  {...common}
                >
                  <title>{h.label}</title>
                </circle>
              ) : (
                <rect
                  key={h.id}
                  x={h.shape.x}
                  y={h.shape.y}
                  width={h.shape.w}
                  height={h.shape.h}
                  {...common}
                >
                  <title>{h.label}</title>
                </rect>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-card p-3 min-h-[120px]">
            {activeHotspot ? (
              <>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                  Selected
                </div>
                <div className="mt-1 font-display text-base font-bold text-foreground">
                  {activeHotspot.label}
                </div>
                <p className="mt-2 text-sm text-foreground/85">
                  {activeHotspot.description}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tap any highlighted region on the diagram to read what it does.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {diagram.hotspots.map(h => (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                  h.id === active
                    ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)] text-white"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
