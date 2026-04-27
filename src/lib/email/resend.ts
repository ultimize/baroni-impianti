import "server-only"

import { Resend } from "resend"

import { SITE_URL } from "@/lib/constants"

let cachedClient: Resend | null = null

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!cachedClient) {
    cachedClient = new Resend(process.env.RESEND_API_KEY)
  }
  return cachedClient
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatItalianTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "full",
    timeStyle: "short",
  }).format(date)
}

const COMPANY_NAME = "BARONI IMPIANTI di Baroni Luca"
const COMPANY_ADDRESS = "Località Moggia, 9 — 16030 Castiglione Chiavarese (GE)"
const COMPANY_VAT = "P. IVA 02438410991"
const COMPANY_PHONE_DISPLAY = "+39 0185 167 6704"
const COMPANY_PHONE_TEL = "+3901851676704"
const COMPANY_EMAIL = "info@baronitecnoimpianti.com"
const LOGO_URL = "https://elettricistasestrilevante.it/logo.png"

const SUBJECT_LABELS: Record<string, string> = {
  sopralluogo: "Sopralluogo gratuito",
  preventivo: "Preventivo",
  "zero-pensieri": "Zero Pensieri",
  "pronto-intervento": "Pronto intervento",
  testimonianza: "Testimonianza",
  altro: "Altro",
}

export type ContactPayload = {
  id?: string | null
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  sourcePage?: string | null
}

function getFromHeader(): string {
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "no-reply@notifiche.elettricistasestrilevante.it"
  const fromName = process.env.RESEND_FROM_NAME ?? "Baroni Impianti"
  return `${fromName} <${fromEmail}>`
}

function buildInternalHtml(payload: ContactPayload, timestamp: string): string {
  const subjectLabel =
    payload.subject && SUBJECT_LABELS[payload.subject]
      ? SUBJECT_LABELS[payload.subject]
      : payload.subject ?? "—"
  const adminUrl = payload.id
    ? `${SITE_URL}/admin/contacts/${encodeURIComponent(payload.id)}`
    : `${SITE_URL}/admin/contacts`
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br>")
  const phoneRow = payload.phone
    ? `<tr><td style="padding:8px 0;color:#64748b;width:140px;">Telefono</td><td style="padding:8px 0;color:#0f172a;font-weight:500;"><a href="tel:${escapeHtml(payload.phone)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(payload.phone)}</a></td></tr>`
    : ""
  const sourceRow = payload.sourcePage
    ? `<tr><td style="padding:8px 0;color:#64748b;">Pagina di origine</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${escapeHtml(payload.sourcePage)}</td></tr>`
    : ""

  return `<!DOCTYPE html>
<html lang="it"><body style="margin:0;padding:24px;background:#f1f5f9;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
    <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
      <img src="${LOGO_URL}" height="40" alt="Baroni Impianti" style="display:block;height:40px;width:auto;">
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Nuova richiesta dal sito</p>
      <h1 style="margin:0 0 24px 0;font-size:22px;line-height:1.3;color:#0f172a;">Nuova richiesta da ${escapeHtml(payload.name)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#64748b;width:140px;">Nome</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;color:#0f172a;font-weight:500;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(payload.email)}</a></td></tr>
        ${phoneRow}
        <tr><td style="padding:8px 0;color:#64748b;">Soggetto</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${escapeHtml(subjectLabel)}</td></tr>
        ${sourceRow}
        <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Ricevuta il</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${escapeHtml(timestamp)}</td></tr>
      </table>
      <div style="margin-top:24px;padding:16px 20px;background:#f8fafc;border-left:3px solid #0ea5e9;border-radius:6px;">
        <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Messaggio</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#0f172a;">${messageHtml}</p>
      </div>
      <div style="margin-top:32px;text-align:center;">
        <a href="${adminUrl}" style="display:inline-block;padding:12px 24px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Apri admin → Contatti</a>
      </div>
      <p style="margin:24px 0 0 0;font-size:13px;color:#64748b;line-height:1.5;">
        Puoi rispondere direttamente a questa email: la risposta arriverà al cliente all'indirizzo <strong>${escapeHtml(payload.email)}</strong>.
      </p>
    </div>
    <div style="padding:20px 32px;border-top:1px solid #e2e8f0;background:#f8fafc;font-size:12px;color:#64748b;line-height:1.6;">
      ${escapeHtml(COMPANY_NAME)}<br>
      ${escapeHtml(COMPANY_ADDRESS)}<br>
      ${escapeHtml(COMPANY_VAT)}
    </div>
  </div>
</body></html>`
}

