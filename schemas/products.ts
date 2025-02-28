import { z } from 'zod'
import { statusSchema, stringField } from './base'
import { createFilterSchema } from './filter'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  brandId: z.number(),
  categoryId: z.number(),
  order: z.number(),
  status: statusSchema,
  createdAt: z.string(),
})

export const createProductSchema = z.object({
  title: stringField(3, 128),
  description: stringField(20, 3000),
  brandId: z.number(),
  categoryId: z.number(),
})

export const editProductSchema = z.object({
  title: stringField(3, 128).optional(),
  description: stringField(20, 3000).optional(),
  slug: stringField().optional().optional(),
  brandId: z.number().optional(),
  categoryId: z.number().optional(),
  order: z.number().min(1, 'Минимальное значение поля - 1').optional(),
  status: statusSchema.optional(),
})

export const productFilterSchema = createFilterSchema(productSchema).extend({
  brandId: z.number().optional(),
  categoryId: z.number().optional(),
})
