import { z } from 'zod'

export const roleEnum = z.enum(['admin', 'user'])
