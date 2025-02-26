import type { z } from "zod";
import type { mediaOrderChangeSchema, mediaSchema } from "~/schemas/media";

export type Media = z.output<typeof mediaSchema>
export type MediaOrderChange = z.output<typeof mediaOrderChangeSchema>
