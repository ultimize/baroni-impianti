import type { Metadata } from "next"
import { Shield, Lock, Eye, Bell, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Progettazione e realizzazione impianti di sicurezza Sestri Levante",
  description: "Proteggi la tua famiglia e la tua azienda con i nostri impianti di sicurezza. Antifurto, videosorveglianza e controllo accessi a Sestri Levante e nel Tigullio.",
}

export default function SicurezzaPage() {
  return (
    <>
      <PageHero
        eyebrow="Impianti di Sicurezza"
        title="Progettazione e realizzazione impianti di sicurezza Sestri Levante"
        lead="Conoscere il grado di rischio per valutare la tipologia di impianto è la base per la sicurezza di tutta la famiglia o del processo aziendale."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-4xl">
          <div className="bg-card rounded-3xl p-8 sm:p-12 border border-border/60 shadow-lg text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
              L'Installatore di fiducia
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground text-left">
              <p>
                Molto spesso ci si affida a impianti fai da te o a installatori che si improvvisano tali senza avere ne le capacità ne tantomeno l'esperienza adeguata per analizzare i gradi di rischio.
              </p>
              <p>
                Un sistema di allarme che suona non sempre è in grado di mettere in fuga l'intruso. Tutto cambia se a livello perimetrale e volumetrico interviene un <strong className="text-foreground">impianto nebbiogeno</strong>, il quale non permette all'intruso di guardare al di la del proprio naso mettendolo in fuga.
              </p>
              <p>
                Baroni Impianti, grazie al team di esperti, realizza <strong className="text-foreground">sistemi antintrusione</strong>, di <strong className="text-foreground">controllo accessi</strong> e <strong className="text-foreground">video sorveglianza</strong> in grado di difendere al meglio l'incolumità delle persone e delle cose.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border/60 shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                <Bell className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Antintrusione e Nebbiogeni</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Sistemi di allarme avanzati che prevengono le effrazioni. I nebbiogeni azzerano la visibilità in pochi secondi, bloccando fisicamente l'intrusione.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border/60 shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Videosorveglianza</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Telecamere ad alta risoluzione con visione notturna e intelligenza artificiale per il riconoscimento di persone e veicoli in tempo reale.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border/60 shadow-sm flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Controllo Accessi</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Gestione sicura degli ingressi per abitazioni e aziende tramite badge, smartphone o biometria, monitorando chi entra e chi esce.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="La sicurezza non è un optional"
        lead="Non affidare la tua tranquillità al caso o al fai-da-te. Valutiamo insieme i rischi e troviamo la soluzione su misura per te."
        primaryCta={{ label: "Richiedi un preventivo sicurezza", href: "/contatti" }}
      />
    </>
  )
}
