import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    posts: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        date: z.string(),
        description: z.string().optional(),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
      }),
    }),
  },
})
