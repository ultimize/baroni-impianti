import { z } from "zod"

export const redirectFormSchema = z
  .object({
    old_path: z
      .string()
      .min(1, "Il vecchio path è obbligatorio")
      .max(500)
      .regex(/^\/[^\s]*$/i, "Deve iniziare con /"),
    new_path: z
      .string()
      .min(1, "Il nuovo path è obbligatorio")
      .max(500)
      .refine(
        (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
        "Deve iniziare con / oppure essere un URL assoluto",
      ),
    status_code: z.number().int().refine((n) => [301, 302, 307, 308].includes(n), {
      message: "Codice non valido",
    }),
    is_active: z.boolean(),
    notes: z.string().max(500).optional().nullable(),
  })
  .refine((data) => data.old_path !== data.new_path, {
    message: "Il path di destinazione deve essere diverso",
    path: ["new_path"],
  })

export type RedirectFormData = z.infer<typeof redirectFormSchema>
