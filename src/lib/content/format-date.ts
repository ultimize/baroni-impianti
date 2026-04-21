import { it } from "date-fns/locale"
import { formatInTimeZone } from "date-fns-tz"

const TZ = "Europe/Rome"

export function formatItalianDate(iso: string, pattern = "d MMMM yyyy"): string {
  return formatInTimeZone(new Date(iso), TZ, pattern, { locale: it })
}

export function getUrlDateParts(iso: string): {
  year: string
  month: string
  day: string
} {
  const date = new Date(iso)
  return {
    year: formatInTimeZone(date, TZ, "yyyy"),
    month: formatInTimeZone(date, TZ, "MM"),
    day: formatInTimeZone(date, TZ, "dd"),
  }
}
