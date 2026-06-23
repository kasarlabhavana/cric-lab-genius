import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Beaker, Search, Sparkles, X } from "lucide-react";
import { TOPICS, type Difficulty, type TopicCategory } from "@/lib/topics";
import { getTopicRelatedSims } from "@/lib/topic-extras";
import { LABORATORY_SIMS } from "@/lib/modules";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Cricket Topics — CricScience" },
      {
        name: "description",
        content:
          "Search and filter every cricket topic — bowling, batting, fielding, wicketkeeping, equipment, ground & pitch — each with a 21-section deep-dive.",
      },
    ],
  }),
  component: TopicsIndex,
});

const ALL_CATEGORIES: TopicCategory[] = [
  "Spin Bowling",
  "Pace Bowling",
  "Swing Bowling",
  "Fielding",
  "Wicketkeeping",
  "Equipment",
  "Ground & Pitch",
];
const ALL_DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

function TopicsIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TopicCategory | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter(t => {
      if (category !== "All" && t.category !== category) return false;
      if (difficulty !== "All" && t.difficulty !== difficulty) return false;
      if (!q) return true;
      const haystack = `${t.title} ${t.category} ${t.definition}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, difficulty]);

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setDifficulty("All");
  };
  const hasFilters = query || category !== "All" || difficulty !== "All";

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
        and a quiz. Search or filter to find what you need.
      </p>

      {/* Search + filters */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search topics (e.g. wicketkeeping, ball, swing)…"
            className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Category:
          </span>
          {(["All", ...ALL_CATEGORIES] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c as TopicCategory | "All")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Difficulty:
          </span>
          {(["All", ...ALL_DIFFICULTIES] as const).map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d as Difficulty | "All")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                difficulty === d
                  ? "bg-[color:var(--brand-green)] text-white"
                  : "border border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Showing {filtered.length} of {TOPICS.length} topics.
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {filtered.map(t => {
          const simSlugs = getTopicRelatedSims(t.slug);
          const sims = simSlugs
            .map(s => LABORATORY_SIMS.find(x => x.slug === s))
            .filter((s): s is (typeof LABORATORY_SIMS)[number] => Boolean(s))
            .slice(0, 3);
          return (
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
              {sims.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Beaker className="size-3 text-[color:var(--brand-orange)]" />
                  <span className="font-semibold uppercase tracking-wider">Lab:</span>
                  {sims.map(s => (
                    <span
                      key={s.slug}
                      className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-foreground/80"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open topic
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="sm:col-span-2 rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
            No topics match those filters. Try clearing them.
          </div>
        )}
      </div>
    </div>
  );
}
