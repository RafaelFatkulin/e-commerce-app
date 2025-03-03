import type { z } from 'zod'
import type {
  categoryFilterSchema,
  categorySchema,
  categoryStatusSchema,
  createCategorySchema,
  editCategorySchema,
  minimalCategorySchema,
  rootCategorySchema,
} from '~/schemas/categories'

export type CategoryStatus = z.output<typeof categoryStatusSchema>
export type RootCategory = z.output<typeof rootCategorySchema>
export type Category = z.output<typeof categorySchema> & {
  categories: Category[]
}
export type CategoryFilter = z.output<typeof categoryFilterSchema> & { parent_id: number | undefined }
export type CreateCategory = z.output<typeof createCategorySchema>
export type EditCategory = z.output<typeof editCategorySchema>
export type MinimalCategory = z.output<typeof minimalCategorySchema>