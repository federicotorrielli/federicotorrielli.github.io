import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const toList = (v: string | string[]) => (Array.isArray(v) ? v : [v]);

const entry = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  author: z.union([z.string(), z.array(z.string())]).transform(toList).default([]),
  description: z.string().optional(),
  summary: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  editPost: z.object({ URL: z.string().url(), Text: z.string() }).optional(),
});

const section = (name: string) =>
  defineCollection({
    loader: glob({ base: `./src/content/${name}`, pattern: "*/index.md" }),
    schema: entry,
  });

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "*.md" }),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});

export const collections = {
  papers: section("papers"),
  projects: section("projects"),
  courses: section("courses"),
  pages,
};
