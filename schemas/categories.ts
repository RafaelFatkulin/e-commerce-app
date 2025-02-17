import { z } from 'zod'
import { createFilterSchema } from './filter'
import type { RootCategory } from '~/types/categories'

export const rootCategorySchema = z.object({
  id: z.number(),
  shortTitle: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.number().nullable(),
  order: z.number(),
  isActive: z.boolean(),
})

export const categorySchema = rootCategorySchema.extend({
  categories: z.array(rootCategorySchema),
})

export const categoryFilterSchema = createFilterSchema(rootCategorySchema)