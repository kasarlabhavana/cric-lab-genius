import type { ReactNode } from "react";

export type ImageViewKind =
  | "front-view"
  | "side-view"
  | "top-view"
  | "finger-closeup"
  | "wrist-closeup"
  | "seam-position"
  | "trajectory"
  | "physics"
  | "aerodynamics"
  | "field-placement";

export const IMAGE_VIEW_LABELS: Record<ImageViewKind, string> = {
  "front-view": "Front View",
  "side-view": "Side View",
  "top-view": "Top View",
  "finger-closeup": "Finger Closeup",
  "wrist-closeup": "Wrist Closeup",
  "seam-position": "Seam Position",
  "trajectory": "Trajectory Diagram",
  "physics": "Physics Diagram",
  "aerodynamics": "Aerodynamics Diagram",
  "field-placement": "Field Placement Diagram",
};

export const TOPIC_IMAGE_VIEWS: ImageViewKind[] = [
  "front-view", "side-view", "top-view",
  "finger-closeup", "wrist-closeup", "seam-position",
  "trajectory", "physics", "aerodynamics", "field-placement",
];

/**
 * 16:9 SVG placeholder system. Each view kind renders a distinct schematic
 * illustration (no raster images, scales perfectly, themeable via currentColor
 * and brand CSS variables). Pass a `topic` string for the watermark caption.
 */
export function TopicImagePlaceholder({
  view,
  topic,
  className,
}: {
  view: ImageViewKind;
  topic?: string;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${className ?? ""}`}>
      <div className="relative aspect-[16/9] w-full">
        <svg viewBox="0 0 1600 900" className="absolute inset-0 size-full" role="img" aria-label={`${topic ?? "Topic"} — ${IMAGE_VIEW_LABELS[view]}`}>
          <defs>
            <pattern id={`grid-${view}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
            </pattern>
            <linearGradient id={`bg-${view}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--surface)" />
              <stop offset="100%" stopColor="var(--surface-strong)" />
            </linearGradient>
          </defs>
          <rect width="1600" height="900" fill={`url(#bg-${view})`} />
          <rect width="1600" height="900" fill={`url(#grid-${view})`} className="text-foreground" />
          {renderViewArtwork(view)}
        </svg>

        {/* Top-left view badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-card/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
          <span className="inline-block size-1.5 rounded-full bg-[color:var(--brand-orange)]" />
          {IMAGE_VIEW_LABELS[view]}
        </div>
        {/* Bottom-right topic */}
        {topic && (
          <div className="absolute right-3 bottom-3 rounded-md bg-card/85 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
            {topic}
          </div>
        )}
        {/* Corner ticks */}
        <CornerTicks />
      </div>
    </figure>
  );
}

function CornerTicks() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full text-foreground/30">
      {[
        "M0 24 L0 0 L24 0",
        "M1600 24 L1600 0 L1576 0",
        "M0 876 L0 900 L24 900",
        "M1600 876 L1600 900 L1576 900",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="2" />
      ))}
    </svg>
  );
}

function renderViewArtwork(view: ImageViewKind): ReactNode {
  switch (view) {
    case "front-view": return <FrontView />;
    case "side-view": return <SideView />;
    case "top-view": return <TopView />;
    case "finger-closeup": return <FingerCloseup />;
    case "wrist-closeup": return <WristCloseup />;
    case "seam-position": return <SeamPosition />;
    case "trajectory": return <Trajectory />;
    case "physics": return <Physics />;
    case "aerodynamics": return <Aerodynamics />;
    case "field-placement": return <FieldPlacement />;
  }
}

/* ---------- Individual view artworks (all 1600x900) ---------- */

const ORANGE = "var(--brand-orange)";
const GREEN = "var(--brand-green)";

function FrontView() {
  // Stylised player silhouette, facing the viewer
  return (
    <g>
      <line x1="200" y1="780" x2="1400" y2="780" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 6" />
      <g transform="translate(800 760)">
        <ellipse cx="0" cy="0" rx="140" ry="14" fill="currentColor" fillOpacity="0.1" />
        {/* body */}
        <rect x="-55" y="-380" width="110" height="220" rx="22" fill="var(--primary)" />
        {/* head */}
        <circle cx="0" cy="-440" r="55" fill="var(--primary)" />
        {/* arms */}
        <rect x="-130" y="-360" width="40" height="180" rx="16" fill="var(--primary)" />
        <rect x="90" y="-360" width="40" height="180" rx="16" fill="var(--primary)" />
        {/* legs */}
        <rect x="-50" y="-160" width="38" height="160" rx="14" fill="var(--primary)" />
        <rect x="12" y="-160" width="38" height="160" rx="14" fill="var(--primary)" />
        {/* ball */}
        <circle cx="-150" cy="-180" r="18" fill={ORANGE} />
      </g>
      <Caption text="FRONT" />
    </g>
  );
}

