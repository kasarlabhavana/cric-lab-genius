import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight, Beaker, BookOpen, Bot, ListChecks, TrendingUp, Users,
  Sparkles, Target, Swords, Hand, LayoutGrid, CircleDot, CloudSun, Dumbbell, Scale,
  GraduationCap, Baby, Trophy, Eye, Wrench,
} from "lucide-react";

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
  { slug: "pitch-science",    title: "Pitch",       icon: LayoutGrid, desc: "Soil, moisture, behavior." },
  { slug: "ball-science",     title: "Ball",        icon: CircleDot,  desc: "Leather, seam, lacquer." },
  { slug: "environment-science", title: "Environment", icon: CloudSun, desc: "Wind, dew, altitude." },
  { slug: "fitness-science",  title: "Fitness",     icon: Dumbbell,   desc: "Strength & longevity." },
  { slug: "umpiring-science", title: "Umpiring",    icon: Scale,      desc: "Decisions & DRS tech." },
] as const;

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

function Home() {
  return (
    <div>
      {/* HERO — cricket ground meets laboratory */}
      <section className="relative overflow-hidden border-b border-border">
        <GroundLabBackdrop />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <Sparkles className="size-3.5 text-[color:var(--brand-orange)]" />
            The science behind every ball
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] drop-shadow-md"
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
            <Link to="/laboratory" className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition">
              <Beaker className="size-4" /> Try Laboratory
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MODULE TILES — every page in one glance */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[color:var(--brand-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-green)]">Modules</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Where would you like to start?</h2>
          <p className="mt-2 text-muted-foreground">Six modules — every page of the app, one click away.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MODULE_TILES.map(t => {
            const Icon = t.icon;
            return (
              <motion.div key={t.to} variants={fadeUp} transition={{ duration: 0.45 }} whileHover={{ y: -4 }}>
                <Link
                  to={t.to}
                  className="group block h-full rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <span
                    className="inline-flex size-12 items-center justify-center rounded-xl"
                    style={{ background: `color-mix(in oklab, ${t.tint} 14%, transparent)`, color: t.tint }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{t.label}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* SCIENCE CATEGORIES — compact tile view */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-[color:var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">Science</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Eight sciences of cricket</h2>
            <p className="mt-2 text-muted-foreground">Tap any tile to dive into lessons, diagrams and quizzes.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            {SCIENCE_TILES.map(s => {
              const Icon = s.icon;
              return (
                <motion.div key={s.slug} variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ y: -3 }}>
                  <Link
                    to="/explore/$module"
                    params={{ module: s.slug }}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* LEARNER PATHS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">For every learner</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Pick the path that fits you</h2>
          <p className="mt-2 text-muted-foreground">CricScience meets you where you are — from gully cricket to international tours.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LEARNERS.map(p => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.key}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-shadow"
              >
                <span
                  className="inline-flex size-12 items-center justify-center rounded-xl"
                  style={{ background: `color-mix(in oklab, ${p.color} 14%, transparent)`, color: p.color }}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.points.map(pt => (
                    <li key={pt} className="flex gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full" style={{ background: p.color }} />{pt}</li>
                  ))}
                </ul>
                <Link
                  to={p.to}
                  className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {p.cta} <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
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
