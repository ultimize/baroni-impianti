import { z } from "zod"

export const testimonialFormSchema = z.object({
  client_name: z.string().min(1, "Il nome cliente è obbligatorio").max(150),
  project_title: z.string().max(200).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  location: z.string().max(150).optional().nullable(),
  youtube_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  thumbnail_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  order_index: z.number().int().min(0),
  is_featured: z.boolean(),
  is_published: z.boolean(),
})

export type TestimonialFormData = z.infer<typeof testimonialFormSchema>
