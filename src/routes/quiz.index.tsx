import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ListChecks, Trophy } from "lucide-react";
import { MODULE_BY_SLUG, QUIZZES } from "@/lib/modules";
import { useUser } from "@/lib/user-state";

export const Route = createFileRoute("/quiz/")({
  head: () => ({
    meta: [
      { title: "Quiz Zone — CricScience" },
      { name: "description", content: "Test your cricket science knowledge and earn XP, badges and certificates." },
      { property: "og:title", content: "Quiz Zone — CricScience" },
      { property: "og:description", content: "Quizzes for every module." },
    ],
  }),
  component: QuizIndex,
});

function QuizIndex() {
  const { state } = useUser();
  const daily = QUIZZES[new Date().getDate() % QUIZZES.length];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-start gap-4 mb-8">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><ListChecks className="size-6" /></span>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Quiz Zone</h1>
          <p className="mt-1 text-muted-foreground">Earn XP, unlock badges, climb the leaderboard.</p>
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-border bg-gradient-to-br from-[color:var(--brand-orange)]/12 to-transparent p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-[color:var(--brand-orange)] font-semibold">Daily challenge</div>
            <h2 className="mt-1 font-display text-2xl font-bold text-primary">{daily.title}</h2>
            <p className="text-sm text-muted-foreground">{daily.questions.length} questions · +{daily.xp} XP</p>
          </div>
          <Link to="/quiz/$quizId" params={{ quizId: daily.id }} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Play <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {QUIZZES.map(q => {
          const mod = MODULE_BY_SLUG[q.moduleSlug];
          const result = state.passedQuizzes[q.id];
          return (
            <Link key={q.id} to="/quiz/$quizId" params={{ quizId: q.id }} className="card-hover rounded-2xl border border-border bg-card p-5">
              <div className="text-xs text-muted-foreground">{mod?.title ?? "Topic quiz"}</div>
              <h3 className="mt-1 font-display font-semibold text-foreground">{q.title}</h3>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{q.questions.length} questions</span>
                <span>+{q.xp} XP</span>
                {result && <span className="inline-flex items-center gap-1 text-[color:var(--brand-green)] font-medium"><Trophy className="size-3.5" /> Passed {result.score}/{result.total}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
