import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, BookA } from "lucide-react";
import { GLOSSARY, termSlug } from "@/lib/glossary";

export const Route = createFileRoute("/glossary")({
  component: GlossaryPage,
  head: () => ({
    meta: [
      { title: "Cricket Glossary A–Z | CricScience" },
      { name: "description", content: "An A–Z glossary of cricket terms with plain-English definitions — from bouncer to yorker." },
    ],
  }),
});

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const hash = useRouterState({ select: s => s.location.hash });
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [highlightedTerm, setHighlightedTerm] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const entries = Object.entries(GLOSSARY)
      .filter(([term, def]) => !q || term.toLowerCase().includes(q) || def.toLowerCase().includes(q))
      .sort(([a], [b]) => a.localeCompare(b));
    const map = new Map<string, Array<[string, string]>>();
    for (const e of entries) {
      const letter = e[0][0]?.toUpperCase() ?? "#";
      const key = /[A-Z]/.test(letter) ? letter : "#";
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [query]);

  const activeLetters = new Set(grouped.keys());

  // Handle deep link: #term-<slug> scrolls + highlights; #letter-X jumps to letter.
  useEffect(() => {
    const raw = (hash ?? "").replace(/^#/, "");
    if (!raw) return;
    const id = raw;
    // wait for paint
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        if (id.startsWith("term-")) {
          const slug = id.slice("term-".length);
          setHighlightedTerm(slug);
          setTimeout(() => setHighlightedTerm(null), 2200);
        }
      }
    }, 60);
    return () => clearTimeout(t);
  }, [hash, grouped]);

  // Track which letter section is currently in view → highlight in the jump bar.
  useEffect(() => {
    const sections = Array.from(sectionRefs.current.entries());
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const letter = visible[0].target.getAttribute("data-letter");
          if (letter) setActiveLetter(letter);
        }
      },
      { rootMargin: "-180px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach(([, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, [grouped]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <BookA className="size-3.5" /> Cricket A–Z
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-black tracking-tight text-primary">
          Glossary
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Every cricket term used across CricScience, defined in plain English. Tap a letter to jump.
        </p>
      </div>

      <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 mb-6 border-y border-border bg-background/90 px-4 sm:px-6 py-3 backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms or definitions…"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {ALPHABET.map((l) => {
            const has = activeLetters.has(l);
            const isActive = has && activeLetter === l;
            return (
              <a
                key={l}
                href={has ? `#letter-${l}` : undefined}
                aria-disabled={!has}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex size-7 sm:size-8 items-center justify-center rounded-md text-[11px] sm:text-xs font-bold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/40"
                    : has
                      ? "bg-card text-primary hover:bg-primary hover:text-primary-foreground"
                      : "cursor-default text-muted-foreground/40"
                }`}
              >
                {l}
              </a>
            );
          })}
        </div>
      </div>

      {grouped.size === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No terms match "{query}".
        </div>
      ) : (
        <div className="space-y-8">
          {Array.from(grouped.entries()).map(([letter, items]) => (
            <section
              key={letter}
              id={`letter-${letter}`}
              data-letter={letter}
              ref={(el) => {
                if (el) sectionRefs.current.set(letter, el);
                else sectionRefs.current.delete(letter);
              }}
              className="scroll-mt-32"
            >
              <h2 className="mb-3 flex items-center gap-3 font-display text-2xl font-black text-primary">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  {letter}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {items.length} term{items.length === 1 ? "" : "s"}
                </span>
              </h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                {items.map(([term, def]) => {
                  const slug = termSlug(term);
                  const hl = highlightedTerm === slug;
                  return (
                    <div
                      key={term}
                      id={`term-${slug}`}
                      className={`scroll-mt-32 rounded-xl border bg-card p-4 transition ${
                        hl
                          ? "border-[color:var(--brand-orange)] ring-2 ring-[color:var(--brand-orange)]/40 shadow-md"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <dt className="font-display text-base font-bold capitalize text-primary">
                        {term}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-foreground/85">{def}</dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
