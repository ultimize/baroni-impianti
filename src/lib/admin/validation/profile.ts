import { z } from "zod"

export const profileFormSchema = z.object({
  full_name: z.string().min(1, "Il nome è obbligatorio").max(150),
  avatar_url: z.string().url("URL non valido").optional().nullable().or(z.literal("")),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
