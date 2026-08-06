import "jsr:@supabase/functions-js/edge-runtime.d.ts"

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

type LeadPayload = {
  id?: string | null
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  serviceInterest?: string | null
  sourcePage?: string | null
}

/** Porta un numero italiano in E.164: GHL lo usa per il matching e per SMS/WhatsApp. */
function normalizePhone(raw: string | null | undefined): string | null {
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
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] ?? "" }
}

function buildTags(payload: LeadPayload): string[] {
  const tags = ["sito-web", "form-contatti"]
  if (payload.subject) tags.push(payload.subject)
  if (payload.serviceInterest) tags.push(payload.serviceInterest.toLowerCase())
  return [...new Set(tags)]
}

function buildNoteBody(payload: LeadPayload): string {
  const lines = ["Richiesta dal form del sito", ""]
  const label = payload.subject ? SUBJECT_LABELS[payload.subject] ?? payload.subject : null
  if (label) lines.push(`Soggetto: ${label}`)
  if (payload.serviceInterest) lines.push(`Servizio di interesse: ${payload.serviceInterest}`)
  if (payload.sourcePage) lines.push(`Pagina di origine: ${payload.sourcePage}`)
  if (payload.phone) lines.push(`Telefono indicato: ${payload.phone}`)
  if (payload.id) lines.push(`ID richiesta: ${payload.id}`)
  lines.push("", "Messaggio:", payload.message)
  return lines.join("\n")
}

async function ghlFetch(path: string, token: string, body: unknown) {
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
    json = text ? JSON.parse(text) : null
  } catch {
    json = null
  }
  return { ok: response.ok, status: response.status, json, text }
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 })
  }

  const token = Deno.env.get("GHL_API_TOKEN")
  const locationId = Deno.env.get("GHL_LOCATION_ID")
  const userId = Deno.env.get("GHL_USER_ID") || null

  if (!token || !locationId) {
    console.error("[ghl] secrets mancanti: imposta GHL_API_TOKEN e GHL_LOCATION_ID")
    return Response.json({ ok: false, error: "missing_secrets" }, { status: 500 })
  }

  let payload: LeadPayload
  try {
    payload = await req.json()
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }
  if (!payload?.name || !payload?.email) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 })
  }

  const { firstName, lastName } = splitName(payload.name)
  const phone = normalizePhone(payload.phone)

  const contactBody: Record<string, unknown> = {
    locationId,
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
    const result = await ghlFetch("/contacts/upsert", token, contactBody)
    if (!result.ok) {
      console.error("[ghl] upsert fallito", result.status, result.text.slice(0, 500))
      return Response.json(
        { ok: false, error: "upsert_failed", status: result.status, detail: result.text.slice(0, 500) },
        { status: 502 },
      )
    }
    const contact = (result.json?.contact ?? null) as { id?: string } | null
    if (!contact?.id) {
      console.error("[ghl] upsert senza id", result.text.slice(0, 500))
      return Response.json({ ok: false, error: "no_contact_id" }, { status: 502 })
    }
    contactId = contact.id
    isNew = result.json?.new === true
  } catch (error) {
    console.error("[ghl] upsert in errore", error)
    return Response.json({ ok: false, error: "upsert_threw" }, { status: 502 })
  }

  let noteCreated = false
  try {
    const noteBody: Record<string, unknown> = { body: buildNoteBody(payload) }
    if (userId) noteBody.userId = userId
    const result = await ghlFetch(`/contacts/${contactId}/notes`, token, noteBody)
    noteCreated = result.ok
    if (!result.ok) {
      console.error("[ghl] nota fallita", contactId, result.status, result.text.slice(0, 500))
    }
  } catch (error) {
    console.error("[ghl] nota in errore", contactId, error)
  }

  console.info("[ghl] lead sincronizzato", { contactId, isNew, noteCreated })
  return Response.json({ ok: true, contactId, isNew, noteCreated }, { status: 200 })
})
