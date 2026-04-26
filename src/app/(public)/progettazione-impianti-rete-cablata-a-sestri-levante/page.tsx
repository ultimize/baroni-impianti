import type { Metadata } from "next"
import { ShieldAlert, Zap, Network, Server, ArrowRight } from "lucide-react"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Progettazione Impianti Rete Cablata a Sestri Levante — Baroni Impianti",
  description: "Risolvi i problemi del Wi-Fi con un impianto di rete cablata studiato per massimizzare velocità, sicurezza e stabilità della tua connessione.",
}

export default function ReteCablataPage() {
  return (
    <>
      <PageHero
        eyebrow="Rete Cablata"
        title="Progettazione Impianti Rete Cablata a Sestri Levante"
        lead="Perché continuare a utilizzare il Wi-Fi per collegare tutti i dispositivi elettronici della tua casa? Oltre all'aumento delle radiazioni, ci sono molteplici problemi legati alla velocità di connessione, latenza e sicurezza. La soluzione è un impianto in rete cablata."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              I problemi del Wi-Fi
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Le reti wireless sono comode, ma presentano limiti importanti per l'affidabilità e la sicurezza a lungo termine.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-red-900">Radiazioni</h3>
              <p className="text-red-900/80 leading-relaxed text-sm">
                Aumento delle radiazioni all'interno degli ambienti domestici a causa della continua esposizione alle onde elettromagnetiche dei router e ripetitori.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-900">Latenza e Velocità</h3>
              <p className="text-amber-900/80 leading-relaxed text-sm">
                Velocità di connessione instabile e alta latenza, specialmente quando più dispositivi sono connessi contemporaneamente o in presenza di muri spessi.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-6">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Sicurezza Informatica</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Problemi di sicurezza informatica: le reti Wi-Fi sono molto più vulnerabili ad attacchi esterni e intercettazioni rispetto alle connessioni fisiche.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                La Soluzione
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
                Rete Cablata ben strutturata
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Un impianto in rete cablata ben strutturato risolve definitivamente tutti questi problemi. Offre una connessione stabile, massimizza la velocità della tua linea, azzera le interferenze e garantisce la massima sicurezza per i tuoi dati.
                </p>
                <p>
                  Tuttavia, una rete cablata efficiente non si improvvisa. Deve essere <strong>studiata prima dell'inizio cantiere</strong>.
                </p>
                <p>
                  Valutiamo le tue esigenze, i dispositivi da collegare (TV, PC, console, sistemi di allarme, telecamere) e progettiamo un'infrastruttura di rete con cavi e componenti di alta qualità, predisponendo i punti di accesso esattamente dove ti serviranno.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 sm:p-10 border border-border/60 shadow-lg">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8">
                <Network className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Vantaggi Immediati</h3>
              <ul className="space-y-4">
                {[
                  "Nessuna dispersione di segnale",
                  "Massima velocità di download e upload",
                  "Latenza pari a zero per streaming e gaming",
                  "Nessuna interferenza con altri dispositivi",
                  "Sicurezza dei dati blindata"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi una connessione perfetta in ogni stanza?"
        lead="Contattaci per una consulenza sulla tua rete. Studieremo la soluzione ideale prima di iniziare i lavori."
        primaryCta={{ label: "Contattaci per una consulenza", href: "/contatti" }}
      />
    </>
  )
}
