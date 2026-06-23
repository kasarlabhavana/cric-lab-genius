import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles, UserCircle2 } from "lucide-react";
import { useUser } from "@/lib/user-state";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CricScience" },
      { name: "description", content: "Sign in to CricScience with email, Google, or continue as a guest." },
      { property: "og:title", content: "Sign in — CricScience" },
      { property: "og:description", content: "Start your cricket science journey." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { signIn } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const go = (method: "email" | "google" | "guest", payload?: { name?: string; email?: string }) => {
    signIn(method, payload);
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-[color:var(--brand-orange)]" /> Welcome to CricScience
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold text-primary">Start learning the science of cricket.</h1>
        <p className="mt-1 text-muted-foreground text-sm">Sign in to track XP, earn badges and unlock certificates.</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
        <button
          onClick={() => go("google", { name: "Google Player" })}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold hover:bg-muted flex items-center justify-center gap-2"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={e => { e.preventDefault(); if (email) go("email", { name: name || undefined, email }); }} className="space-y-3">
          <Input icon={<UserCircle2 className="size-4" />} placeholder="Your name (optional)" value={name} onChange={setName} />
          <Input icon={<Mail className="size-4" />} type="email" placeholder="you@email.com" value={email} onChange={setEmail} required />
          <button type="submit" disabled={!email} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">Continue with Email</button>
        </form>

        <button
          onClick={() => go("guest")}
          className="w-full rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          Continue as guest
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">Demo mode — accounts live in your browser for now.</p>
    </div>
  );
}

function Input({ icon, value, onChange, ...rest }: { icon: React.ReactNode; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <input {...rest} value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-border bg-card pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 7.7 29.3 5.6 24 5.6 16.3 5.6 9.6 9.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 36 26.8 37 24 37c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 40.6 16.2 45 24 45z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.1 5.7l6.2 5.2C40.8 36 45 30.6 45 24c0-1.2-.1-2.3-.4-3.5z"/></svg>
  );
}
