import { z } from 'zod'

export const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export const successResponseSchema = z.object({
  message: z.string().optional().nullable(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }).optional().nullable(),
  data: z.any(),
})

export const errorResponseSchema = z.object({
  message: z.union([z.string(), z.record(z.string())]).optional(),
  errors: z.union([z.string(), z.record(z.any())]).optional(),
})
