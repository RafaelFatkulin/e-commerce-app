import { z } from 'zod'

export function createFilterSchema<T extends z.ZodRawShape>(entitySchema: z.ZodObject<T>) {
  return z.object({
    q: z.string().optional(),
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort_by: entitySchema.keyof().optional(),
    sort_order: z.enum(['asc', 'desc']).optional(),
  })
}
