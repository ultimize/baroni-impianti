import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio").max(150),
  slug: z
    .string()
    .min(1, "Lo slug è obbligatorio")
    .max(150)
    .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
  description: z.string().max(500).optional().nullable(),
  parent_id: z.string().uuid().optional().nullable(),
  order_index: z.number().int().min(0),
})

export type CategoryFormData = z.infer<typeof categoryFormSchema>
