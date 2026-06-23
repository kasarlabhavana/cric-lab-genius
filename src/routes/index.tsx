import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Beaker, Sparkles, Target, Zap, Wind, Activity, RotateCcw } from "lucide-react";
import { MODULES } from "@/lib/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricScience — The Science Behind Cricket" },
      { name: "description", content: "Bowling, batting, fielding and pitch science — explained through physics, biomechanics, aerodynamics and AI." },
      { property: "og:title", content: "CricScience" },
      { property: "og:description", content: "The science behind cricket." },
    ],
  }),
  component: Home,
});

const FEATURED = [
  { name: "Leg Break", desc: "Wrist position, seam axis and lateral drift that fools the bat.", icon: RotateCcw, color: "var(--brand-orange)" },
  { name: "Doosra", desc: "The mystery off-spinner that turns the other way.", icon: Sparkles, color: "var(--brand-green)" },
  { name: "Yorker", desc: "Toe-crushing length that beats every shot in the book.", icon: Target, color: "var(--brand-orange)" },
  { name: "Reverse Swing", desc: "Why an old ball curves the wrong way at 140 km/h.", icon: Wind, color: "var(--brand-green)" },
  { name: "Helicopter Shot", desc: "Wrist torque and bottom-hand whip that launches yorkers.", icon: Zap, color: "var(--brand-orange)" },
];

const CATEGORIES = [
  { slug: "bowling-science", title: "Bowling Science", desc: "Aerodynamics of swing, spin and seam.", emoji: "🎯" },
  { slug: "batting-science", title: "Batting Science", desc: "Biomechanics of timing and power.", emoji: "🏏" },
  { slug: "fielding-science", title: "Fielding Science", desc: "Reaction time, angles and athletic intelligence.", emoji: "🧤" },
  { slug: "pitch-science", title: "Pitch Science", desc: "Surface, soil and how a wicket behaves.", emoji: "🌱" },
  { slug: "fitness-science", title: "Fitness Science", desc: "Strength, mobility and recovery for cricket.", emoji: "💪" },
];

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-[oklch(0.2_0.05_258)] to-[oklch(0.16_0.05_258)]">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <motion.div
          aria-hidden
          className="absolute -top-32 -right-32 size-[420px] rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--brand-orange) 45%, transparent), transparent 60%)" }}
          animate={{ y: [0, 16, 0], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <Sparkles className="size-3.5 text-[color:var(--brand-orange)]" />
            The science behind every ball
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95]"
          >
            CRIC<span className="text-[color:var(--brand-orange)]">SCIENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg md:text-2xl text-white/80 font-medium"
          >
            The Science Behind Cricket
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
            <Link to="/laboratory" className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition">
              <Beaker className="size-4" /> Try Laboratory
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[color:var(--brand-orange)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">Featured</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Featured Topics</h2>
          <p className="mt-2 text-muted-foreground">The deliveries and shots that define modern cricket — broken down to first principles.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {FEATURED.map(t => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-xl transition-shadow"
              >
                <span
                  className="inline-flex size-11 items-center justify-center rounded-xl"
                  style={{ background: `color-mix(in oklab, ${t.color} 14%, transparent)`, color: t.color }}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{t.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                <Link to="/explore" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Learn <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Topic Categories */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="inline-block rounded-full bg-[color:var(--brand-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-green)]">Modules</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">Topic Categories</h2>
              <p className="mt-2 text-muted-foreground">Five pillars to start. Eight more inside.</p>
            </div>
            <Link to="/explore" className="text-sm font-medium text-primary hover:underline">See all modules →</Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {CATEGORIES.map(c => {
              const inModules = MODULES.find(m => m.slug === c.slug);
              return (
                <motion.div key={c.slug} variants={fadeUp} transition={{ duration: 0.45 }} whileHover={{ y: -4 }}>
                  <Link
                    to={inModules ? "/explore/$module" : "/explore"}
                    params={inModules ? { module: c.slug } : undefined}
                    className="block h-full rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" aria-hidden>{c.emoji}</span>
                      <Activity className="size-4 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Open <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-[color:var(--brand-orange)]/10 via-surface to-[color:var(--brand-green)]/10 p-8 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Democratize elite cricket knowledge.</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">For the kid in the gully, the academy prospect, the pro on tour, the coach at the boundary, and the fan in the stand.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/explore" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Explore Science</Link>
            <Link to="/ai-coach" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition">Ask the AI Coach</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
