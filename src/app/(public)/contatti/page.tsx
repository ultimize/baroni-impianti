import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import {
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ContactForm } from "@/components/public/ContactForm"
import { CONTACT_EMAIL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contatti — Baroni Impianti | Sopralluogo gratuito",
  description:
    "Contatta Baroni Impianti per un sopralluogo gratuito. Elettricista a Sestri Levante, Chiavari, Tigullio, province di Genova e La Spezia.",
}

// TODO: sostituire con dato reale letto dal record site_settings.company_phone
const COMPANY_PHONE_DISPLAY = "+39 XXX XXX XXXX"
const COMPANY_PHONE_TEL = ""

const AREAS = [
  "Sestri Levante",
  "Chiavari",
  "Rapallo",
  "Lavagna",
  "Santa Margherita",
  "Cogorno",
  "Castiglione Chiavarese",
  "Moneglia",
  "Deiva Marina",
  "Levanto",
  "Bonassola",
  "La Spezia",
]

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Baroni+Impianti+Castiglione+Chiavarese"

export default function ContattiPage() {
  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Contatti", url: "/contatti" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="Parla con noi"
        title="Contattaci"
        lead="Un sopralluogo gratuito è il modo migliore per iniziare. Scrivici, ti rispondiamo entro 24 ore."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Scrivici un messaggio
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Raccontaci cosa ti serve: ti ricontattiamo per un sopralluogo o
              un preventivo.
            </p>
            <div className="mt-6">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Dove siamo</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Località Moggia, 9
                    <br />
                    16030 Castiglione Chiavarese (GE)
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-xs font-medium text-primary hover:underline"
                  >
                    Apri in Google Maps
                    <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Chiamaci</h3>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {COMPANY_PHONE_DISPLAY}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    Lun–Ven 8:00–18:00
                  </p>
                  <div className="mt-3">
                    <Button
                      asChild={COMPANY_PHONE_TEL.length > 0}
                      variant="ghost"
                      size="sm"
                      disabled={COMPANY_PHONE_TEL.length === 0}
                    >
                      {COMPANY_PHONE_TEL ? (
                        <a href={`tel:${COMPANY_PHONE_TEL}`}>Chiama ora</a>
                      ) : (
                        <span>Chiama ora</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">Scrivici</h3>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block break-all text-sm font-medium text-primary hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Risposta entro 24 ore
                  </p>
                  <div className="mt-3">
                    <Button asChild variant="ghost" size="sm">
                      <a href={`mailto:${CONTACT_EMAIL}`}>Invia email</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <AlertCircle className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    Pronto intervento
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Per emergenze elettriche nel Tigullio chiamaci subito.
                    Interventi rapidi con tecnici qualificati.
                  </p>
                  <div className="mt-3">
                    <Button
                      asChild={COMPANY_PHONE_TEL.length > 0}
                      size="sm"
                      disabled={COMPANY_PHONE_TEL.length === 0}
                    >
                      {COMPANY_PHONE_TEL ? (
                        <a href={`tel:${COMPANY_PHONE_TEL}`}>
                          Chiama emergenza
                        </a>
                      ) : (
                        <span>Chiama emergenza</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dove operiamo
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Serviamo tutto il Tigullio, la provincia di Genova e la provincia
            di La Spezia. Ecco le principali zone.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {AREAS.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-1.5 text-sm font-medium text-foreground"
            >
              {area}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Non vedi la tua zona? Chiamaci: spesso lavoriamo anche fuori area su
          richiesta.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-lg font-semibold tracking-tight">
            Preferisci un altro canale?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Stiamo attivando i nostri canali social. A breve ci troverai anche
            qui.
          </p>
          {/* TODO: popolare con link reali quando Baroni fornirà gli account social */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: "FB", title: "Facebook" },
              { label: "IG", title: "Instagram" },
              { label: "YT", title: "YouTube" },
            ].map(({ label, title }) => (
              <Link
                key={label}
                href="#"
                aria-disabled="true"
                tabIndex={-1}
                className="pointer-events-none inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-xs font-semibold text-muted-foreground opacity-60"
                aria-label={title}
                title={`${title} — in arrivo`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