function SideView() {
  return (
    <g>
      <line x1="200" y1="780" x2="1400" y2="780" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 6" />
      <g transform="translate(700 760)">
        {/* torso angled */}
        <path d="M -20 -380 L 60 -370 L 80 -180 L -10 -180 Z" fill="var(--primary)" />
        <circle cx="20" cy="-430" r="48" fill="var(--primary)" />
        {/* bowling arm extended forward */}
        <path d="M 30 -360 Q 220 -420 320 -300" stroke="var(--primary)" strokeWidth="36" fill="none" strokeLinecap="round" />
        {/* front leg stride */}
        <path d="M 50 -180 L 240 -10" stroke="var(--primary)" strokeWidth="36" fill="none" strokeLinecap="round" />
        <path d="M -10 -180 L -60 -10" stroke="var(--primary)" strokeWidth="36" fill="none" strokeLinecap="round" />
        {/* ball trajectory hint */}
        <circle cx="340" cy="-300" r="16" fill={ORANGE} />
        <path d="M 340 -300 Q 600 -420 900 -240" stroke={ORANGE} strokeWidth="3" strokeDasharray="4 6" fill="none" />
      </g>
      <Caption text="SIDE" />
    </g>
  );
}

function TopView() {
  return (
    <g>
      {/* Pitch from above */}
      <rect x="600" y="100" width="400" height="700" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.25" />
      <rect x="600" y="170" width="400" height="60" fill="currentColor" fillOpacity="0.05" />
      <rect x="600" y="670" width="400" height="60" fill="currentColor" fillOpacity="0.05" />
      {/* creases */}
      {[170, 230, 670, 730].map(y => (
        <line key={y} x1="600" y1={y} x2="1000" y2={y} stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      ))}
      {/* stumps */}
      <g fill={ORANGE}>
        {[680, 720, 760].map((x, i) => <rect key={i} x={x - 3} y="170" width="6" height="20" rx="2" />)}
        {[680, 720, 760].map((x, i) => <rect key={i} x={x - 3} y="730" width="6" height="20" rx="2" />)}
      </g>
      <circle cx="720" cy="200" r="10" fill={ORANGE} />
      {/* trajectory */}
      <path d="M 720 720 Q 740 450 720 200" stroke={GREEN} strokeWidth="3" strokeDasharray="6 8" fill="none" />
      {/* compass */}
      <g transform="translate(1380 130)" stroke="currentColor" strokeOpacity="0.6" fill="none">
        <circle r="36" />
        <path d="M0 -28 L8 0 L0 6 L-8 0 Z" fill="currentColor" />
        <text x="0" y="-46" textAnchor="middle" fontSize="14" fill="currentColor" fontFamily="ui-sans-serif">N</text>
      </g>
      <Caption text="TOP" />
    </g>
  );
}

function FingerCloseup() {
  return (
    <g>
      {/* Hand outline holding a ball */}
      <g transform="translate(800 470)">
        {/* palm */}
        <path d="M -260 80 Q -300 -120 -120 -180 L 200 -200 Q 320 -160 280 60 Q 240 220 0 240 Q -220 240 -260 80 Z" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        {/* fingers */}
        {[-180, -90, 0, 90].map((x, i) => (
          <rect key={i} x={x - 22} y="-300" width="44" height="160" rx="20" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        ))}
        {/* thumb */}
        <rect x="200" y="-160" width="120" height="50" rx="22" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" transform="rotate(35 260 -130)" />
        {/* ball */}
        <circle cx="-30" cy="-60" r="110" fill={ORANGE} opacity="0.92" />
        <path d="M -135 -60 Q -30 -100 75 -60" stroke="white" strokeWidth="4" fill="none" />
        <path d="M -135 -60 Q -30 -20 75 -60" stroke="white" strokeWidth="4" fill="none" />
        {/* grip annotations */}
        <g stroke={GREEN} strokeWidth="2" fill={GREEN} fontFamily="ui-monospace" fontSize="20">
          <circle cx="-180" cy="-140" r="6" />
          <text x="-220" y="-160">F1</text>
          <circle cx="-90" cy="-140" r="6" />
          <text x="-110" y="-160">F2</text>
          <circle cx="0" cy="-140" r="6" />
          <text x="-12" y="-160">F3</text>
        </g>
      </g>
      <Caption text="FINGERS" />
    </g>
  );
}

