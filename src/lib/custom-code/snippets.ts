import { z } from "zod"

export const CUSTOM_CODE_POSITIONS = ["head", "body"] as const
export const CUSTOM_CODE_CONSENTS = ["always", "analytics", "marketing"] as const

export type CustomCodePosition = (typeof CUSTOM_CODE_POSITIONS)[number]
export type CustomCodeConsent = (typeof CUSTOM_CODE_CONSENTS)[number]

export type CustomCodeSnippet = {
  id: string
  label: string
  code: string
  position: CustomCodePosition
  consent: CustomCodeConsent
  enabled: boolean
}

// Schema di validazione di un singolo snippet.
export const customCodeSnippetSchema = z.object({
  id: z.string().min(1),
  label: z.string().max(120).default(""),
  code: z.string().default(""),
  position: z.enum(["head", "body"]).default("head"),
  consent: z.enum(["always", "analytics", "marketing"]).default("always"),
  enabled: z.boolean().default(true),
})

export const customCodeSnippetsSchema = z.array(customCodeSnippetSchema)

/**
 * Parser tollerante: accetta il valore grezzo del setting (jsonb) e restituisce
 * sempre un array valido, scartando le voci non conformi.
 */
export function parseSnippets(raw: unknown): CustomCodeSnippet[] {
  if (!Array.isArray(raw)) return []
  const out: CustomCodeSnippet[] = []
  for (const item of raw) {
    const parsed = customCodeSnippetSchema.safeParse(item)
    if (parsed.success) out.push(parsed.data)
  }
  return out
}
