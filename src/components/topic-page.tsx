import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Eye,
  GraduationCap,
  Hand,
  History,
  Layers,
  Lightbulb,
  ListChecks,
  MapPin,
  Move3d,
  RotateCcw,
  Ruler,
  Sparkles,
  Target,
  Trophy,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import type { Topic, TopicQuiz } from "@/lib/topics";
import { AUDIENCES, type Audience, getTopicExtras } from "@/lib/topic-extras";
import { LABORATORY_SIMS } from "@/lib/modules";
import { isFemalePlayer } from "@/lib/glossary";
import { GlossaryText } from "@/components/glossary-text";
import { NarrationButton } from "@/components/narration-button";
import { useReadingLevel } from "@/lib/reading-level";

// 21 sections — every topic renders all of them in the same order.
const SECTIONS: ReadonlyArray<{
  id: string;
  n: number;
  label: string;
  Icon: typeof BookOpen;
  field: keyof Topic | "commonMistakes" | "drills" | "quiz" | "references";
}> = [
  { id: "definition", n: 1, label: "Definition", Icon: BookOpen, field: "definition" },
  { id: "history", n: 2, label: "History", Icon: History, field: "history" },
  { id: "grip", n: 3, label: "Grip", Icon: Hand, field: "grip" },
  { id: "finger-placement", n: 4, label: "Finger Placement", Icon: Hand, field: "fingerPlacement" },
  { id: "wrist-movement", n: 5, label: "Wrist Movement", Icon: RotateCcw, field: "wristMovement" },
  { id: "arm-path", n: 6, label: "Arm Path", Icon: Workflow, field: "armPath" },
  { id: "shoulder-rotation", n: 7, label: "Shoulder Rotation", Icon: RotateCcw, field: "shoulderRotation" },
  { id: "hip-rotation", n: 8, label: "Hip Rotation", Icon: RotateCcw, field: "hipRotation" },
  { id: "foot-placement", n: 9, label: "Foot Placement", Icon: MapPin, field: "footPlacement" },
  { id: "release-point", n: 10, label: "Release Point", Icon: Target, field: "releasePoint" },
  { id: "seam-orientation", n: 11, label: "Seam Orientation", Icon: Compass, field: "seamOrientation" },
  { id: "spin-axis", n: 12, label: "Spin Axis", Icon: Move3d, field: "spinAxis" },
  { id: "physics", n: 13, label: "Physics", Icon: Zap, field: "physics" },
  { id: "aerodynamics", n: 14, label: "Aerodynamics", Icon: Wind, field: "aerodynamics" },
  { id: "trajectory", n: 15, label: "Trajectory", Icon: Ruler, field: "trajectory" },
  { id: "batting-counter", n: 16, label: "Batting Counter Strategy", Icon: Eye, field: "battingCounterStrategy" },
  { id: "field-placement", n: 17, label: "Field Placement", Icon: Layers, field: "fieldPlacement" },
  { id: "common-mistakes", n: 18, label: "Common Mistakes", Icon: Lightbulb, field: "commonMistakes" },
  { id: "drills", n: 19, label: "Drills", Icon: ListChecks, field: "drills" },
  { id: "quiz", n: 20, label: "Quiz", Icon: CircleHelp, field: "quiz" },
  { id: "references", n: 21, label: "References", Icon: GraduationCap, field: "references" },
];

function SectionHeader({ n, label, Icon }: { n: number; label: string; Icon: typeof BookOpen }) {
  return (
    <header className="flex items-center gap-3">
      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[color:var(--brand-orange)]/10 text-[color:var(--brand-orange)] font-display text-sm font-bold">
        {n}
      </span>
      <div className="flex items-center gap-2 text-foreground">
        <Icon className="size-4 text-muted-foreground" />
        <h2 className="font-display text-xl font-bold tracking-tight">{label}</h2>
      </div>
    </header>
  );
}

function ProseSection({ text }: { text: string }) {
  return <p className="mt-3 text-[15.5px] leading-relaxed text-foreground/85"><GlossaryText text={text} /></p>;
}

function ListSection({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-xl border border-border bg-card p-3 text-[15px] text-foreground/85"
        >
          <ChevronRight className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-orange)]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function QuizSection({ quiz, topicTitle }: { quiz: TopicQuiz[]; topicTitle: string }) {
  const [picked, setPicked] = useState<Record<number, number | undefined>>({});
  const correctCount = Object.entries(picked).filter(
    ([i, p]) => p !== undefined && quiz[+i] && quiz[+i].answer === p,
  ).length;
  return (
    <div className="mt-3 space-y-4">
      {quiz.map((q, i) => {
        const choice = picked[i];
        const answered = choice !== undefined;
        return (
          <div key={i} className="rounded-2xl border border-border bg-surface p-4">
            <div className="text-sm font-semibold text-foreground">
              Q{i + 1}. {q.q}
            </div>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, oi) => {
                const isCorrect = answered && oi === q.answer;
                const isWrongPick = answered && oi === choice && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    onClick={() => {
                      if (answered) return;
                      setPicked(p => ({ ...p, [i]: oi }));
                      if (oi === q.answer) toast.success("Correct!");
                      else toast.error("Not quite — see the explanation.");
                    }}
                    className={[
                      "rounded-xl border px-3 py-2 text-left text-sm transition",
                      "hover:bg-muted",
                      isCorrect
                        ? "border-[color:var(--brand-green)] bg-[color:var(--brand-green)]/10 text-foreground"
                        : isWrongPick
                          ? "border-destructive bg-destructive/10 text-foreground"
                          : "border-border bg-card text-foreground/85",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Why:</span> {q.explain}
              </p>
            )}
          </div>
        );
      })}
      <div className="text-xs text-muted-foreground">
        {topicTitle} quiz score: {correctCount} / {quiz.length}
      </div>
    </div>
  );
}

