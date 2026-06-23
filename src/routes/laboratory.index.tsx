import { createFileRoute, Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { LABORATORY_SIMS } from "@/lib/modules";

export const Route = createFileRoute("/laboratory/")({
  head: () => ({
    meta: [
      { title: "Cricket Laboratory — CricScience" },
      { name: "description", content: "Interactive simulations: swing, trajectory, pitch maps, spin RPM and reaction-time trainers." },
      { property: "og:title", content: "Cricket Laboratory — CricScience" },
      { property: "og:description", content: "Play with the physics of cricket." },
    ],
  }),
  component: Laboratory,
});

function Laboratory() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-start gap-4 mb-8">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><FlaskConical className="size-6" /></span>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">Cricket Laboratory</h1>
          <p className="mt-1 text-muted-foreground max-w-2xl">Hands-on simulations to feel the physics of the game. Tweak inputs, watch outputs.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LABORATORY_SIMS.map(s => {
          const Icon = (Icons as any)[s.icon] ?? FlaskConical;
          return (
            <Link key={s.slug} to="/laboratory/$sim" params={{ sim: s.slug }} className="card-hover rounded-2xl border border-border bg-card p-5">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[color:var(--brand-orange)]/10 text-[color:var(--brand-orange)]"><Icon className="size-5" /></span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Open sim <ArrowRight className="size-4" /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
