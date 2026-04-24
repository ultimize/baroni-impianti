import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import {
  getPublishedServices,
  getServiceBySlug,
} from "@/lib/queries/site-content"

export const revalidate = 3600

type Params = { slug: string }

export async function generateStaticParams() {
  const services = await getPublishedServices()
  return services
    .filter((s) => s.slug !== "zero-pensieri")
    .map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: "Servizio non trovato — Baroni Impianti" }
  return {
    title: `${service.title} — Baroni Impianti`,
    description:
      service.seo_description ??
      service.short_description ??
      undefined,
  }
}

const INCLUDED = [
  "Sopralluogo tecnico gratuito",
  "Preventivo dettagliato",
  "Realizzazione a regola d'arte",
  "Certificazioni e documentazione",
  "Assistenza post-installazione",
]

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params

  if (slug === "zero-pensieri") {
    redirect("/zero-pensieri")
  }

  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const contactHref = `/contatti?service=${slug}`

  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Servizi", url: "/servizi" },
            { name: service.title, url: `/servizi/${slug}` },
          ]}
          scriptId={`breadcrumb-service-${slug}-jsonld`}
        />
      </Container>

      <PageHero
        eyebrow="Servizio"
        title={service.title}
        lead={service.short_description ?? undefined}
        tone="brand"
        primaryCta={{
          label: "Richiedi sopralluogo gratuito",
          href: contactHref,
        }}
        secondaryCta={{ label: "Tutti i servizi", href: "/servizi" }}
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cosa include
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Stiamo preparando una panoramica completa di questo servizio. Nel
            frattempo contattaci direttamente per una consulenza personalizzata:
            ogni progetto è diverso e merita un&apos;analisi su misura.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-4 w-4" aria-hidden strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary/15 bg-card p-8 text-center sm:p-12">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Manutenzione programmata
          </p>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Vuoi affiancare a questo servizio anche la manutenzione?
          </h3>
          <p className="max-w-2xl text-base text-muted-foreground">
            Con Zero Pensieri il tuo impianto è seguito nel tempo: controlli
            periodici, pronto intervento illimitato e garanzia a vita sui
            dispositivi.
          </p>
          <Button asChild size="lg">
            <Link href="/zero-pensieri">Scopri Zero Pensieri</Link>
          </Button>
        </div>
      </SectionWrapper>

      <ClosingCta
        title={`Vuoi parlare di ${service.title.toLowerCase()}?`}
        lead="Un sopralluogo gratuito è il modo più rapido per capire di cosa hai bisogno."
        primaryCta={{
          label: "Richiedi sopralluogo gratuito",
          href: contactHref,
        }}
        secondaryCta={{ label: "Chi siamo", href: "/chi-siamo" }}
      />
    </>
  )
}
