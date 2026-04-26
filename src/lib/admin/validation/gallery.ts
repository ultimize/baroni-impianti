import { z } from "zod"

export const GALLERY_CATEGORIES = [
  { value: "impianti-elettrici", label: "Impianti Elettrici" },
  { value: "fotovoltaico", label: "Fotovoltaico" },
  { value: "sicurezza", label: "Sicurezza" },
  { value: "domotica", label: "Domotica" },
  { value: "rete-cablata", label: "Reti Cablate" },
  { value: "diffusione-sonora", label: "Diffusione Sonora" },
  { value: "spd", label: "Protezione Sovratensioni (SPD)" },
  { value: "lavori-vari", label: "Lavori Vari" },
] as const

export const galleryCategorySchema = z.enum([
  "impianti-elettrici",
  "fotovoltaico",
  "sicurezza",
  "domotica",
  "rete-cablata",
  "diffusione-sonora",
  "spd",
  "lavori-vari",
])

export type GalleryCategory = z.infer<typeof galleryCategorySchema>

export const galleryFormSchema = z.object({
  title: z.string().min(1, "Il titolo è obbligatorio").max(200),
  description: z.string().max(2000).optional().nullable(),
  image_url: z.string().url("Carica un'immagine").min(1, "Carica un'immagine"),
  alt_text: z.string().max(300).optional().nullable(),
  category: galleryCategorySchema,
  width: z.number().int().positive().optional().nullable(),
  height: z.number().int().positive().optional().nullable(),
  order_index: z.number().int().min(0),
  is_featured: z.boolean(),
  is_published: z.boolean(),
})

export type GalleryFormData = z.infer<typeof galleryFormSchema>