function WristCloseup() {
  return (
    <g>
      {/* Forearm + wrist with rotation arc */}
      <g transform="translate(800 470)">
        <rect x="-360" y="-60" width="520" height="180" rx="40" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        <rect x="160" y="-100" width="200" height="240" rx="50" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" />
        {/* rotation arc */}
        <path d="M 260 -220 A 220 220 0 0 1 480 0" stroke={ORANGE} strokeWidth="4" fill="none" strokeDasharray="2 8" />
        <path d="M 470 -10 L 488 6 L 470 22" stroke={ORANGE} strokeWidth="4" fill="none" />
        <text x="320" y="-240" fill={ORANGE} fontFamily="ui-monospace" fontSize="22">ω</text>
        {/* ball */}
        <circle cx="320" cy="20" r="50" fill={ORANGE} />
        <line x1="270" y1="20" x2="370" y2="20" stroke="white" strokeWidth="3" />
        {/* axis line */}
        <line x1="-360" y1="30" x2="160" y2="30" stroke={GREEN} strokeWidth="2" strokeDasharray="4 6" />
        <text x="-300" y="20" fontSize="18" fill={GREEN} fontFamily="ui-monospace">axis</text>
      </g>
      <Caption text="WRIST" />
    </g>
  );
}

function SeamPosition() {
  return (
    <g>
      {/* Large cricket ball with seam at angle + angle markers */}
      <g transform="translate(800 450)">
        <circle r="260" fill={ORANGE} />
        <circle r="260" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
        {/* seam */}
        <g transform="rotate(-22)">
          <ellipse rx="260" ry="14" fill="none" stroke="white" strokeWidth="6" />
          {Array.from({ length: 22 }).map((_, i) => {
            const x = -250 + (i * 500) / 21;
            return <line key={i} x1={x} y1="-12" x2={x} y2="12" stroke="white" strokeWidth="3" />;
          })}
        </g>
        {/* axis arrow */}
        <line x1="-300" y1="0" x2="300" y2="0" stroke={GREEN} strokeWidth="2" strokeDasharray="4 6" />
        <text x="-280" y="-10" fontSize="20" fill={GREEN} fontFamily="ui-monospace">flight</text>
        {/* angle */}
        <path d="M 0 0 L 160 0 A 160 160 0 0 0 148 -65" stroke="white" strokeWidth="3" fill="none" />
        <text x="170" y="-30" fill="white" fontFamily="ui-monospace" fontSize="22">22°</text>
      </g>
      <Caption text="SEAM" />
    </g>
  );
}

function Trajectory() {
  return (
    <g>
      <line x1="120" y1="720" x2="1480" y2="720" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      {/* bowler & batsman markers */}
      <g transform="translate(200 720)">
        <rect x="-14" y="-90" width="28" height="90" rx="6" fill="var(--primary)" />
        <circle cy="-110" r="18" fill="var(--primary)" />
      </g>
      <g transform="translate(1400 720)">
        <rect x="-14" y="-90" width="28" height="90" rx="6" fill="var(--primary)" />
        <circle cy="-110" r="18" fill="var(--primary)" />
      </g>
      {/* trajectory arcs */}
      <path d="M 220 620 Q 700 250 900 660 L 1380 660" stroke={ORANGE} strokeWidth="4" fill="none" />
      <path d="M 220 620 Q 700 350 900 700 L 1380 700" stroke={GREEN} strokeWidth="3" strokeDasharray="6 8" fill="none" />
      {/* pitch point */}
      <circle cx="900" cy="700" r="10" fill={ORANGE} />
      <text x="900" y="752" textAnchor="middle" fontFamily="ui-monospace" fontSize="18" fill={ORANGE}>pitch</text>
      {/* axes labels */}
      <text x="120" y="120" fontFamily="ui-monospace" fontSize="20" fill="currentColor" fillOpacity="0.6">height</text>
      <text x="1380" y="780" textAnchor="end" fontFamily="ui-monospace" fontSize="20" fill="currentColor" fillOpacity="0.6">22 yd</text>
      <Caption text="TRAJECTORY" />
    </g>
  );
}

