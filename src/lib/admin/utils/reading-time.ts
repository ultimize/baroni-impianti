import { stripHtml } from "./format"

const WORDS_PER_MINUTE = 220

export function calculateReadingTime(html: string | null | undefined): number {
  const text = stripHtml(html)
  if (!text) return 0
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
