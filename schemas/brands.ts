import { z } from 'zod'
import { statusSchema, stringField } from './base'
import { createFilterSchema } from './filter'
import { mediaSchema } from './media'

export const brandSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  order: z.number(),
  status: statusSchema,
})
export const minimalBrandSchema = brandSchema.pick({
  id: true,
  title: true
})
export const brandWithMediaSchema = brandSchema.extend({
  media: z.array(mediaSchema),
})
export const createBrandSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  files: z.array(z.instanceof(File))
    .min(1, 'At least one file is required')
    .refine(files => files.every(file => file.size <= 100 * 1024 * 1024), 'Each file must be less than 100MB'),
})
export const editBrandSchema = z.object({
  title: stringField(3, 128).optional(),
  slug: stringField(3, 255).optional(),
  description: stringField().optional(),
  order: z.number().min(1, 'Минимальное значение поля - 1').optional(),
  status: statusSchema.optional(),
})
export const brandFilterSchema = createFilterSchema(brandSchema)
