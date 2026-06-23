import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — CricScience" }, { name: "description", content: "How CricScience handles your data." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 py-16 prose-cs">
      <h1 className="font-display text-4xl font-bold text-primary">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-8 space-y-4 text-foreground/90 leading-relaxed">
        <p>CricScience is currently a learning prototype. All progress, XP, badges and bookmarks are stored locally in your browser — we do not transmit personal data to any server.</p>
        <p>When backend features are enabled, we will only collect the minimum information required to provide the service (account email, learning progress) and will never sell your data.</p>
        <p>Cookies are limited to your theme preference and session keys. You can clear them anytime through your browser settings.</p>
      </div>
    </article>
  ),
});
