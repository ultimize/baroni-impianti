import type { Metadata } from "next"
import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { TestimonialCard } from "@/components/public/TestimonialCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import { getPublishedTestimonials } from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Testimonianze — I nostri clienti raccontano | Baroni Impianti",
  description:
    "Storie reali di clienti Baroni Impianti nel Tigullio. Scopri le testimonianze video di chi ha scelto la nostra qualità.",
}

// TODO: quando avremo il Place ID di Baroni, integrare Google Places API per
// pull dinamico delle review piu' recenti.
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Baroni+Impianti+Castiglione+Chiavarese"

export default async function TestimonianzePage() {
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <PageHero
        eyebrow="Le parole dei clienti"
        title="Storie reali, voci reali"
        lead="Da oltre vent'anni costruiamo relazioni che durano nel tempo. Queste sono le voci di chi ci ha scelto."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Le testimonianze video
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Le storie in prima persona dei clienti Baroni Impianti.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                youtubeId={t.youtube_video_id ?? undefined}
                authorName={t.client_name}
                authorRole={
                  t.location || t.project_title
                    ? [t.project_title, t.location]
                        .filter(Boolean)
                        .join(" · ")
                    : undefined
                }
                quote={t.description ?? undefined}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Stiamo raccogliendo le prime testimonianze video. Se sei un
              nostro cliente e vuoi raccontarci la tua storia, contattaci.
            </p>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Le recensioni Google
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Vuoi vedere cosa dicono i nostri clienti su Google? Visita la
              nostra scheda Google My Business.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-border/60 bg-card p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-1" aria-label="Valutazione Google">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Recensioni in arrivo qui prossimamente.
              </p>
              <Button asChild variant="outline">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vai alla nostra scheda Google
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi diventare la prossima storia?"
        lead="Un sopralluogo gratuito è il modo migliore per iniziare a lavorare insieme."
        primaryCta={{ label: "Richiedi sopralluogo", href: "/contatti" }}
        secondaryCta={{
          label: "Scopri Zero Pensieri",
          href: "/zero-pensieri",
        }}
      />
    </>
  )
}
