import type { z } from "zod";
import type { mediaSchema } from "~/schemas/media";

export type Media = z.output<typeof mediaSchema>