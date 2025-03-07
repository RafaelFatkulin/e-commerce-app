import type { z } from 'zod'
import type { brandFilterSchema, brandSchema, brandWithMediaSchema, createBrandSchema, editBrandSchema, minimalBrandSchema } from '~/schemas/brands'

export type Brand = z.output<typeof brandSchema>
export type MinimalBrand = z.output<typeof minimalBrandSchema>
export type BrandWithMedia = z.output<typeof brandWithMediaSchema>
export type CreateBrand = z.output<typeof createBrandSchema>
export type EditBrand = z.output<typeof editBrandSchema>
export type BrandFilter = z.output<typeof brandFilterSchema>