function ReferencesSection({ refs }: { refs: Topic["references"] }) {
  return (
    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/85">
      {refs.map((r, i) => (
        <li key={i}>
          <span className="font-medium text-foreground">{r.label}</span>
          <span className="text-muted-foreground"> — {r.source}</span>
        </li>
      ))}
    </ol>
  );
}

export function TopicPage({ topic }: { topic: Topic }) {
  const extras = getTopicExtras(topic.slug);
  const [audience, setAudience] = useState<Audience>("Beginner");
  const { simplify } = useReadingLevel();
  const relatedSims =
    extras?.relatedSims
      .map(slug => LABORATORY_SIMS.find(s => s.slug === slug))
      .filter((s): s is (typeof LABORATORY_SIMS)[number] => Boolean(s)) ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/topics"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> All topics
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
          {topic.category}
        </span>
        <span className="rounded-full bg-[color:var(--brand-green)]/10 px-2.5 py-1 text-[color:var(--brand-green)]">
          {topic.difficulty}
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
          {topic.title}
        </h1>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <NarrationButton
          className="shrink-0"
          getText={() => `${topic.title}. ${simplify(topic.definition)}`}
        />
      </div>
      <p className="mt-4 text-lg leading-relaxed text-foreground/85">
        {simplify(topic.definition)}
      </p>

      {/* Audience switcher */}
      {extras?.audience && (
        <section className="mt-6 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="size-3.5 text-[color:var(--brand-orange)]" />
            For different learners
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {AUDIENCES.map(a => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  a === audience
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
            <GlossaryText text={extras.audience[audience]} />
          </p>
        </section>
      )}

      {/* Famous players */}
      {extras?.famousPlayers && extras.famousPlayers.length > 0 && (
        <section className="mt-6 rounded-2xl border border-[color:var(--brand-orange)]/30 bg-[color:var(--brand-orange)]/5 p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
            <Trophy className="size-3.5" /> Famous players & signature moments
          </div>
          <ul className="mt-3 space-y-3">
            {extras.famousPlayers.map((p, i) => {
              const female = isFemalePlayer(p.name);
              return (
              <li key={i} className={`rounded-xl border ${female ? "border-pink-300/60 bg-pink-50/40" : "border-border bg-card"} p-3`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-semibold ${female ? "text-pink-700" : "text-foreground"}`}>
                    {p.name}
                    {female && <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-pink-600">W</span>}
                  </span>
                  {p.team && (
                    <span className={`text-[11px] font-medium uppercase tracking-wider ${female ? "text-pink-600" : "text-muted-foreground"}`}>
                      {p.team}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85"><GlossaryText text={p.note} /></p>
              </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Key takeaways */}
      {extras?.keyTakeaways && extras.keyTakeaways.length > 0 && (
        <section className="mt-6 rounded-2xl border border-[color:var(--brand-green)]/30 bg-[color:var(--brand-green)]/5 p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-green)]">
            <CheckCircle2 className="size-3.5" /> Key takeaways
          </div>
          <ul className="mt-3 space-y-2">
            {extras.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-foreground/85">
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-green)]" />
                <span><GlossaryText text={t} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Short lessons */}
      {extras?.lessons && extras.lessons.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <BookOpen className="size-3.5 text-primary" /> Short lessons
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {extras.lessons.map((l, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{l.title}</span>
                  <span>{l.minutes} min</span>
                </div>
                <p className="mt-2 text-sm text-foreground/85"><GlossaryText text={l.body} /></p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Laboratory modules — hidden (Laboratory removed for now) */}
      {false && relatedSims.length > 0 && (
        <section className="mt-6 rounded-2xl border border-[color:var(--brand-orange)]/30 bg-[color:var(--brand-orange)]/5 p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
            <Beaker className="size-3.5" /> Try this in the Laboratory
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {relatedSims.map(s => (
              <Link
                key={s.slug}
                to="/laboratory/$sim"
                params={{ sim: s.slug }}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="font-semibold text-foreground">{s.title}</span>
                <ArrowRight className="size-4 text-[color:var(--brand-orange)] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}


      {/* Table of contents */}
      <nav
        aria-label="Sections"
        className="mt-8 rounded-2xl border border-border bg-card p-4"
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          21 sections
        </div>
        <ol className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-2 rounded-md px-1.5 py-1 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
              >
                <span className="w-6 text-right text-xs tabular-nums text-muted-foreground">
                  {s.n}.
                </span>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-12">
        {SECTIONS.map(s => {
          const value = topic[s.field as keyof Topic];
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <SectionHeader n={s.n} label={s.label} Icon={s.Icon} />
              {s.field === "commonMistakes" || s.field === "drills" ? (
                <ListSection items={value as string[]} />
              ) : s.field === "quiz" ? (
                <QuizSection quiz={value as TopicQuiz[]} topicTitle={topic.title} />
              ) : s.field === "references" ? (
                <ReferencesSection refs={value as Topic["references"]} />
              ) : (
                <ProseSection text={value as string} />
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}