function buildAutoReplyHtml(payload: ContactPayload, timestamp: string): string {
  const subjectLabel =
    payload.subject && SUBJECT_LABELS[payload.subject]
      ? SUBJECT_LABELS[payload.subject]
      : payload.subject ?? null
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br>")
  const subjectRow = subjectLabel
    ? `<tr><td style="padding:6px 0;color:#64748b;width:120px;">Soggetto</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(subjectLabel)}</td></tr>`
    : ""

  return `<!DOCTYPE html>
<html lang="it"><body style="margin:0;padding:24px;background:#f1f5f9;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
    <div style="padding:24px 32px;border-bottom:1px solid #e2e8f0;">
      <img src="${LOGO_URL}" height="40" alt="Baroni Impianti" style="display:block;height:40px;width:auto;">
    </div>
    <div style="padding:32px;">
      <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;color:#0f172a;">Grazie ${escapeHtml(payload.name.split(" ")[0] ?? payload.name)}, abbiamo ricevuto la tua richiesta.</h1>
      <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#334155;">
        Ti risponderemo <strong>entro 24 ore lavorative</strong> all'indirizzo email che ci hai indicato. Per richieste urgenti puoi contattarci telefonicamente.
      </p>
      <div style="margin-top:24px;padding:16px 20px;background:#f8fafc;border-radius:8px;">
        <p style="margin:0 0 12px 0;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Riepilogo richiesta</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
          ${subjectRow}
          <tr><td style="padding:6px 0;color:#64748b;width:120px;">Inviata il</td><td style="padding:6px 0;color:#0f172a;">${escapeHtml(timestamp)}</td></tr>
        </table>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e2e8f0;">
          <p style="margin:0 0 6px 0;font-size:13px;color:#64748b;">Messaggio</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">${messageHtml}</p>
        </div>
      </div>
      <div style="margin-top:28px;padding:20px;border:1px solid #e2e8f0;border-radius:8px;">
        <p style="margin:0 0 12px 0;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Contatti diretti</p>
        <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;">
          <strong>Telefono:</strong> <a href="tel:${COMPANY_PHONE_TEL}" style="color:#0f172a;">${COMPANY_PHONE_DISPLAY}</a>
        </p>
        <p style="margin:0 0 6px 0;font-size:14px;color:#0f172a;">
          <strong>Email:</strong> <a href="mailto:${COMPANY_EMAIL}" style="color:#0f172a;">${COMPANY_EMAIL}</a>
        </p>
        <p style="margin:0;font-size:14px;color:#0f172a;">
          <strong>Sede:</strong> ${escapeHtml(COMPANY_ADDRESS)}
        </p>
      </div>
      <p style="margin:28px 0 0 0;font-size:13px;color:#64748b;line-height:1.6;">
        Questa è una conferma automatica. Puoi rispondere a questa email per aggiungere informazioni alla tua richiesta.
      </p>
    </div>
    <div style="padding:20px 32px;border-top:1px solid #e2e8f0;background:#f8fafc;font-size:12px;color:#64748b;line-height:1.6;">
      ${escapeHtml(COMPANY_NAME)} — ${escapeHtml(COMPANY_VAT)}<br>
      ${escapeHtml(COMPANY_ADDRESS)}<br>
      <a href="${SITE_URL}/privacy-policy" style="color:#64748b;">Privacy Policy</a> · <a href="${SITE_URL}/cookie-policy" style="color:#64748b;">Cookie Policy</a>
    </div>
  </div>
</body></html>`
}

async function safeSend(
  client: Resend,
  args: Parameters<Resend["emails"]["send"]>[0],
  label: string,
): Promise<void> {
  try {
    const result = await client.emails.send(args)
    if (result.error) {
      console.error(`[resend] ${label} failed`, {
        name: result.error.name,
        message: result.error.message,
      })
    }
  } catch (error) {
    console.error(`[resend] ${label} threw`, error)
  }
}

export async function sendContactNotification(payload: ContactPayload): Promise<void> {
  const client = getClient()
  if (!client) {
    console.warn(
      "[resend] RESEND_API_KEY missing — skipping contact email notifications.",
    )
    return
  }

  const timestamp = formatItalianTimestamp(new Date())
  const from = getFromHeader()
  const internalTo = process.env.CONTACT_NOTIFICATION_TO ?? COMPANY_EMAIL
  const replyToOnAutoReply = process.env.CONTACT_REPLY_TO ?? COMPANY_EMAIL

  await Promise.all([
    safeSend(
      client,
      {
        from,
        to: [internalTo],
        replyTo: payload.email,
        subject: `Nuova richiesta da ${payload.name} — Baroni Impianti`,
        html: buildInternalHtml(payload, timestamp),
      },
      "internal notification",
    ),
    safeSend(
      client,
      {
        from,
        to: [payload.email],
        replyTo: replyToOnAutoReply,
        subject: "Abbiamo ricevuto la tua richiesta — Baroni Impianti",
        html: buildAutoReplyHtml(payload, timestamp),
      },
      "auto-reply",
    ),
  ])
}
