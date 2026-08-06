import "server-only"

const GHL_API_BASE = "https://services.leadconnectorhq.com"
const GHL_API_VERSION = "2021-07-28"
const REQUEST_TIMEOUT_MS = 8_000

const SUBJECT_LABELS: Record<string, string> = {
  sopralluogo: "Sopralluogo gratuito",
  preventivo: "Preventivo",
  "zero-pensieri": "Zero Pensieri",
  "pronto-intervento": "Pronto intervento",
  testimonianza: "Testimonianza",
  altro: "Altro",
}

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

function getConfig(): { token: string; locationId: string; userId: string | null } | null {
  const token = process.env.GHL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) return null
  return { token, locationId, userId: process.env.GHL_USER_ID || null }
}

/**
 * Porta un numero italiano in formato E.164 (+39...), che è quello che
 * GoHighLevel usa per il matching e per SMS/WhatsApp.
 */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null
  const cleaned = raw.replace(/[^\d+]/g, "")
  if (!cleaned) return null
  if (cleaned.startsWith("+")) return cleaned
  if (cleaned.startsWith("00")) return `+${cleaned.slice(2)}`
  if (cleaned.startsWith("39") && cleaned.length >= 11) return `+${cleaned}`
  return `+39${cleaned}`
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) return { firstName: parts[0] ?? fullName, lastName: "" }
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1] ?? "",
  }
}

function subjectLabel(subject: string | null | undefined): string | null {
  if (!subject) return null
  return SUBJECT_LABELS[subject] ?? subject
}

function buildTags(payload: CrmLeadPayload): string[] {
  const tags = ["sito-web", "form-contatti"]
  if (payload.subject) tags.push(payload.subject)
  if (payload.serviceInterest) tags.push(payload.serviceInterest.toLowerCase())
  return Array.from(new Set(tags))
}

function buildNoteBody(payload: CrmLeadPayload): string {
  const lines = [`Richiesta dal form del sito`, ""]
  const label = subjectLabel(payload.subject)
  if (label) lines.push(`Soggetto: ${label}`)
  if (payload.serviceInterest) lines.push(`Servizio di interesse: ${payload.serviceInterest}`)
  if (payload.sourcePage) lines.push(`Pagina di origine: ${payload.sourcePage}`)
  if (payload.phone) lines.push(`Telefono indicato: ${payload.phone}`)
  if (payload.id) lines.push(`ID richiesta: ${payload.id}`)
  lines.push("", "Messaggio:", payload.message)
  return lines.join("\n")
}

async function ghlFetch(
  path: string,
  token: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; json: Record<string, unknown> | null; text: string }> {
  const response = await fetch(`${GHL_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  const text = await response.text()
  let json: Record<string, unknown> | null = null
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null
  } catch {
    json = null
  }
  return { ok: response.ok, status: response.status, json, text }
}

/**
 * Crea o aggiorna il contatto su GoHighLevel e ci allega una nota con il
 * messaggio del form. Non lancia mai: gli errori vengono loggati e la
 * funzione restituisce null, così il form resta comunque valido lato utente.
 */
export async function sendLeadToGoHighLevel(
  payload: CrmLeadPayload,
): Promise<CrmSyncResult | null> {
  const config = getConfig()
  if (!config) {
    console.warn(
      "[ghl] GHL_API_TOKEN o GHL_LOCATION_ID mancanti — invio del lead su GoHighLevel saltato.",
    )
    return null
  }

  const { firstName, lastName } = splitName(payload.name)
  const phone = normalizePhone(payload.phone)

  const contactBody: Record<string, unknown> = {
    locationId: config.locationId,
    firstName,
    lastName,
    name: payload.name,
    email: payload.email,
    source: payload.sourcePage
      ? `Sito web — form contatti (${payload.sourcePage})`
      : "Sito web — form contatti",
    tags: buildTags(payload),
  }
  if (phone) contactBody.phone = phone

  let contactId: string
  let isNew = false

  try {
    const result = await ghlFetch("/contacts/upsert", config.token, contactBody)
    if (!result.ok) {
      console.error("[ghl] upsert contatto fallito", {
        status: result.status,
        body: result.text.slice(0, 500),
      })
      return null
    }
    const contact = (result.json?.contact ?? null) as { id?: string } | null
    if (!contact?.id) {
      console.error("[ghl] upsert contatto senza id nella risposta", {
        body: result.text.slice(0, 500),
      })
      return null
    }
    contactId = contact.id
    isNew = result.json?.new === true
  } catch (error) {
    console.error("[ghl] upsert contatto in errore", error)
    return null
  }

  let noteCreated = false
  try {
    const noteBody: Record<string, unknown> = { body: buildNoteBody(payload) }
    if (config.userId) noteBody.userId = config.userId

    const result = await ghlFetch(`/contacts/${contactId}/notes`, config.token, noteBody)
    if (result.ok) {
      noteCreated = true
    } else {
      console.error("[ghl] creazione nota fallita", {
        contactId,
        status: result.status,
        body: result.text.slice(0, 500),
      })
    }
  } catch (error) {
    console.error("[ghl] creazione nota in errore", { contactId, error })
  }

  console.info("[ghl] lead sincronizzato", { contactId, isNew, noteCreated })
  return { contactId, isNew, noteCreated }
}
