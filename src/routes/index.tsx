import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, Network,
  Target, Swords, Hand, Shield, Wrench, LayoutGrid, CircleDot, CloudSun, Dumbbell, Scale,
  Atom, Activity, Brain,
} from "lucide-react";

import logoUrl from "@/assets/logo.png";
import { MODULES, MODULE_BY_SLUG } from "@/lib/modules";
import { useUser, type UserState } from "@/lib/user-state";


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

const ICON_BY_NAME: Record<string, LucideIcon> = {
  Target, Swords, Hand, Shield, LayoutGrid, CircleDot, Wrench, CloudSun, Dumbbell, Scale,
  Atom, Activity, Brain,
};

const CATEGORY: Record<string, "play" | "body" | "gear"> = {
  "bowling-science": "play",
  "batting-science": "play",
  "fielding-science": "play",
  "mental-science": "play",
  "physics-science": "body",
  "biomechanics-science": "body",
  "fitness-science": "body",
  "environment-science": "body",
  "wicketkeeping-science": "gear",
  "pitch-science": "gear",
  "ball-science": "gear",
  "equipment-science": "gear",
  "umpiring-science": "gear",
};

const CAT_STYLE: Record<"play" | "body" | "gear", { bg: string; text: string }> = {
  play: { bg: "bg-[color:var(--brand-orange)]/10", text: "text-[color:var(--brand-orange)]" },
  body: { bg: "bg-[color:var(--brand-green)]/10", text: "text-[color:var(--brand-green)]" },
  gear: { bg: "bg-[color:var(--chart-4)]/10", text: "text-[color:var(--chart-4)]" },
};

function deriveModuleXp(slug: string, state: UserState) {
  const quizId = `${slug}-starter`;
  const quizCorrect = Object.keys(state.correctQuestions).filter((k) => k.startsWith(`${quizId}#`)).length;
  const mod = MODULE_BY_SLUG[slug];
  const lessonsDone = mod ? mod.lessons.filter((l) => state.completedLessons[`${slug}/${l.slug}`]).length : 0;
  return (quizCorrect + lessonsDone) * 10;
}


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

      <ScorecardSection />

    </div>
  );
}

/* ---------------------------------------------------------------- */
/*                     SCIENCE SCORECARD TABLE                      */
/* ---------------------------------------------------------------- */

function ScorecardSection() {
  const { state } = useUser();

  const totalLessons = MODULES.reduce((n, m) => n + m.lessons.length, 0);
  const totalXp = MODULES.reduce((n, m) => n + deriveModuleXp(m.slug, state), 0);

  return (
    <section className="bg-surface border-y border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[color:var(--brand-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-green)]">
            Scorecard
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Thirteen sciences of cricket
          </h2>
          <p className="mt-2 text-muted-foreground">
            Every row is a science you can master. Tap a science to open its lessons and quiz.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-border bg-card overflow-hidden shadow-md"
        >
          <div role="table" aria-label="Science scorecard" className="w-full text-sm">
            {/* Header */}
            <div
              role="row"
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] bg-[color:var(--primary)] text-primary-foreground"
            >
              <div role="columnheader" className="px-4 py-3 text-left font-semibold">Science</div>
              <div role="columnheader" className="hidden sm:block px-4 py-3 text-left font-semibold">Focus</div>
              <div role="columnheader" className="px-4 py-3 text-center font-semibold tabular-nums">Lessons</div>
              <div role="columnheader" className="px-4 py-3 text-right font-semibold tabular-nums">XP</div>
            </div>

            {/* Rows */}
            {MODULES.map((m, i) => {
              const Icon = ICON_BY_NAME[m.icon];
              const cat = CATEGORY[m.slug] ?? "play";
              const style = CAT_STYLE[cat];
              const xp = deriveModuleXp(m.slug, state);
              return (
                <Link
                  key={m.slug}
                  role="row"
                  to="/explore/$module"
                    params={{ module: m.slug }}
                  aria-label={`${m.title}. ${m.tagline}. ${m.lessons.length} lessons. ${xp} XP earned.`}
                  className={`grid grid-cols-[minmax(0,1fr)_auto_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] items-center transition hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${i % 2 === 1 ? "bg-muted/30" : "bg-card"}`}
                >
                  <div role="cell" className="px-4 py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`inline-flex shrink-0 size-9 items-center justify-center rounded-full ${style.bg} ${style.text}`}>
                        {Icon ? <Icon className="size-4" aria-hidden="true" /> : <span className="size-4" />}
                      </span>
                      <span className="font-semibold text-foreground truncate">{m.title}</span>
                    </div>
                  </div>
                  <div role="cell" className="hidden sm:block px-4 py-3.5 text-muted-foreground truncate">
                    {m.tagline}
                  </div>
                  <div role="cell" className="px-4 py-3.5 text-center tabular-nums text-foreground">
                    {m.lessons.length}
                  </div>
                  <div role="cell" className="px-4 py-3.5 text-right tabular-nums font-semibold text-[color:var(--brand-orange)]">
                    {xp}
                  </div>
                </Link>
              );
            })}

            {/* Total */}
            <div
              role="row"
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] bg-muted/70 font-semibold text-foreground border-t border-border"
            >
              <div role="cell" className="px-4 py-3">Total</div>
              <div role="cell" className="hidden sm:block px-4 py-3" />
              <div role="cell" className="px-4 py-3 text-center tabular-nums">{totalLessons}</div>
              <div role="cell" className="px-4 py-3 text-right tabular-nums">{totalXp}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
