import type { z } from 'zod'
import type { currentUserSchema, signInResponseSchema, signInSchema } from '~/schemas/auth'

export type SignIn = z.output<typeof signInSchema>
export type SignInResponse = z.output<typeof signInResponseSchema>
export type CurrentUser = z.output<typeof currentUserSchema>
