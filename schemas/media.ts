import { z } from 'zod'
import { statusSchema } from './base'

export const mediaTypeSchema = z.enum(['image', 'video'])

export const mediaSchema = z.object({
  id: z.number(),
  type: mediaTypeSchema,
  path: z.string(),
  alt: z.string(),
  order: z.number(),
  status: statusSchema,
})

export const mediaOrderChangeSchema = z.array(
  z.object({
    id: z.number(),
    order: z.number(),
  }),
)
