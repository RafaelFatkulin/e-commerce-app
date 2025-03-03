import type { z } from 'zod'
import type {
  createProductSchema,
  editProductSchema,
  productFilterSchema,
  productSchema,
  productWithInfoSchema,
} from './../schemas/products'

export type Product = z.output<typeof productSchema>
export type ProductWithInfo = z.output<typeof productWithInfoSchema>
export type CreateProduct = z.output<typeof createProductSchema>
export type EditProduct = z.output<typeof editProductSchema>
export type ProductFilter = z.output<typeof productFilterSchema>
