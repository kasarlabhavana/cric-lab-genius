import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Clock, Trophy } from "lucide-react";
import { MODULE_BY_SLUG, QUIZZES } from "@/lib/modules";
import { useUser } from "@/lib/user-state";
import { ProgressRing } from "@/components/cric-ui";

export const Route = createFileRoute("/explore/$module/")({
  loader: ({ params }) => {
    const mod = MODULE_BY_SLUG[params.module];
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.mod.title} — CricScience` },
          { name: "description", content: loaderData.mod.intro },
          { property: "og:title", content: `${loaderData.mod.title} — CricScience` },
          { property: "og:description", content: loaderData.mod.tagline },
        ]
      : [],
  }),
  component: ModulePage,
  notFoundComponent: () => <div className="p-10 text-center">Module not found.</div>,
});

function ModulePage() {
  const { mod } = Route.useLoaderData();
  const { state, moduleProgress } = useUser();
  const p = moduleProgress(mod.slug);
  const quiz = QUIZZES.find(q => q.moduleSlug === mod.slug);
  const Icon = (Icons as any)[mod.icon] ?? BookOpen;

  return (
    <div>
      <section className={`border-b border-border bg-gradient-to-br ${mod.tint}`}>
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"><ArrowLeft className="size-4" /> All modules</Link>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-7" /></span>
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{mod.title}</h1>
              <p className="mt-1 text-muted-foreground">{mod.tagline}</p>
            </div>
            <ProgressRing value={p.pct} label="Done" />
          </div>
          <p className="mt-6 max-w-3xl text-foreground/85">{mod.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Lessons</h2>
          <ol className="space-y-3">
            {mod.lessons.map((l: { slug: string; title: string; summary: string; minutes: number }, i: number) => {
              const done = !!state.completedLessons[`${mod.slug}/${l.slug}`];
              return (
                <li key={l.slug}>
                  <Link to="/explore/$module/$lesson" params={{ module: mod.slug, lesson: l.slug }} className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                    {done ? <CheckCircle2 className="size-6 text-[color:var(--brand-green)] shrink-0" /> : <Circle className="size-6 text-muted-foreground shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">Lesson {i + 1}</div>
                      <h3 className="font-display font-semibold text-foreground">{l.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{l.summary}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3.5" /> {l.minutes}m</div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <aside className="space-y-4">
          {quiz && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground"><Trophy className="size-3.5 text-[color:var(--brand-orange)]" /> Module quiz</div>
              <h3 className="mt-2 font-display font-bold text-primary">{quiz.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{quiz.questions.length} questions · +{quiz.xp} XP on pass</p>
              <Link to="/quiz/$quizId" params={{ quizId: quiz.id }} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Start quiz <ArrowRight className="size-4" /></Link>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm">
            <h4 className="font-display font-semibold text-primary mb-2">What you'll learn</h4>
            <ul className="space-y-1.5 text-muted-foreground">
              {mod.lessons.slice(0, 5).map((l: { slug: string; summary: string }) => <li key={l.slug}>· {l.summary}</li>)}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
