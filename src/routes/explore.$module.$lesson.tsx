import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MODULE_BY_SLUG } from "@/lib/modules";
import { useUser } from "@/lib/user-state";
import { Diagram } from "@/components/cric-ui";


export const Route = createFileRoute("/explore/$module/$lesson")({
  loader: ({ params }) => {
    const mod = MODULE_BY_SLUG[params.module];
    if (!mod) throw notFound();
    const lesson = mod.lessons.find(l => l.slug === params.lesson);
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

  const handleComplete = () => {
    const { xpGained, newBadges } = completeLesson(mod.slug, lesson.slug);
    if (xpGained > 0) {
      setJustFinished(true);
      toast.success(`+${xpGained} XP — Lesson complete!`);
      newBadges.forEach(b => toast(`🏅 Badge unlocked: ${b}`));
    }
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/explore/$module" params={{ module: mod.slug }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-4" /> {mod.title}
      </Link>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Lesson {idx + 1} of {mod.lessons.length}</div>
        <button onClick={() => toggleBookmark(mod.slug, lesson.slug)} className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-muted">
          <Bookmark className={`size-3.5 ${bookmarked ? "fill-[color:var(--brand-orange)] text-[color:var(--brand-orange)]" : ""}`} />
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-primary">{lesson.title}</h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground"><Clock className="size-4" /> {lesson.minutes} min read</div>

      <p className="mt-6 text-lg text-foreground/85 leading-relaxed">{lesson.summary}</p>

      <div className="mt-8 prose-content space-y-4 text-foreground/90 leading-relaxed">
        {lesson.body.map((p: string, i: number) => (
          <p key={i} className="text-[15.5px]">{p}</p>
        ))}
      </div>

      {lesson.diagram && (
        <div className="mt-8">
          <Diagram kind={lesson.diagram} />
        </div>
      )}


      <div className="mt-10 rounded-2xl border border-border bg-surface p-5">
        {done && !justFinished ? (
          <div className="flex items-center gap-3 text-[color:var(--brand-green)]">
            <CheckCircle2 className="size-5" />
            <span className="font-medium">You've completed this lesson.</span>
          </div>
        ) : (
          <button onClick={handleComplete} disabled={done} className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-green)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
            <CheckCircle2 className="size-4" /> {done ? "Completed" : "Mark complete · +10 XP"}
          </button>
        )}
      </div>

      <nav className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <Link to="/explore/$module/$lesson" params={{ module: mod.slug, lesson: prev.slug }} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted">
            <ArrowLeft className="size-4" /> {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/explore/$module/$lesson" params={{ module: mod.slug, lesson: next.slug }} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {next.title} <ArrowRight className="size-4" />
          </Link>
        ) : (
          <Link to="/explore/$module" params={{ module: mod.slug }} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Back to module <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </article>
  );
}
