import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — CricScience" }, { name: "description", content: "Our mission to democratize elite cricket knowledge." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Sparkles className="size-7 text-[color:var(--brand-orange)]" />
      <h1 className="mt-3 font-display text-4xl font-bold text-primary">About CricScience</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">CricScience is a learning platform that explains every aspect of cricket through physics, biomechanics, aerodynamics, analytics, psychology and AI.</p>
      <div className="mt-8 space-y-4 text-foreground/90 leading-relaxed">
        <p>Our mission is simple: democratize elite cricket knowledge. The kind of insight that used to live inside national academies and biomechanics labs should be available to the kid in the gully, the academy prospect, the pro on tour and the fan in the stand.</p>
        <p>We package that knowledge into bite-sized lessons, interactive simulations, quizzes, an AI coach, and a community — across thirteen science modules from Bowling and Batting to Pitch, Ball and Mental Science.</p>
      </div>
    </article>
  ),
});
