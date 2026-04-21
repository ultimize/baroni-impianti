import { z } from "zod"

export const certificationFormSchema = z.object({
  title: z.string().min(1, "Il titolo è obbligatorio").max(200),
  description: z.string().max(2000).optional().nullable(),
  image_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
  issuer: z.string().max(150).optional().nullable(),
  issued_year: z
    .number()
    .int()
    .min(1900, "Anno non valido")
    .max(new Date().getFullYear() + 1)
    .optional()
    .nullable(),
  valid_until: z.string().optional().nullable(),
  order_index: z.number().int().min(0),
  is_featured: z.boolean(),
  is_published: z.boolean(),
})

export type CertificationFormData = z.infer<typeof certificationFormSchema>
