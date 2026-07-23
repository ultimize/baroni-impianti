"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { Json } from "@/types/database"
import { customCodeSnippetsSchema } from "@/lib/custom-code/snippets"

/**
 * Salva gli snippet di codice personalizzato. Riservato al ruolo `admin`
 * perché consente l'iniezione di codice arbitrario nel sito pubblico.
 */
export async function saveCustomCodeSnippets(input: unknown) {
  const snippets = customCodeSnippetsSchema.parse(input)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Non autenticato")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (profile?.role !== "admin") {
    throw new Error("Solo un amministratore può modificare il codice personalizzato")
  }

  const { error } = await supabase
    .from("site_settings")
    .update({ value: snippets as unknown as Json })
    .eq("key", "custom_code_snippets")
  if (error) throw new Error(error.message)

  revalidatePath("/", "layout")
  revalidatePath("/admin/settings")
}
