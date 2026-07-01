import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Target, Swords, Hand, Shield, Wrench, LayoutGrid, CircleDot, CloudSun, Dumbbell, Scale,
  Atom, Activity, Brain, Network, Search, X,
} from "lucide-react";
import { GLOSSARY } from "@/lib/glossary";

export const Route = createFileRoute("/knowledge-graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph — CricScience" },
      { name: "description", content: "Explore cricket terms and how they connect. Click any node to jump to its lesson or glossary entry." },
    ],
  }),
  component: KnowledgeGraphPage,
});

type Hub = {
  slug: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  keywords: string[];
};

const HUBS: Hub[] = [
  { slug: "bowling-science", title: "Bowling", icon: Target, color: "#f97316",
    keywords: ["yorker","bouncer","bumper","beamer","full toss","half-volley","good length","short ball","googly","wrong'un","doosra","teesra","carrom","carrom ball","chinaman","flipper","off-spin","off-break","leg-spin","leg-break","top-spin","back-spin","swing","reverse swing","outswing","inswing","seam","cutter","knuckle ball","no-ball","wide","over"] },
  { slug: "batting-science", title: "Batting", icon: Swords, color: "#ef4444",
    keywords: ["free hit","powerplay","half-volley","full toss","short ball","good length"] },
  { slug: "fielding-science", title: "Fielding", icon: Hand, color: "#22c55e",
    keywords: ["slip","gully","point","square leg","fine leg"] },
  { slug: "wicketkeeping-science", title: "Keeping", icon: Shield, color: "#14b8a6",
    keywords: ["stumps","bails","stumping"] },
  { slug: "pitch-science", title: "Pitch", icon: LayoutGrid, color: "#a3a3a3",
    keywords: ["pitch","crease","wicket"] },
  { slug: "ball-science", title: "Ball", icon: CircleDot, color: "#dc2626",
    keywords: ["seam","swing","reverse swing"] },
  { slug: "equipment-science", title: "Equipment", icon: Wrench, color: "#8b5cf6",
    keywords: ["bails","stumps"] },
  { slug: "environment-science", title: "Environment", icon: CloudSun, color: "#38bdf8",
    keywords: ["swing","reverse swing"] },
  { slug: "fitness-science", title: "Fitness", icon: Dumbbell, color: "#06b6d4",
    keywords: [] },
  { slug: "umpiring-science", title: "Umpiring", icon: Scale, color: "#64748b",
    keywords: ["no-ball","wide","lbw","free hit"] },
  { slug: "physics-science", title: "Physics", icon: Atom, color: "#3b82f6",
    keywords: ["swing","reverse swing","googly","doosra","top-spin","back-spin","seam"] },
  { slug: "biomechanics-science", title: "Biomechanics", icon: Activity, color: "#10b981",
    keywords: [] },
  { slug: "mental-science", title: "Mental", icon: Brain, color: "#ec4899",
    keywords: [] },
];

