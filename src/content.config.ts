import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
  schema: z.object({
    chapter: z.number().min(0).max(7),
    slug: z.string(),
    title: z.string(),
    act: z.enum(['I', 'II', 'III', 'IV', 'V']),
    estimatedMinutes: z.number(),
    description: z.string(),
  }),
});

export const collections = { chapters };
