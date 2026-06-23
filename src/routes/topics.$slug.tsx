import { createFileRoute, notFound } from "@tanstack/react-router";
import { TOPIC_BY_SLUG } from "@/lib/topics";
import { TopicPage } from "@/components/topic-page";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = TOPIC_BY_SLUG[params.slug];
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.topic.title} — CricScience` },
          { name: "description", content: loaderData.topic.definition },
          {
            property: "og:title",
            content: `${loaderData.topic.title} — CricScience`,
          },
          {
            property: "og:description",
            content: loaderData.topic.definition,
          },
        ]
      : [],
  }),
  component: TopicRoute,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Topic not found.</div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">
      {error instanceof Error ? error.message : "Something went wrong."}
    </div>
  ),
});

function TopicRoute() {
  const { topic } = Route.useLoaderData();
  return <TopicPage topic={topic} />;
}