const termAnchor = (t: string) => "term-" + t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function KnowledgeGraphPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  const terms = useMemo(() => Object.keys(GLOSSARY), []);

  // Build layout: hubs in inner ring, terms clustered around their hub in outer arcs.
  const layout = useMemo(() => {
    const W = 1000, H = 1000;
    const cx = W / 2, cy = H / 2;
    const hubR = 240;
    const termR = 430;

    const hubPos = HUBS.map((h, i) => {
      const a = (i / HUBS.length) * Math.PI * 2 - Math.PI / 2;
      return { ...h, x: cx + Math.cos(a) * hubR, y: cy + Math.sin(a) * hubR, angle: a };
    });

    // Assign each term to its first-matching hub.
    const termNodes: {
      term: string; x: number; y: number; hubs: string[];
    }[] = [];

    // For distribution: group terms per hub
    const perHub: Record<string, string[]> = {};
    hubPos.forEach((h) => (perHub[h.slug] = []));
    const assigned = new Set<string>();

    // Greedy: for each term, find hubs that reference it (all matches -> edges to all).
    terms.forEach((t) => {
      const matches = hubPos.filter((h) => h.keywords.includes(t));
      if (matches.length === 0) return;
      // Primary hub = the one with fewest terms so far (better spread).
      matches.sort((a, b) => perHub[a.slug].length - perHub[b.slug].length);
      perHub[matches[0].slug].push(t);
      assigned.add(t);
    });

    hubPos.forEach((h) => {
      const list = perHub[h.slug];
      const n = list.length;
      if (n === 0) return;
      // Fan terms in an arc around this hub, facing outward.
      const spread = Math.min(Math.PI / 3.5, 0.35 + n * 0.05);
      list.forEach((t, i) => {
        const rel = n === 1 ? 0 : (i / (n - 1) - 0.5) * spread;
        const a = h.angle + rel;
        const r = termR + ((i % 3) - 1) * 22;
        termNodes.push({
          term: t,
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          hubs: HUBS.filter((hh) => hh.keywords.includes(t)).map((hh) => hh.slug),
        });
      });
    });

    return { W, H, cx, cy, hubPos, termNodes };
  }, [terms]);

  const filteredTerms = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return new Set(layout.termNodes.filter((t) => t.term.includes(q) || GLOSSARY[t.term]?.toLowerCase().includes(q)).map((t) => t.term));
  }, [query, layout.termNodes]);

  const isDimmed = (opts: { hubSlug?: string; term?: string }) => {
    if (query.trim()) {
      if (opts.term) return !filteredTerms?.has(opts.term);
      if (opts.hubSlug) {
        // Hub visible if it has any matching term
        return !layout.termNodes.some((t) => t.hubs.includes(opts.hubSlug!) && filteredTerms?.has(t.term));
      }
    }
    if (active) {
      if (opts.hubSlug) return opts.hubSlug !== active;
      if (opts.term) {
        const node = layout.termNodes.find((t) => t.term === opts.term);
        return !node?.hubs.includes(active);
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-[oklch(0.2_0.05_260)] via-[oklch(0.18_0.06_230)] to-[oklch(0.15_0.05_200)]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-white">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
            <Network className="size-3.5" /> Knowledge Graph
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">The map of cricket knowledge</h1>
          <p className="mt-2 max-w-2xl text-white/80">Thirteen sciences at the core, ringed by the terms that live inside them. Click a term to read its definition — click a science to explore its lessons.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search terms…"
                className="rounded-xl border border-white/25 bg-white/10 py-2 pl-9 pr-9 text-sm text-white placeholder:text-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              {query && (
                <button aria-label="Clear" onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 hover:bg-white/10">
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            {active && (
              <button onClick={() => setActive(null)} className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/20">
                Clear focus
              </button>
            )}
            <div className="text-xs text-white/60">
              {layout.termNodes.length} terms · {HUBS.length} sciences
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="mx-auto max-w-6xl px-2 sm:px-6 py-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.98_0.005_260)] to-[oklch(0.94_0.02_240)] dark:from-[oklch(0.18_0.02_260)] dark:to-[oklch(0.14_0.03_240)] shadow-inner">
          <svg viewBox={`0 0 ${layout.W} ${layout.H}`} className="w-full h-auto" role="img" aria-label="Knowledge graph">
            <defs>
              <radialGradient id="bg-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              {HUBS.map((h) => (
                <radialGradient key={h.slug} id={`hub-${h.slug}`} cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor={h.color} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={h.color} stopOpacity="0.6" />
                </radialGradient>
              ))}
            </defs>

            {/* background glow */}
            <circle cx={layout.cx} cy={layout.cy} r={470} fill="url(#bg-glow)" />

            {/* concentric guides */}
            {[180, 300, 430].map((r) => (
              <circle key={r} cx={layout.cx} cy={layout.cy} r={r} fill="none" stroke="currentColor" strokeOpacity="0.06" strokeDasharray="3 6" />
            ))}

            {/* center label */}
            <g>
              <circle cx={layout.cx} cy={layout.cy} r={70} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.12" />
              <text x={layout.cx} y={layout.cy - 4} textAnchor="middle" className="fill-current" fontSize="18" fontWeight="700">CRICKET</text>
              <text x={layout.cx} y={layout.cy + 16} textAnchor="middle" className="fill-current" fontSize="10" opacity="0.6">KNOWLEDGE</text>
            </g>

            {/* edges */}
            {layout.termNodes.map((t) => {
              const dim = isDimmed({ term: t.term });
              return t.hubs.map((hs) => {
                const h = layout.hubPos.find((x) => x.slug === hs)!;
                const highlight = active === hs || hover === t.term;
                return (
                  <line
                    key={`${t.term}-${hs}`}
                    x1={h.x} y1={h.y} x2={t.x} y2={t.y}
                    stroke={h.color}
                    strokeOpacity={dim ? 0.05 : highlight ? 0.6 : 0.18}
                    strokeWidth={highlight ? 1.6 : 0.8}
                  />
                );
              });
            })}

            {/* term nodes */}
            {layout.termNodes.map((t) => {
              const dim = isDimmed({ term: t.term });
              const primary = layout.hubPos.find((h) => h.slug === t.hubs[0])!;
              const isHover = hover === t.term;
              return (
                <motion.g
                  key={t.term}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: dim ? 0.15 : 1, scale: isHover ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{ cursor: "pointer", transformOrigin: `${t.x}px ${t.y}px` }}
                  onMouseEnter={() => setHover(t.term)}
                  onMouseLeave={() => setHover((v) => (v === t.term ? null : v))}
                  onClick={() => navigate({ to: "/glossary", hash: termAnchor(t.term) })}
                >
                  <circle cx={t.x} cy={t.y} r={isHover ? 8 : 5} fill={primary.color} stroke="white" strokeWidth={1.5} />
                  <text
                    x={t.x} y={t.y - 12}
                    textAnchor="middle" fontSize="11" fontWeight={600}
                    className="fill-current pointer-events-none select-none"
                    style={{ paintOrder: "stroke", stroke: "var(--background, white)", strokeWidth: 3, strokeLinejoin: "round" }}
                  >
                    {t.term}
                  </text>
                </motion.g>
              );
            })}

            {/* hub nodes on top */}
            {layout.hubPos.map((h) => {
              const dim = isDimmed({ hubSlug: h.slug });
              const isActive = active === h.slug;
              return (
                <motion.g
                  key={h.slug}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: dim ? 0.25 : 1, scale: isActive ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ cursor: "pointer", transformOrigin: `${h.x}px ${h.y}px` }}
                  onClick={() => setActive((v) => (v === h.slug ? null : h.slug))}
                  onDoubleClick={() => navigate({ to: "/explore/$module", params: { module: h.slug } })}
                >
                  <circle cx={h.x} cy={h.y} r={40} fill={`url(#hub-${h.slug})`} stroke="white" strokeWidth={3} />
                  <text x={h.x} y={h.y + 4} textAnchor="middle" fontSize="13" fontWeight={800} fill="white" className="select-none pointer-events-none">
                    {h.title}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Hover / focus panel */}
          {(hover || active) && (
            <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-4 sm:max-w-sm rounded-xl border border-border bg-card/95 backdrop-blur p-4 shadow-lg">
              {hover ? (
                <>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Term</div>
                  <div className="mt-0.5 font-display text-lg font-bold text-foreground capitalize">{hover}</div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{GLOSSARY[hover]}</p>
                  <Link to="/glossary" hash={termAnchor(hover)} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-orange)] hover:underline">
                    Open glossary entry →
                  </Link>
                </>
              ) : active ? (
                <>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Science</div>
                  <div className="mt-0.5 font-display text-lg font-bold text-foreground">{HUBS.find((h) => h.slug === active)?.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Related terms are highlighted. Double-click the hub, or open lessons below.</p>
                  <Link to="/explore/$module" params={{ module: active }} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-orange)] hover:underline">
                    Explore lessons →
                  </Link>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-2">
          {HUBS.map((h) => {
            const Icon = h.icon;
            return (
              <button
                key={h.slug}
                onClick={() => setActive((v) => (v === h.slug ? null : h.slug))}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  active === h.slug ? "text-white border-transparent" : "text-foreground bg-card border-border hover:border-foreground/30"
                }`}
                style={active === h.slug ? { background: h.color } : { color: h.color }}
              >
                <Icon className="size-3.5" /> {h.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
