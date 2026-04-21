import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

// TODO: quando arriveranno i contenuti specifici per ogni servizio dal cliente,
// sostituire questo placeholder con una pagina dedicata (eventualmente
// reintroducendo il fetch da Supabase `services`).
const SERVICES: Record<string, { title: string; description: string }> = {
  "impianti-civili": {
    title: "Impianti elettrici civili",
    description:
      "Impianti a norma CEI 64-8 per abitazioni private: nuove costruzioni, ristrutturazioni, adeguamenti e certificazioni.",
  },
  "impianti-industriali": {
    title: "Impianti elettrici industriali",
    description:
      "Progettazione e realizzazione di impianti elettrici per capannoni, laboratori e attività commerciali.",
  },
  fotovoltaico: {
    title: "Fotovoltaico e accumulo",
    description:
      "Impianti fotovoltaici chiavi in mano con sistema di accumulo, monitoraggio e gestione degli incentivi.",
  },
  domotica: {
    title: "Domotica e smart home",
    description:
      "Automazione evoluta con standard KNX: luci, tapparelle, clima, scenari personalizzati. BARONI è KNX Partner.",
  },
  sicurezza: {
    title: "Videosorveglianza e antifurto",
    description:
      "Impianti di allarme intrusione, videosorveglianza IP, videocitofoni smart e controllo accessi.",
  },
  "pronto-intervento": {
    title: "Pronto intervento e manutenzione",
    description:
      "Guasti, blackout, manutenzioni programmate. Interventi rapidi nel Tigullio con tecnici qualificati.",
  },
}

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) return { title: "Servizio non trovato" }
  return {
    title: `${service.title} — Baroni Impianti`,
    description: service.description,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) notFound()

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
        lead={service.description}
        tone="brand"
        primaryCta={{ label: "Richiedi informazioni", href: `/contatti?service=${slug}` }}
        secondaryCta={{ label: "Tutti i servizi", href: "/servizi" }}
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Contenuti dettagliati in arrivo
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Stiamo preparando una pagina dedicata a questo servizio con esempi,
            materiali, tempi e garanzie. Nel frattempo, contattaci: rispondiamo
            a ogni domanda specifica entro 24 ore.
          </p>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Parliamone"
        lead="Un sopralluogo gratuito è il modo più rapido per capire di cosa hai bisogno."
        primaryCta={{ label: "Richiedi sopralluogo", href: `/contatti?service=${slug}` }}
        secondaryCta={{ label: "Chi siamo", href: "/chi-siamo" }}
      />
    </>
  )
}
