import { useCallback, useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Square, Gauge } from "lucide-react";

type Props = {
  /** Called when user presses play — returns the full text to narrate. */
  getText: () => string;
  className?: string;
  label?: string;
};

const SPEEDS = [0.85, 1, 1.15, 1.3] as const;
const RATE_KEY = "cs-narration-rate";

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;
  const prefs = [
    /en[-_]?(GB|IN|AU)/i,
    /en[-_]?US/i,
    /^en/i,
  ];
  for (const re of prefs) {
    const v = voices.find((vv) => re.test(vv.lang));
    if (v) return v;
  }
  return voices[0];
}

/**
 * Audio narration via the browser's built-in Web Speech API.
 * No network, no cost. Falls back silently when unsupported.
 */
export function NarrationButton({ getText, className = "", label = "Listen" }: Props) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState<number>(1);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSupported(ok);
    if (!ok) return;
    try {
      const stored = parseFloat(localStorage.getItem(RATE_KEY) ?? "1");
      if (!Number.isNaN(stored) && stored > 0) setRate(stored);
    } catch {}
    const loadVoices = () => {
      voiceRef.current = pickVoice(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      try { window.speechSynthesis.cancel(); } catch {}
    };
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setState("idle");
  }, [supported]);

  const play = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const raw = (getText() || "").replace(/\s+/g, " ").trim();
    if (!raw) return;
    // Chunk long text to avoid the 32k speechSynthesis cutoff and to allow
    // smoother resume on mobile. Split on sentence boundaries.
    const chunks = raw.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [raw];
    chunks.forEach((chunk, i) => {
      const u = new SpeechSynthesisUtterance(chunk.trim());
      if (voiceRef.current) u.voice = voiceRef.current;
      u.rate = rate;
      u.pitch = 1;
      u.lang = voiceRef.current?.lang ?? "en-US";
      if (i === chunks.length - 1) {
        u.onend = () => setState("idle");
      }
      u.onerror = () => setState("idle");
      synth.speak(u);
    });
    setState("playing");
  }, [supported, getText, rate]);

  const toggle = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (state === "playing") {
      synth.pause();
      setState("paused");
    } else if (state === "paused") {
      synth.resume();
      setState("playing");
    } else {
      play();
    }
  }, [supported, state, play]);

  const cycleRate = useCallback(() => {
    const idx = SPEEDS.indexOf(rate as (typeof SPEEDS)[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setRate(next);
    try { localStorage.setItem(RATE_KEY, String(next)); } catch {}
    if (state !== "idle") {
      // Restart with new rate so the change is audible immediately
      window.speechSynthesis.cancel();
      setState("idle");
      // give the engine a tick to settle
      setTimeout(() => play(), 30);
    }
  }, [rate, state, play]);

  if (!supported) return null;

  const playing = state === "playing";
  const paused = state === "paused";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 ${className}`}
      role="group"
      aria-label="Audio narration"
    >
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          playing || paused
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        aria-pressed={playing}
        title={playing ? "Pause" : paused ? "Resume" : "Play narration"}
      >
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        <span className="hidden sm:inline">
          {playing ? "Pause" : paused ? "Resume" : label}
        </span>
        {!playing && !paused && <Headphones className="size-3.5 sm:hidden" />}
      </button>
      {(playing || paused) && (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center justify-center rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Stop"
          aria-label="Stop narration"
        >
          <Square className="size-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={cycleRate}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
        title="Reading speed"
        aria-label={`Speed ${rate}x`}
      >
        <Gauge className="size-3" />
        {rate}x
      </button>
    </div>
  );
}
