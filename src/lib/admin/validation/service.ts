import { z } from "zod"
import { SLUG_REGEX } from "../utils/slugify"

export const serviceFeatureSchema = z.object({
  title: z.string().min(1, "Titolo obbligatorio").max(150),
  description: z.string().max(500).optional().nullable(),
})

export const serviceGalleryImageSchema = z.object({
  url: z.string().url("URL immagine non valido"),
  alt: z.string().max(200).optional().nullable(),
})

export const serviceFormSchema = z.object({
  title: z.string().min(1, "Il titolo è obbligatorio").max(200),
  slug: z
    .string()
    .min(1, "Lo slug è obbligatorio")
    .max(200)
    .regex(SLUG_REGEX, "Solo lettere minuscole, numeri e trattini"),
  short_description: z.string().max(300, "Massimo 300 caratteri").optional().nullable(),
  content: z.string().optional().nullable(),
  icon: z.string().max(50).optional().nullable(),
  featured_image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  gallery_images: z.array(serviceGalleryImageSchema),
  features: z.array(serviceFeatureSchema),
  cta_text: z.string().max(80).optional().nullable(),
  cta_url: z.string().max(500).optional().nullable(),
  order_index: z.number().int().min(0),
  is_featured: z.boolean(),
  is_published: z.boolean(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(170).optional().nullable(),
  og_image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
})

export type ServiceFormData = z.infer<typeof serviceFormSchema>
export type ServiceFeature = z.infer<typeof serviceFeatureSchema>
export type ServiceGalleryImage = z.infer<typeof serviceGalleryImageSchema>
