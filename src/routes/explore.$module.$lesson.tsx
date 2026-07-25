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
import { YouTubeEmbed } from "@/components/youtube-embed";
import { getLessonVideos } from "@/lib/lesson-videos";
import { toast } from "sonner";
import { MODULE_BY_SLUG } from "@/lib/modules";
import { useUser } from "@/lib/user-state";
import { Diagram } from "@/components/cric-ui";
import { GlossaryText } from "@/components/glossary-text";
import { NarrationButton } from "@/components/narration-button";
import { ShareButton } from "@/components/share-button";
import { useReadingLevel } from "@/lib/reading-level";
import {
  SECTION_DEFS,
  parseLessonBody,
  inferDifficulty,
  inferEtymology,
  inferHistory,
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

  const { simplify } = useReadingLevel();
  const parsed = parseLessonBody(lesson);
  const difficulty = inferDifficulty(lesson, parsed.sections);
  const etymology = inferEtymology(lesson, parsed.sections);
  const history = inferHistory(lesson, parsed.sections);
  const players = extractFamousPlayers(lesson);

  const sectionsWithContent = SECTION_DEFS.map((def) => {
    let value = parsed.sections[def.key]?.join(" ");
    if (!value && def.key === "difficulty" && difficulty) value = difficulty;
    if (!value && def.key === "etymology" && etymology) value = etymology;
    if (!value && def.key === "history" && history) value = history;
    return { def, value };
  });
  const filled = sectionsWithContent.filter((s) => s.value).length;

  const buildNarration = () => {
    const parts: string[] = [lesson.title, simplify(lesson.summary)];
    parsed.notes.forEach((n) => parts.push(simplify(n)));
    sectionsWithContent.forEach(({ def, value }) => {
      if (value) parts.push(`${def.label}. ${simplify(value)}`);
    });
    return parts.join(". ");
  };

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
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {lesson.minutes} min read
          </span>
          <span className="text-border">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-4 text-[color:var(--brand-orange)]" />
            {filled}/{SECTION_DEFS.length} sections
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <NarrationButton getText={buildNarration} />
          <ShareButton title={`${lesson.title} — ${mod.title}`} text={lesson.summary} />
        </div>
      </div>

      <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
        <GlossaryText text={lesson.summary} />
      </p>

      {parsed.notes.length > 0 && (
        <div className="mt-8 space-y-3 text-foreground/90 leading-relaxed">
          {parsed.notes.map((p, i) => (
            <p key={i} className="text-[15.5px]">
              <GlossaryText text={p} />
            </p>
          ))}
        </div>
      )}

      {lesson.diagram && (
        <div className="mt-8">
          <Diagram kind={lesson.diagram} />
        </div>
      )}

      {(() => {
        const videos = [
          ...(lesson.videos ?? []),
          ...getLessonVideos(mod.slug, lesson.slug),
        ];
        if (videos.length === 0) return null;
        return (
          <section className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-display text-xl font-semibold text-primary">
                Watch
              </h2>
              <span className="text-xs text-muted-foreground">
                {videos.length} video{videos.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v, i) => (
                <YouTubeEmbed key={i} url={v.url} title={v.title} />
              ))}
            </div>
          </section>
        );
      })()}

      {/* 17-section schema */}
      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold text-primary">
            Technical Breakdown
          </h2>
          <span className="text-xs text-muted-foreground">19-section schema</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sectionsWithContent
            .filter((s) => s.value)
            .map(({ def, value }) => {
              const Icon = (Icons as any)[def.icon] ?? Icons.Dot;
              return (
                <div
                  key={def.key}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="size-3.5" />
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{def.label}</h3>
                  </div>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                    <GlossaryText text={value!} />
                  </p>
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
            {players.map((p) => {
              const accent = p.female
                ? { ring: "border-pink-300/60", bg: "bg-pink-100", text: "text-pink-600", chipBg: "bg-pink-100", chipText: "text-pink-700" }
                : { ring: "border-border", bg: "bg-[color:var(--brand-green)]/12", text: "text-[color:var(--brand-green)]", chipBg: "bg-[color:var(--brand-orange)]/10", chipText: "text-[color:var(--brand-orange)]" };
              return (
              <div
                key={p.name}
                className={`rounded-xl border ${accent.ring} bg-card p-4`}
              >
                <div className="flex items-start gap-3">
                  <span className={`inline-flex size-9 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                    <UserIcon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">
                        {p.name}
                        {p.female && (
                          <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-pink-600">W</span>
                        )}
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
                  <GlossaryText text={p.note} />
                </p>
                {p.signature && (
                  <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full ${accent.chipBg} px-2.5 py-1 text-[11px] font-medium ${accent.chipText}`}>
                    <Sparkles className="size-3" />
                    {p.signature}
                  </div>
                )}
              </div>
              );
            })}
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