function Physics() {
  return (
    <g>
      {/* Free body diagram of a ball */}
      <g transform="translate(800 470)">
        <circle r="90" fill={ORANGE} />
        <line x1="-60" y1="0" x2="60" y2="0" stroke="white" strokeWidth="3" />
        {/* Velocity */}
        <ArrowVec x1={0} y1={0} x2={280} y2={-40} color={GREEN} label="v" />
        {/* Drag opposite */}
        <ArrowVec x1={0} y1={0} x2={-200} y2={28} color="currentColor" label="F_d" />
        {/* Gravity down */}
        <ArrowVec x1={0} y1={0} x2={0} y2={220} color="currentColor" label="mg" />
        {/* Magnus */}
        <ArrowVec x1={0} y1={0} x2={120} y2={-200} color={ORANGE} label="F_m" />
        {/* spin omega */}
        <circle r="120" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 6" />
        <text x="-150" y="-130" fill="currentColor" fontFamily="ui-monospace" fontSize="22">ω</text>
      </g>
      <Caption text="PHYSICS" />
    </g>
  );
}

function Aerodynamics() {
  return (
    <g>
      {/* Streamlines around a ball */}
      <g transform="translate(900 450)">
        {Array.from({ length: 9 }).map((_, i) => {
          const y = -240 + i * 60;
          const bend = 80 - Math.abs(y) * 0.18;
          return (
            <path
              key={i}
              d={`M -640 ${y} Q -120 ${y} 0 ${y - bend} Q 120 ${y - bend} 540 ${y}`}
              stroke={i % 2 === 0 ? GREEN : "currentColor"}
              strokeOpacity={i % 2 === 0 ? 0.9 : 0.4}
              strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
              fill="none"
            />
          );
        })}
        {/* Ball */}
        <circle r="80" fill={ORANGE} />
        <path d="M -80 0 Q 0 -22 80 0" stroke="white" strokeWidth="3" fill="none" />
        {/* boundary layer separation marker */}
        <circle cx="50" cy="-70" r="10" fill="none" stroke="white" strokeWidth="2" />
        <text x="70" y="-72" fill="white" fontFamily="ui-monospace" fontSize="18">sep.</text>
        {/* arrows on flow direction */}
        <ArrowVec x1={-640} y1={-280} x2={-540} y2={-280} color="currentColor" label="U∞" />
      </g>
      <Caption text="AERO" />
    </g>
  );
}

function FieldPlacement() {
  return (
    <g>
      {/* Cricket field oval, top-down */}
      <ellipse cx="800" cy="450" rx="640" ry="380" fill={GREEN} fillOpacity="0.18" stroke={GREEN} strokeWidth="3" />
      <ellipse cx="800" cy="450" rx="320" ry="190" fill="none" stroke={GREEN} strokeOpacity="0.5" strokeDasharray="4 8" strokeWidth="2" />
      {/* pitch */}
      <rect x="770" y="370" width="60" height="160" fill="var(--surface-strong)" stroke="currentColor" strokeOpacity="0.4" />
      {/* batsman + bowler dots */}
      <circle cx="800" cy="380" r="10" fill="var(--primary)" />
      <circle cx="800" cy="520" r="10" fill="var(--primary)" />
      {/* fielder positions */}
      {[
        [800, 200], [560, 290], [1040, 290], // slip / mid-off / mid-on
        [400, 450], [1200, 450],             // square leg / point
        [560, 620], [1040, 620],             // mid-wicket / cover
        [800, 730], [320, 700], [1280, 700], // long-on / deep mid / deep cover
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill={ORANGE} />
          <text x={x} y={y + 5} textAnchor="middle" fontFamily="ui-monospace" fontSize="14" fill="white">{i + 1}</text>
        </g>
      ))}
      <Caption text="FIELD" />
    </g>
  );
}

function ArrowVec({ x1, y1, x2, y2, color, label }: { x1: number; y1: number; x2: number; y2: number; color: string; label: string }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const hx = x2 - ux * 18, hy = y2 - uy * 18;
  const px = -uy * 9, py = ux * 9;
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${hx + px},${hy + py} ${hx - px},${hy - py}`} />
      <text x={x2 + ux * 18 + 6} y={y2 + uy * 18 + 6} fontFamily="ui-monospace" fontSize="22" stroke="none">{label}</text>
    </g>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <text
      x="800" y="860"
      textAnchor="middle"
      fontFamily="ui-monospace"
      fontSize="18"
      fill="currentColor"
      fillOpacity="0.35"
      letterSpacing="6"
    >
      {text}
    </text>
  );
}

/** Convenience grid that renders all ten views for a topic. */
export function TopicImageGallery({ topic }: { topic: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TOPIC_IMAGE_VIEWS.map(v => (
        <TopicImagePlaceholder key={v} view={v} topic={topic} />
      ))}
    </div>
  );
}
