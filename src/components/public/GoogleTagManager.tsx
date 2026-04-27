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

function consentUpdatePayload(consent: StoredConsent | null) {
  const analytics = consent?.a ? "granted" : "denied"
  const marketing = consent?.m ? "granted" : "denied"
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  }
}

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent>).detail
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", consentUpdatePayload(detail ?? null))
      }
    }
    window.addEventListener("baroni:consent-updated", onUpdate)

    const existing = readConsent()
    if (existing && typeof window.gtag === "function") {
      window.gtag("consent", "update", consentUpdatePayload(existing))
    }

    return () => window.removeEventListener("baroni:consent-updated", onUpdate)
  }, [])

  return (
    <>
      <Script id="gtm-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}
    </>
  )
}
