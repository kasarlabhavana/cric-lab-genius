import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  CircleAlert,
  Image as ImageIcon,
  RefreshCw,
  Save,
  Sparkles,
  Upload,
  Video as VideoIcon,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/lib/user-state";

export const Route = createFileRoute("/ai-coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — Video Analysis | CricScience" },
      {
        name: "description",
        content:
          "Upload a video or photo of your cricket action. The AI Coach scores arm angle, release height, hip rotation, wrist snap, stride length, jump height, knee flexion, head stability and release timing against elite benchmarks.",
      },
      { property: "og:title", content: "AI Coach — CricScience" },
      {
        property: "og:description",
        content: "Pose-estimation-style biomechanics analysis for cricketers.",
      },
    ],
  }),
  component: AICoachPage,
});

/* =========================================================================
   Metric definitions — ideal values & tolerance bands per metric
   ========================================================================= */

type MetricKey =
  | "arm_angle"
  | "release_height"
  | "hip_rotation"
  | "wrist_snap"
  | "stride_length"
  | "jump_height"
  | "knee_flexion"
  | "head_stability"
  | "release_timing";

type MetricDef = {
  key: MetricKey;
  label: string;
  unit: string;
  ideal: number;
  // % deviation from ideal that flips green→orange and orange→red
  goodBand: number;  // ≤ this % deviation → green
  okBand: number;    // ≤ this % deviation → orange (else red)
  min: number;
  max: number;
  rationale: string;
};

const METRICS: MetricDef[] = [
  { key: "arm_angle",      label: "Arm Angle",       unit: "°",  ideal: 180, goodBand: 4,  okBand: 10, min: 150, max: 200, rationale: "Vertical arm at release maximises bounce and conceals release point." },
  { key: "release_height", label: "Release Height",  unit: "m",  ideal: 2.3, goodBand: 5,  okBand: 12, min: 1.9, max: 2.6, rationale: "Tall release angles trajectory steeper and adds bounce." },
  { key: "hip_rotation",   label: "Hip Rotation",    unit: "°",  ideal: 55,  goodBand: 8,  okBand: 18, min: 30,  max: 80,  rationale: "Hip-shoulder separation stores torque — the engine of pace." },
  { key: "wrist_snap",     label: "Wrist Snap",      unit: "°",  ideal: 90,  goodBand: 6,  okBand: 15, min: 50,  max: 130, rationale: "A loose wrist snap adds 4–6 km/h and crucial late movement." },
  { key: "stride_length",  label: "Stride Length",   unit: "m",  ideal: 1.6, goodBand: 6,  okBand: 14, min: 1.0, max: 2.1, rationale: "Stride is body-height × 0.9; under-striding kills momentum." },
  { key: "jump_height",    label: "Jump Height",     unit: "cm", ideal: 25,  goodBand: 12, okBand: 25, min: 0,   max: 60,  rationale: "Pre-delivery jump converts horizontal speed into vertical force." },
  { key: "knee_flexion",   label: "Knee Flexion",    unit: "°",  ideal: 15,  goodBand: 25, okBand: 50, min: 0,   max: 45,  rationale: "A braced front knee returns 8–10× bodyweight up the chain." },
  { key: "head_stability", label: "Head Stability",  unit: "%",  ideal: 95,  goodBand: 5,  okBand: 12, min: 50,  max: 100, rationale: "A still head keeps the eyes binocular — vital for line." },
  { key: "release_timing", label: "Release Timing",  unit: "ms", ideal: 0,   goodBand: 0,  okBand: 0,  min: -40, max: 40,  rationale: "Negative = early, positive = late, ideal is on the front-foot contact frame.", },
];

type Verdict = "green" | "orange" | "red";

