"use client"

import { toast } from "sonner"
import type { FieldErrors } from "react-hook-form"

/**
 * Etichette leggibili dei campi dei form admin. Senza queste il messaggio di
 * errore mostrerebbe il nome tecnico della colonna.
 */
const FIELD_LABELS: Record<string, string> = {
  title: "Titolo",
  name: "Nome",
  slug: "Slug",
  excerpt: "Estratto",
  description: "Descrizione",
  content: "Contenuto",
  body: "Contenuto",
  featured_image_url: "Immagine in evidenza",
  featured_image_alt: "Testo alternativo",
  image_url: "Immagine",
  author_id: "Autore",
  status: "Stato",
  published_at: "Data di pubblicazione",
  seo_title: "SEO — Titolo",
  seo_description: "SEO — Descrizione",
  og_image_url: "SEO — Immagine social",
  canonical_url: "SEO — URL canonico",
  email: "Email",
  bio: "Biografia",
  avatar_url: "Avatar",
  client_name: "Nome cliente",
  project_title: "Titolo progetto",
  youtube_url: "URL YouTube",
  location: "Località",
  issuer: "Ente rilasciante",
  issued_year: "Anno",
  source_path: "Percorso di origine",
  destination_path: "Percorso di destinazione",
  icon: "Icona",
  order_index: "Ordine",
}

function labelFor(field: string): string {
  return FIELD_LABELS[field] ?? field
}

/**
 * Handler da passare come secondo argomento a `handleSubmit`.
 *
 * Senza, react-hook-form scarta il submit in silenzio quando la validazione
 * fallisce: nessun toast, nessuno scroll. Per chi usa il pannello il pulsante
 * "Salva" sembra semplicemente non funzionare, soprattutto se il campo che
 * blocca sta in una sezione richiusa.
 */
export function notifyFormErrors(errors: FieldErrors): string[] {
  const fields = Object.keys(errors)
  if (fields.length === 0) return fields

  const labels = fields.map(labelFor)
  toast.error(
    labels.length === 1
      ? `Controlla il campo: ${labels[0]}`
      : `Controlla questi campi: ${labels.join(", ")}`,
  )

  if (typeof document !== "undefined") {
    const firstInvalid = document.querySelector<HTMLElement>(
      "[aria-invalid='true'], [data-invalid='true']",
    )
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return fields
}

/**
 * Variante per i form che devono anche reagire ai campi non validi, per
 * esempio riaprendo una sezione collassata che li contiene.
 */
export function createInvalidHandler(onFields?: (fields: string[]) => void) {
  return (errors: FieldErrors) => {
    const fields = notifyFormErrors(errors)
    if (fields.length > 0) onFields?.(fields)
  }
}
