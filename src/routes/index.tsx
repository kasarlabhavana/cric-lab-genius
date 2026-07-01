import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowRight, Network,
  Target, Swords, Hand, Shield, Wrench, LayoutGrid, CircleDot, CloudSun, Dumbbell, Scale,
  Atom, Activity, Brain,
} from "lucide-react";

import logoUrl from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricScience — The Science Behind Cricket" },
      { name: "description", content: "Learn the physics, biomechanics and aerodynamics behind every ball, shot and pitch. For beginners, academy players, pros, coaches and fans." },
      { property: "og:title", content: "CricScience" },
      { property: "og:description", content: "The science behind cricket — explained for every kind of learner." },
    ],
  }),
  component: Home,
});

const SCIENCE_TILES = [
  { slug: "bowling-science",  title: "Bowling",     icon: Target,     desc: "Pace, spin & seam physics." },
  { slug: "batting-science",  title: "Batting",     icon: Swords,     desc: "Timing, geometry, power." },
  { slug: "fielding-science", title: "Fielding",    icon: Hand,       desc: "Angles, catching, throws." },
  { slug: "wicketkeeping-science", title: "Keeping", icon: Shield,    desc: "Gloves, stumping, leadership." },
  { slug: "pitch-science",    title: "Pitch",       icon: LayoutGrid, desc: "Soil, moisture, behavior." },
  { slug: "ball-science",     title: "Ball",        icon: CircleDot,  desc: "Leather, seam, lacquer." },
  { slug: "equipment-science", title: "Equipment",  icon: Wrench,     desc: "Bats, helmets, pads, gear." },
  { slug: "environment-science", title: "Environment", icon: CloudSun, desc: "Wind, dew, altitude." },
  { slug: "fitness-science",  title: "Fitness",     icon: Dumbbell,   desc: "Strength & longevity." },
  { slug: "umpiring-science", title: "Umpiring",    icon: Scale,      desc: "Decisions & DRS tech." },
  { slug: "physics-science",  title: "Physics",     icon: Atom,       desc: "Magnus, drag & forces." },
  { slug: "biomechanics-science", title: "Biomechanics", icon: Activity, desc: "Body, joints & load." },
  { slug: "mental-science",   title: "Mental",      icon: Brain,      desc: "Focus, flow, pressure." },
] as const;




