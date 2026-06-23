import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MODULE_BY_SLUG } from "@/lib/modules";
import { useUser } from "@/lib/user-state";
import { Diagram } from "@/components/cric-ui";
import {
  SECTION_DEFS,
  parseLessonBody,
  inferDifficulty,
  extractFamousPlayers,
} from "@/lib/lesson-schema";

export const Route = createFileRoute("/explore/$module/$lesson")({
  loader: ({ params }) => {
    const mod = MODULE_BY_SLUG[params.module];
    if (!mod) throw notFound();
    const lesson = mod.lessons.find((l) => l.slug === params.lesson);
    if (!lesson) throw notFound();
    const idx = mod.lessons.indexOf(lesson);
    return { mod, lesson, idx, prev: mod.lessons[idx - 1], next: mod.lessons[idx + 1] };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.lesson.title} — ${loaderData.mod.title}` },
          { name: "description", content: loaderData.lesson.summary },
          { property: "og:title", content: `${loaderData.lesson.title} — CricScience` },
          { property: "og:description", content: loaderData.lesson.summary },
        ]
      : [],
  }),
  component: LessonPage,
  notFoundComponent: () => <div className="p-10 text-center">Lesson not found.</div>,
});

function LessonPage() {
  const { mod, lesson, idx, prev, next } = Route.useLoaderData();
  const { state, completeLesson, toggleBookmark, isBookmarked } = useUser();
  const done = !!state.completedLessons[`${mod.slug}/${lesson.slug}`];
  const bookmarked = isBookmarked(mod.slug, lesson.slug);
  const [justFinished, setJustFinished] = useState(false);

  const parsed = parseLessonBody(lesson);
  const difficulty = inferDifficulty(lesson, parsed.sections);
  const players = extractFamousPlayers(lesson);

  const sectionsWithContent = SECTION_DEFS.map((def) => {
    let value = parsed.sections[def.key]?.join(" ");
    if (!value && def.key === "difficulty" && difficulty) value = difficulty;
    return { def, value };
  });
  const filled = sectionsWithContent.filter((s) => s.value).length;

  const handleComplete = () => {
    const { xpGained, newBadges } = completeLesson(mod.slug, lesson.slug);
    if (xpGained > 0) {
      setJustFinished(true);
      toast.success(`+${xpGained} XP — Lesson complete!`);
      newBadges.forEach((b) => toast(`🏅 Badge unlocked: ${b}`));
    }
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/explore/$module"
        params={{ module: mod.slug }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="size-4" /> {mod.title}
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          Lesson {idx + 1} of {mod.lessons.length}
        </div>
        <button
          onClick={() => toggleBookmark(mod.slug, lesson.slug)}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-muted"
        >
          <Bookmark
            className={`size-3.5 ${bookmarked ? "fill-[color:var(--brand-orange)] text-[color:var(--brand-orange)]" : ""}`}
          />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">
        {lesson.title}
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" /> {lesson.minutes} min read
        </span>
        <span className="text-border">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-4 text-[color:var(--brand-orange)]" />
          {filled}/{SECTION_DEFS.length} sections
        </span>
      </div>

      <p className="mt-6 text-lg text-foreground/85 leading-relaxed">{lesson.summary}</p>

      {parsed.notes.length > 0 && (
        <div className="mt-8 space-y-3 text-foreground/90 leading-relaxed">
          {parsed.notes.map((p, i) => (
            <p key={i} className="text-[15.5px]">
              {p}
            </p>
          ))}
        </div>
      )}

      {lesson.diagram && (
        <div className="mt-8">
          <Diagram kind={lesson.diagram} />
        </div>
      )}

      {/* 17-section schema */}
      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-primary">
            Technical Breakdown
          </h2>
          <span className="text-xs text-muted-foreground">17-section schema</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sectionsWithContent.map(({ def, value }) => {
            const Icon = (Icons as any)[def.icon] ?? Icons.Dot;
            const empty = !value;
            return (
              <div
                key={def.key}
                className={`rounded-xl border p-4 ${
                  empty
                    ? "border-dashed border-border/60 bg-muted/30"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex size-7 items-center justify-center rounded-lg ${
                      empty
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/8 text-primary"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{def.label}</h3>
                </div>
                {empty ? (
                  <p className="mt-2 text-xs italic text-muted-foreground">
                    Not applicable to this lesson.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    {value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Famous Players */}
      {players.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold text-primary">
              Famous Players
            </h2>
            <span className="text-xs text-muted-foreground">
              Drills → real performances
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-[color:var(--brand-green)]/12 text-[color:var(--brand-green)]">
                    <UserIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {p.name}
                      </h3>
                      {p.era && (
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {p.era}
                        </span>
                      )}
                    </div>
                    {p.role && (
                      <p className="text-xs text-muted-foreground">{p.role}</p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                  {p.note}
                </p>
                {p.signature && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-orange)]/10 px-2.5 py-1 text-[11px] font-medium text-[color:var(--brand-orange)]">
                    <Sparkles className="size-3" />
                    {p.signature}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-surface p-5">
        {done && !justFinished ? (
          <div className="flex items-center gap-3 text-[color:var(--brand-green)]">
            <CheckCircle2 className="size-5" />
            <span className="font-medium">You've completed this lesson.</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={done}
            className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-green)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            <CheckCircle2 className="size-4" />{" "}
            {done ? "Completed" : "Mark complete · +10 XP"}
          </button>
        )}
      </div>

      <nav className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <Link
            to="/explore/$module/$lesson"
            params={{ module: mod.slug, lesson: prev.slug }}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"
          >
            <ArrowLeft className="size-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/explore/$module/$lesson"
            params={{ module: mod.slug, lesson: next.slug }}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {next.title} <ArrowRight className="size-4" />
          </Link>
        ) : (
          <Link
            to="/explore/$module"
            params={{ module: mod.slug }}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Back to module <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
