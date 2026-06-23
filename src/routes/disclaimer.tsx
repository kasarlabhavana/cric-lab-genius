import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — CricScience" },
      { name: "description", content: "Educational-use disclaimer for CricScience content, simulations and AI Coach." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <AlertTriangle className="size-7 text-[color:var(--brand-orange)]" />
      <h1 className="mt-3 font-display text-4xl font-bold text-primary">Disclaimer</h1>
      <p className="mt-3 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="mt-8 space-y-4 text-foreground/90 leading-relaxed">
        <p>
          The content, simulators, AI Coach and quizzes on CricScience are
          provided strictly for <strong>educational and recreational
          purposes</strong>. While we cite peer-reviewed research and
          established coaching practice wherever possible, none of the
          information here constitutes professional coaching, medical, or
          biomechanical advice.
        </p>
        <p>
          Cricket is a physical activity. Always warm up properly, train
          progressively, and consult a qualified coach, physiotherapist, or
          medical professional before attempting drills, techniques, or
          training loads described on this site — especially for junior
          players and anyone returning from injury.
        </p>
        <p>
          <strong>Laboratory simulators</strong> use simplified physical models
          and dummy outputs for some inputs. They are designed to build
          intuition, not to replicate match conditions or replace coaching
          decisions.
        </p>
        <p>
          <strong>AI Coach</strong> outputs (pose estimation, biomechanical
          metrics, feedback) are demonstrations and may produce inaccurate or
          incomplete analyses. Decisions about technique changes should always
          involve a qualified human coach.
        </p>
        <p>
          External links, references to brands (Dukes, Kookaburra, SG, MRF,
          GM, SS, Zing, etc.), and any historical claims are included for
          educational context only and do not constitute endorsement.
        </p>
        <p>
          By using CricScience you acknowledge that you do so at your own risk
          and waive any liability against the creators for outcomes arising
          from use of this site or its content.
        </p>
      </div>
    </article>
  ),
});
