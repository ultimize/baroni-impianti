import type { Metadata } from "next"
import { Check, AlertTriangle, Lightbulb, Zap, Shield, ArrowRight, ThumbsUp, ThumbsDown, Award } from "lucide-react"
import { Container } from "@/components/public/Container"

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
      <section className="relative overflow-hidden lg:min-h-[85vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Shield className="w-4 h-4 text-amber-400" /> Il nostro manifesto
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Vuoi dormire <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">sonni tranquilli.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Avere la certezza di possedere un impianto eseguito a perfetta regola d'arte e di essere supportato per risolvere qualsiasi problema possa presentarsi in futuro. <strong className="text-white font-medium">Questo è ciò che meriti.</strong>
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <a href="#il-metodo" className="inline-flex items-center justify-center bg-brand hover:bg-brand-600 text-white font-medium px-8 h-14 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand/20">
                Scopri il Metodo A.P.E.Z.
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="/contatti" className="inline-flex items-center justify-center bg-white/5 border border-white/20 text-white hover:bg-white/10 font-medium px-8 h-14 rounded-xl transition-all backdrop-blur-sm">
                Parla con noi
              </a>
            </div>
          </div>
        </div>
      </section>

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
              <div key={i} className="group flex flex-col rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_2px_10px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] transform translate-x-4 -translate-y-4 transition-transform duration-500 group-hover:scale-110">
                  <Lightbulb className="w-48 h-48 text-slate-900" />
                </div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Lightbulb className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">{scenario.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {scenario.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-4xl mt-8">
            <div className="relative rounded-3xl bg-slate-900 p-8 sm:p-12 text-center shadow-xl overflow-hidden border border-slate-800">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-brand-400 to-emerald-400" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />
              <blockquote className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-serif italic text-white leading-relaxed">
                &ldquo;Il senso di colpa causato da un evento grave sarebbe insopportabile. Ma come scegliere l'azienda giusta di cui poterti fidare?&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50 border-y border-slate-200/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
                <AlertTriangle className="h-4 w-4" /> Attenzione
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                La trappola del <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">prezzo più basso.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  Quando decidi di realizzare il tuo progetto vuoi che tutto sia perfetto. Ti affidi a professionisti da cui ti aspetti consigli utili, ma spesso ti ritrovi con figure che hanno fretta di finire, eseguono il lavoro con approssimazione e ti lasciano con più problemi di prima.
                </p>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                  <p className="text-slate-700">
                    Preso dalla frustrazione ti convinci che l'unico metro di misura sia il prezzo sul preventivo. <strong className="text-red-600 font-semibold">Grave errore.</strong> Scegliendo solo sul prezzo ti ritroverai con figure professionalmente mediocri che causeranno problemi invece di risolverli — problemi che tu hai pagato.
                  </p>
                </div>
                <p>
                  Ma anche un preventivo troppo alto non è garanzia di successo. Allora come fare a scegliere, senza competenze tecniche adeguate?
                </p>
                <p>
                  Non puoi affidarti al prezzo. Devi indagare sull'azienda, consultare tutto ciò che è disponibile online e offline, leggere ciò che i clienti prima di te hanno scritto sul suo conto. Solo dopo potrai discutere l'offerta commerciale.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Come si sceglie il professionista giusto?</h3>
                <p className="text-slate-300 mb-8 text-base leading-relaxed relative z-10 font-light">
                  Come nelle aziende quando si vuole assumere un collaboratore: si valuta il <strong className="text-white font-medium">curriculum</strong> e si leggono le <strong className="text-white font-medium">referenze</strong>.
                  <br /><br />
                  Le referenze oggi sono le recensioni: garantiscono che l'azienda sia sana e che il suo obiettivo non sia incassare i tuoi soldi, ma seguirti in ogni fase del tuo sogno.
                </p>
                <ul className="space-y-4 mb-10 relative z-10">
                  {[
                    "Progettazione accurata",
                    "Esecuzione a regola d'arte",
                    "Assistenza post-vendita reale",
                    "Manutenzione programmata",
                    "Risparmio energetico"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="flex-shrink-0 grid h-6 w-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 relative z-10">
                  <p className="text-sm text-emerald-400 font-medium italic text-center leading-relaxed">
                    "Spendere qualcosa in più oggi per risparmiare sistematicamente negli anni trasforma un costo in un investimento."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
                Dal 2000
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                La tua guida per impianti <br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">a regola d'arte.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  La BARONI IMPIANTI opera nel settore dell'impiantistica civile e del terziario dagli anni 2000, occupandosi di servizi e impianti elettrici ed elettronici.
                </p>
                <p>
                  Il know-how acquisito negli anni attraverso percorsi di formazione continua — come dimostrano le numerose abilitazioni ottenute — ci ha permesso di soddisfare le richieste di oltre <strong className="text-slate-900 font-semibold">500 clienti</strong> che hanno affidato a noi la realizzazione dei loro progetti traendone beneficio.
                </p>
                <p>
                  Crediamo che per realizzare progetti complessi non ci si possa affidare a un'unica azienda, perché nessuno sa fare tutto. Per questo abbiamo selezionato e instaurato rapporti con aziende esperte, ognuna in un determinato settore.
                </p>
                <p>
                  Avrai <strong className="text-brand font-semibold">un solo interlocutore — BARONI IMPIANTI</strong> — con il nostro bagaglio di esperienze a cui si sommano quelle delle migliori aziende del settore impiantistico presenti sul territorio italiano.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group w-full max-w-sm hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-2xl rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="h-10 w-10 text-amber-400" />
                  </div>
                  <span className="text-5xl font-bold tracking-tight mb-2">500+</span>
                  <span className="text-sm uppercase tracking-widest font-semibold text-slate-400">Clienti Soddisfatti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted" id="il-metodo">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest mb-6">
              Il nostro metodo
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Il Metodo <span className="text-brand">A.P.E.Z.</span> <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 font-normal">Piano di Azione Garantito.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Quattro fasi strutturate per guidarti dalla prima idea fino alla garanzia a vita sul tuo impianto. Niente improvvisazione, solo risultati.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {APEZ_STEPS.map((step) => (
              <div key={step.id} className="group flex flex-col rounded-3xl bg-white p-8 lg:p-10 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-200/60 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30">
                <div className="absolute -top-6 -right-6 text-[12rem] leading-none font-serif text-brand/[0.03] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-brand/[0.05]">
                  {step.id}
                </div>
                
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      {step.id}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-2xl sm:text-3xl font-serif italic text-brand mb-4">
              &ldquo;Attualmente sul mercato, quante aziende di impianti elettrici offrono queste garanzie?&rdquo;
            </h3>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-sm">La risposta è: pochissime.</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
              La tua scelta conta
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Due scenari <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">possibili.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 transition-all hover:shadow-lg flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="bg-red-100 text-red-600 p-3 rounded-2xl flex-shrink-0">
                  <ThumbsDown className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Senza le giuste referenze</h3>
              </div>
              <div className="space-y-5 text-slate-600 leading-relaxed text-base flex-grow">
                <p>
                  Per risparmiare poche decine o centinaia di euro, vuoi davvero rischiare di non vedere mai realizzato il tuo sogno?
                </p>
                <div className="bg-white p-4 rounded-xl border border-red-100 border-l-4 border-l-red-500 shadow-sm">
                  <p className="italic font-medium text-slate-800">
                    Sei disposto ad accontentarti di: "Vabbè. Più o meno è così che lo immaginavo?"
                  </p>
                </div>
                <p>
                  Affidandoti a uno sconosciuto senza referenze accertate potresti ottenere la moltiplicazione dei tuoi problemi anziché la risoluzione.
                </p>
                <p>
                  Molto probabilmente, pagata la fattura di saldo, al primo dubbio o alla prima anomalia non riceverai risposta. Per chi ha scelto solo sul prezzo, le tue richieste sono soltanto una scocciatura. Rimarrai in attesa senza speranza.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 relative z-10">
                <div className="bg-brand/20 text-amber-400 border border-amber-400/20 p-3 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ThumbsUp className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Con Baroni Impianti</h3>
              </div>
              <div className="space-y-5 text-slate-300 leading-relaxed text-base relative z-10 font-light flex-grow">
                <p>
                  Avrai la garanzia di vedere realizzato il tuo sogno. Durante il P.D.A. scoprirai nuovi strumenti e tecnologie che prima non conoscevi, grazie allo scambio reciproco di informazioni nelle fasi ASCOLTO e PROPONGO.
                </p>
                <p>
                  Le giornate della fase ESEGUO saranno tranquille e senza stress. Ti informeremo dei progressi, ci interfacceremo con le maestranze e chiederemo il tuo parere ogni volta che sarà necessario. <strong className="text-white font-medium">Nessun pensiero tecnico-organizzativo: goditi il viaggio.</strong>
                </p>
                <p>
                  L'atto finale del P.D.A. sarà un crescendo di emozioni: tutto rispecchierà ciò che hai sempre desiderato, perché nulla è stato lasciato al caso.
                </p>
                <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mt-auto">
                  <p className="font-semibold text-amber-400 leading-relaxed">
                    Quando tutto sarà finito, la formula ZERO PENSIERI ti proteggerà con una garanzia che potrà durare tutta la vita. Addio preoccupazioni. Benvenuto nel tuo nuovo stile di vita.
                  </p>
                </div>
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
