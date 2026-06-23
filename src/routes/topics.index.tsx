import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { TOPICS } from "@/lib/topics";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Cricket Topics — CricScience" },
      {
        name: "description",
        content:
          "Every cricket topic explained through a 21-section deep-dive: definition, biomechanics, physics, aerodynamics, drills and a quiz.",
      },
    ],
  }),
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-orange)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
        <Sparkles className="size-3" /> Topic library
      </span>
      <h1 className="mt-3 font-display text-4xl font-bold text-primary md:text-5xl">
        Cricket Topics
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-foreground/80">
        Every topic follows the same 21-section structure — definition, grip,
        biomechanics, physics, aerodynamics, counter-strategy, field, drills
        and a quiz. Five topics live below; more are on the way.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOPICS.map(t => (
          <Link
            key={t.slug}
            to="/topics/$slug"
            params={{ slug: t.slug }}
            className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                {t.category}
              </span>
              <span className="rounded-full bg-[color:var(--brand-green)]/10 px-2 py-0.5 text-[color:var(--brand-green)]">
                {t.difficulty}
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">
              {t.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {t.definition}
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Open topic
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
