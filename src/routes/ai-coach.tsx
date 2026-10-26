import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-coach")({
  beforeLoad: () => {
    throw redirect({ to: "/intelli-coach", statusCode: 301 });
  },
});
