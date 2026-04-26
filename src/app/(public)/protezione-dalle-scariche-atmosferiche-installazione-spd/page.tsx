import type { Metadata } from "next"
import { ShieldAlert, Zap, CloudLightning, Home, Server } from "lucide-react"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Protezione dalle scariche atmosferiche, installazione SPD Sestri Levante",
  description: "Proteggi i tuoi elettrodomestici e dispositivi elettronici dai fulmini con un impianto SPD e scaricatori di sovratensione a regola d'arte.",
}

export default function SPDPage() {
  return (
    <>
      <PageHero
        eyebrow="Protezione SPD"
        title="Protezione dalle scariche atmosferiche, installazione SPD Sestri Levante"
        lead="Gli interruttori magnetotermici e i salvavita proteggono da sovraccarichi e contatti, ma non bastano contro i fulmini. Scopri perché."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-red-500 mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Il Problema
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
                Salvavita e Magnetotermici: Perché non bastano?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Quasi tutti conoscono gli interruttori magnetotermici e i salvavita che proteggono l'impianto e le persone da sovraccarichi e contatti diretti o indiretti.
                </p>
                <p>
                  Tuttavia, <strong className="text-foreground">l'impianto in assenza di un sistema di protezione scariche atmosferiche è gravemente a rischio</strong>, e con esso tutti i dispositivi ad esso collegati, compresi gli elettrodomestici più costosi.
                </p>
                <p>
                  I fulmini e le sovratensioni transitorie viaggiano sui cavi elettrici e possono bruciare schede elettroniche di TV, caldaie, frigoriferi e computer in una frazione di secondo. Il normale "salvavita" non è progettato per intercettare questi sbalzi di tensione estremi.
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 shadow-sm flex flex-col items-center justify-center text-center">
              <CloudLightning className="h-20 w-20 text-red-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold mb-3 text-red-900">Cosa rischi senza SPD</h3>
              <ul className="text-left space-y-3 mt-4 text-red-900/80">
                <li className="flex items-center gap-3">
                  <span className="grid h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  Rottura irreparabile di elettrodomestici (frigo, forno, lavatrice)
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  Danni ai sistemi di riscaldamento (caldaie, pompe di calore)
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  Perdita di dati su computer e server non protetti
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              La Soluzione: Impianto SPD e Scaricatori
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Per una protezione completa contro le sovratensioni, progettiamo e installiamo sistemi SPD (Surge Protection Device) multilivello.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border/60 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Protezione Completa</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gli scaricatori di sovratensione SPD vengono installati a cascata: partendo dal quadro generale fino ad arrivare ai quadri di zona o alle singole prese per proteggere i dispositivi più sensibili.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/60 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Deviazione dell'energia</h3>
              <p className="text-muted-foreground leading-relaxed">
                In caso di sovratensione, lo scaricatore interviene in microsecondi deviando l'energia in eccesso verso l'impianto di terra, proteggendo così la tua abitazione e impedendo che l'energia distruttiva raggiunga gli apparecchi.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Il tuo impianto è protetto?"
        lead="Non aspettare il prossimo temporale per scoprirlo. Metti al sicuro i tuoi elettrodomestici."
        primaryCta={{ label: "Contattaci per valutare la tua protezione", href: "/contatti" }}
      />
    </>
  )
}
