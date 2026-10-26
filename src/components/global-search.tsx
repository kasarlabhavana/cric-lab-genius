import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Circle, FlaskConical, LayoutGrid, ListChecks, Search, X, BookA } from "lucide-react";
import { MODULES, QUIZZES, LABORATORY_SIMS } from "@/lib/modules";
import { TOPICS } from "@/lib/topics";
import { GLOSSARY, termSlug } from "@/lib/glossary";

type Result =
  | { kind: "lesson"; title: string; subtitle: string; moduleSlug: string; lessonSlug: string }
  | { kind: "module"; title: string; subtitle: string; moduleSlug: string }
  | { kind: "topic"; title: string; subtitle: string; slug: string }
  | { kind: "quiz"; title: string; subtitle: string; id: string }
  | { kind: "lab"; title: string; subtitle: string; slug: string }
  | { kind: "glossary"; title: string; subtitle: string; slug: string };

function buildIndex(): Result[] {
  const out: Result[] = [];
  for (const m of MODULES) {
    out.push({ kind: "module", title: m.title, subtitle: m.tagline, moduleSlug: m.slug });
    for (const l of m.lessons) {
      out.push({
        kind: "lesson",
        title: l.title,
        subtitle: `${m.title} · ${l.summary}`,
        moduleSlug: m.slug,
        lessonSlug: l.slug,
      });
    }
  }
  for (const t of TOPICS) {
    out.push({ kind: "topic", title: t.title, subtitle: `${t.category} · ${t.difficulty}`, slug: t.slug });
  }
  for (const q of QUIZZES) {
    out.push({ kind: "quiz", title: q.title, subtitle: `${q.questions.length} questions · +${q.xp} XP`, id: q.id });
  }
  for (const s of LABORATORY_SIMS) {
    out.push({ kind: "lab", title: s.title, subtitle: s.summary, slug: s.slug });
  }
  for (const [term, def] of Object.entries(GLOSSARY)) {
    out.push({ kind: "glossary", title: term, subtitle: def.slice(0, 90), slug: termSlug(term) });
  }
  return out;
}

const ICONS = {
  module: LayoutGrid,
  lesson: BookOpen,
  topic: Circle,
  quiz: ListChecks,
  lab: FlaskConical,
  glossary: BookA,
} as const;

const LABELS = {
  module: "Science",
  lesson: "Lesson",
  topic: "Topic",
  quiz: "Quiz",
  lab: "Lab",
  glossary: "Glossary",
} as const;

function score(item: Result, tokens: string[]): number {
  if (!tokens.length) return 0;
  const hay = `${item.title} ${item.subtitle}`.toLowerCase();
  let s = 0;
  for (const t of tokens) {
    if (!hay.includes(t)) return -1;
    if (item.title.toLowerCase().startsWith(t)) s += 5;
    else if (item.title.toLowerCase().includes(t)) s += 3;
    else s += 1;
  }
  return s;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return index
      .map((r) => ({ r, s: score(r, tokens) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 24)
      .map((x) => x.r);
  }, [q, index]);

  const grouped = useMemo(() => {
    const g: Record<string, Result[]> = {};
    for (const r of results) {
      (g[r.kind] ??= []).push(r);
    }
    return g;
  }, [results]);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (r: Result) => {
    setOpen(false);
    setQ("");
    switch (r.kind) {
      case "module":
        navigate({ to: "/explore/$module", params: { module: r.moduleSlug } });
        break;
      case "lesson":
        navigate({
          to: "/explore/$module/$lesson",
          params: { module: r.moduleSlug, lesson: r.lessonSlug },
        });
        break;
      case "topic":
        navigate({ to: "/topics/$slug", params: { slug: r.slug } });
        break;
      case "quiz":
        navigate({ to: "/quiz/$quizId", params: { quizId: r.id } });
        break;
      case "lab":
        navigate({ to: "/laboratory/$sim", params: { sim: r.slug } });
        break;
      case "glossary":
        navigate({ to: "/glossary", hash: r.slug });
        break;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search CricScience (⌘K)"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden md:inline-flex ml-2 items-center rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-16 sm:pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search lessons, topics, quizzes, labs, glossary…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) go(results[0]);
                }}
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!q.trim() && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Start typing to search across sciences, lessons, topics, quizzes, labs and glossary.
                </div>
              )}

              {q.trim() && !results.length && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No results for “{q}”.
                </div>
              )}

              {Object.entries(grouped).map(([kind, items]) => {
                const Icon = ICONS[kind as keyof typeof ICONS];
                return (
                  <div key={kind} className="border-b border-border last:border-b-0">
                    <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {LABELS[kind as keyof typeof LABELS]}
                    </div>
                    <ul>
                      {items.slice(0, 6).map((r, i) => (
                        <li key={`${kind}-${i}`}>
                          <button
                            onClick={() => go(r)}
                            className="flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-muted"
                          >
                            <Icon className="size-4 mt-0.5 text-primary shrink-0" />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">
                                {r.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {r.subtitle}
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
