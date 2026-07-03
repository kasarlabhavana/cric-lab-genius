import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

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

      {/* SCIENCE CATEGORIES — dugout helmet bench */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-[color:var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">Science</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Pick your kit from the dugout</h2>
            <p className="mt-2 text-muted-foreground">Thirteen helmets — one per science. Hover to lift, tap to gear up.</p>
          </div>

          <HelmetDugout />
        </div>
      </section>

    </div>
  );
}

/** Dugout: 13 helmets sitting on wooden shelves. Hover lifts the helmet. */
const CATEGORY_COLOR: Record<string, string> = {
  "bowling-science": "var(--brand-orange)",
  "batting-science": "var(--brand-orange)",
  "fielding-science": "var(--brand-orange)",
  "wicketkeeping-science": "var(--brand-orange)",
  "mental-science": "var(--brand-orange)",
  "physics-science": "var(--brand-green)",
  "biomechanics-science": "var(--brand-green)",
  "fitness-science": "var(--brand-green)",
  "environment-science": "var(--brand-green)",
  "pitch-science": "oklch(0.55 0.14 258)",
  "ball-science": "oklch(0.55 0.14 258)",
  "equipment-science": "oklch(0.55 0.14 258)",
  "umpiring-science": "oklch(0.55 0.14 258)",
};

function HelmetDugout() {
  // 2 shelves: 7 helmets up top, 6 down below. Fits mobile as 3/3/3/4.
  const shelves = [SCIENCE_TILES.slice(0, 7), SCIENCE_TILES.slice(7, 13)];
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      {shelves.map((row, rIdx) => (
        <div key={rIdx} className="relative mt-6 first:mt-0">
          {/* Helmets */}
          <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-x-2 gap-y-6 justify-items-center px-3">
            {row.map((tile, i) => (
              <Helmet key={tile.slug} tile={tile} delay={rIdx * 0.15 + i * 0.05} />
            ))}
          </div>
          {/* Wooden shelf */}
          <div className="relative -mt-2 h-4 rounded-sm bg-gradient-to-b from-[oklch(0.55_0.09_55)] via-[oklch(0.42_0.08_50)] to-[oklch(0.3_0.06_45)] shadow-[0_6px_10px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]">
            {/* Wood grain */}
            <div
              className="absolute inset-0 opacity-25 rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,transparent 0 22px,rgba(0,0,0,0.15) 22px 23px)",
              }}
            />
          </div>
          {/* Shelf shadow on wall */}
          <div className="mx-auto h-4 max-w-[95%] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.18),transparent_70%)]" />
        </div>
      ))}
    </div>
  );
}

function Helmet({ tile, delay }: { tile: typeof SCIENCE_TILES[number]; delay: number }) {
  const navigate = useNavigate();
  const Icon = tile.icon;
  const accent = CATEGORY_COLOR[tile.slug] ?? "var(--brand-orange)";
  return (
    <motion.button
      type="button"
      onClick={() => navigate({ to: "/explore/$module", params: { module: tile.slug } })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center focus:outline-none"
      aria-label={tile.title}
    >
      {/* Helmet */}
      <div className="relative" style={{ width: "clamp(72px, 11vw, 108px)", aspectRatio: "1 / 1" }}>
        <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-md">
          <defs>
            <linearGradient id={`shell-${tile.slug}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="1" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id={`shell-hi-${tile.slug}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="60%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Peak */}
          <path
            d="M14,72 Q14,40 60,32 Q106,40 106,72 L106,78 Q106,80 104,80 L16,80 Q14,80 14,78 Z"
            fill={`url(#shell-${tile.slug})`}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1.5"
          />
          {/* Shell highlight */}
          <path
            d="M20,68 Q26,44 60,38 Q80,40 92,52"
            fill="none"
            stroke={`url(#shell-hi-${tile.slug})`}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Front brim / bill */}
          <path
            d="M10,78 Q60,90 110,78 L108,88 Q60,98 12,88 Z"
            fill="oklch(0.25 0.02 60)"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1"
          />
          {/* Ear pad */}
          <ellipse cx="18" cy="76" rx="6" ry="9" fill="oklch(0.22 0.02 60)" />
          <ellipse cx="102" cy="76" rx="6" ry="9" fill="oklch(0.22 0.02 60)" />
          {/* Grille — three horizontal bars */}
          <g stroke="oklch(0.85 0.005 90)" strokeWidth="2" strokeLinecap="round" opacity="0.9">
            <line x1="26" y1="86" x2="94" y2="86" />
            <line x1="24" y1="94" x2="96" y2="94" />
            <line x1="26" y1="102" x2="94" y2="102" />
            {/* verticals */}
            <line x1="42" y1="82" x2="42" y2="106" strokeWidth="1.5" />
            <line x1="60" y1="80" x2="60" y2="108" strokeWidth="1.5" />
            <line x1="78" y1="82" x2="78" y2="106" strokeWidth="1.5" />
          </g>
          {/* Chin strap */}
          <path
            d="M22,80 Q60,116 98,80"
            fill="none"
            stroke="oklch(0.3 0.02 60)"
            strokeWidth="2"
          />
        </svg>

        {/* Icon badge on the peak */}
        <span
          className="absolute left-1/2 top-[26%] -translate-x-1/2 inline-flex size-6 sm:size-7 items-center justify-center rounded-full bg-background/90 shadow-sm ring-1 ring-black/10"
          style={{ color: accent }}
        >
          <Icon className="size-3.5 sm:size-4" />
        </span>
      </div>

      {/* Name plate under helmet */}
      <div className="mt-1 text-center">
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-foreground">
          {tile.title}
        </div>
      </div>

      {/* Tagline that reveals on hover */}
      <div className="pointer-events-none absolute top-full mt-1 w-[130px] sm:w-[150px] opacity-0 -translate-y-1 transition duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 z-20">
        <div className="rounded-lg bg-background/95 backdrop-blur px-2 py-1.5 shadow-lg border border-border">
          <p className="text-[10px] text-muted-foreground leading-snug text-center">
            {tile.desc}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
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
