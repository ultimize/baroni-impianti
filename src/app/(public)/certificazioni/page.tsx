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
import { CertificationCard } from "@/components/public/CertificationCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import { getPublishedCertifications } from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Certificazioni — Baroni Impianti | Installazioni a norma",
  description:
    "Baroni Impianti opera secondo le più importanti certificazioni del settore: DM 37/2008, KNX Partner, conformità CEI 64-8.",
}

function pickIcon(title: string): LucideIcon {
  const t = title.toLowerCase()
  if (t.includes("dm 37")) return FileBadge
  if (t.includes("knx")) return Network
  if (t.includes("cei")) return ShieldCheck
  return Award
}

const DELIVERABLES = [
  "Dichiarazione di Conformità (DICO) secondo DM 37/08",
  "Schemi elettrici aggiornati",
  "Schede tecniche dei componenti installati",
  "Certificati di origine materiali",
  "Istruzioni d'uso e manutenzione",
  "Garanzia scritta sugli interventi",
  "Registro verifiche periodiche (per Zero Pensieri)",
]

export default async function CertificazioniPage() {
  const certifications = await getPublishedCertifications()

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
        title="Certificazioni e abilitazioni"
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

        {certifications.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                title={cert.title}
                issuer={cert.issuer}
                description={cert.description}
                imageUrl={cert.image_url}
                icon={pickIcon(cert.title)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            Certificazioni in fase di pubblicazione.
          </p>
        )}
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
            iconColor="green"
            title="Sicurezza garantita"
            description="Ogni impianto è conforme alle normative vigenti."
          />
          <FeatureCard
            icon={FileText}
            iconColor="primary"
            title="Documentazione completa"
            description="Ricevi DICO, schemi elettrici e certificati materiali."
          />
          <FeatureCard
            icon={Scale}
            iconColor="amber"
            title="Copertura assicurativa valida"
            description="Impianti certificati mantengono valide le polizze casa e impresa."
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

      <ClosingCta
        title="Vuoi un impianto certificato?"
        lead="Richiedi un preventivo: ogni progetto parte da un sopralluogo gratuito."
        primaryCta={{ label: "Richiedi preventivo", href: "/contatti" }}
        secondaryCta={{ label: "Scopri i servizi", href: "/servizi" }}
      />
    </>
  )
}
