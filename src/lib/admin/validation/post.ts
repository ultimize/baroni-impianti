import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const postFormSchema = z
  .object({
    title: z.string().min(1, "Il titolo è obbligatorio").max(200, "Massimo 200 caratteri"),
    slug: z
      .string()
      .min(1, "Lo slug è obbligatorio")
      .max(200, "Massimo 200 caratteri")
      .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
    excerpt: z.string().max(300, "Massimo 300 caratteri").optional().nullable(),
    content: z.string(),
    featured_image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
    featured_image_alt: z.string().max(200).optional().nullable(),
    author_id: z.string().uuid("Seleziona un autore"),
    status: z.enum(["draft", "scheduled", "published", "archived"]),
    published_at: z.string().optional().nullable(),
    reading_time_minutes: z.number().int().nonnegative().optional().nullable(),
    // 70 e 170 sono le lunghezze *consigliate* per Google, non limiti tecnici:
    // bloccare il salvataggio su quelle soglie rendeva inmodificabili gli
    // articoli importati da WordPress. Il contatore nel form resta advisory.
    seo_title: z.string().max(200, "Massimo 200 caratteri").optional().nullable(),
    seo_description: z.string().max(320, "Massimo 320 caratteri").optional().nullable(),
    og_image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
    canonical_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
    noindex: z.boolean(),
    category_ids: z.array(z.string().uuid()),
    tag_ids: z.array(z.string().uuid()),
  })
  .refine(
    (data) => {
      if (data.status === "scheduled" || data.status === "published") {
        return !!data.published_at
      }
      return true
    },
    {
      message: "Data di pubblicazione obbligatoria per articoli pubblicati o programmati",
      path: ["published_at"],
    },
  )

export type PostFormData = z.infer<typeof postFormSchema>
