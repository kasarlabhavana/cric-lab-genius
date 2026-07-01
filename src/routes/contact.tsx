import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Users } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — CricScience" }, { name: "description", content: "Get in touch with the CricScience team." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-primary">Contact us</h1>
      <p className="mt-3 text-muted-foreground">Questions, feedback, partnerships — we'd love to hear from you.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href="mailto:hello@cricscience.com" className="card-hover rounded-2xl border border-border bg-card p-5">
          <Mail className="size-5 text-primary" />
          <div className="mt-3 font-display font-semibold">Email</div>
          <div className="text-sm text-muted-foreground mt-1">hello@cricscience.com</div>
          <div className="text-sm text-muted-foreground">hello.cricscience@gmail.com</div>
        </a>
        <a href="mailto:hello.cricscience@gmail.com" className="card-hover rounded-2xl border border-border bg-card p-5">
          <MessageSquare className="size-5 text-primary" />
          <div className="mt-3 font-display font-semibold">Press</div>
          <div className="text-sm text-muted-foreground mt-1">press@cricscience.com</div>
        </a>
        <a href="#" className="card-hover rounded-2xl border border-border bg-card p-5 sm:col-span-2">
          <Users className="size-5 text-primary" />
          <div className="mt-3 font-display font-semibold">Coaching academies & federations</div>
          <div className="text-sm text-muted-foreground mt-1">partner@cricscience.com — bring CricScience to your players.</div>
        </a>
      </div>
    </article>
  ),
});
