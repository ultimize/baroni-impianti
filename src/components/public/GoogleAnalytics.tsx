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
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
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

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    if (!measurementId) return
    const consent = readConsent()
    setEnabled(Boolean(consent?.a))

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent>).detail
      const allow = Boolean(detail?.a)
      setEnabled(allow)
      if (!allow) {
        // Disable subsequent GA calls; full purge happens on next page load.
        ;(window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = true
      }
    }
    window.addEventListener("baroni:consent-updated", onUpdate)
    return () => window.removeEventListener("baroni:consent-updated", onUpdate)
  }, [measurementId])

  if (!measurementId || !enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