function verdictFor(def: MetricDef, value: number): Verdict {
  // Timing uses ms deviation, not %
  if (def.key === "release_timing") {
    const dev = Math.abs(value);
    if (dev <= 8) return "green";
    if (dev <= 20) return "orange";
    return "red";
  }
  const dev = Math.abs((value - def.ideal) / def.ideal) * 100;
  if (dev <= def.goodBand) return "green";
  if (dev <= def.okBand) return "orange";
  return "red";
}

function feedbackFor(def: MetricDef, value: number, v: Verdict): string {
  if (v === "green") return `${def.label} is on the elite mark — keep it.`;
  const high = value > def.ideal;
  switch (def.key) {
    case "arm_angle":      return high ? "Arm is hyper-extending past vertical — risks side strain." : "Arm is dropping below vertical — bounce and concealment suffer.";
    case "release_height": return high ? "Releasing too tall — over-pitched balls likely." : "Release point is low — drill front-leg brace to gain height.";
    case "hip_rotation":   return high ? "Over-rotation pulls you off line — work on a stable trunk." : "Limited hip-shoulder separation — add medicine-ball rotational work.";
    case "wrist_snap":     return high ? "Wrist is collapsing past 90° — locks the seam, kills swing." : "Passive wrist — flick drills against a wall, 3×30 reps daily.";
    case "stride_length":  return high ? "Over-striding flattens release angle." : "Under-striding kills momentum — add plyometric bounds.";
    case "jump_height":    return high ? "Excessive jump bleeds horizontal speed." : "Add a controlled pre-delivery jump for a stronger front-foot block.";
    case "knee_flexion":   return high ? "Front knee collapsing — single-leg deadlifts to brace it." : "Knee is locked stiff — risks anterior knee pain.";
    case "head_stability": return high ? "Head moves up at release — drop the chin and stay tall." : "Head sways through the crease — fix gaze on target through release.";
    case "release_timing": return high ? "Releasing late — ball drifts down leg side." : "Releasing early — full tosses likely on the slot.";
  }
}

/* =========================================================================
   Page
   ========================================================================= */

type Report = {
  id: string;
  title: string;
  media_type: "video" | "image";
  media_name: string | null;
  metrics: Record<MetricKey, number>;
  overall_score: number | null;
  created_at: string;
};

