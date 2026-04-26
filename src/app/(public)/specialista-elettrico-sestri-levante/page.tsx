import type { Metadata } from "next"
import { Check, AlertTriangle, Lightbulb, Zap, Shield, ArrowRight, ThumbsUp, ThumbsDown, Award } from "lucide-react"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { CertificationCard } from "@/components/public/CertificationCard"
import { getPublishedCertifications } from "@/lib/queries/site-content"
import { cn } from "@/lib/utils"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Chi siamo — Baroni Impianti | Specialista Elettrico Sestri Levante",
  description: "Baroni Impianti: la tua guida per impianti a regola d'arte. Dal 2000 offriamo soluzioni per dormire sonni tranquilli con la formula Zero Pensieri.",
}

const SCENARIOS = [
  {
    title: "Impianto da zero",
    description: "Devi realizzare il tuo nuovo impianto partendo da zero e non hai ben chiare le opportunità che le tecnologie attuali ti mettono a disposizione?",
  },
  {
    title: "Impianto esistente al limite",
    description: "Devi intervenire sull'impianto esistente perché non ce la fa più a supportare tutti i carichi e i dispositivi ad esso collegati?",
  },
  {
    title: "Stai rimandando?",
    description: "Rimandando ancora, le probabilità che avvenga un danno irreparabile aumentano considerevolmente, mettendo a rischio le persone a te più care.",
  },
  {
    title: "Vuoi migliorare la qualità di vita",
    description: "Vorresti un minor impatto ambientale ed energetico, una casa più confortevole e soluzioni estetiche che rispecchino il tuo stile?",
  },
]

const APEZ_STEPS = [
  {
    id: "01",
    title: "ASCOLTO",
    description: "Questa fase è esclusivamente dedicata a te. Il nostro lavoro è prendere appunti e fare domande per sviscerare quanto più possibile le tue esigenze, i tuoi interessi e quelli delle persone a te vicine. In base alla tipologia del progetto potremmo effettuare un sopralluogo e conoscere i tuoi gusti, i colori preferiti, la tua routine giornaliera. Tutto questo ci darà un quadro dettagliato su cui costruire la fase successiva.",
  },
  {
    id: "02",
    title: "PROPONGO",
    description: "La nostra proposta progettuale indicherà le soluzioni impiantistiche scelte per realizzare il tuo sogno, le lavorazioni in ordine cronologico, i tempi di realizzazione, le garanzie sui nostri servizi — che possono arrivare a garantire e manutenere a vita i componenti in campo — le scadenze dei pagamenti e il costo delle operazioni.",
  },
  {
    id: "03",
    title: "ESEGUO",
    description: "Firmato il contratto, si passa alla fase esecutiva. Collaboriamo con idraulico, muratore, piastrellista, cartongessista, fabbro e pittore: tutte figure che contribuiscono al tuo sogno. Una sana collaborazione trasforma il percorso in un bel viaggio. Abbiamo cura dell'area di lavoro e la lasciamo in ordine. Al termine eseguiamo le verifiche iniziali (collaudo) e ti consegniamo la dichiarazione di conformità, il libretto di manutenzione e video tutorial pratici.",
  },
  {
    id: "04",
    title: "ZERO PENSIERI",
    description: "La fase di cui andiamo più fieri. Stipuliamo il nostro impegno verso di te garantendo il tuo sistema — molto spesso a vita — attraverso manutenzione programmata annuale e assistenza in caso di anomalie, da remoto e in loco. Grazie alla formula ZERO PENSIERI possiamo garantire il nostro operato, dispositivi compresi, a vita. Non dovrai più acquistare dispositivi che si rompono, né pagarne la sostituzione. Puoi mettere alla prova il servizio gratuitamente per un anno: se non dovesse piacerti, disdici senza costi e senza spiegazioni.",
  },
]

