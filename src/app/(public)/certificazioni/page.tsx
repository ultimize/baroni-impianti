import type { Metadata } from "next"
import {
  FileBadge,
  Network,
  ShieldCheck,
  FileText,
  Scale,
  Check,
  Award,
  type LucideIcon,
} from "lucide-react"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { FeatureCard } from "@/components/public/FeatureCard"
import { ClosingCta } from "@/components/public/ClosingCta"

export const metadata: Metadata = {
  title: "Certificazioni — Baroni Impianti | Installazioni a norma CEI",
  description:
    "Baroni Impianti opera secondo le più importanti certificazioni del settore elettrico: DM 37/2008, KNX Partner, conformità CEI 64-8. Qualità documentata.",
}

type Certification = {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "DM 37/2008 — Lettera A",
    subtitle: "Abilitazione per impianti elettrici",
    description:
      "Abilitazione ministeriale alla realizzazione di impianti elettrici civili, industriali e strumentali.",
    icon: FileBadge,
  },
  {
    title: "KNX Partner",
    subtitle: "Standard mondiale per automazione edifici",
    description:
      "Certificazione ottenuta dopo formazione specifica ed esami pratici sulla progettazione KNX.",
    icon: Network,
  },
  {
    title: "Conformità CEI 64-8",
    subtitle: "Norma tecnica di riferimento",
    description:
      "Tutti gli impianti vengono progettati e installati secondo l'ultima edizione della norma CEI 64-8.",
    icon: ShieldCheck,
  },
]

const DELIVERABLES = [
  "Dichiarazione di Conformità (DICO) secondo DM 37/08",
  "Schemi elettrici aggiornati",
  "Schede tecniche dei componenti installati",
  "Certificati di origine materiali",
  "Istruzioni d'uso e manutenzione",
  "Garanzia scritta sugli interventi",
  "Registro delle verifiche periodiche (per Zero Pensieri)",
]

const NORMATIVE_BADGES = ["CEI 64-8", "IMQ", "DM 37/08", "ENEL", "GSE"]

export default function CertificazioniPage() {
  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Certificazioni", url: "/certificazioni" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="Qualità documentata"
        title="Certificazioni e riconoscimenti"
        lead="Operiamo secondo le più importanti certificazioni del settore elettrico. Ogni impianto è documentato e tracciabile."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Qualifiche e abilitazioni
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Le certificazioni che stanno alla base del nostro lavoro quotidiano.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.icon
            return (
              <article
                key={cert.title}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-card shadow-sm"
              >
                {/* TODO: quando arriveranno le scansioni certificazioni, sostituire
                    questo placeholder con <Image src={cert.image_url} ...> */}
                <div className="grid aspect-[4/3] place-items-center rounded-t-2xl bg-gradient-to-br from-primary/10 via-muted/50 to-muted">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-background text-primary shadow-md">
                    <Award className="h-8 w-8" aria-hidden strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                    {cert.subtitle}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {cert.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Perché le certificazioni contano
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Non sono un pezzo di carta: sono la garanzia concreta della qualità
            del tuo impianto.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={ShieldCheck}
            title="Sicurezza garantita"
            description="Ogni impianto è conforme alle normative vigenti, progettato e testato per durare."
          />
          <FeatureCard
            icon={FileText}
            title="Documentazione completa"
            description="Ricevi DICO, schemi elettrici e certificati materiali, pronti da archiviare o consegnare."
          />
          <FeatureCard
            icon={Scale}
            title="Copertura assicurativa valida"
            description="Impianti certificati mantengono valide le polizze casa, impresa e responsabilità civile."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Cosa ti consegniamo a fine lavori
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              La documentazione che riceve ogni cliente Baroni Impianti.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {DELIVERABLES.map((item) => (
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
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Siamo sempre aggiornati
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Il settore elettrico evolve rapidamente: nuove edizioni della norma
            CEI 64-8, aggiornamenti del DM 37/08, tecnologie emergenti come
            domotica e fotovoltaico con accumulo. Investiamo in formazione
            continua per garantire ai nostri clienti impianti che rispettino
            le migliori pratiche del momento.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {NORMATIVE_BADGES.map((label) => (
            <span
              key={label}
              className="inline-flex items-center rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-semibold tracking-wide text-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi un impianto certificato?"
        lead="Richiedi un preventivo: ogni progetto parte da un sopralluogo gratuito."
        primaryCta={{ label: "Richiedi preventivo", href: "/contatti" }}
        secondaryCta={{ label: "Scopri i servizi", href: "/servizi" }}
      />
    </>
  )
}
