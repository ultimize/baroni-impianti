import { z } from "zod"

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Almeno 8 caratteri"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Le password non coincidono",
  })

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
