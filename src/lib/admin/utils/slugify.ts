const ITALIAN_DIACRITICS: Record<string, string> = {
  à: "a",
  á: "a",
  â: "a",
  ä: "a",
  ã: "a",
  å: "a",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  ò: "o",
  ó: "o",
  ô: "o",
  ö: "o",
  õ: "o",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  ç: "c",
  ñ: "n",
  ß: "ss",
}

export function slugify(input: string): string {
  if (!input) return ""
  const lowered = input.toLowerCase().trim()
  const normalized = lowered.replace(/[àáâäãåèéêëìíîïòóôöõùúûüçñß]/g, (ch) => ITALIAN_DIACRITICS[ch] ?? ch)
  return normalized
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 200)
}

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
