import { z } from 'zod'
import { roleEnum } from './user'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
})

export const currentUserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  role: roleEnum,
})
