"use client"

import * as React from "react"
import type { CustomCodeSnippet } from "@/lib/custom-code/snippets"

const COOKIE_NAME = "baroni_consent"

type StoredConsent = {
  v: string
  id: string
  n: boolean
  a: boolean
  m: boolean
  t: string
}

function readConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1])) as StoredConsent
  } catch {
    return null
  }
}

function isAllowed(snippet: CustomCodeSnippet, consent: StoredConsent | null): boolean {
  switch (snippet.consent) {
    case "analytics":
      return !!consent?.a
    case "marketing":
      return !!consent?.m
    case "always":
    default:
      return true
  }
}

/**
 * Ricostruisce un nodo rendendo eseguibili gli eventuali <script>: i tag script
 * inseriti tramite innerHTML non vengono eseguiti dal browser e vanno ricreati.
 */
function makeExecutable(node: Node): Node {
  if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "SCRIPT") {
    const original = node as HTMLScriptElement
    const script = document.createElement("script")
    for (const attr of Array.from(original.attributes)) {
      script.setAttribute(attr.name, attr.value)
    }
    script.text = original.textContent ?? ""
    return script
  }
  const clone = node.cloneNode(false)
  node.childNodes.forEach((child) => clone.appendChild(makeExecutable(child)))
  return clone
}

/**
 * Inietta gli snippet di codice personalizzato nel sito pubblico rispettando il
 * consenso cookie. Non renderizza nulla: opera solo tramite side-effect nel DOM.
 * Ascolta l'evento `baroni:consent-updated` per attivare/disattivare al volo.
 */
export function CustomCodeInjector({ snippets }: { snippets: CustomCodeSnippet[] }) {
  React.useEffect(() => {
    if (typeof document === "undefined") return

    const injected = new Map<string, Node[]>()

    const inject = (snippet: CustomCodeSnippet) => {
      if (injected.has(snippet.id)) return
      const target = snippet.position === "body" ? document.body : document.head
      if (!target || !snippet.code.trim()) return
      const template = document.createElement("template")
      template.innerHTML = snippet.code
      const added: Node[] = []
      Array.from(template.content.childNodes).forEach((child) => {
        const executable = makeExecutable(child)
        target.appendChild(executable)
        added.push(executable)
      })
      injected.set(snippet.id, added)
    }

    const remove = (id: string) => {
      const nodes = injected.get(id)
      if (!nodes) return
      nodes.forEach((node) => {
        if (node.parentNode) node.parentNode.removeChild(node)
      })
      injected.delete(id)
    }

    const apply = (consent: StoredConsent | null) => {
      for (const snippet of snippets) {
        if (!snippet.enabled || !isAllowed(snippet, consent)) {
          remove(snippet.id)
          continue
        }
        inject(snippet)
      }
    }

    apply(readConsent())

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent>).detail
      apply(detail ?? readConsent())
    }
    window.addEventListener("baroni:consent-updated", onUpdate)

    return () => {
      window.removeEventListener("baroni:consent-updated", onUpdate)
      for (const id of Array.from(injected.keys())) remove(id)
    }
  }, [snippets])

  return null
}
