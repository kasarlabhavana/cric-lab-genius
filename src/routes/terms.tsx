import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — CricScience" }, { name: "description", content: "Terms of use for CricScience." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-primary">Terms of Use</h1>
      <p className="mt-3 text-muted-foreground">By using CricScience you agree to these terms.</p>
      <div className="mt-8 space-y-4 text-foreground/90 leading-relaxed">
        <p>CricScience content is provided for educational purposes. While we strive for scientific accuracy, individual training and on-field decisions should be made with qualified coaches.</p>
        <p>You may not scrape, redistribute or resell our content without written permission.</p>
        <p>The AI Coach is a demonstration and may produce inaccurate responses. Always cross-check with authoritative sources.</p>
      </div>
    </article>
  ),
});
