import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/ai-coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — CricScience" },
      { name: "description", content: "Ask the AI cricket coach anything — technique, tactics or science." },
      { property: "og:title", content: "AI Coach — CricScience" },
      { property: "og:description", content: "Your on-demand cricket science assistant." },
    ],
  }),
  component: AICoach,
});

type Msg = { role: "user" | "coach"; text: string };
const KEY = "cricscience.coach.v1";

const REPLIES = [
  "Great question. Let's break it down: the key is to look at the bowler's wrist position at release — that's where ~70% of the information lives.",
  "Think of your kinetic chain as a whip — ground force flows from your back leg → hips → trunk → arm. Train sequencing, not just strength.",
  "Reading length early matters more than reacting late. Pre-saccade to the predicted bounce point as the bowler enters the stride.",
  "For swing, the angle of the seam at release matters more than the speed. 15-20° toward slips is the conventional sweet spot.",
  "Spin bowlers should obsess over RPM, not turn off the pitch. More revs = more drift, dip, and natural variation.",
  "On a slow pitch, hit through the line with a high front elbow and full follow-through. Don't chase the ball.",
  "Recovery is part of practice. Two days of low-load skill work between high-intensity sessions reduces injury risk by 30-40%.",
];

function AICoach() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw) try { setMessages(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setMessages(prev => [...prev, { role: "coach", text: reply }]);
      setThinking(false);
    }, 700 + Math.random() * 600);
  };

  const suggestions = [
    "Why does a cricket ball reverse swing?",
    "How can I add 5 km/h to my pace?",
    "What's the science behind a good cover drive?",
    "How do I read a spinner's wrist?",
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col" style={{ minHeight: "calc(100vh - 8rem)" }}>
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Bot className="size-5" /></span>
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">AI Coach</h1>
          <p className="text-xs text-muted-foreground"><Sparkles className="inline size-3 mb-0.5" /> Demo mode — full Lovable AI in next phase.</p>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-border bg-card p-4 overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">Ask me anything about cricket science.</p>
            <div className="grid sm:grid-cols-2 gap-2 max-w-md mx-auto">
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)} className="text-left rounded-xl border border-border bg-surface px-3 py-2 text-sm hover:bg-muted">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "coach" && <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot className="size-3.5" /></span>}
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface text-foreground"}`}>
              {m.text}
            </div>
            {m.role === "user" && <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-orange)] text-white"><User className="size-3.5" /></span>}
          </div>
        ))}
        {thinking && <div className="flex gap-2"><span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot className="size-3.5" /></span><div className="bg-surface rounded-2xl px-4 py-2.5 text-sm text-muted-foreground">Thinking…</div></div>}
        <div ref={endRef} />
      </div>

      <form onSubmit={e => { e.preventDefault(); send(); }} className="mt-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask the coach…" className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        <button type="submit" disabled={!input.trim()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          <Send className="size-4" /> Send
        </button>
      </form>
    </div>
  );
}
