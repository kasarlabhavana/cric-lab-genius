import { getCollection, type CollectionEntry } from "astro:content";
import { MODULES } from "../data/modules";

export type Lesson = CollectionEntry<"lessons">;

export async function lessonsByModule() {
  const all = await getCollection("lessons");
  const map = new Map<string, Lesson[]>();
  for (const m of MODULES) map.set(m.slug, []);
  for (const l of all) {
    if (!map.has(l.data.module)) throw new Error(`Unknown module "${l.data.module}" in ${l.id}`);
    map.get(l.data.module)!.push(l);
  }
  for (const list of map.values()) list.sort((a, b) => a.data.order - b.data.order);
  return map;
}

export const lessonSlug = (l: Lesson) => l.id.split("/").pop()!;
export const lessonUrl = (l: Lesson) => `/explore/${l.data.module}/${lessonSlug(l)}`;

export async function allQuestions() {
  const map = await lessonsByModule();
  const out: {
    id: string; lesson: string; module: string; lessonTitle: string; url: string;
    q: string; options: string[]; answer: number; explain: string;
  }[] = [];
  for (const [module, list] of map) {
    for (const l of list) {
      l.data.quiz.forEach((q, i) =>
        out.push({ id: `${l.id}#${i}`, lesson: l.id, module, lessonTitle: l.data.title, url: lessonUrl(l), ...q }),
      );
    }
  }
  return out;
}

export const LABS = [
  { slug: "flight", title: "Flight time", line: "Set the delivery speed and see how long the batter has — with air drag included." },
  { slug: "swing", title: "Swing", line: "Change ball condition, speed and seam angle, and watch the airflow decide which way it swings." },
  { slug: "six", title: "Six hitting", line: "Choose exit speed and launch angle, and see how far the ball carries with and without air." },
] as const;
