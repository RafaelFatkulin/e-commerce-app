import type { z } from 'zod'
import type { roleEnum } from '~/schemas/user'

export type Role = z.infer<typeof roleEnum>
