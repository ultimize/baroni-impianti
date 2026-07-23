import { getSettingValue } from "@/lib/queries/site-content"
import { parseSnippets } from "@/lib/custom-code/snippets"
import { CustomCodeInjector } from "./CustomCodeInjector"

/**
 * Server component: legge gli snippet di codice personalizzato dal DB e delega
 * l'iniezione (consent-aware) al componente client. Va montato nel layout pubblico.
 */
export async function CustomCode() {
  const raw = await getSettingValue<unknown>("custom_code_snippets")
  const snippets = parseSnippets(raw).filter((s) => s.enabled)
  if (snippets.length === 0) return null
  return <CustomCodeInjector snippets={snippets} />
}
