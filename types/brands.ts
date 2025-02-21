import type { z } from "zod";
import type { brandFilterSchema, brandSchema, brandStatusSchema, createBrandSchema, editBrandSchema } from "~/schemas/brands";

export type BrandStatus = z.output<typeof brandStatusSchema>
export type Brand = z.output<typeof brandSchema>
export type CreateBrand = z.output<typeof createBrandSchema>
export type EditBrand = z.output<typeof editBrandSchema>
export type BrandFilter = z.output<typeof brandFilterSchema>