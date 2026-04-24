import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { StepList } from "@/components/public/StepList"
import { ClosingCta } from "@/components/public/ClosingCta"
import { ServiceCard } from "@/components/public/ServiceCard"
import { getPublishedServices } from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title:
    "Servizi — Baroni Impianti | Impianti elettrici, sicurezza, domotica, fotovoltaico",
  description:
    "Impianti cablati, sistemi di sicurezza, domotica KNX, fotovoltaico con accumulo, contratto Zero Pensieri. Scopri tutti i servizi nel Tigullio.",
}

const STEPS = [
  {
    number: 1,
    title: "Ascolto",
    description: "Sopralluogo gratuito e analisi delle esigenze.",
  },
  {
    number: 2,
    title: "Progettazione",
    description: "Studio tecnico con materiali e normative di riferimento.",
  },
  {
    number: 3,
    title: "Realizzazione",
    description: "Installazione eseguita con personale qualificato.",
  },
  {
    number: 4,
    title: "Garanzia",
    description: "Certificazioni, documentazione e assistenza nel tempo.",
  },
]

export default async function ServiziPage() {
  const services = await getPublishedServices()

  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Servizi", url: "/servizi" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="I nostri servizi"
        title="Cosa possiamo fare per te"
        lead="Dal cablaggio civile al fotovoltaico, dalla sicurezza alla domotica. Cinque aree di competenza per coprire ogni esigenza elettrica."
        tone="brand"
      />

      <SectionWrapper variant="white">
        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const isZeroPensieri = service.slug === "zero-pensieri"
              return (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  name={service.title}
                  shortDescription={service.short_description ?? ""}
                  iconName={service.icon}
                  href={
                    isZeroPensieri ? "/zero-pensieri" : `/servizi/${service.slug}`
                  }
                  highlight={isZeroPensieri}
                />
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Stiamo aggiornando l&apos;elenco dei servizi. Torna a trovarci tra
            poco.
          </p>
        )}
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Come lavoriamo
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Un metodo semplice e collaudato, dal primo contatto alla consegna
            della documentazione finale.
          </p>
        </div>
        <div className="mt-12">
          <StepList steps={STEPS} />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="primary-soft">
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-3xl border border-primary/15 bg-card p-8 sm:p-12 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Servizio esclusivo
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Vuoi dimenticarti di pensare all&apos;impianto?
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              Con la formula Zero Pensieri ti occupi solo della tua vita, alla
              manutenzione pensiamo noi.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/zero-pensieri">
              Scopri Zero Pensieri
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Ogni impianto è diverso"
        lead="Contattaci per un sopralluogo gratuito: studieremo la soluzione migliore per te."
        primaryCta={{ label: "Richiedi preventivo", href: "/contatti" }}
        secondaryCta={{ label: "Chi siamo", href: "/chi-siamo" }}
      />
    </>
  )
}
