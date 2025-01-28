import { z } from 'zod'
import { roleEnum } from './user'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Поле имеет неверный формат' }),
  password: z.string().min(8),
})

export const currentUserSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  role: roleEnum,
})

export const signInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessExpiresAt: z.date(),
  refreshExpiresAt: z.date(),
  user: currentUserSchema,
})
