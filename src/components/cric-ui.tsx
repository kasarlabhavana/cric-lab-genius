import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { Module } from "@/lib/modules";
import { useUser } from "@/lib/user-state";

export function ModuleCard({ module: m }: { module: Module }) {
  const Icon = (Icons as any)[m.icon] ?? Icons.BookOpen;
  const { moduleProgress } = useUser();
  const p = moduleProgress(m.slug);
  return (
    <Link
      to="/explore/$module"
      params={{ module: m.slug }}
      className={`card-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-5 bg-gradient-to-br ${m.tint}`}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
          <Icon className="size-5" />
        </span>
        {p.total > 0 && (
          <div className="text-xs text-muted-foreground font-medium">{p.done}/{p.total}</div>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{m.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{m.tagline}</p>
      <div className="mt-4 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-[color:var(--brand-green)] transition-all" style={{ width: `${p.pct * 100}%` }} />
      </div>
    </Link>
  );
}

export function ProgressRing({ value, size = 80, strokeWidth = 8, label }: { value: number; size?: number; strokeWidth?: number; label?: string }) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value)));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="var(--brand-green)" strokeWidth={strokeWidth} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-base font-bold text-primary">{Math.round(value * 100)}%</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}

export function Diagram({ kind }: { kind: "trajectory" | "pitch" | "force" | "swing" }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <svg viewBox="0 0 400 200" className="w-full h-auto">
        {kind === "trajectory" && <Trajectory />}
        {kind === "pitch" && <PitchDiagram />}
        {kind === "force" && <ForceDiagram />}
        {kind === "swing" && <SwingDiagram />}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground text-center">Illustrative — not to scale</p>
    </div>
  );
}

function Trajectory() {
  const navy = "var(--primary)";
  const orange = "var(--brand-orange)";
  return (
    <g fill="none" strokeWidth="2.5">
      <line x1="20" y1="170" x2="380" y2="170" stroke={navy} strokeOpacity="0.3" />
      <circle cx="40" cy="150" r="6" fill={navy} stroke="none" />
      <path d="M 40 150 Q 200 60 360 165" stroke={orange} />
      <path d="M 40 150 Q 200 110 360 170" stroke={navy} />
      <path d="M 40 150 Q 200 150 360 170" stroke="var(--brand-green)" />
      <text x="50" y="140" fontSize="10" fill={navy}>Release</text>
      <text x="200" y="55" fontSize="10" fill={orange}>Bouncer</text>
      <text x="200" y="105" fontSize="10" fill={navy}>Good length</text>
      <text x="200" y="145" fontSize="10" fill="var(--brand-green)">Yorker</text>
      <rect x="355" y="140" width="6" height="30" fill={navy} />
    </g>
  );
}

function PitchDiagram() {
  return (
    <g>
      <rect x="20" y="20" width="360" height="160" rx="6" fill="var(--surface-strong)" stroke="var(--primary)" strokeOpacity="0.3" />
      <rect x="180" y="20" width="40" height="160" fill="var(--brand-orange)" fillOpacity="0.15" />
      <rect x="20" y="20" width="120" height="160" fill="var(--brand-green)" fillOpacity="0.1" />
      <rect x="260" y="20" width="120" height="160" fill="var(--brand-green)" fillOpacity="0.1" />
      <text x="200" y="195" fontSize="10" textAnchor="middle" fill="var(--muted-foreground)">Length zones across the pitch</text>
      <text x="80" y="105" fontSize="10" textAnchor="middle" fill="var(--primary)">Good length</text>
      <text x="200" y="105" fontSize="10" textAnchor="middle" fill="var(--brand-orange)">Yorker zone</text>
      <text x="320" y="105" fontSize="10" textAnchor="middle" fill="var(--primary)">Short</text>
    </g>
  );
}

function ForceDiagram() {
  return (
    <g stroke="var(--primary)" fill="none" strokeWidth="2">
      <line x1="60" y1="180" x2="60" y2="40" />
      <line x1="60" y1="40" x2="180" y2="60" />
      <line x1="180" y1="60" x2="320" y2="120" />
      <circle cx="320" cy="120" r="6" fill="var(--brand-orange)" stroke="none" />
      <path d="M60 180 v-20" stroke="var(--brand-green)" strokeWidth="3" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--brand-green)" />
        </marker>
      </defs>
      <text x="20" y="195" fontSize="10" fill="var(--brand-green)">Ground force</text>
      <text x="200" y="40" fontSize="10" fill="var(--primary)">Kinetic chain</text>
      <text x="280" y="145" fontSize="10" fill="var(--brand-orange)">Release</text>
    </g>
  );
}

function SwingDiagram() {
  return (
    <g>
      <circle cx="120" cy="100" r="40" fill="var(--surface-strong)" stroke="var(--primary)" />
      <path d="M120 60 A40 40 0 0 1 120 140" stroke="var(--primary)" strokeWidth="3" fill="none" />
      <text x="80" y="95" fontSize="10" fill="var(--primary)">Rough</text>
      <text x="135" y="95" fontSize="10" fill="var(--muted-foreground)">Shiny</text>
      <path d="M180 100 Q 270 70 360 100" stroke="var(--brand-orange)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow2)" />
      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--brand-orange)" />
        </marker>
      </defs>
      <text x="240" y="60" fontSize="10" fill="var(--brand-orange)">Swing direction</text>
    </g>
  );
}
