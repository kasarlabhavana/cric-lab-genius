import { createFileRoute } from "@tanstack/react-router";
import { Crown, Heart, MessageSquare, Trophy, Users } from "lucide-react";
import { deriveLevel, useUser } from "@/lib/user-state";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — CricScience" },
      { name: "description", content: "Leaderboard, discussions and learner stories from the CricScience community." },
      { property: "og:title", content: "Community — CricScience" },
      { property: "og:description", content: "Join the learning community." },
    ],
  }),
  component: Community,
});

const SEED = [
  { name: "Anika S.", xp: 4120, country: "🇮🇳" },
  { name: "Jordan B.", xp: 3540, country: "🇦🇺" },
  { name: "Marcus W.", xp: 3010, country: "🇬🇧" },
  { name: "Priya K.", xp: 2670, country: "🇮🇳" },
  { name: "Kabir M.", xp: 2280, country: "🇵🇰" },
  { name: "Lwazi N.", xp: 1940, country: "🇿🇦" },
  { name: "Hannah R.", xp: 1610, country: "🇳🇿" },
  { name: "Dilshan P.", xp: 1330, country: "🇱🇰" },
];

const FEED = [
  { user: "Anika S.", text: "Finally cracked reverse swing in nets after the Ball Science module — the bit about lacquer wear was a game-changer.", likes: 42, comments: 8 },
  { user: "Marcus W.", text: "Coaches: the kinetic-chain lesson should be required reading for any U17 pace prospect.", likes: 31, comments: 12 },
  { user: "Priya K.", text: "Got 100% on the Pitch Science quiz! 🎉 The clay-content threshold blew my mind.", likes: 24, comments: 4 },
];

function Community() {
  const { state } = useUser();
  const me = state.user ? { name: state.user.name, xp: state.xp, country: "🏏" } : null;
  const board = [...SEED, ...(me ? [me] : [])].sort((a, b) => b.xp - a.xp);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3">
      <section className="md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Users className="size-5" /></span>
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">Community</h1>
            <p className="text-muted-foreground text-sm">Stories, breakthroughs and discussions from learners worldwide.</p>
          </div>
        </div>
        <ul className="space-y-3">
          {FEED.map((p, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-[color:var(--brand-green)]/15 text-[color:var(--brand-green)] text-xs font-bold">{p.user[0]}</span>
                {p.user}
              </div>
              <p className="mt-2 text-foreground/85">{p.text}</p>
              <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Heart className="size-3.5" /> {p.likes}</span>
                <span className="inline-flex items-center gap-1"><MessageSquare className="size-3.5" /> {p.comments}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground text-center">Posting opens in the next phase.</p>
      </section>

      <aside>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="size-5 text-[color:var(--brand-orange)]" />
          <h2 className="font-display text-xl font-bold text-primary">Leaderboard</h2>
        </div>
        <ol className="space-y-2">
          {board.slice(0, 10).map((u, i) => {
            const isMe = me && u.name === me.name;
            const lvl = deriveLevel(u.xp);
            return (
              <li key={i} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${isMe ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <span className={`inline-flex size-7 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-[color:var(--brand-orange)] text-white" : "bg-muted text-foreground"}`}>
                  {i === 0 ? <Crown className="size-3.5" /> : i + 1}
                </span>
                <span className="text-lg">{u.country}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{u.name}{isMe && " (you)"}</div>
                  <div className="text-xs text-muted-foreground">{lvl.name}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{u.xp}</div>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
