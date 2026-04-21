import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const authorFormSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio").max(150),
  slug: z
    .string()
    .min(1, "Lo slug è obbligatorio")
    .max(150)
    .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
  bio: z.string().max(2000).optional().nullable(),
  avatar_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  email: z.string().email("Email non valida").optional().nullable().or(z.literal("")),
})

export type AuthorFormData = z.infer<typeof authorFormSchema>
