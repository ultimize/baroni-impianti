"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AdevolutionLogo } from "@/components/public/AdevolutionLogo"
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
  const [consentId, setConsentId] = React.useState<string>("")

  React.useEffect(() => {
    const existing = readConsentCookie()
    if (!existing) {
      setConsentId(generateUuid())
      setVisible(true)
    } else {
      setConsentId(existing.id)
    }
    const onOpen = () => {
      const current = readConsentCookie()
      if (current) {
        setConsentId(current.id)
        setAnalytics(current.a)
        setMarketing(current.m)
        setStep("custom")
      } else {
        setConsentId((id) => id || generateUuid())
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
      const id = existing?.id ?? consentId ?? generateUuid()
      const payload: StoredConsent = {
        v: POLICY_VERSION,
        id,
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
            consent_id: id,
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
    [close, consentId],
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
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
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
                {consentId ? <ConsentIdBadge value={consentId} /> : null}
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
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <nav
                  className="flex items-center gap-3 text-[11px] text-slate-500"
                  aria-label="Documenti legali"
                >
                  <Link
                    href="/cookie-policy"
                    className="hover:text-slate-700 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-slate-700 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </nav>
                <a
                  href="https://adevolutionagency.it"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Sito realizzato da ADEvolution Agency (apre in nuova scheda)"
                >
                  <span>Powered by</span>
                  <AdevolutionLogo className="h-3 w-auto" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
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
                {consentId ? <ConsentIdBadge value={consentId} /> : null}
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

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <nav
                  className="flex items-center gap-3 text-[11px] text-slate-500"
                  aria-label="Documenti legali"
                >
                  <Link
                    href="/cookie-policy"
                    className="hover:text-slate-700 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-slate-700 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </nav>
                <a
                  href="https://adevolutionagency.it"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Sito realizzato da ADEvolution Agency (apre in nuova scheda)"
                >
                  <span>Powered by</span>
                  <AdevolutionLogo className="h-3 w-auto" aria-hidden="true" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ConsentIdBadge({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)
  const short = value.slice(0, 8)
  const seed = parseInt(value.slice(0, 8), 16) || 0
  const hue = seed % 360
  const initials = short.slice(0, 2).toUpperCase()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignored
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`ID consenso: ${value} — clicca per copiare`}
      aria-label={`ID consenso ${short}, clicca per copiare`}
      className="group flex shrink-0 items-center gap-2 rounded-full border border-border bg-muted/50 py-1 pl-1 pr-2.5 text-xs transition-colors hover:bg-muted"
    >
      <span
        aria-hidden
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
        style={{ backgroundColor: `hsl(${hue} 65% 45%)` }}
      >
        {initials}
      </span>
      <span className="hidden flex-col items-start leading-tight sm:flex">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          ID consenso
        </span>
        <span className="font-mono tabular-nums text-foreground">{short}</span>
      </span>
      <span className="font-mono tabular-nums text-foreground sm:hidden">
        {short}
      </span>
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600" />
      ) : (
        <Copy className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}
    </button>
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
