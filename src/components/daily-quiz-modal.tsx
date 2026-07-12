import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X, Check, RotateCcw, Compass, Trophy } from "lucide-react";
import { QUIZZES, GK_QUESTIONS, type QuizQuestion } from "@/lib/modules";
import { useUser } from "@/lib/user-state";

const STORAGE_KEY = "cricscience.dailyQuiz.lastShown.v1";

/* -------- deterministic daily selection -------- */

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type DailyItem = { source: "lesson" | "gk"; q: QuizQuestion };

function pickDaily(dateKey: string): DailyItem[] {
  const rand = seededRandom(hashString(dateKey));
  const lessonPool: QuizQuestion[] = QUIZZES.flatMap((q) => q.questions);
  const pickN = <T,>(arr: T[], n: number): T[] => {
    const copy = [...arr];
    const out: T[] = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(rand() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  };
  const lessons = pickN(lessonPool, 3).map((q) => ({ source: "lesson" as const, q }));
  const gk = pickN(GK_QUESTIONS, 2).map((q) => ({ source: "gk" as const, q }));
  return [...lessons, ...gk];
}

/* -------- SVG icons: bat + ball -------- */

function BatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="batWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8c079" />
          <stop offset="1" stopColor="#b8842d" />
        </linearGradient>
      </defs>
      {/* blade */}
      <rect x="30" y="6" width="18" height="34" rx="3" fill="url(#batWood)" stroke="#7c5218" strokeWidth="1.2" transform="rotate(30 39 23)" />
      {/* splice */}
      <rect x="34" y="34" width="8" height="7" fill="#7c5218" transform="rotate(30 38 37)" />
      {/* handle */}
      <rect x="18" y="34" width="6" height="24" rx="2" fill="#3d2b12" transform="rotate(30 21 46)" />
      {/* grip lines */}
      <g stroke="#d84a2a" strokeWidth="0.9" transform="rotate(30 21 46)">
        <line x1="18" y1="40" x2="24" y2="40" />
        <line x1="18" y1="45" x2="24" y2="45" />
        <line x1="18" y1="50" x2="24" y2="50" />
        <line x1="18" y1="55" x2="24" y2="55" />
      </g>
    </svg>
  );
}

function BallOption({
  letter,
  state,
  onClick,
  disabled,
}: {
  letter: string;
  state: "idle" | "picked" | "correct" | "wrong";
  onClick: () => void;
  disabled: boolean;
}) {
  const fill =
    state === "correct" ? "#16a34a" :
    state === "wrong" ? "#b91c1c" :
    "#c1121f"; // classic red leather

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex size-14 items-center justify-center rounded-full transition ${
        disabled ? "" : "hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      } ${state === "picked" ? "ring-2 ring-white/70" : ""}`}
      aria-label={`Option ${letter}`}
    >
      <svg viewBox="0 0 48 48" className="size-14 drop-shadow">
        <defs>
          <radialGradient id={`ball-${letter}`} cx="35%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ff6a5c" />
            <stop offset="1" stopColor={fill} />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill={`url(#ball-${letter})`} stroke="#5c0f14" strokeWidth="1.2" />
        {/* seam */}
        <path d="M 4 24 Q 24 16 44 24" fill="none" stroke="white" strokeWidth="1.4" />
        <path d="M 4 24 Q 24 32 44 24" fill="none" stroke="white" strokeWidth="1.4" />
        {/* stitches */}
        <g stroke="white" strokeWidth="0.7">
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 8 + i * 3.5;
            const y1 = 24 - Math.cos((i / 8) * Math.PI) * 3.5;
            const y2 = y1 - 1.5;
            return <line key={i} x1={x} y1={y1} x2={x} y2={y2} />;
          })}
        </g>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-white text-lg drop-shadow-md">
        {letter}
      </span>
    </button>
  );
}

/* -------- Modal -------- */

