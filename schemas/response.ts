import { z } from 'zod'

export const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export function successResponseSchema<D extends z.ZodTypeAny>(dataSchema: D) {
  return z.object({
    message: z.string().optional().nullable(),
    meta: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      totalPages: z.number(),
    }).optional().nullable(),
    data: dataSchema, // Теперь тип данных `data` будет зависеть от переданной схемы
  })
}

const messsageArray = z.object({
  _errors: z.array(z.string()),
})

export const errorResponseSchema = z.object({
  message: z.union([z.string(), z.record(z.string())]),
  errors: z.record(z.string(), messsageArray),
})
