import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { MODULES } from "@/lib/modules";
import { ModuleCard } from "@/components/cric-ui";

export const Route = createFileRoute("/explore/")({
  head: () => ({
    meta: [
      { title: "Explore Topics — CricScience" },
      { name: "description", content: "All cricket science modules: bowling, batting, fielding, pitch, ball, environment, fitness and umpiring." },
      { property: "og:title", content: "Explore Topics — CricScience" },
      { property: "og:description", content: "Every module of cricket science, in one place." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [q, setQ] = useState("");

  const filtered = MODULES.filter(m => {
    return !q || (m.title + m.tagline + m.intro).toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Explore the science</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Pick a module, set your level, and start learning. Every lesson is short, visual and grounded in the science of the game.</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search modules..." className="w-full rounded-xl border border-border bg-card pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(m => <ModuleCard key={m.slug} module={m} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No modules match — try a different search or level.</div>
      )}
    </div>
  );
}