export function DailyQuizModal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { recordQuiz } = useUser();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [newlyCorrect, setNewlyCorrect] = useState(0);

  const dateKey = todayKey();
  const questions = useMemo(() => pickDaily(dateKey), [dateKey]);

  // Only show on home ("/"). Once per day.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (path !== "/") return;
    const last = localStorage.getItem(STORAGE_KEY);
    if (last === dateKey) return;
    // small delay so hero can render first
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, [path, dateKey]);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, dateKey);
  };

  const q = questions[step]?.q;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
  };

  const next = () => {
    const all = [...picks, picked!];
    setPicks(all);
    setPicked(null);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const correctIndices = all
        .map((p, i) => (p === questions[i].q.answer ? i : -1))
        .filter((i) => i >= 0);
      const res = recordQuiz(`daily-${dateKey}`, correctIndices, questions.length);
      setXpGained(res.xpGained);
      setNewlyCorrect(res.newlyCorrect);
      setFinished(true);
    }
  };

  const retake = () => {
    setStep(0);
    setPicks([]);
    setPicked(null);
    setFinished(false);
    setXpGained(0);
    setNewlyCorrect(0);
  };

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open || !q) return null;

  const currentSource = questions[step]?.source;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daily cricket quiz"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-[color:var(--brand-orange)]/12 to-[color:var(--brand-green)]/12 px-4 py-3">
          <div className="flex items-center gap-2">
            <BatIcon className="size-8" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand-orange)]">
                Daily Warm-Up
              </div>
              <div className="font-display text-sm font-bold text-foreground">
                Five balls to face
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close quiz"
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Progress balls */}
        <div className="flex items-center justify-center gap-2 py-3">
          {questions.map((_, i) => {
            const answered = i < picks.length || (i === step && picked !== null);
            const correct = i < picks.length && picks[i] === questions[i].q.answer;
            const wrong = i < picks.length && picks[i] !== questions[i].q.answer;
            return (
              <span
                key={i}
                className="inline-flex size-4 items-center justify-center rounded-full border-2"
                style={{
                  background: correct
                    ? "#16a34a"
                    : wrong
                    ? "#b91c1c"
                    : answered
                    ? "#c1121f"
                    : "transparent",
                  borderColor: answered ? "transparent" : "var(--border)",
                }}
                aria-label={`Question ${i + 1} ${correct ? "correct" : wrong ? "wrong" : "pending"}`}
              />
            );
          })}
        </div>

        {finished ? (
          <div className="px-6 pb-8 pt-2 text-center">
            <div className="mx-auto mb-3 inline-flex size-14 items-center justify-center rounded-full bg-[color:var(--brand-orange)]/12">
              <Trophy className="size-8 text-[color:var(--brand-orange)]" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {picks.filter((p, i) => p === questions[i].q.answer).length} / {questions.length}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {xpGained > 0
                ? `+${xpGained} XP earned (${newlyCorrect} new correct × 10)`
                : "No new XP — you've mastered these before."}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              A fresh set arrives tomorrow. See you at the crease!
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={retake}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="size-4" /> Retake
              </button>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Compass className="size-4" /> Explore the homepage
              </button>
            </div>
          </div>
        ) : (
          <div className="px-5 pb-5">
            {/* Question row: bat icon + question */}
            <div className="flex items-start gap-3 mb-4">
              <BatIcon className="size-12 shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Question {step + 1} · {currentSource === "gk" ? "Cricket GK" : "From your lessons"}
                </div>
                <h3 className="mt-0.5 font-display text-base font-bold text-foreground leading-snug">
                  {q.q}
                </h3>
              </div>
            </div>

            {/* Ball options */}
            <div className="grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-4 sm:gap-3">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const state =
                  picked === null
                    ? "idle"
                    : i === q.answer
                    ? "correct"
                    : picked === i
                    ? "wrong"
                    : "idle";
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5 w-full">
                    <BallOption
                      letter={letter}
                      state={state}
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                    />
                    <div
                      className={`text-center text-[11px] leading-tight ${
                        state === "correct"
                          ? "text-[color:var(--brand-green)] font-semibold"
                          : state === "wrong"
                          ? "text-destructive font-semibold"
                          : "text-foreground"
                      }`}
                    >
                      {opt}
                    </div>
                  </div>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-4 rounded-xl bg-surface p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground inline-flex items-center gap-1">
                  <Check className="size-3.5" /> Why:
                </span>{" "}
                {q.explain}
              </div>
            )}

            {picked !== null && (
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {step + 1 < questions.length ? "Next ball" : "Finish over"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
