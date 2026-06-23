import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Settings, Trophy, User } from "lucide-react";
import { deriveLevel, useUser, type CurrentUser } from "@/lib/user-state";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CricScience" },
      { name: "description", content: "Your CricScience profile and settings." },
      { property: "og:title", content: "Profile — CricScience" },
      { property: "og:description", content: "Your account and learning level." },
    ],
  }),
  component: Profile,
});

const LEVELS: CurrentUser["level"][] = ["Child", "Beginner", "Intermediate", "Academy", "Pro", "Coach", "Fan"];

function Profile() {
  const { state, signOut, setLevel } = useUser();
  const navigate = useNavigate();
  const level = deriveLevel(state.xp);

  if (!state.user) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <User className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-3 font-display text-2xl font-bold text-primary">Not signed in</h1>
        <p className="mt-1 text-muted-foreground">Sign in to track your progress and earn XP.</p>
        <button onClick={() => navigate({ to: "/auth" })} className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Sign in</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.18_0.05_258)] p-8 text-primary-foreground">
        <div className="flex items-center gap-4">
          <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-display font-bold">{state.user.name[0]?.toUpperCase()}</span>
          <div>
            <h1 className="font-display text-2xl font-bold">{state.user.name}</h1>
            <p className="text-white/70 text-sm">{state.user.email ?? "Guest account"} · {state.user.level}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <Tile label="XP" value={`${state.xp}`} />
          <Tile label="Level" value={level.name} />
          <Tile label="Streak" value={`${state.streak.count}d`} />
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold text-primary mb-1 flex items-center gap-2"><Settings className="size-4" /> Audience level</h2>
        <p className="text-sm text-muted-foreground mb-4">We'll tune recommendations to match your level.</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${state.user!.level === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold text-primary flex items-center gap-2"><Trophy className="size-4" /> Account</h2>
        <p className="text-sm text-muted-foreground mt-1">Signed in via {state.user.method}.</p>
        <button onClick={() => { signOut(); navigate({ to: "/" }); }} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
          <LogOut className="size-4" /> Sign out
        </button>
      </section>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-3">
      <div className="text-[10px] uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-0.5 font-display font-bold">{value}</div>
    </div>
  );
}
