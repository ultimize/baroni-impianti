import type { Metadata } from "next"
import Link from "next/link"
import { Video, Star, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { TestimonialCard } from "@/components/public/TestimonialCard"
import { ClosingCta } from "@/components/public/ClosingCta"

export const metadata: Metadata = {
  title: "Testimonianze — I nostri clienti raccontano | Baroni Impianti",
  description:
    "Storie reali di impianti elettrici realizzati nel Tigullio. Scopri perché i clienti scelgono Baroni Impianti.",
}

const PLACEHOLDERS = [
  {
    placeholderLabel: "Presto qui — testimonianza di un cliente privato.",
    authorName: "Cliente privato",
    authorRole: "Sestri Levante",
  },
  {
    placeholderLabel: "Presto qui — testimonianza di un'azienda del Tigullio.",
    authorName: "Azienda locale",
    authorRole: "Chiavari",
  },
  {
    placeholderLabel: "Presto qui — testimonianza di un condominio.",
    authorName: "Amministratore condominio",
    authorRole: "Lavagna",
  },
]

export default function TestimonianzePage() {
  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Testimonianze", url: "/testimonianze" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="Le parole dei nostri clienti"
        title="Ogni impianto ha una storia"
        lead="Da oltre vent'anni lavoriamo nel Tigullio costruendo relazioni che durano nel tempo. Queste sono le voci di chi ci ha sceglie."
        tone="brand"
      />

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Video testimonianze
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Le storie in prima persona dei clienti Baroni Impianti.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-dashed border-border bg-card p-10 text-center sm:p-14">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Video className="h-7 w-7" aria-hidden strokeWidth={1.75} />
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            Stiamo raccogliendo le prime testimonianze video
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nei prossimi mesi pubblicheremo qui video di clienti che raccontano
            la loro esperienza con Baroni Impianti. Se sei un nostro cliente e
            vuoi raccontarci la tua storia, contattaci.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contatti?subject=testimonianza">
                Racconta la tua esperienza
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cosa dicono di noi
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Una panoramica di chi ha scelto Baroni Impianti negli anni.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLACEHOLDERS.map((p, i) => (
            <TestimonialCard
              key={i}
              placeholder
              placeholderLabel={p.placeholderLabel}
              authorName={p.authorName}
              authorRole={p.authorRole}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Recensioni Google
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Le opinioni verificate dei nostri clienti direttamente dalla
              scheda Google My Business.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-border/60 bg-card p-8 sm:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div
                  className="flex items-center gap-1"
                  aria-label="Valutazione Google"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Le recensioni dei nostri clienti su Google sono in arrivo qui.
                  Nel frattempo puoi vederle direttamente sulla nostra scheda
                  Google My Business.
                </p>
              </div>
              <Button asChild variant="outline">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Baroni+Impianti+Sestri+Levante"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apri su Google Maps
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi diventare la prossima storia?"
        lead="Contattaci per un sopralluogo gratuito e scopri come possiamo aiutarti."
        primaryCta={{ label: "Richiedi sopralluogo", href: "/contatti" }}
        secondaryCta={{
          label: "Scopri Zero Pensieri",
          href: "/zero-pensieri",
        }}
      />
    </>
  )
}
