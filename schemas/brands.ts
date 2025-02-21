import { z } from "zod";
import { stringField } from "./base";
import { createFilterSchema } from "./filter";

export const brandStatusSchema = z.enum(['active', 'not-active'])

export const brandSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    order: z.number(),
    isActive: brandStatusSchema
})
export const createBrandSchema = z.object({
    title: stringField(3, 128),
    description: stringField().optional()
})
export const editBrandSchema = z.object({
    title: stringField(3, 128).optional(),
    slug: stringField(3, 255).optional(),
    description: stringField().optional(),
    order: z.number().min(1, 'Минимальное значение поля - 1').optional(),
    status: brandStatusSchema.optional(),
})
export const brandFilterSchema = createFilterSchema(brandSchema)