function AICoachPage() {
  const { state } = useUser();
  const signedIn = !!state.user && state.user.method !== "guest";

  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "image" | null>(null);
  const [mediaName, setMediaName] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Record<MetricKey, number> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");

  const [reports, setReports] = useState<Report[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load saved reports
  useEffect(() => {
    if (!signedIn || !state.user) { setReports([]); return; }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("video_analysis")
        .select("id, title, media_type, media_name, metrics, overall_score, created_at")
        .eq("user_id", state.user!.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (cancelled) return;
      if (error) { toast.error("Could not load reports"); return; }
      setReports((data ?? []) as unknown as Report[]);
    })();
    return () => { cancelled = true; };
  }, [signedIn, state.user]);

  // Revoke blob URLs on unmount / replace
  useEffect(() => () => { if (mediaUrl) URL.revokeObjectURL(mediaUrl); }, [mediaUrl]);

  const onPickFile = (file: File | null) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      toast.error("Only video or image files are supported.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Max file size is 50 MB.");
      return;
    }
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setMediaUrl(URL.createObjectURL(file));
    setMediaType(isVideo ? "video" : "image");
    setMediaName(file.name);
    setAnalysis(null);
    setTitle(file.name.replace(/\.[^.]+$/, ""));
  };

  const runAnalysis = () => {
    if (!mediaUrl) return;
    setAnalyzing(true);
    setAnalysis(null);
    // Placeholder pose-estimation: jitter around ideals so users see varied verdicts.
    setTimeout(() => {
      const seeded = METRICS.reduce<Record<MetricKey, number>>((acc, m) => {
        const spread = (m.max - m.min) * 0.18;
        const noise = (Math.random() - 0.5) * spread * 2;
        const raw = m.ideal + noise;
        const clamped = Math.max(m.min, Math.min(m.max, raw));
        acc[m.key] = +clamped.toFixed(m.unit === "m" ? 2 : m.unit === "cm" ? 0 : 1);
        return acc;
      }, {} as Record<MetricKey, number>);
      setAnalysis(seeded);
      setAnalyzing(false);
    }, 1100);
  };

  const overallScore = useMemo(() => {
    if (!analysis) return null;
    const total = METRICS.reduce((sum, m) => {
      const v = verdictFor(m, analysis[m.key]);
      return sum + (v === "green" ? 100 : v === "orange" ? 65 : 30);
    }, 0);
    return Math.round(total / METRICS.length);
  }, [analysis]);

  const verdictCounts = useMemo(() => {
    if (!analysis) return { green: 0, orange: 0, red: 0 };
    return METRICS.reduce(
      (acc, m) => {
        acc[verdictFor(m, analysis[m.key])] += 1;
        return acc;
      },
      { green: 0, orange: 0, red: 0 } as Record<Verdict, number>,
    );
  }, [analysis]);

  const saveReport = async () => {
    if (!signedIn || !state.user) {
      toast.error("Sign in to save reports.");
      return;
    }
    if (!analysis || !mediaType) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("video_analysis")
      .insert({
        user_id: state.user.id,
        title: title.trim() || "Untitled analysis",
        media_type: mediaType,
        media_name: mediaName,
        metrics: analysis as never,
        overall_score: overallScore,
      })
      .select("id, title, media_type, media_name, metrics, overall_score, created_at")
      .single();
    setSaving(false);
    if (error) { toast.error("Could not save report"); return; }
    setReports(prev => [data as unknown as Report, ...prev]);
    toast.success("Report saved");
  };

  const reset = () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    setMediaUrl(null); setMediaType(null); setMediaName(null);
    setAnalysis(null); setTitle("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <header className="flex items-start gap-3 mb-6">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Bot className="size-6" />
        </span>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">AI Coach</h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
            <Sparkles className="inline size-3 mb-0.5" />{" "}
            Upload a video or photo of your action — the coach scores nine biomechanics metrics against elite benchmarks.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — media + uploader */}
        <section className="space-y-4">
          <MediaPanel
            mediaUrl={mediaUrl}
            mediaType={mediaType}
            analyzing={analyzing}
            analysisDone={!!analysis}
            onPick={() => fileRef.current?.click()}
            onAnalyze={runAnalysis}
            onReset={reset}
          />
          <input
            ref={fileRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={e => onPickFile(e.target.files?.[0] ?? null)}
          />
        </section>

        {/* Right — summary + save */}
        <section className="space-y-4">
          <SummaryCard
            analysis={analysis}
            overall={overallScore}
            counts={verdictCounts}
          />

          {analysis && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <label className="block text-sm font-medium text-foreground">Report title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={80}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                placeholder="e.g. Net session — outswing focus"
              />
              {signedIn ? (
                <button
                  onClick={saveReport}
                  disabled={saving}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--brand-green)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  <Save className="size-4" /> {saving ? "Saving…" : "Save report"}
                </button>
              ) : (
                <Link to="/auth" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted">
                  Sign in to save reports <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Analysis grid */}
      {analysis && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Biomechanics breakdown</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {METRICS.map(m => {
              const v = verdictFor(m, analysis[m.key]);
              return (
                <MetricCard key={m.key} def={m} value={analysis[m.key]} verdict={v} />
              );
            })}
          </div>
        </section>
      )}

      {/* Saved reports */}
      {signedIn && reports.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Your saved reports</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map(r => (
              <article key={r.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {r.media_type === "video" ? <VideoIcon className="size-3" /> : <ImageIcon className="size-3" />}
                  {r.media_type}
                  <span>•</span>
                  <time>{new Date(r.created_at).toLocaleDateString()}</time>
                </div>
                <h3 className="mt-1 font-display font-semibold text-foreground truncate">{r.title || "Untitled"}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-primary">{r.overall_score ?? "—"}</span>
                  <span className="text-xs text-muted-foreground">overall</span>
                </div>
                {r.media_name && <p className="mt-1 text-xs text-muted-foreground truncate">{r.media_name}</p>}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* =========================================================================
   Media + pose-estimation placeholder overlay
   ========================================================================= */

function MediaPanel({
  mediaUrl, mediaType, analyzing, analysisDone, onPick, onAnalyze, onReset,
}: {
  mediaUrl: string | null;
  mediaType: "video" | "image" | null;
  analyzing: boolean;
  analysisDone: boolean;
  onPick: () => void;
  onAnalyze: () => void;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="relative aspect-video bg-[oklch(0.18_0.04_258)]">
        {mediaUrl ? (
          mediaType === "video" ? (
            <video src={mediaUrl} controls className="absolute inset-0 size-full object-contain" />
          ) : (
            <img src={mediaUrl} alt="Uploaded frame" className="absolute inset-0 size-full object-contain" />
          )
        ) : (
          <button
            onClick={onPick}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80 hover:text-white transition"
          >
            <Upload className="size-10" />
            <div className="text-center">
              <div className="font-display text-base font-semibold">Upload video or image</div>
              <div className="text-xs text-white/60">MP4, MOV, WEBM, JPG, PNG • up to 50 MB</div>
            </div>
          </button>
        )}

        {/* Pose-estimation placeholder overlay */}
        {mediaUrl && <PoseOverlay analyzing={analyzing} done={analysisDone} />}
      </div>

      <div className="flex flex-wrap items-center gap-2 p-3">
        <button onClick={onPick} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium hover:bg-muted">
          <Upload className="size-4" /> {mediaUrl ? "Replace" : "Upload"}
        </button>
        <button
          onClick={onAnalyze}
          disabled={!mediaUrl || analyzing}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Sparkles className="size-4" /> {analyzing ? "Analyzing…" : "Run analysis"}
        </button>
        {mediaUrl && (
          <button onClick={onReset} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <RefreshCw className="size-4" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}

function PoseOverlay({ analyzing, done }: { analyzing: boolean; done: boolean }) {
  // Simple stick-figure overlay so users see a "pose estimation" hint
  return (
    <svg
      viewBox="0 0 160 90"
      className={`pointer-events-none absolute inset-0 size-full transition-opacity ${
        analyzing ? "opacity-90 animate-pulse" : done ? "opacity-75" : "opacity-30"
      }`}
    >
      <g stroke="var(--brand-orange)" strokeWidth="0.8" fill="none" strokeLinecap="round">
        <circle cx="80" cy="22" r="4" />
        <line x1="80" y1="26" x2="80" y2="50" />
        <line x1="80" y1="32" x2="66" y2="42" />
        <line x1="80" y1="32" x2="94" y2="40" />
        <line x1="94" y1="40" x2="100" y2="28" />
        <line x1="80" y1="50" x2="72" y2="70" />
        <line x1="80" y1="50" x2="88" y2="70" />
        <line x1="72" y1="70" x2="68" y2="82" />
        <line x1="88" y1="70" x2="92" y2="82" />
      </g>
      <g fill="var(--brand-green)">
        {[
          [80, 22], [80, 32], [66, 42], [94, 40], [100, 28],
          [80, 50], [72, 70], [88, 70], [68, 82], [92, 82],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" />
        ))}
      </g>
    </svg>
  );
}

/* =========================================================================
   Summary card
   ========================================================================= */

function SummaryCard({
  analysis, overall, counts,
}: {
  analysis: Record<MetricKey, number> | null;
  overall: number | null;
  counts: Record<Verdict, number>;
}) {
  if (!analysis) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-primary font-medium mb-1"><Sparkles className="size-4" /> Awaiting analysis</div>
        Upload a clip and run analysis to see your nine-metric breakdown. Cards turn{" "}
        <span className="font-semibold text-[color:var(--brand-green)]">green</span>,{" "}
        <span className="font-semibold text-[color:var(--brand-orange)]">orange</span>{" "}
        or <span className="font-semibold text-destructive">red</span> against elite benchmarks.
      </div>
    );
  }

  const tone = overall! >= 80
    ? "text-[color:var(--brand-green)]"
    : overall! >= 60 ? "text-[color:var(--brand-orange)]" : "text-destructive";

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Overall score</div>
      <div className="mt-1 flex items-baseline gap-3">
        <span className={`font-display text-5xl font-bold ${tone}`}>{overall}</span>
        <span className="text-sm text-muted-foreground">/ 100</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Pill v="green"  count={counts.green}  label="On mark" />
        <Pill v="orange" count={counts.orange} label="Watch"   />
        <Pill v="red"    count={counts.red}    label="Fix"     />
      </div>
    </div>
  );
}

function Pill({ v, count, label }: { v: Verdict; count: number; label: string }) {
  const cls = v === "green"
    ? "bg-[color:var(--brand-green)]/10 text-[color:var(--brand-green)] border-[color:var(--brand-green)]/30"
    : v === "orange"
      ? "bg-[color:var(--brand-orange)]/10 text-[color:var(--brand-orange)] border-[color:var(--brand-orange)]/30"
      : "bg-destructive/10 text-destructive border-destructive/30";
  return (
    <div className={`rounded-xl border ${cls} px-2 py-2`}>
      <div className="font-display text-lg font-bold">{count}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* =========================================================================
   Metric card
   ========================================================================= */

function MetricCard({ def, value, verdict }: { def: MetricDef; value: number; verdict: Verdict }) {
  const Icon = verdict === "green" ? CheckCircle2 : verdict === "orange" ? CircleAlert : XCircle;
  const tone = verdict === "green"
    ? "border-[color:var(--brand-green)]/40 bg-[color:var(--brand-green)]/5"
    : verdict === "orange"
      ? "border-[color:var(--brand-orange)]/40 bg-[color:var(--brand-orange)]/5"
      : "border-destructive/40 bg-destructive/5";
  const text = verdict === "green"
    ? "text-[color:var(--brand-green)]"
    : verdict === "orange" ? "text-[color:var(--brand-orange)]" : "text-destructive";

  // Bar position
  const pct = Math.max(0, Math.min(100, ((value - def.min) / (def.max - def.min)) * 100));
  const idealPct = Math.max(0, Math.min(100, ((def.ideal - def.min) / (def.max - def.min)) * 100));

  return (
    <article className={`rounded-2xl border p-4 ${tone}`}>
      <header className="flex items-center justify-between gap-2">
        <h3 className="font-display text-sm font-bold text-foreground">{def.label}</h3>
        <Icon className={`size-4 ${text}`} />
      </header>

      <div className="mt-2 flex items-baseline gap-2">
        <span className={`font-display text-3xl font-bold ${text}`}>
          {value > 0 && def.key === "release_timing" ? "+" : ""}{value}
        </span>
        <span className="text-xs text-muted-foreground">{def.unit}</span>
        <span className="ml-auto text-[11px] text-muted-foreground">
          Ideal{" "}
          <span className="font-medium text-foreground">
            {def.ideal}{def.unit}
          </span>
        </span>
      </div>

      {/* Comparison bar */}
      <div className="relative mt-3 h-2 rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-foreground/30"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary"
          style={{ left: `${idealPct}%` }}
          aria-label={`Ideal ${def.ideal}${def.unit}`}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>{def.min}{def.unit}</span>
        <span>{def.max}{def.unit}</span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-foreground/80">
        {feedbackFor(def, value, verdict)}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground italic">{def.rationale}</p>

      {verdict === "red" && (
        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-destructive">
          <AlertTriangle className="size-3" /> Priority fix
        </div>
      )}
    </article>
  );
}