function Home() {
  return (
    <div>
      {/* HERO — cricket ground meets laboratory */}
      <section className="relative overflow-hidden border-b border-border">
        <GroundLabBackdrop />
        <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-14 md:pt-14 md:pb-20 text-center text-white">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex justify-center"
          >
            <img src={logoUrl} alt="CricScience logo" className="size-48 sm:size-64 object-contain drop-shadow-md" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] drop-shadow-md"
          >
            CRIC<span className="text-[color:var(--brand-orange)]">SCIENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 mx-auto max-w-2xl text-base md:text-xl text-white/85 font-medium"
          >
            Where the cricket field meets the laboratory — learn the physics, biomechanics and aerodynamics behind every ball, shot and pitch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <Link to="/explore" className="group inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-orange)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color:var(--brand-orange)]/30 hover:translate-y-[-1px] hover:shadow-xl transition">
              Explore Science <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/quiz" className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              Play Quiz <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/knowledge-graph" className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              <Network className="size-4" /> Knowledge Graph
            </Link>

          </motion.div>
        </div>
      </section>

      {/* SCIENCE CATEGORIES — compact tile view */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-[color:var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">Science</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Thirteen sciences of cricket</h2>
            <p className="mt-2 text-muted-foreground">Hover a planet to preview — tap to dive in.</p>
          </div>

          <InteractiveBall />

        </div>
      </section>

    </div>
  );
}


/** Interactive cricket ball — science "planets" orbit a spinning red ball on two rings
 *  so 13 tiles fit without overlap. Hover/tap to preview, click to open. */
function InteractiveBall() {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();

  const current = active != null ? SCIENCE_TILES[active] : null;

  // Split into two rings so labels don't collide.
  const outer = SCIENCE_TILES.slice(0, 8);   // 8 planets on the outer ring
  const inner = SCIENCE_TILES.slice(8);      // 5 planets on the inner ring

  return (
    <div className="relative mx-auto mt-10 aspect-square w-full max-w-[620px]">
      {/* Orbit rings */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-border" />
      <div className="absolute inset-[26%] rounded-full border border-dashed border-border/60" />

      {/* Spinning cricket ball (smaller so inner ring has room) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] h-[24%]"
      >
        <svg viewBox="0 0 220 220" className="w-full h-full">
          <defs>
            <radialGradient id="leather" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#d65a4a" />
              <stop offset="55%" stopColor="#9b1c1c" />
              <stop offset="100%" stopColor="#4a0a0a" />
            </radialGradient>
          </defs>
          <circle cx="110" cy="110" r="100" fill="url(#leather)" />
          <ellipse cx="110" cy="110" rx="100" ry="30" fill="none" stroke="#f5e6c8" strokeWidth="2.5" />
          {[...Array(28)].map((_, i) => (
            <line key={i}
              x1={110 + 98 * Math.cos((i / 28) * Math.PI * 2)}
              y1={110 + 28 * Math.sin((i / 28) * Math.PI * 2)}
              x2={110 + 102 * Math.cos((i / 28) * Math.PI * 2)}
              y2={110 + 32 * Math.sin((i / 28) * Math.PI * 2)}
              stroke="#f5e6c8" strokeWidth="2" />
          ))}
          <ellipse cx="80" cy="75" rx="28" ry="14" fill="white" fillOpacity="0.18" />
        </svg>
      </motion.div>

      {/* Centre label */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        {current ? (
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-background/90 backdrop-blur px-4 py-3 shadow-lg border border-border max-w-[180px]"
          >
            <div className="font-display text-base font-bold text-foreground">{current.title}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{current.desc}</div>
            <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">Tap to open →</div>
          </motion.div>
        ) : (
        )}
      </div>

      {/* Ring renderer */}
      {[
        { items: outer, radius: 46, offset: -Math.PI / 2 },
        { items: inner, radius: 20, offset: -Math.PI / 2 + Math.PI / inner.length },
      ].map(({ items, radius, offset }, ringIdx) =>
        items.map((s, i) => {
          const globalIdx = ringIdx === 0 ? i : outer.length + i;
          const angle = (i / items.length) * Math.PI * 2 + offset;
          const xPct = 50 + Math.cos(angle) * radius;
          const yPct = 50 + Math.sin(angle) * radius;
          const Icon = s.icon;
          const isActive = active === globalIdx;
          return (
            <motion.button
              key={s.slug}
              type="button"
              onMouseEnter={() => setActive(globalIdx)}
              onFocus={() => setActive(globalIdx)}
              onClick={() => navigate({ to: "/explore/$module", params: { module: s.slug } })}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: isActive ? 1.15 : 1 }}
              transition={{ delay: 0.04 * globalIdx, type: "spring", stiffness: 220, damping: 18 }}
              whileHover={{ scale: 1.18 }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 group focus:outline-none"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              aria-label={s.title}
            >
              <span className={`inline-flex size-9 sm:size-11 items-center justify-center rounded-full border-2 shadow-md transition-colors ${
                isActive
                  ? "bg-[color:var(--brand-orange)] border-[color:var(--brand-orange)] text-white"
                  : "bg-card border-border text-primary group-hover:border-[color:var(--brand-orange)]"
              }`}>
                <Icon className="size-4 sm:size-5" />
              </span>
              <span className={`whitespace-nowrap text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide ${isActive ? "text-[color:var(--brand-orange)]" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </motion.button>
          );
        })
      )}
    </div>
  );
}



/** Hero backdrop — left half evokes a cricket ground (pitch + crease + boundary),
 *  right half evokes a laboratory (beakers, molecules, grid). */
function GroundLabBackdrop() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.06_258)] via-[oklch(0.2_0.05_258)] to-[oklch(0.16_0.05_258)]">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ground" cx="25%" cy="75%" r="65%">
            <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--brand-green)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--brand-green)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lab" cx="80%" cy="25%" r="55%">
            <stop offset="0%" stopColor="var(--brand-orange)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--brand-orange)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--brand-orange)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        {/* base glows */}
        <rect width="1200" height="600" fill="url(#grid)" />
        <rect width="1200" height="600" fill="url(#ground)" />
        <rect width="1200" height="600" fill="url(#lab)" />

        {/* LEFT: cricket ground — boundary arc, pitch, crease lines */}
        <g opacity="0.55">
          <ellipse cx="200" cy="650" rx="520" ry="320" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="2" />
          <ellipse cx="200" cy="650" rx="380" ry="230" fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="6 8" />
          {/* pitch */}
          <rect x="155" y="430" width="90" height="220" rx="4" fill="white" fillOpacity="0.07" stroke="white" strokeOpacity="0.25" />
          {/* creases */}
          <line x1="155" y1="470" x2="245" y2="470" stroke="white" strokeOpacity="0.45" strokeWidth="2" />
          <line x1="155" y1="610" x2="245" y2="610" stroke="white" strokeOpacity="0.45" strokeWidth="2" />
          {/* stumps */}
          <g stroke="var(--brand-orange)" strokeWidth="2" opacity="0.9">
            <line x1="192" y1="465" x2="192" y2="448" />
            <line x1="200" y1="465" x2="200" y2="448" />
            <line x1="208" y1="465" x2="208" y2="448" />
            <line x1="192" y1="615" x2="192" y2="598" />
            <line x1="200" y1="615" x2="200" y2="598" />
            <line x1="208" y1="615" x2="208" y2="598" />
          </g>
        </g>

        {/* RIGHT: laboratory — beaker, flask, molecule, trajectory */}
        <g opacity="0.5" stroke="white" strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Beaker */}
          <g transform="translate(880,90)">
            <path d="M0 0 L0 110 Q0 130 20 130 L80 130 Q100 130 100 110 L100 0" />
            <path d="M-6 0 L106 0" />
            <path d="M0 70 L100 70" strokeDasharray="4 6" />
            <path d="M0 95 Q25 85 50 95 T100 95" stroke="var(--brand-orange)" strokeOpacity="0.9" />
            <path d="M0 95 L0 130 Q0 130 0 130 L100 130 L100 95 Z" fill="var(--brand-orange)" fillOpacity="0.18" stroke="none" />
            {/* bubbles */}
            <circle cx="30" cy="80" r="3" fill="white" fillOpacity="0.6" stroke="none" />
            <circle cx="55" cy="70" r="2" fill="white" fillOpacity="0.5" stroke="none" />
            <circle cx="70" cy="85" r="2.5" fill="white" fillOpacity="0.5" stroke="none" />
          </g>
          {/* Erlenmeyer flask */}
          <g transform="translate(1030,150)">
            <path d="M25 0 L25 35 L0 95 Q0 110 15 110 L75 110 Q90 110 90 95 L65 35 L65 0 Z" />
            <path d="M20 0 L70 0" />
            <path d="M0 80 L90 80" stroke="var(--brand-green)" strokeOpacity="0.9" />
          </g>
          {/* Molecule */}
          <g transform="translate(820,260)">
            <line x1="0" y1="0" x2="40" y2="25" />
            <line x1="40" y1="25" x2="80" y2="0" />
            <line x1="40" y1="25" x2="40" y2="70" />
            <circle cx="0" cy="0" r="8" fill="var(--brand-orange)" fillOpacity="0.85" stroke="none" />
            <circle cx="80" cy="0" r="8" fill="var(--brand-orange)" fillOpacity="0.85" stroke="none" />
            <circle cx="40" cy="25" r="10" fill="var(--brand-green)" fillOpacity="0.85" stroke="none" />
            <circle cx="40" cy="70" r="8" fill="white" fillOpacity="0.8" stroke="none" />
          </g>
          {/* Trajectory arc — connects ground to lab */}
          <path d="M260 470 Q 600 80 1050 350" stroke="var(--brand-orange)" strokeOpacity="0.7" strokeDasharray="4 8" />
          <circle cx="1050" cy="350" r="5" fill="var(--brand-orange)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
