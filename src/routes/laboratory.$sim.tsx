import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FlaskConical, Play, RotateCcw } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";
import { Line, Bar, Radar, Doughnut } from "react-chartjs-2";
import { LABORATORY_SIMS } from "@/lib/modules";
import { useUser } from "@/lib/user-state";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title,
);

// Shared chart styling — semantic-token aware
const BRAND_ORANGE = "rgb(255, 140, 0)";
const BRAND_ORANGE_SOFT = "rgba(255, 140, 0, 0.18)";
const BRAND_GREEN = "rgb(39, 174, 96)";
const BRAND_GREEN_SOFT = "rgba(39, 174, 96, 0.18)";
const BRAND_NAVY = "rgb(11, 31, 58)";
const BRAND_NAVY_SOFT = "rgba(11, 31, 58, 0.18)";

const baseChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "rgb(120,120,130)", font: { size: 11 } } },
    tooltip: { backgroundColor: BRAND_NAVY, padding: 10, cornerRadius: 8 },
  },
  scales: {
    x: { ticks: { color: "rgb(140,140,150)" }, grid: { color: "rgba(140,140,150,0.12)" } },
    y: { ticks: { color: "rgb(140,140,150)" }, grid: { color: "rgba(140,140,150,0.12)" } },
  },
};

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
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">
      {error instanceof Error ? error.message : "Something went wrong."}
    </div>
  ),
});

function SimPage() {
  const { sim } = Route.useLoaderData();
  const { visitLab } = useUser();
  useEffect(() => { visitLab(sim.slug); }, [sim.slug]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link to="/laboratory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="size-4" /> All simulations
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">{sim.title}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">{sim.summary}</p>

      <SimBody slug={sim.slug} />

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-primary mb-1">
          <FlaskConical className="size-4" /> Demo mode
        </div>
        Outputs and graphs use illustrative dummy values. Real physics models plug in next.
      </div>
    </div>
  );
}

function SimBody({ slug }: { slug: string }) {
  switch (slug) {
    case "spin-simulator": return <SpinSimulator />;
    case "swing-simulator": return <SwingSimulator />;
    case "pitch-builder": return <PitchBuilder />;
    case "bat-builder": return <BatBuilder />;
    case "reaction-time-test": return <ReactionTimeTest />;
    case "field-placement-simulator": return <FieldPlacementSimulator />;
    default: return null;
  }
}

/* =========================================================================
   Shared UI
   ========================================================================= */

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-3 space-y-4">{children}</div>
    </div>
  );
}

function Slider({
  label, value, min, max, step = 1, unit, onChange, accent = "orange",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
  accent?: "orange" | "green" | "navy";
}) {
  const accentClass = accent === "green"
    ? "accent-[color:var(--brand-green)]"
    : accent === "navy" ? "accent-primary" : "accent-[color:var(--brand-orange)]";
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {value}{unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
        className={`mt-2 w-full ${accentClass}`}
      />
      <div className="mt-0.5 flex justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>{min}{unit ? ` ${unit}` : ""}</span>
        <span>{max}{unit ? ` ${unit}` : ""}</span>
      </div>
    </label>
  );
}