export default async function ChiSiamoPage() {
  const certifications = await getPublishedCertifications()

  return (
    <>
      <PageHero
        eyebrow="Chi siamo"
        title="Vuoi dormire sonni tranquilli."
        lead="Avere la certezza di possedere, da oggi, un impianto eseguito a perfetta regola d'arte e di essere supportato per risolvere qualsiasi problema possa presentarsi in futuro. Questo è ciò che meriti."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
              Hai un problema?
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Riconosci questa situazione?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {SCENARIOS.map((scenario, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{scenario.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            <blockquote className="rounded-2xl border-l-4 border-primary bg-muted/30 p-8 text-xl italic text-foreground text-center shadow-sm">
              &ldquo;Il senso di colpa causato da un evento grave sarebbe insopportabile. Ma come scegliere l'azienda giusta di cui poterti fidare?&rdquo;
            </blockquote>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-red-500 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Attenzione
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
                La trappola del prezzo più basso
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Quando decidi di realizzare il tuo progetto vuoi che tutto sia perfetto. Ti affidi a professionisti da cui ti aspetti consigli utili, ma spesso ti ritrovi con figure che hanno fretta di finire, eseguono il lavoro con approssimazione e ti lasciano con più problemi di prima.
                </p>
                <p>
                  Preso dalla frustrazione ti convinci che l'unico metro di misura sia il prezzo sul preventivo. <strong className="text-foreground">Grave errore.</strong>
                </p>
                <p>
                  Scegliendo solo sul prezzo ti ritroverai con figure professionalmente mediocri che causeranno problemi invece di risolverli — problemi che tu hai pagato.
                </p>
                <p>
                  Ma anche un preventivo troppo alto non è garanzia di successo. Allora come fare a scegliere, senza competenze tecniche adeguate?
                </p>
                <p>
                  Non puoi affidarti al prezzo. Devi indagare sull'azienda, consultare tutto ciò che è disponibile online e offline, leggere ciò che i clienti prima di te hanno scritto sul suo conto. Solo dopo potrai discutere l'offerta commerciale.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 sm:p-10 border border-border/60 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Come si sceglie il professionista giusto?</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Come nelle aziende quando si vuole assumere un collaboratore: si valuta il <strong className="text-foreground">curriculum</strong> e si leggono le <strong className="text-foreground">referenze</strong>.
                <br /><br />
                Le referenze oggi sono le <strong className="text-foreground">recensioni</strong>: garantiscono che l'azienda sia sana, competente, aggiornata e che il suo obiettivo non sia incassare i tuoi soldi, ma seguirti in ogni fase del tuo sogno. Le aziende che curano la manutenzione del proprio operato dimostrano che non sei un fastidio e puntano alla tua completa soddisfazione nel tempo.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Progettazione accurata e personalizzata",
                  "Esecuzione a regola d'arte",
                  "Assistenza post-vendita concreta",
                  "Manutenzione programmata nel tempo",
                  "Risparmio energetico garantito"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <p className="text-sm text-primary font-medium italic text-center">
                  "Converrai: spendere qualcosa in più oggi per risparmiare sistematicamente negli anni trasforma un costo in un investimento."
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
            Dal 2000
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-8">
            Baroni Impianti: la tua guida per impianti a regola d'arte
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-12 text-left">
            <p>
              La BARONI IMPIANTI opera nel settore dell'impiantistica civile e del terziario dagli anni 2000, occupandosi di servizi e impianti elettrici ed elettronici.
            </p>
            <p>
              Il know-how acquisito negli anni attraverso percorsi di formazione continua — come dimostrano le numerose abilitazioni ottenute — ci ha permesso di soddisfare le richieste di oltre <strong className="text-foreground">500 clienti</strong> che hanno affidato a noi la realizzazione dei loro progetti traendone beneficio.
            </p>
            <p>
              Crediamo che per realizzare progetti complessi non ci si possa affidare a un'unica azienda, perché nessuno sa fare tutto. Per questo abbiamo selezionato e instaurato rapporti con aziende esperte, ognuna in un determinato settore.
            </p>
            <p>
              Avrai <strong className="text-foreground">un solo interlocutore — BARONI IMPIANTI</strong> — con il nostro bagaglio di esperienze a cui si sommano quelle delle migliori aziende del settore impiantistico presenti sul territorio italiano.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-5 rounded-2xl shadow-xl">
            <Shield className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold tracking-tight">500+ CLIENTI SODDISFATTI</span>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
              Il nostro metodo
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
              Il Metodo A.P.E.Z. — Il nostro Piano di Azione Garantito
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quattro fasi strutturate per guidarti dalla prima idea fino alla garanzia a vita sul tuo impianto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            {APEZ_STEPS.map((step) => (
              <div key={step.id} className="bg-card rounded-2xl p-8 border border-border/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-bold text-9xl leading-none text-primary pointer-events-none transition-transform group-hover:scale-110">
                  {step.id}
                </div>
                <div className="relative z-10">
                  <div className="text-sm font-bold text-primary mb-2">{step.id}</div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-xl italic text-primary text-center font-medium shadow-sm">
              &ldquo;Attualmente sul mercato, quante aziende di impianti elettrici offrono queste garanzie?&rdquo;
            </blockquote>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
              La tua scelta conta
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Due scenari possibili
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-red-600">
                <ThumbsDown className="h-8 w-8" />
                <h3 className="text-2xl font-semibold">Senza le giuste referenze</h3>
              </div>
              <div className="space-y-4 text-red-900/80 leading-relaxed text-sm">
                <p>
                  Per risparmiare poche decine o centinaia di euro, vuoi davvero rischiare di non vedere mai realizzato il tuo sogno?
                </p>
                <p className="italic font-medium text-red-900">
                  Sei disposto ad accontentarti di: "Vabbè. Più o meno è così che lo immaginavo?"
                </p>
                <p>
                  Affidandoti a uno sconosciuto senza referenze accertate potresti ottenere la moltiplicazione dei tuoi problemi anziché la risoluzione.
                </p>
                <p>
                  Molto probabilmente, pagata la fattura di saldo, al primo dubbio o alla prima anomalia non riceverai risposta. Per chi ha scelto solo sul prezzo, le tue richieste sono soltanto una scocciatura. Rimarrai in attesa senza speranza.
                </p>
              </div>
            </div>

            <div className="bg-brand/5 rounded-3xl p-8 border border-brand/20 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-brand">
                <ThumbsUp className="h-8 w-8" />
                <h3 className="text-2xl font-semibold">Con Baroni Impianti</h3>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
                <p>
                  Avrai la garanzia di vedere realizzato il tuo sogno. Durante il P.D.A. scoprirai nuovi strumenti e tecnologie che prima non conoscevi, grazie allo scambio reciproco di informazioni nelle fasi ASCOLTO e PROPONGO.
                </p>
                <p>
                  Le giornate della fase ESEGUO saranno tranquille e senza stress. Ti informeremo dei progressi, ci interfacceremo con le maestranze e chiederemo il tuo parere ogni volta che sarà necessario. Nessun pensiero tecnico-organizzativo: goditi il viaggio.
                </p>
                <p>
                  L'atto finale del P.D.A. sarà un crescendo di emozioni: tutto rispecchierà ciò che hai sempre desiderato, perché nulla è stato lasciato al caso.
                </p>
                <p className="font-bold text-brand text-base pt-2">
                  Quando tutto sarà finito, la formula ZERO PENSIERI ti proteggerà con una garanzia che potrà durare tutta la vita. Addio preoccupazioni. Benvenuto nel tuo nuovo stile di vita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {certifications && certifications.length > 0 && (
        <SectionWrapper variant="muted">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                I Certificati della BARONI IMPIANTI
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <CertificationCard 
                  key={cert.id} 
                  title={cert.title}
                  issuer={cert.issuer}
                  description={cert.description}
                  imageUrl={cert.image_url}
                  icon={Award}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      <ClosingCta
        title="Pronto a fare il primo passo?"
        lead="Registrati e scarica il questionario per ricevere in breve tempo le soluzioni alle tue necessità. Oppure richiedi un appuntamento e ricevi la tua consulenza gratuita."
        primaryCta={{ label: "Richiedi un Appuntamento", href: "/contatti" }}
        secondaryCta={{ label: "Esplora i servizi", href: "/elettricista-a-chiavari-e-sestri-levante" }}
      />
    </>
  )
}
