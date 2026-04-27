"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { SITE_URL } from "@/lib/constants"

const emailSchema = z.string().trim().email()

export type ForgotState = {
  ok: boolean
  error?: string
}

export async function requestPasswordReset(
  _prev: ForgotState | null,
  formData: FormData,
): Promise<ForgotState> {
  const parsed = emailSchema.safeParse(formData.get("email"))
  if (!parsed.success) {
    return { ok: false, error: "Inserisci un indirizzo email valido." }
  }

  const supabase = await createClient()
  const finalDest = "/admin/login/reset-password"
  const redirectTo = `${SITE_URL}/auth/callback?redirectTo=${encodeURIComponent(finalDest)}`

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo,
  })

  if (error) {
    console.error("[forgot] resetPasswordForEmail error", {
      message: error.message,
      status: error.status,
    })
  }

  return { ok: true }
}
