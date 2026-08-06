import "server-only"

const FUNCTION_NAME = "lead-to-ghl"
const REQUEST_TIMEOUT_MS = 10_000

export type CrmLeadPayload = {
  id?: string | null
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  serviceInterest?: string | null
  sourcePage?: string | null
}

export type CrmSyncResult = {
  contactId: string
  isNew: boolean
  noteCreated: boolean
}

/**
 * L'integrazione con GoHighLevel vive in una Edge Function Supabase
 * (`supabase/functions/lead-to-ghl`): le credenziali GHL stanno nei secrets
 * Supabase, non fra le variabili d'ambiente di Vercel. Qui ci limitiamo a
 * inoltrare il lead. Non lancia mai: gli errori vengono loggati e la funzione
 * restituisce null, così l'invio del form resta valido lato utente.
 */
export async function sendLeadToGoHighLevel(
  payload: CrmLeadPayload,
): Promise<CrmSyncResult | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    console.warn("[ghl] URL Supabase o service role key mancanti — invio del lead saltato.")
    return null
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/${FUNCTION_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    const text = await response.text()
    if (!response.ok) {
      console.error("[ghl] edge function in errore", {
        status: response.status,
        body: text.slice(0, 500),
      })
      return null
    }

    const json = JSON.parse(text) as {
      ok?: boolean
      contactId?: string
      isNew?: boolean
      noteCreated?: boolean
    }
    if (!json.ok || !json.contactId) {
      console.error("[ghl] risposta inattesa dalla edge function", text.slice(0, 500))
      return null
    }

    console.info("[ghl] lead sincronizzato", {
      contactId: json.contactId,
      isNew: json.isNew === true,
      noteCreated: json.noteCreated === true,
    })
    return {
      contactId: json.contactId,
      isNew: json.isNew === true,
      noteCreated: json.noteCreated === true,
    }
  } catch (error) {
    console.error("[ghl] chiamata alla edge function fallita", error)
    return null
  }
}