function Select<T extends string>({
  label, value, options, onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function OutputCard({
  label, value, unit, accent = "orange",
}: {
  label: string; value: string | number; unit?: string;
  accent?: "orange" | "green" | "navy";
}) {
  const color = accent === "green"
    ? "text-[color:var(--brand-green)]"
    : accent === "navy" ? "text-primary" : "text-[color:var(--brand-orange)]";
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-2xl font-bold ${color}`}>
        {value}{unit ? <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span> : null}
      </div>
    </div>
  );
}

function ChartFrame({ children, height = 280 }: { children: React.ReactNode; height?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div style={{ height }}>{children}</div>
    </div>
  );
}

/* =========================================================================
   Spin Simulator
   ========================================================================= */

const PITCH_TYPES = ["Hard / true", "Subcontinent dust", "Green seamer", "Day-5 worn"] as const;
type PitchType = (typeof PITCH_TYPES)[number];

function SpinSimulator() {
  const [rpm, setRpm] = useState(2000);
  const [speed, setSpeed] = useState(85);
  const [angle, setAngle] = useState(2);
  const [pitch, setPitch] = useState<PitchType>("Subcontinent dust");
  const [humidity, setHumidity] = useState(55);
  const [wind, setWind] = useState(8);

  // Dummy formulas: enough variation to feel real.
  const pitchBoost = { "Hard / true": 0.6, "Subcontinent dust": 1.4, "Green seamer": 0.9, "Day-5 worn": 1.7 }[pitch];
  const drift  = +(rpm / 800 + wind * 0.05).toFixed(1);
  const dip    = +(rpm / 1100 + Math.max(0, angle) * 0.2).toFixed(1);
  const turn   = +((rpm / 700) * pitchBoost).toFixed(1);
  const bounce = +(Math.min(2.4, 0.6 + (90 - speed) * 0.02 + pitchBoost * 0.3)).toFixed(2);

  // Trajectory chart — approximate dip/drift curve over flight (0 = release, 20 = bounce)
  const flight = Array.from({ length: 21 }, (_, i) => i);
  const dipCurve   = flight.map(t => +(dip * (t / 20) ** 2).toFixed(2));
  const driftCurve = flight.map(t => +(drift * (t / 20) ** 1.6).toFixed(2));

  const lineData = {
    labels: flight.map(t => `${t}`),
    datasets: [
      { label: "Dip (cm)",   data: dipCurve,   borderColor: BRAND_ORANGE, backgroundColor: BRAND_ORANGE_SOFT, fill: true, tension: 0.35, pointRadius: 0 },
      { label: "Drift (cm)", data: driftCurve, borderColor: BRAND_GREEN,  backgroundColor: BRAND_GREEN_SOFT,  fill: true, tension: 0.35, pointRadius: 0 },
    ],
  };

  const barData = {
    labels: ["Drift", "Dip", "Turn", "Bounce"],
    datasets: [{
      label: "Output magnitude",
      data: [drift, dip, turn, bounce * 5],
      backgroundColor: [BRAND_GREEN_SOFT, BRAND_ORANGE_SOFT, BRAND_NAVY_SOFT, "rgba(120,120,130,0.2)"],
      borderColor: [BRAND_GREEN, BRAND_ORANGE, BRAND_NAVY, "rgb(120,120,130)"],
      borderWidth: 1.5, borderRadius: 6,
    }],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title="Inputs">
        <Slider label="RPM" value={rpm} min={500} max={3000} step={50} onChange={setRpm} />
        <Slider label="Release speed" value={speed} min={70} max={140} unit="km/h" onChange={setSpeed} accent="green" />
        <Slider label="Release angle" value={angle} min={-5} max={15} unit="°" onChange={setAngle} />
        <Select label="Pitch type" value={pitch} options={PITCH_TYPES} onChange={setPitch} />
        <Slider label="Humidity" value={humidity} min={20} max={95} unit="%" onChange={setHumidity} accent="green" />
        <Slider label="Wind (cross)" value={wind} min={0} max={30} unit="km/h" onChange={setWind} accent="navy" />
      </Panel>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <OutputCard label="Drift"  value={drift}  unit="cm" accent="green" />
          <OutputCard label="Dip"    value={dip}    unit="cm" accent="orange" />
          <OutputCard label="Turn"   value={turn}   unit="°"  accent="navy" />
          <OutputCard label="Bounce" value={bounce} unit="m"  accent="orange" />
        </div>
        <ChartFrame>
          <Line data={lineData} options={{ ...baseChartOpts, plugins: { ...baseChartOpts.plugins, title: { display: true, text: "Flight curve — release → bounce", color: BRAND_NAVY, font: { weight: "bold", size: 13 } } } }} />
        </ChartFrame>
        <ChartFrame height={220}>
          <Bar data={barData} options={baseChartOpts} />
        </ChartFrame>
      </div>
    </div>
  );
}

/* =========================================================================
   Swing Simulator
   ========================================================================= */

const BALL_WEAR_OPTIONS = ["New", "Worn (15 ov)", "Old (40 ov)", "Reverse-ready (60 ov)"] as const;
type BallWear = (typeof BALL_WEAR_OPTIONS)[number];

function SwingSimulator() {
  const [seam, setSeam] = useState(18);
  const [speed, setSpeed] = useState(135);
  const [shine, setShine] = useState(70);
  const [wear, setWear] = useState<BallWear>("Worn (15 ov)");
  const [humidity, setHumidity] = useState(60);

  const reverseReady = wear === "Reverse-ready (60 ov)" && speed >= 135;
  const conventional = !reverseReady && seam >= 10 && seam <= 28 && shine >= 50;
  const direction = reverseReady ? "Reverse (toward shiny)" : conventional ? "Conventional (away)" : "Minimal";
  const magnitude = +(
    (conventional ? (seam / 25) * (shine / 100) * (speed / 140) * 60 : 0) +
    (reverseReady ? (speed - 130) * 4 : 0) +
    humidity * 0.08
  ).toFixed(1);

  // Trajectory: x = down pitch (m), y = lateral (cm)
  const downPitch = Array.from({ length: 21 }, (_, i) => +(i * 1).toFixed(0));
  const lateral = downPitch.map(x => +((magnitude * (x / 20) ** 2 * (reverseReady ? -1 : 1)) / 1).toFixed(1));

  const data = {
    labels: downPitch.map(x => `${x}m`),
    datasets: [{
      label: "Lateral movement (cm)",
      data: lateral,
      borderColor: reverseReady ? BRAND_GREEN : BRAND_ORANGE,
      backgroundColor: reverseReady ? BRAND_GREEN_SOFT : BRAND_ORANGE_SOFT,
      fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
    }],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title="Inputs">
        <Slider label="Seam angle" value={seam} min={0} max={45} unit="°" onChange={setSeam} />
        <Slider label="Release speed" value={speed} min={110} max={155} unit="km/h" onChange={setSpeed} accent="green" />
        <Slider label="Shine (polished side)" value={shine} min={0} max={100} unit="%" onChange={setShine} />
        <Select label="Ball wear" value={wear} options={BALL_WEAR_OPTIONS} onChange={setWear} />
        <Slider label="Humidity" value={humidity} min={20} max={95} unit="%" onChange={setHumidity} accent="navy" />
      </Panel>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <OutputCard label="Swing type" value={direction} accent="navy" />
          <OutputCard label="Lateral move" value={Math.abs(magnitude)} unit="cm" accent={reverseReady ? "green" : "orange"} />
          <OutputCard label="Late-swing onset" value={reverseReady ? "13.5m" : "11.0m"} accent="navy" />
        </div>
        <ChartFrame>
          <Line data={data} options={{ ...baseChartOpts, plugins: { ...baseChartOpts.plugins, title: { display: true, text: "Lateral movement vs distance down pitch", color: BRAND_NAVY, font: { weight: "bold", size: 13 } } } }} />
        </ChartFrame>
      </div>
    </div>
  );
}

/* =========================================================================
   Pitch Builder
   ========================================================================= */

function PitchBuilder() {
  const [grass, setGrass] = useState(8);
  const [clay, setClay] = useState(55);
  const [moisture, setMoisture] = useState(30);
  const [temp, setTemp] = useState(28);
  const [rolling, setRolling] = useState(45);

  const bounce = +Math.max(0, ((clay - 30) * 0.04 + rolling * 0.012 + (1 - moisture / 200))).toFixed(2);
  const turn   = +Math.max(0, ((100 - clay) * 0.05 + (moisture < 40 ? 1.2 : 0.4) + (temp - 20) * 0.03)).toFixed(2);
  const swing  = +Math.max(0, (grass * 0.6 + moisture * 0.08 - (temp - 22) * 0.1)).toFixed(2);

  const radar = {
    labels: ["Bounce", "Turn", "Swing assistance", "Pace", "Wear-rate"],
    datasets: [{
      label: "Pitch profile",
      data: [bounce, turn, swing, +(clay * 0.05 + rolling * 0.01).toFixed(2), +(10 - rolling * 0.08).toFixed(2)],
      backgroundColor: BRAND_GREEN_SOFT,
      borderColor: BRAND_GREEN,
      borderWidth: 2,
      pointBackgroundColor: BRAND_GREEN,
    }],
  };

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  const evolution = {
    labels: days,
    datasets: [
      { label: "Bounce",            data: days.map((_, i) => +(bounce * (1 - i * 0.08)).toFixed(2)),               borderColor: BRAND_ORANGE, backgroundColor: BRAND_ORANGE_SOFT, tension: 0.35, pointRadius: 3 },
      { label: "Turn",              data: days.map((_, i) => +(turn * (0.6 + i * 0.15)).toFixed(2)),               borderColor: BRAND_GREEN,  backgroundColor: BRAND_GREEN_SOFT,  tension: 0.35, pointRadius: 3 },
      { label: "Swing assistance",  data: days.map((_, i) => +(swing * Math.max(0.1, 1 - i * 0.25)).toFixed(2)),   borderColor: BRAND_NAVY,   backgroundColor: BRAND_NAVY_SOFT,   tension: 0.35, pointRadius: 3 },
    ],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title="Inputs">
        <Slider label="Grass cover" value={grass} min={0} max={20} unit="mm" onChange={setGrass} accent="green" />
        <Slider label="Clay percentage" value={clay} min={20} max={80} unit="%" onChange={setClay} />
        <Slider label="Moisture" value={moisture} min={0} max={100} unit="%" onChange={setMoisture} accent="navy" />
        <Slider label="Temperature" value={temp} min={10} max={45} unit="°C" onChange={setTemp} />
        <Slider label="Rolling time" value={rolling} min={0} max={120} unit="min" onChange={setRolling} accent="green" />
      </Panel>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <OutputCard label="Expected bounce" value={bounce} unit="m" accent="orange" />
          <OutputCard label="Expected turn"   value={turn}   unit="°" accent="green"  />
          <OutputCard label="Swing assist"    value={swing}  unit="idx" accent="navy" />
        </div>
        <ChartFrame height={320}>
          <Radar data={radar} options={{
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "rgb(120,120,130)" } } },
            scales: { r: { angleLines: { color: "rgba(140,140,150,0.2)" }, grid: { color: "rgba(140,140,150,0.18)" }, pointLabels: { color: "rgb(110,110,120)", font: { size: 11 } }, ticks: { display: false } } },
          }} />
        </ChartFrame>
        <ChartFrame>
          <Line data={evolution} options={{ ...baseChartOpts, plugins: { ...baseChartOpts.plugins, title: { display: true, text: "Pitch evolution across a Test", color: BRAND_NAVY, font: { weight: "bold", size: 13 } } } }} />
        </ChartFrame>
      </div>
    </div>
  );
}

/* =========================================================================
   Bat Builder
   ========================================================================= */

const WILLOW_GRADES = ["Grade 1+", "Grade 1", "Grade 2", "Grade 3", "Kashmir"] as const;
type WillowGrade = (typeof WILLOW_GRADES)[number];

function BatBuilder() {
  const [grade, setGrade] = useState<WillowGrade>("Grade 1");
  const [weight, setWeight] = useState(1180); // grams
  const [edge, setEdge] = useState(38);       // mm
  const [sweet, setSweet] = useState(220);    // mm from toe
  const [pickup, setPickup] = useState(7);

  const gradeFactor = { "Grade 1+": 1.10, "Grade 1": 1.0, "Grade 2": 0.92, "Grade 3": 0.83, "Kashmir": 0.72 }[grade];
  const swingSpeed   = +(125 * (1200 / weight) * (pickup / 7)).toFixed(1);
  const powerTransfer = +(gradeFactor * (edge / 38) * (1 - Math.abs(sweet - 220) / 400) * 100).toFixed(1);
  const exitVelocity  = +(swingSpeed * (powerTransfer / 100) * 0.95).toFixed(1);

  const radar = {
    labels: ["Swing speed", "Power", "Sweet-spot size", "Pickup", "Durability"],
    datasets: [{
      label: grade,
      data: [
        +(swingSpeed / 1.5).toFixed(0),
        +powerTransfer.toFixed(0),
        +(edge * 2).toFixed(0),
        +(pickup * 12).toFixed(0),
        +(gradeFactor * 90).toFixed(0),
      ],
      backgroundColor: BRAND_ORANGE_SOFT,
      borderColor: BRAND_ORANGE,
      borderWidth: 2,
      pointBackgroundColor: BRAND_ORANGE,
    }],
  };

  const donut = {
    labels: ["Sweet spot", "Edge", "Splice"],
    datasets: [{
      data: [55, 30, 15],
      backgroundColor: [BRAND_ORANGE, BRAND_GREEN, BRAND_NAVY_SOFT],
      borderWidth: 0,
    }],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title="Inputs">
        <Select label="Willow grade" value={grade} options={WILLOW_GRADES} onChange={setGrade} />
        <Slider label="Weight" value={weight} min={1050} max={1350} step={10} unit="g" onChange={setWeight} accent="green" />
        <Slider label="Edge thickness" value={edge} min={28} max={48} unit="mm" onChange={setEdge} />
        <Slider label="Sweet-spot height" value={sweet} min={150} max={280} step={5} unit="mm" onChange={setSweet} accent="navy" />
        <Slider label="Pickup feel" value={pickup} min={1} max={10} onChange={setPickup} />
      </Panel>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <OutputCard label="Swing speed"     value={swingSpeed}     unit="km/h" accent="orange" />
          <OutputCard label="Power transfer"  value={powerTransfer}  unit="%"    accent="green"  />
          <OutputCard label="Exit velocity"   value={exitVelocity}   unit="km/h" accent="navy"   />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ChartFrame height={300}>
            <Radar data={radar} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "rgb(120,120,130)" } } },
              scales: { r: { angleLines: { color: "rgba(140,140,150,0.2)" }, grid: { color: "rgba(140,140,150,0.18)" }, pointLabels: { color: "rgb(110,110,120)", font: { size: 11 } }, ticks: { display: false } } },
            }} />
          </ChartFrame>
          <ChartFrame height={300}>
            <Doughnut data={donut} options={{
              responsive: true, maintainAspectRatio: false, cutout: "60%",
              plugins: { legend: { labels: { color: "rgb(120,120,130)" } }, title: { display: true, text: "Contact-zone weighting", color: BRAND_NAVY, font: { weight: "bold", size: 12 } } },
            }} />
          </ChartFrame>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Reaction Time Test
   ========================================================================= */

function ReactionTimeTest() {
  const [state, setState] = useState<"idle" | "wait" | "go" | "done">("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

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
    if (state === "go") {
      const took = Math.round(performance.now() - startedAt);
      setMs(took);
      setHistory(h => [...h.slice(-9), took]);
      setState("done");
    } else if (state === "wait") {
      setState("idle");
      setMs(null);
    }
  };
  const reset = () => { setHistory([]); setMs(null); setState("idle"); };

  const avg = history.length ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;
  const best = history.length ? Math.min(...history) : null;

  const data = {
    labels: history.map((_, i) => `#${i + 1}`),
    datasets: [
      { label: "Your attempts (ms)", data: history, borderColor: BRAND_ORANGE, backgroundColor: BRAND_ORANGE_SOFT, fill: true, tension: 0.3, pointRadius: 4 },
      { label: "Elite batter (~210ms)", data: history.map(() => 210), borderColor: BRAND_GREEN, borderDash: [4, 4], pointRadius: 0 },
    ],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <button
          onClick={state === "idle" || state === "done" ? start : click}
          className={`w-full rounded-2xl py-20 text-center font-display text-2xl font-bold text-white transition ${
            state === "go" ? "bg-[color:var(--brand-green)]" : state === "wait" ? "bg-destructive" : "bg-primary"
          }`}
        >
          {state === "idle" && <span><Play className="inline size-6 mb-1" /> Start</span>}
          {state === "wait" && "Wait for green..."}
          {state === "go" && "TAP NOW!"}
          {state === "done" && `${ms} ms — tap to retry`}
        </button>
        <ChartFrame height={240}>
          {history.length > 0 ? (
            <Line data={data} options={{ ...baseChartOpts, scales: { ...baseChartOpts.scales, y: { ...baseChartOpts.scales.y, suggestedMin: 100, suggestedMax: 500 } } }} />
          ) : (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              Take a few attempts to see your reaction curve.
            </div>
          )}
        </ChartFrame>
      </div>

      <Panel title="Stats">
        <div className="grid grid-cols-2 gap-3">
          <OutputCard label="Last"    value={ms ?? "—"}    unit={ms ? "ms" : undefined} accent="orange" />
          <OutputCard label="Best"    value={best ?? "—"}  unit={best ? "ms" : undefined} accent="green"  />
          <OutputCard label="Average" value={avg ?? "—"}   unit={avg ? "ms" : undefined} accent="navy"   />
          <OutputCard label="Attempts" value={history.length} accent="navy" />
        </div>
        <div className="rounded-xl bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
          Elite international batters react in <span className="font-semibold text-foreground">180–220 ms</span>. The fastest humans hover near 150 ms.
        </div>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
          <RotateCcw className="size-4" /> Reset history
        </button>
      </Panel>
    </div>
  );
}

/* =========================================================================
   Field Placement Simulator
   ========================================================================= */

type Fielder = { id: number; x: number; y: number; label: string };

const DEFAULT_FIELDERS: Fielder[] = [
  { id: 1, x: 50, y: 12, label: "Slip" },
  { id: 2, x: 38, y: 20, label: "Gully" },
  { id: 3, x: 28, y: 42, label: "Point" },
  { id: 4, x: 24, y: 62, label: "Cover" },
  { id: 5, x: 50, y: 78, label: "Mid-off" },
  { id: 6, x: 76, y: 62, label: "Mid-on" },
  { id: 7, x: 86, y: 42, label: "Sq leg" },
  { id: 8, x: 78, y: 22, label: "Fine leg" },
  { id: 9, x: 50, y: 50, label: "Keeper" },
];

function FieldPlacementSimulator() {
  const [fielders, setFielders] = useState<Fielder[]>(DEFAULT_FIELDERS);
  const [drag, setDrag] = useState<number | null>(null);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (drag === null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFielders(fs => fs.map(f => f.id === drag ? { ...f, x: clamp(x, 4, 96), y: clamp(y, 4, 96) } : f));
  };

  // Dummy wagon-wheel zone coverage
  const zoneCoverage = useMemo(() => {
    const zones = ["3rd man", "Point", "Cover", "Mid-off", "Mid-on", "Mid-wkt", "Sq leg", "Fine leg"];
    const angles = [22, 60, 110, 160, 200, 250, 290, 338];
    return zones.map((z, i) => {
      const cx = 50 + Math.cos(angles[i] * Math.PI / 180) * 35;
      const cy = 50 + Math.sin(angles[i] * Math.PI / 180) * 35;
      const nearest = Math.min(...fielders.map(f => Math.hypot(f.x - cx, f.y - cy)));
      // Inverse: closer = better coverage
      return { zone: z, coverage: Math.max(0, Math.round(100 - nearest * 4)) };
    });
  }, [fielders]);

  const bar = {
    labels: zoneCoverage.map(z => z.zone),
    datasets: [{
      label: "Zone coverage (%)",
      data: zoneCoverage.map(z => z.coverage),
      backgroundColor: BRAND_GREEN_SOFT,
      borderColor: BRAND_GREEN,
      borderWidth: 1.5, borderRadius: 6,
    }],
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-card p-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full touch-none select-none"
          onPointerMove={onMove}
          onPointerUp={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* Outfield */}
          <circle cx="50" cy="50" r="48" fill="rgba(39,174,96,0.12)" stroke="rgba(39,174,96,0.5)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(39,174,96,0.5)" strokeDasharray="1.2 1.2" strokeWidth="0.3" />
          {/* Pitch */}
          <rect x="47.5" y="38" width="5" height="24" fill="rgba(255,200,140,0.4)" stroke="rgba(140,90,40,0.6)" strokeWidth="0.2" />
          {/* Wagon wheel guides */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45) * Math.PI / 180;
            return <line key={i} x1="50" y1="50" x2={50 + Math.cos(a) * 48} y2={50 + Math.sin(a) * 48} stroke="rgba(140,140,150,0.18)" strokeWidth="0.2" />;
          })}
          {/* Fielders */}
          {fielders.map(f => (
            <g key={f.id} onPointerDown={() => setDrag(f.id)} style={{ cursor: "grab" }}>
              <circle cx={f.x} cy={f.y} r="2.2" fill={BRAND_ORANGE} stroke="white" strokeWidth="0.5" />
              <text x={f.x} y={f.y - 3} textAnchor="middle" fontSize="2.2" fill={BRAND_NAVY} className="font-bold">
                {f.label}
              </text>
            </g>
          ))}
        </svg>
        <p className="mt-2 text-xs text-muted-foreground">Drag any fielder to reposition. Coverage updates live.</p>
      </div>

      <div className="space-y-4">
        <Panel title="Outputs">
          <div className="grid grid-cols-2 gap-3">
            <OutputCard label="Off-side coverage" value={Math.round((zoneCoverage[0].coverage + zoneCoverage[1].coverage + zoneCoverage[2].coverage + zoneCoverage[3].coverage) / 4)} unit="%" accent="green" />
            <OutputCard label="Leg-side coverage" value={Math.round((zoneCoverage[4].coverage + zoneCoverage[5].coverage + zoneCoverage[6].coverage + zoneCoverage[7].coverage) / 4)} unit="%" accent="orange" />
          </div>
          <button onClick={() => setFielders(DEFAULT_FIELDERS)} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
            <RotateCcw className="size-4" /> Reset field
          </button>
        </Panel>
        <ChartFrame height={260}>
          <Bar data={bar} options={{ ...baseChartOpts, scales: { ...baseChartOpts.scales, y: { ...baseChartOpts.scales.y, suggestedMin: 0, suggestedMax: 100 } } }} />
        </ChartFrame>
      </div>
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
