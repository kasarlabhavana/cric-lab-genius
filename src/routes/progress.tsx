import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Award, Bookmark, Flame, Trophy } from "lucide-react";
import { BADGES, MODULES } from "@/lib/modules";
import { deriveLevel, useUser } from "@/lib/user-state";
import { ProgressRing } from "@/components/cric-ui";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — CricScience" },
      { name: "description", content: "Track your XP, level, streak, badges, certificates and bookmarks." },
      { property: "og:title", content: "My Progress — CricScience" },
      { property: "og:description", content: "Your learning journey." },
    ],
  }),
  component: Progress,
});

function Progress() {
  const { state, moduleProgress } = useUser();
  const level = deriveLevel(state.xp);
  const earned = new Set(state.badges);
  const certs = MODULES.filter(m => m.lessons.every(l => state.completedLessons[`${m.slug}/${l.slug}`]));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <header>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">My Progress</h1>
        <p className="text-muted-foreground mt-1">Your XP, badges, certificates and bookmarks — all in one place.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Level" value={level.name} icon={<Trophy className="size-5 text-[color:var(--brand-orange)]" />} sub={level.next ? `${state.xp} / ${level.next} XP` : "Maxed out"} />
        <StatCard label="Total XP" value={`${state.xp}`} icon={<Trophy className="size-5 text-primary" />} />
        <StatCard label="Streak" value={`${state.streak.count} days`} icon={<Flame className="size-5 text-[color:var(--brand-orange)]" />} />
        <StatCard label="Badges" value={`${state.badges.length}/${BADGES.length}`} icon={<Award className="size-5 text-[color:var(--brand-green)]" />} />
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-primary mb-4">Module progress</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(m => {
            const p = moduleProgress(m.slug);
            const Icon = (Icons as any)[m.icon] ?? Trophy;
            return (
              <Link key={m.slug} to="/explore/$module" params={{ module: m.slug }} className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <ProgressRing value={p.pct} size={64} strokeWidth={6} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><Icon className="size-4 text-primary" /><h3 className="font-display font-semibold text-foreground truncate">{m.title}</h3></div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.done} / {p.total} lessons</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-primary mb-4">Badges</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {BADGES.map(b => {
            const got = earned.has(b.id);
            const Icon = (Icons as any)[b.icon] ?? Award;
            return (
              <div key={b.id} className={`rounded-2xl border p-4 text-center transition ${got ? "border-[color:var(--brand-green)] bg-[color:var(--brand-green)]/8" : "border-border bg-surface opacity-60"}`}>
                <Icon className={`mx-auto size-7 ${got ? "text-[color:var(--brand-green)]" : "text-muted-foreground"}`} />
                <div className="mt-2 font-display font-semibold text-sm text-foreground">{b.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{b.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-primary mb-4">Certificates</h2>
        {certs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">Complete every lesson in a module to unlock its certificate.</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map(m => (
              <div key={m.slug} className="rounded-2xl border border-[color:var(--brand-orange)]/40 bg-gradient-to-br from-[color:var(--brand-orange)]/10 to-transparent p-5">
                <Award className="size-6 text-[color:var(--brand-orange)]" />
                <h3 className="mt-2 font-display font-bold text-primary">{m.title}</h3>
                <p className="text-xs text-muted-foreground">Awarded to {state.user?.name ?? "you"}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-primary mb-4 flex items-center gap-2"><Bookmark className="size-5" /> Bookmarks</h2>
        {state.bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">Star any lesson to save it for later.</div>
        ) : (
          <ul className="space-y-2">
            {state.bookmarks.map(key => {
              const [modSlug, lessonSlug] = key.split("/");
              const mod = MODULES.find(m => m.slug === modSlug);
              const lesson = mod?.lessons.find(l => l.slug === lessonSlug);
              if (!mod || !lesson) return null;
              return (
                <li key={key}>
                  <Link to="/explore/$module/$lesson" params={{ module: modSlug, lesson: lessonSlug }} className="card-hover flex items-center justify-between rounded-xl border border-border bg-card p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">{mod.title}</div>
                      <div className="font-display font-semibold text-foreground">{lesson.title}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{lesson.minutes}m</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-primary">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}
