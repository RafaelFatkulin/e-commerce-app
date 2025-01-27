import type { z } from 'zod'
import type { errorResponseSchema, successResponseSchema } from '~/schemas/response'

export type SuccessResponse<D = any> = z.infer<typeof successResponseSchema> & {
  data: D
}

export type ErrorResponse = z.infer<typeof errorResponseSchema>
