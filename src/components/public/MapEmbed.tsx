"use client"

import * as React from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

type MapEmbedProps = {
  src: string
  title?: string
  className?: string
  iframeClassName?: string
  allowFullScreen?: boolean
}

export function MapEmbed({
  src,
  title = "Mappa",
  className,
  iframeClassName,
  allowFullScreen = true,
}: MapEmbedProps) {
  const [allowed, setAllowed] = React.useState(false)

  React.useEffect(() => {
    setAllowed(Boolean(readConsent()?.m))
    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent>).detail
      setAllowed(Boolean(detail?.m))
    }
    window.addEventListener("baroni:consent-updated", onUpdate)
    return () => window.removeEventListener("baroni:consent-updated", onUpdate)
  }, [])

  const openBanner = React.useCallback(() => {
    window.dispatchEvent(new CustomEvent("baroni:open-cookie-banner"))
  }, [])

  if (allowed) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={allowFullScreen}
        style={{ border: 0 }}
        className={cn("absolute inset-0 h-full w-full", iframeClassName)}
      />
    )
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-100 p-6 text-center",
        className,
      )}
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-slate-500 shadow-sm">
        <MapPin className="h-7 w-7" aria-hidden />
      </span>
      <p className="max-w-sm text-sm text-slate-600">
        Mappa non caricata. Per visualizzarla, accetta i cookie marketing.
      </p>
      <Button type="button" size="sm" onClick={openBanner}>
        Mostra mappa
      </Button>
    </div>
  )
}
