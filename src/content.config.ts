import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const source = z.object({ title: z.string(), url: z.string().url() });

const question = z.object({
  q: z.string(),
  options: z.array(z.string()).min(2),
  answer: z.number().int().min(0),
  explain: z.string(),
});

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    module: z.string(),
    order: z.number(),
    minutes: z.number(),
    lastReviewed: z.coerce.date(),
    established: z.array(z.string()).default([]),
    debated: z.array(z.string()).default([]),
    sources: z.array(source).min(1),
    lab: z.enum(["flight", "swing", "six"]).optional(),
    quiz: z.array(question).min(3),
  }),
});

const glossary = defineCollection({
  loader: file("./src/data/glossary.json"),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    lesson: z.string().optional(),
  }),
});

export const collections = { lessons, glossary };
