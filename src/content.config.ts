import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wikiSchema = z.object({
  type: z.string().optional(),
  created: z.union([z.date(), z.string()]).optional(),
  updated: z.union([z.date(), z.string()]).optional(),
  tags: z.array(z.string()).optional(),
  source_count: z.number().optional()
});

const articleSchema = z.looseObject({
  title: z.string().optional(),
  source: z.string().optional(),
  author: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  published: z.union([z.date(), z.string(), z.null()]).optional(),
  created: z.union([z.date(), z.string(), z.null()]).optional(),
  description: z.union([z.string(), z.null()]).optional(),
  tags: z.array(z.string()).optional()
});

export const collections = {
  wiki: defineCollection({
    loader: glob({ pattern: "*.md", base: "./wiki" }),
    schema: wikiSchema
  }),
  articles: defineCollection({
    loader: glob({ pattern: "*.md", base: "./articles" }),
    schema: articleSchema
  })
};
