import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Home,
  Factory,
  Sun,
  Smartphone,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { StepList } from "@/components/public/StepList"
import { ClosingCta } from "@/components/public/ClosingCta"

export const metadata: Metadata = {
  title: "Servizi — Baroni Impianti | Impianti elettrici, fotovoltaico, domotica",
  description:
    "Dagli impianti elettrici civili al fotovoltaico con accumulo, dalla domotica alla videosorveglianza. Scopri tutti i servizi di Baroni Impianti nel Tigullio.",
}

type Service = {
  slug: string
  icon: LucideIcon
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    slug: "impianti-civili",
    icon: Home,
    title: "Impianti elettrici civili",
    description:
      "Impianti a norma CEI 64-8 per abitazioni private. Nuove costruzioni, ristrutturazioni, adeguamenti e certificazioni.",
  },
  {
    slug: "impianti-industriali",
    icon: Factory,
    title: "Impianti elettrici industriali",
    description:
      "Progettazione e realizzazione per capannoni, laboratori e attività commerciali. Cabine, quadri, linee di potenza.",
  },
  {
    slug: "fotovoltaico",
    icon: Sun,
    title: "Fotovoltaico e accumulo",
    description:
      "Impianti fotovoltaici chiavi in mano con sistema di accumulo, monitoraggio e gestione pratica incentivi.",
  },
  {
    slug: "domotica",
    icon: Smartphone,
    title: "Domotica e smart home",
    description:
      "Automazione evoluta con standard KNX: luci, tapparelle, clima, scenari. BARONI è KNX Partner certificato.",
  },
  {
    slug: "sicurezza",
    icon: ShieldCheck,
    title: "Videosorveglianza e antifurto",
    description:
      "Impianti di allarme intrusione, videosorveglianza IP, videocitofoni smart, controllo accessi.",
  },
  {
    slug: "pronto-intervento",
    icon: Wrench,
    title: "Pronto intervento e manutenzione",
    description:
      "Guasti, blackout, manutenzioni programmate. Interventi rapidi nel Tigullio con tecnici qualificati.",
  },
]

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

export default function ServiziPage() {
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
        title="Un unico interlocutore per tutto l'impianto"
        lead="Dal piccolo adeguamento al progetto completo: impianti elettrici, fotovoltaico, domotica e sicurezza. Sempre a norma, sempre documentati."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.slug}
                className="group flex flex-col rounded-2xl border border-border/60 bg-card p-8 transition-shadow hover:shadow-md"
              >
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" aria-hidden strokeWidth={1.75} />
                </span>
                <h2 className="mt-6 text-xl font-semibold tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={`/contatti?service=${service.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                >
                  Scopri di più
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            )
          })}
        </div>
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
