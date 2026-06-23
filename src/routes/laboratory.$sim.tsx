import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FlaskConical, Play } from "lucide-react";
import { LABORATORY_SIMS } from "@/lib/modules";
import { useUser } from "@/lib/user-state";
import { Diagram } from "@/components/cric-ui";

export const Route = createFileRoute("/laboratory/$sim")({
  loader: ({ params }) => {
    const sim = LABORATORY_SIMS.find(s => s.slug === params.sim);
    if (!sim) throw notFound();
    return { sim };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.sim.title} — Cricket Laboratory` },
          { name: "description", content: loaderData.sim.summary },
          { property: "og:title", content: `${loaderData.sim.title} — CricScience Lab` },
          { property: "og:description", content: loaderData.sim.summary },
        ]
      : [],
  }),
  component: SimPage,
  notFoundComponent: () => <div className="p-10 text-center">Simulation not found.</div>,
});

function SimPage() {
  const { sim } = Route.useLoaderData();
  const { visitLab } = useUser();
  useEffect(() => { visitLab(sim.slug); }, [sim.slug]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link to="/laboratory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-4" /> All simulations
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{sim.title}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">{sim.summary}</p>

      <SimBody slug={sim.slug} />

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-primary mb-1"><FlaskConical className="size-4" /> Demo mode</div>
        Full interactive physics sandbox coming next. The visual below illustrates the concept.
      </div>
    </div>
  );
}

function SimBody({ slug }: { slug: string }) {
  if (slug === "swing-simulator") return <SwingSim />;
  if (slug === "trajectory-plotter") return <div className="mt-8"><Diagram kind="trajectory" /></div>;
  if (slug === "pitch-map") return <div className="mt-8"><Diagram kind="pitch" /></div>;
  if (slug === "spin-revs") return <SpinSim />;
  if (slug === "reaction-trainer") return <ReactionTrainer />;
  return null;
}

function SwingSim() {
  const [angle, setAngle] = useState(15);
  const [speed, setSpeed] = useState(135);
  const swingType = speed >= 138 && angle < 25 ? "Reverse swing" : angle >= 10 && angle <= 25 ? "Conventional swing" : "Minimal swing";
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6 items-start">
      <Diagram kind="swing" />
      <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
        <Field label={`Seam angle: ${angle}°`}>
          <input type="range" min={0} max={45} value={angle} onChange={e => setAngle(+e.target.value)} className="w-full accent-[color:var(--brand-orange)]" />
        </Field>
        <Field label={`Release speed: ${speed} km/h`}>
          <input type="range" min={110} max={155} value={speed} onChange={e => setSpeed(+e.target.value)} className="w-full accent-[color:var(--brand-orange)]" />
        </Field>
        <div className="rounded-xl bg-surface p-4">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Predicted</div>
          <div className="mt-1 font-display text-xl font-bold text-primary">{swingType}</div>
        </div>
      </div>
    </div>
  );
}

function SpinSim() {
  const [rpm, setRpm] = useState(1800);
  const dip = Math.round((rpm / 100) * 1.2);
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6">
      <Field label={`Revolutions: ${rpm} RPM`}>
        <input type="range" min={500} max={3000} step={50} value={rpm} onChange={e => setRpm(+e.target.value)} className="w-full accent-[color:var(--brand-green)]" />
      </Field>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Stat label="Dip" value={`${dip} cm`} />
        <Stat label="Drift" value={`${Math.round(rpm / 200)} cm`} />
        <Stat label="Turn (off pitch)" value={`${(rpm / 600).toFixed(1)}°`} />
      </div>
    </div>
  );
}

function ReactionTrainer() {
  const [state, setState] = useState<"idle" | "wait" | "go" | "done">("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const start = () => {
    setState("wait");
    setMs(null);
    const delay = 800 + Math.random() * 2200;
    setTimeout(() => {
      setStartedAt(performance.now());
      setState("go");
    }, delay);
  };
  const click = () => {
    if (state === "go") { setMs(Math.round(performance.now() - startedAt)); setState("done"); }
    else if (state === "wait") { setState("idle"); setMs(null); }
  };

  return (
    <div className="mt-8">
      <button
        onClick={state === "idle" || state === "done" ? start : click}
        className={`w-full rounded-2xl py-16 text-center font-display text-2xl font-bold text-white transition ${
          state === "go" ? "bg-[color:var(--brand-green)]" : state === "wait" ? "bg-destructive" : "bg-primary"
        }`}
      >
        {state === "idle" && <span><Play className="inline size-6 mb-1" /> Start</span>}
        {state === "wait" && "Wait for green..."}
        {state === "go" && "TAP NOW!"}
        {state === "done" && `${ms} ms — tap to retry`}
      </button>
      <p className="mt-3 text-sm text-muted-foreground text-center">Elite batters react in 180-220 ms. The fastest humans hover near 150 ms.</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-sm font-medium text-foreground mb-2">{label}</div>{children}</label>;
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-surface p-3"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 font-display font-bold text-primary">{value}</div></div>;
}
