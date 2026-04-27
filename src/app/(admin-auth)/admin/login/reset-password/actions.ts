"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { resetPasswordSchema } from "@/lib/admin/validation/reset-password"

export type ResetPasswordState = {
  error?: string
}

export async function updateUserPassword(
  _prev: ResetPasswordState | null,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dati non validi." }
  }

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) {
    return {
      error:
        "Sessione di reimpostazione scaduta. Richiedi un nuovo link dalla pagina di login.",
    }
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/admin")
}
