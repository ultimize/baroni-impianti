import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const pageFormSchema = z.object({
  title: z.string().min(1, "Il titolo è obbligatorio").max(200),
  slug: z
    .string()
    .min(1, "Lo slug è obbligatorio")
    .max(200)
    .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
  content: z.string().optional().nullable(),
  template: z.enum(["default", "legal", "landing"]),
  is_published: z.boolean(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(170).optional().nullable(),
  og_image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  noindex: z.boolean(),
})

export type PageFormData = z.infer<typeof pageFormSchema>
