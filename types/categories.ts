import type { z } from 'zod'
import type { rootCategorySchema } from '~/schemas/categories'

export type RootCategory = z.output<typeof rootCategorySchema>
