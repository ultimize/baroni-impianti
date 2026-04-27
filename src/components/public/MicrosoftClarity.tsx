"use client"

import * as React from "react"
import Script from "next/script"

const COOKIE_NAME = "baroni_consent"

type StoredConsent = {
  v: string
  id: string
  n: boolean
  a: boolean
  m: boolean
  t: string
}

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
  }
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

export function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const [hasConsent, setHasConsent] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const existing = readConsent()
    if (existing?.a) {
      setHasConsent(true)
    }

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent>).detail
      if (detail?.a) {
        setHasConsent(true)
      } else {
        if (typeof window.clarity === "function") {
           window.clarity("stop")
        }
        setHasConsent(false)
      }
    }

    window.addEventListener("baroni:consent-updated", onUpdate)
    return () => window.removeEventListener("baroni:consent-updated", onUpdate)
  }, [])

  if (!clarityId || !hasConsent) return null

  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  )
}
