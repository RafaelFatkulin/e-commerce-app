import type { z } from 'zod'
import type {
  categoryFilterSchema,
  categorySchema,
  rootCategorySchema
} from '~/schemas/categories'

export type RootCategory = z.output<typeof rootCategorySchema>
export type Category = z.output<typeof categorySchema> & {
  categories: Category[]
}
export type CategoryFilter = z.output<typeof categoryFilterSchema> & { parent_id: number | undefined }