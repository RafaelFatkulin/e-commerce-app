import type { z } from 'zod'
import type { categorySchema, rootCategorySchema } from '~/schemas/categories'

export type RootCategory = z.output<typeof rootCategorySchema>
export type Category = z.output<typeof categorySchema> & {
    categories: Category[]
}