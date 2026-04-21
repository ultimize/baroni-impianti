"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { CONTACT_EMAIL } from "@/lib/constants"

const SUBJECTS: Array<{ value: string; label: string }> = [
  { value: "sopralluogo", label: "Sopralluogo gratuito" },
  { value: "preventivo", label: "Preventivo" },
  { value: "zero-pensieri", label: "Zero Pensieri" },
  { value: "pronto-intervento", label: "Pronto intervento" },
  { value: "testimonianza", label: "Testimonianza" },
  { value: "altro", label: "Altro" },
]

const SERVICE_TO_SUBJECT: Record<string, string> = {
  "zero-pensieri": "zero-pensieri",
  "pronto-intervento": "pronto-intervento",
  "impianti-civili": "preventivo",
  "impianti-industriali": "preventivo",
  fotovoltaico: "preventivo",
  domotica: "preventivo",
  sicurezza: "preventivo",
}

export function ContactForm() {
  const searchParams = useSearchParams()
  const [subject, setSubject] = useState("sopralluogo")
  const [privacyOk, setPrivacyOk] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const service = searchParams.get("service")
    const subjectParam = searchParams.get("subject")
    if (subjectParam) {
      const match = SUBJECTS.find((s) => s.value === subjectParam)
      if (match) {
        setSubject(match.value)
        return
      }
    }
    if (service && SERVICE_TO_SUBJECT[service]) {
      setSubject(SERVICE_TO_SUBJECT[service])
    }
  }, [searchParams])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!privacyOk) {
      toast.warning("Accetta l'informativa sulla privacy per continuare.")
      return
    }
    setSubmitting(true)
    // TODO: quando sarà attiva l'integrazione Resend, sostituire con fetch a
    // /api/contact e rimuovere il toast informativo.
    setTimeout(() => {
      toast.info(
        `Funzione in attivazione. Per ora scrivici direttamente a ${CONTACT_EMAIL}.`,
      )
      setSubmitting(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">
            Nome e cognome <span className="text-destructive">*</span>
          </Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Soggetto</Label>
          <select
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={cn(
              "flex h-9 w-full items-center rounded-lg border border-input bg-background px-3 text-sm",
              "shadow-xs outline-none transition-colors",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            )}
          >
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Messaggio <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Raccontaci brevemente il progetto o il problema."
        />
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
        <Checkbox
          id="privacy"
          checked={privacyOk}
          onCheckedChange={(v) => setPrivacyOk(v)}
          className="mt-0.5"
        />
        <Label
          htmlFor="privacy"
          className="text-xs font-normal leading-relaxed text-muted-foreground"
        >
          Ho letto l&apos;informativa privacy e acconsento al trattamento dei
          miei dati per finalità di risposta alla mia richiesta.
        </Label>
      </div>

      <div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Invio..." : "Invia richiesta"}
        </Button>
      </div>
    </form>
  )
}
