import { z } from 'zod'
import { stringField } from './base'
import { createFilterSchema } from './filter'

export const categoryStatusSchema = z.enum(['active', 'not-active'])

export const rootCategorySchema = z.object({
  id: z.number(),
  shortTitle: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.number().nullable(),
  order: z.number(),
  status: categoryStatusSchema,
})

export const categorySchema = rootCategorySchema.extend({
  categories: z.array(rootCategorySchema),
})

export const categoryFilterSchema = createFilterSchema(rootCategorySchema)

export const createCategorySchema = z.object({
  shortTitle: stringField(3, 128).optional(),
  title: stringField(3, 128),
  slug: stringField().optional(),
  description: stringField().optional(),
  parentId: z.number().optional(),
  order: z.number().min(1, 'Минимальное значение поля - 1').optional(),
  status: categoryStatusSchema.optional(),
})

export const editCategorySchema = z.object({
  shortTitle: stringField(3, 128).optional(),
  title: stringField(3, 128).optional(),
  slug: stringField().optional().optional(),
  description: stringField(20).optional(),
  parentId: z.number().optional(),
  order: z.number().min(1, 'Минимальное значение поля - 1').optional(),
  status: categoryStatusSchema.optional(),
})
