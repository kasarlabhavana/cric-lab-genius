import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Trophy, Flame, BookOpen, Bot, Beaker } from "lucide-react";
import { MODULES, QUIZZES } from "@/lib/modules";
import { useUser, deriveLevel } from "@/lib/user-state";
import { ModuleCard, ProgressRing } from "@/components/cric-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CricScience — Learn the Science of Cricket" },
      { name: "description", content: "Bowling, batting, fielding, pitch and ball science — explained through physics, biomechanics and AI." },
      { property: "og:title", content: "CricScience" },
      { property: "og:description", content: "Democratizing elite cricket knowledge." },
    ],
  }),
  component: Home,
});

function Home() {
  const { state } = useUser();
  const level = deriveLevel(state.xp);
  const dailyQuiz = QUIZZES[new Date().getDate() % QUIZZES.length];
  const inProgress = MODULES
    .map(m => ({ m, done: m.lessons.filter(l => state.completedLessons[`${m.slug}/${l.slug}`]).length }))
    .filter(x => x.done > 0 && x.done < x.m.lessons.length)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary to-[oklch(0.18_0.05_258)]">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
              <Sparkles className="size-3.5 text-[color:var(--brand-orange)]" />
              The science behind every ball
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Cricket, <span className="text-[color:var(--brand-orange)]">decoded</span> through science.
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
              From swing aerodynamics to the biomechanics of the perfect cover drive — learn the why behind the game, with bite-sized lessons, quizzes and an AI coach.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-orange)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition">
                Explore topics <ArrowRight className="size-4" />
              </Link>
              <Link to={state.user ? "/progress" : "/auth"} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                {state.user ? "View my progress" : "Start free"}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-white/60">
              <span>13 science modules</span>
              <span>·</span>
              <span>50+ lessons</span>
              <span>·</span>
              <span>Quizzes, badges & streaks</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white/95 p-6 shadow-2xl ring-1 ring-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Daily Challenge</div>
                  <h3 className="font-display text-lg font-semibold text-primary mt-1">{dailyQuiz.title}</h3>
                </div>
                <span className="rounded-lg bg-[color:var(--brand-orange)]/10 px-2 py-1 text-xs font-semibold text-[color:var(--brand-orange)]">+{dailyQuiz.xp} XP</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{dailyQuiz.questions.length} questions · ~3 min</p>
              <Link to="/quiz/$quizId" params={{ quizId: dailyQuiz.id }} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
                Start challenge <ArrowRight className="size-4" />
              </Link>
            </div>
            {state.user && (
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-4 shadow-xl flex items-center gap-3">
                <ProgressRing value={Math.min(1, state.xp / (level.next ?? state.xp + 1))} size={56} strokeWidth={6} />
                <div>
                  <div className="text-xs text-muted-foreground">Level</div>
                  <div className="font-display font-bold text-primary">{level.name}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {state.user && inProgress.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-primary">Continue learning</h2>
            <Link to="/progress" className="text-sm text-muted-foreground hover:text-primary">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map(({ m }) => <ModuleCard key={m.slug} module={m} />)}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">Core science modules</h2>
            <p className="text-muted-foreground mt-1">Eight pillars of cricket, taught the way pros learn them.</p>
          </div>
          <Link to="/explore" className="hidden sm:inline text-sm text-muted-foreground hover:text-primary">See all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULES.map(m => <ModuleCard key={m.slug} module={m} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon={Beaker} title="Cricket Laboratory" desc="Interactive sims for swing, trajectory and reaction time." to="/laboratory" />
          <FeatureCard icon={Bot} title="AI Coach" desc="Ask anything about technique, tactics or science — anytime." to="/ai-coach" />
          <FeatureCard icon={Trophy} title="Quiz Zone" desc="Earn XP, badges and certificates as you climb the ladder." to="/quiz" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-[color:var(--brand-orange)]/10 via-surface to-[color:var(--brand-green)]/10 p-8 md:p-12 text-center">
          <Flame className="mx-auto size-8 text-[color:var(--brand-orange)]" />
          <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-primary">Our mission</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">Democratize elite cricket knowledge — for the kid in the gully, the academy prospect, the pro on tour, the coach at the boundary, and the fan in the stand.</p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, to }: { icon: any; title: string; desc: string; to: any }) {
  return (
    <Link to={to} className="card-hover group rounded-2xl border border-border bg-card p-6">
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary"><Icon className="size-5" /></span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Open <ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
