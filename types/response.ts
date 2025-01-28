import type { z } from 'zod'
import type { errorResponseSchema, successResponseSchema } from '~/schemas/response'

export type SuccessResponse<D> = z.output<ReturnType<typeof successResponseSchema<z.ZodType<D>>>> & {
  data: D
}
export type ErrorResponse = z.infer<typeof errorResponseSchema>
