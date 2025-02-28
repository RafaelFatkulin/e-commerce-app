import type { z } from 'zod'
import type { statusSchema } from '~/schemas/base'

export type Status = z.output<typeof statusSchema>
