import { getCollection } from "astro:content";
import { MODULES } from "../data/modules";
import { lessonsByModule, lessonUrl, LABS } from "../lib/content";

export async function GET() {
  const items: { kind: string; title: string; text: string; url: string }[] = [];
  const map = await lessonsByModule();
  for (const m of MODULES) {
    items.push({ kind: "Science", title: m.title, text: m.question, url: `/explore/${m.slug}` });
    for (const l of map.get(m.slug)!) {
      items.push({ kind: `Lesson in ${m.title}`, title: l.data.title, text: l.data.summary, url: lessonUrl(l) });
    }
  }
  for (const lab of LABS) items.push({ kind: "Lab", title: `${lab.title} lab`, text: lab.line, url: `/labs/${lab.slug}` });
  for (const g of await getCollection("glossary")) {
    items.push({ kind: "Glossary", title: g.data.term, text: g.data.definition, url: `/glossary/${g.id}` });
  }
  return new Response(JSON.stringify(items), { headers: { "Content-Type": "application/json" } });
}
