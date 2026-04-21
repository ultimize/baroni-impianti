import { formatInTimeZone } from "date-fns-tz"
import { it } from "date-fns/locale"

const TZ = "Europe/Rome"

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—"
  return formatInTimeZone(new Date(iso), TZ, "d MMM yyyy, HH:mm", { locale: it })
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  return formatInTimeZone(new Date(iso), TZ, "d MMM yyyy", { locale: it })
}

export function formatRelativeFromNow(iso: string | null | undefined): string {
  if (!iso) return "—"
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.round((now - then) / 1000)

  if (diff < 60) return "ora"
  if (diff < 3600) return `${Math.floor(diff / 60)} min fa`
  if (diff < 86400) return `${Math.floor(diff / 3600)} h fa`
  if (diff < 604800) return `${Math.floor(diff / 86400)} g fa`
  return formatDate(iso)
}

export function truncate(value: string | null | undefined, max = 80): string {
  if (!value) return ""
  const trimmed = value.replace(/\s+/g, " ").trim()
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed
}

export function toLocalDatetimeInput(iso: string | null | undefined): string {
  if (!iso) return ""
  // Input type=datetime-local expects "YYYY-MM-DDTHH:mm" in local time.
  return formatInTimeZone(new Date(iso), TZ, "yyyy-MM-dd'T'HH:mm")
}

export function fromLocalDatetimeInput(value: string | null | undefined): string | null {
  if (!value) return null
  // The string is interpreted as Europe/Rome local; convert to UTC ISO.
  // We can build it as a Date assuming local browser TZ — acceptable since
  // CMS users operate in Italy. For deterministic behavior, accept browser TZ.
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

export function stripHtml(html: string | null | undefined): string {
  if (!html) return ""
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
}
