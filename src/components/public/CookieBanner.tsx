"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const COOKIE_NAME = "baroni_consent"
const POLICY_VERSION = "1.0"
const COOKIE_MAX_AGE_DAYS = 365

type StoredConsent = {
  v: string
  id: string
  n: boolean
  a: boolean
  m: boolean
  t: string
}

type ConsentAction = "accept_all" | "reject_all" | "custom" | "update"

function readConsentCookie(): StoredConsent | null {
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

function writeConsentCookie(value: StoredConsent) {
  const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : ""
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value),
  )}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false)
  const [closing, setClosing] = React.useState(false)
  const [step, setStep] = React.useState<"compact" | "custom">("compact")
  const [analytics, setAnalytics] = React.useState(false)
  const [marketing, setMarketing] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (!readConsentCookie()) {
      setVisible(true)
    }
    const onOpen = () => {
      const existing = readConsentCookie()
      if (existing) {
        setAnalytics(existing.a)
        setMarketing(existing.m)
        setStep("custom")
      } else {
        setStep("compact")
      }
      setClosing(false)
      setVisible(true)
    }
    window.addEventListener("baroni:open-cookie-banner", onOpen)
    return () => window.removeEventListener("baroni:open-cookie-banner", onOpen)
  }, [])

  const close = React.useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setVisible(false)
      setClosing(false)
      setStep("compact")
    }, 250)
  }, [])

  const persist = React.useCallback(
    async (action: ConsentAction, allowAnalytics: boolean, allowMarketing: boolean) => {
      const existing = readConsentCookie()
      const consentId = existing?.id ?? generateUuid()
      const payload: StoredConsent = {
        v: POLICY_VERSION,
        id: consentId,
        n: true,
        a: allowAnalytics,
        m: allowMarketing,
        t: new Date().toISOString(),
      }
      writeConsentCookie(payload)
      window.dispatchEvent(
        new CustomEvent("baroni:consent-updated", { detail: payload }),
      )
      try {
        setSubmitting(true)
        await fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consent_id: consentId,
            necessary: true,
            analytics: allowAnalytics,
            marketing: allowMarketing,
            policy_version: POLICY_VERSION,
            action,
            page_url:
              typeof window !== "undefined" ? window.location.href : null,
          }),
          keepalive: true,
        })
      } catch {
        // Silently swallow — cookie is the source of truth client-side.
      } finally {
        setSubmitting(false)
        close()
      }
    },
    [close],
  )

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6 transition-all duration-200",
        closing
          ? "translate-y-full opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl",
          "max-h-[60vh] sm:max-h-none",
          "sm:max-w-2xl",
        )}
      >
        <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-6">
          {step === "compact" ? (
            <div className="space-y-4">
              <div>
                <h2
                  id="cookie-banner-title"
                  className="font-heading text-lg font-semibold tracking-tight"
                >
                  Rispettiamo la tua privacy
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Usiamo cookie tecnici necessari al funzionamento del sito.
                  Con il tuo consenso usiamo anche cookie di analisi
                  (Google Analytics) per capire come migliorare il servizio.
                  Puoi accettare, rifiutare o personalizzare.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  disabled={submitting}
                  onClick={() => persist("accept_all", true, true)}
                >
                  Accetta tutti
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  disabled={submitting}
                  onClick={() => persist("reject_all", false, false)}
                >
                  Rifiuta non necessari
                </Button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setStep("custom")}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50 sm:ml-auto"
                >
                  Personalizza
                </button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <Link
                  href="/cookie-policy"
                  className="hover:text-foreground hover:underline"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-foreground hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h2
                  id="cookie-banner-title"
                  className="font-heading text-lg font-semibold tracking-tight"
                >
                  Personalizza le preferenze
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Scegli quali categorie di cookie attivare. Puoi modificare
                  questa scelta in qualunque momento dal footer.
                </p>
              </div>

              <div className="space-y-4">
                <ConsentRow
                  title="Necessari"
                  description="Indispensabili per la sicurezza, sessione admin, preferenze visualizzazione."
                  checked
                  disabled
                />
                <ConsentRow
                  title="Analitici (Google Analytics)"
                  description="Ci aiutano a capire come gli utenti usano il sito (pagine viste, tempo di permanenza). I dati sono anonimizzati e gestiti da Google."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="Marketing"
                  description="Riservato a future campagne pubblicitarie. Attualmente non utilizzato."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setStep("compact")}
                  className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
                >
                  Indietro
                </button>
                <Button
                  size="lg"
                  disabled={submitting}
                  onClick={() => persist("custom", analytics, marketing)}
                >
                  Salva preferenze
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onChange?.(Boolean(value))}
      />
    </div>
  )
}
