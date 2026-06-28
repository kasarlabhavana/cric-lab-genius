import { useCallback, useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Square, Gauge, Mic2, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  /** Called when user presses play — returns the full text to narrate. */
  getText: () => string;
  className?: string;
  label?: string;
};

const SPEEDS = [0.85, 1, 1.15, 1.3] as const;
const RATE_KEY = "cs-narration-rate";
const VOICE_KEY = "cs-narration-voice";

function rankVoice(v: SpeechSynthesisVoice): number {
  // English voices first, prefer GB/IN/AU then US then other en, then others
  if (/en[-_]?(GB|IN|AU)/i.test(v.lang)) return 0;
  if (/en[-_]?US/i.test(v.lang)) return 1;
  if (/^en/i.test(v.lang)) return 2;
  return 3;
}

/**
 * Audio narration via the browser's built-in Web Speech API.
 * No network, no cost. Falls back silently when unsupported.
 */
export function NarrationButton({ getText, className = "", label = "Listen" }: Props) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState<number>(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>("");
  const [voiceOpen, setVoiceOpen] = useState(false);
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
    let savedURI = "";
    try { savedURI = localStorage.getItem(VOICE_KEY) ?? ""; } catch {}
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices().slice().sort((a, b) => rankVoice(a) - rankVoice(b));
      setVoices(all);
      const saved = all.find((v) => v.voiceURI === savedURI);
      const pick = saved ?? all[0];
      voiceRef.current = pick;
      if (pick) setVoiceURI(pick.voiceURI);
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
    const chunks = raw.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [raw];
    chunks.forEach((chunk, i) => {
      const u = new SpeechSynthesisUtterance(chunk.trim());
      if (voiceRef.current) u.voice = voiceRef.current;
      u.rate = rate;
      u.pitch = 1;
      u.lang = voiceRef.current?.lang ?? "en-US";
      if (i === chunks.length - 1) u.onend = () => setState("idle");
      u.onerror = () => setState("idle");
      synth.speak(u);
    });
    setState("playing");
  }, [supported, getText, rate]);

  const toggle = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (state === "playing") { synth.pause(); setState("paused"); }
    else if (state === "paused") { synth.resume(); setState("playing"); }
    else { play(); }
  }, [supported, state, play]);

  const cycleRate = useCallback(() => {
    const idx = SPEEDS.indexOf(rate as (typeof SPEEDS)[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setRate(next);
    try { localStorage.setItem(RATE_KEY, String(next)); } catch {}
    if (state !== "idle") {
      window.speechSynthesis.cancel();
      setState("idle");
      setTimeout(() => play(), 30);
    }
  }, [rate, state, play]);

  const pickVoiceByURI = useCallback((uri: string) => {
    const v = voices.find((vv) => vv.voiceURI === uri);
    if (!v) return;
    voiceRef.current = v;
    setVoiceURI(uri);
    try { localStorage.setItem(VOICE_KEY, uri); } catch {}
    setVoiceOpen(false);
    if (state !== "idle") {
      window.speechSynthesis.cancel();
      setState("idle");
      setTimeout(() => play(), 30);
    }
  }, [voices, state, play]);

  if (!supported) return null;

  const playing = state === "playing";
  const paused = state === "paused";
  const currentVoice = voices.find((v) => v.voiceURI === voiceURI);
  const englishVoices = voices.filter((v) => /^en/i.test(v.lang));
  const otherVoices = voices.filter((v) => !/^en/i.test(v.lang));

  return (
    <div
      className={`relative inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1 ${className}`}
      role="group"
      aria-label="Audio narration"
    >
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
          playing || paused ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        aria-pressed={playing}
        title={playing ? "Pause" : paused ? "Resume" : "Play narration"}
      >
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        <span className="hidden sm:inline">{playing ? "Pause" : paused ? "Resume" : label}</span>
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
      {voices.length > 0 && (
        <VoicePicker
          open={voiceOpen}
          setOpen={setVoiceOpen}
          current={currentVoice}
          englishVoices={englishVoices}
          otherVoices={otherVoices}
          voiceURI={voiceURI}
          onPick={pickVoiceByURI}
        />
      )}
    </div>
  );
}

function VoicePicker({
  open, setOpen, current, englishVoices, otherVoices, voiceURI, onPick,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  current?: SpeechSynthesisVoice;
  englishVoices: SpeechSynthesisVoice[];
  otherVoices: SpeechSynthesisVoice[];
  voiceURI: string;
  onPick: (uri: string) => void;
}) {
  const isMobile = useIsMobile();
  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
      title="Choose voice"
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      <Mic2 className="size-3" />
      <span className="max-w-[7rem] truncate">{current ? current.name.split(/[\s(]/)[0] : "Voice"}</span>
    </button>
  );

  const list = (
    <>
      {englishVoices.length > 0 && (
        <div className="px-2 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">English</div>
      )}
      {englishVoices.map((v) => (
        <VoiceRow key={v.voiceURI} v={v} active={v.voiceURI === voiceURI} onPick={onPick} />
      ))}
      {otherVoices.length > 0 && (
        <div className="px-2 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Other</div>
      )}
      {otherVoices.map((v) => (
        <VoiceRow key={v.voiceURI} v={v} active={v.voiceURI === voiceURI} onPick={onPick} />
      ))}
    </>
  );

  if (isMobile) {
    return (
      <>
        {trigger}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="pb-[max(env(safe-area-inset-bottom),1rem)]">
            <div className="mx-auto w-full max-w-lg px-4 pt-2 pb-3">
              <div className="flex items-center justify-between gap-3 pb-2">
                <div className="font-display text-base font-bold text-primary">Choose voice</div>
                <DrawerClose asChild>
                  <button aria-label="Close" className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                    <X className="size-5" />
                  </button>
                </DrawerClose>
              </div>
              <div className="max-h-[60vh] overflow-auto rounded-xl border border-border">{list}</div>
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      {trigger}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close voice picker"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            className="absolute right-0 top-full z-50 mt-2 max-h-72 w-[min(16rem,calc(100vw-2rem))] overflow-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg"
          >
            {list}
          </div>
        </>
      )}
    </>
  );
}

function VoiceRow({ v, active, onPick }: { v: SpeechSynthesisVoice; active: boolean; onPick: (uri: string) => void }) {
  return (
    <button
      role="option"
      aria-selected={active}
      onClick={() => onPick(v.voiceURI)}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-muted ${
        active ? "bg-muted font-semibold text-foreground" : "text-foreground/85"
      }`}
    >
      <span className="truncate">{v.name}</span>
      <span className="shrink-0 text-[10px] text-muted-foreground">{v.lang}</span>
    </button>
  );
}

