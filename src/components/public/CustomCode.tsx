import { getSettingValue } from "@/lib/queries/site-content"
import { parseSnippets } from "@/lib/custom-code/snippets"
import { CustomCodeInjector } from "./CustomCodeInjector"

const META_RE = /<meta\b[^>]*>/gi
const ATTR_RE = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g

function metaProps(tag: string): Record<string, string> {
  const props: Record<string, string> = {}
  for (const m of tag.matchAll(ATTR_RE)) {
    const name = m[1].toLowerCase()
    props[name === "http-equiv" ? "httpEquiv" : name] = m[2] ?? m[3] ?? ""
  }
  return props
}

/**
 * Server component: legge gli snippet di codice personalizzato dal DB e delega
 * l'iniezione (consent-aware) al componente client. Va montato nel layout pubblico.
 * I <meta> degli snippet "head" + "always" (es. verifica Google Search Console)
 * vengono renderizzati lato server: i crawler leggono l'HTML e non eseguono JS.
 */
export async function CustomCode() {
  const raw = await getSettingValue<unknown>("custom_code_snippets")
  const snippets = parseSnippets(raw).filter((s) => s.enabled)
  if (snippets.length === 0) return null

  const metas: Record<string, string>[] = []
  const clientSnippets = snippets.map((s) => {
    if (s.position !== "head" || s.consent !== "always") return s
    for (const tag of s.code.match(META_RE) ?? []) metas.push(metaProps(tag))
    return { ...s, code: s.code.replace(META_RE, "") }
  })

  return (
    <>
      {/* React 19 sposta i <meta> nel <head> */}
      {metas.map((props, i) => (
        <meta key={i} {...props} />
      ))}
      <CustomCodeInjector snippets={clientSnippets} />
    </>
  )
}
