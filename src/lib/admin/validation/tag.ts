import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const tagFormSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio").max(150),
  slug: z
    .string()
    .min(1, "Lo slug è obbligatorio")
    .max(150)
    .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
  description: z.string().max(500).optional().nullable(),
})

export type TagFormData = z.infer<typeof tagFormSchema>
