import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, RotateCcw, Trophy, X } from "lucide-react";
import { QUIZ_BY_ID, type QuizQuestion } from "@/lib/modules";
import { useUser } from "@/lib/user-state";

export const Route = createFileRoute("/quiz/$quizId")({
  loader: ({ params }) => {
    const quiz = QUIZ_BY_ID[params.quizId];
    if (!quiz) throw notFound();
    return { quiz };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.quiz.title} — Quiz Zone` },
          { name: "description", content: `Take the ${loaderData.quiz.title} on CricScience.` },
          { property: "og:title", content: loaderData.quiz.title },
          { property: "og:description", content: "Test your cricket science knowledge." },
        ]
      : [],
  }),
  component: QuizPage,
  notFoundComponent: () => <div className="p-10 text-center">Quiz not found.</div>,
});

function QuizPage() {
  const { quiz } = Route.useLoaderData();
  const { recordQuiz } = useUser();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const q: QuizQuestion = quiz.questions[step];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
  };
  const next = () => {
    const all = [...picks, picked!];
    setPicks(all);
    setPicked(null);
    if (step + 1 < quiz.questions.length) {
      setStep(step + 1);
    } else {
      const score = all.reduce((s, p, i) => s + (p === quiz.questions[i].answer ? 1 : 0), 0);
      const { xpGained, newBadges } = recordQuiz(quiz.id, score, quiz.questions.length);
      setXpGained(xpGained);
      setFinished(true);
      if (xpGained > 0) toast.success(`+${xpGained} XP!`);
      newBadges.forEach(b => toast(`🏅 Badge unlocked: ${b}`));
    }
  };
  const reset = () => { setStep(0); setPicks([]); setPicked(null); setFinished(false); setXpGained(0); };

  if (finished) {
    const score = picks.reduce((s, p, i) => s + (p === quiz.questions[i].answer ? 1 : 0), 0);
    const passed = score / quiz.questions.length >= 0.6;
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="rounded-3xl border border-border bg-card p-8 text-center">
          <Trophy className={`mx-auto size-14 ${passed ? "text-[color:var(--brand-green)]" : "text-muted-foreground"}`} />
          <h1 className="mt-4 font-display text-2xl font-bold text-primary">{passed ? "Quiz passed!" : "Keep at it!"}</h1>
          <p className="mt-1 text-muted-foreground">You scored {score} / {quiz.questions.length}</p>
          {xpGained > 0 && <div className="mt-3 inline-block rounded-full bg-[color:var(--brand-orange)]/15 px-3 py-1 text-sm font-semibold text-[color:var(--brand-orange)]">+{xpGained} XP earned</div>}
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"><RotateCcw className="size-4" /> Retry</button>
            <Link to="/quiz" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">More quizzes</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link to="/quiz" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"><ArrowLeft className="size-4" /> Quiz Zone</Link>
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Question {step + 1} of {quiz.questions.length}</span>
          <span>{quiz.title}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-[color:var(--brand-green)] transition-all" style={{ width: `${((step) / quiz.questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-bold text-foreground">{q.q}</h2>
        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === q.answer;
            const reveal = picked !== null;
            const cls = !reveal
              ? "border-border bg-surface hover:border-primary/30 hover:bg-muted"
              : isCorrect
                ? "border-[color:var(--brand-green)] bg-[color:var(--brand-green)]/10"
                : isPicked
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-surface opacity-60";
            return (
              <button key={i} onClick={() => choose(i)} disabled={reveal} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${cls}`}>
                <span className="inline-flex size-6 items-center justify-center rounded-full border border-border bg-card text-xs">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">{opt}</span>
                {reveal && isCorrect && <Check className="size-4 text-[color:var(--brand-green)]" />}
                {reveal && isPicked && !isCorrect && <X className="size-4 text-destructive" />}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-4 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Why: </span>{q.explain}
          </div>
        )}
        {picked !== null && (
          <button onClick={next} className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {step + 1 < quiz.questions.length ? "Next question" : "Finish quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
