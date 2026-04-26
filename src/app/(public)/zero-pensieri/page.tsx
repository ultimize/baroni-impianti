import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertCircle,
  Calendar,
  Zap,
  FileCheck,
  Home,
  Building2,
  Building,
  Shield,
  Battery,
  Video,
  Flame,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { FeatureCard } from "@/components/public/FeatureCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export const revalidate = 3600

export const metadata: Metadata = {
  title:
    "Zero Pensieri — Manutenzione elettrica programmata | Baroni Impianti",
  description:
    "Zero Pensieri è la formula esclusiva di Baroni Impianti: contratto di manutenzione programmata con assistenza 7/7, garanzia a vita sui dispositivi e interventi urgenti illimitati.",
}

const PROBLEMS = [
  "L'impianto ha dieci anni, chissà se è ancora a norma.",
  "Quando si guasta qualcosa, devo trovare un elettricista al volo.",
  "Non so se i salvavita e le messe a terra sono ancora efficienti.",
  "Qualcosa va storto e non ho documentazione di chi è intervenuto.",
]

const CONTRACTS_DETAILS = {
  allarme: {
    name: "Allarme Intrusione",
    icon: Shield,
    color: "amber",
    description: "Sistema antintrusione progettato per rilevare e segnalare tentativi di accesso non autorizzato. Garantisci nel tempo i massimi standard di sicurezza.",
    features: [
      "ASSISTENZA DA REMOTO 7 GIORNI SU 7 ENTRO 24 ORE DALLA SEGNALAZIONE",
      "RISOLUZIONE DI QUALSIASI ANOMALIA ENTRO 4 GIORNI LAVORATIVI",
      "INTERVENTI DI ASSISTENZA URGENTE ILLIMITATI",
      "GARANZIA A VITA SU TUTTI I DISPOSITIVI DELL'IMPIANTO",
      "VERIFICA ANNUALE DELL'IMPIANTO CON RILASCIO DEL VERBALE DI MANUTENZIONE",
      "CONNESSIONE GSM GARANTITA. L'ABBONAMENTO AL SERVIZIO LO FORNIAMO NOI!",
      "SOSTITUZIONE DELLE BATTERIE SCARICHE PRESENTI NEI DISPOSITIVI DELL'IMPIANTO",
      "AGGIORNAMENTI SOFTWARE GARANTITI"
    ],
    seoText: (
      <div className="space-y-4 text-slate-300">
        <p>Un allarme intrusione (o sistema antintrusione) è un impianto di sicurezza elettronico progettato per rilevare e segnalare tentativi di accesso non autorizzato a un edificio, un’area o un bene protetto.</p>
        <p>Rivolgersi ad un professionista elettrico per la realizzazione di un impianto di allarme intrusione non è sufficiente per garantire, nel tempo, i massimi standard di sicurezza in caso di assenza di manutenzione programmata dell’impianto.</p>
        <p>Con i professionisti elettrici di Baroni Impianti, sottoscrivendo il contratto di manutenzione "ZERO PENSIERI" dedicato agli impianti di allarme intrusione ricevi assistenza da remoto 7 su 7 entro le 24h dalla segnalazione e tanti ulteriori benefici per la sicurezza dell’impianto e dei suoi utilizzatori.</p>
      </div>
    )
  },
  tvcc: {
    name: "TVCC (Videosorveglianza)",
    icon: Video,
    color: "indigo",
    description: "Rete di telecamere collegate a un sistema di registrazione. Preveniamo guasti ai dischi di archiviazione e offuscamento delle ottiche con controlli rigorosi.",
    features: [
      "ASSISTENZA DA REMOTO 7 GIORNI SU 7 ENTRO 24 ORE DALLA SEGNALAZIONE",
      "RISOLUZIONE DI QUALSIASI ANOMALIA ENTRO 4 GIORNI LAVORATIVI",
      "INTERVENTI DI ASSISTENZA URGENTE ILLIMITATI",
      "GARANZIA A VITA SU TUTTI I DISPOSITIVI DELL'IMPIANTO",
      "VERIFICA ANNUALE DELL'IMPIANTO CON RILASCIO DEL VERBALE DI MANUTENZIONE",
      "SOSTITUZIONE DELLE BATTERIE PRESENTI NEI DISPOSITIVI DELL'IMPIANTO",
      "AGGIORNAMENTI SOFTWARE GARANTITI"
    ],
    seoText: (
      <div className="space-y-4 text-slate-300">
        <p>Un impianto TVCC è composto da una rete di telecamere collegate a un sistema di registrazione e controllo, che permette di visualizzare le immagini in tempo reale o di archiviarle per consultazioni successive.</p>
        <p>È definito "a circuito chiuso" perché le immagini non vengono trasmesse pubblicamente, ma restano visibili solo a utenti autorizzati (sul posto o da remoto).</p>
        <p>Con i professionisti elettrici di Baroni Impianti, sottoscrivendo il contratto di manutenzione "ZERO PENSIERI" dedicato agli impianti TVCC ricevi assistenza da remoto 7 su 7 entro le 24h dalla segnalazione e tanti ulteriori benefici in termini di manutenzione programmata come la sostituzione delle batterie presenti nei dispositivi dell’impianto, gli aggiornamenti software necessari e la garanzia a vita su tutti i dispositivi dell’impianto.</p>
      </div>
    )
  },
  stopfire: {
    name: "Stop Fire (Rilevazione Incendi)",
    icon: Flame,
    color: "red",
    description: "Dispositivi salvavita progettati per individuare fumo o calore. La manutenzione è obbligatoria e cruciale per assicurare il funzionamento nel momento del bisogno.",
    features: [
      "ASSISTENZA DA REMOTO 7 GIORNI SU 7 ENTRO 24 ORE DALLA SEGNALAZIONE",
      "RISOLUZIONE DI QUALSIASI ANOMALIA ENTRO 4 GIORNI LAVORATIVI",
      "INTERVENTI DI ASSISTENZA URGENTE ILLIMITATI",
      "GARANZIA A VITA SU TUTTI I DISPOSITIVI DELL'IMPIANTO",
      "VERIFICA ANNUALE DELL'IMPIANTO CON RILASCIO DEL VERBALE DI MANUTENZIONE",
      "PULIZIA PERIODICA DEI RILEVATORI PRESENTI NELL'IMPIANTO",
      "SOSTITUZIONE A FINE VITA DEI RILEVATORI PRESENTI NELL'IMPIANTO",
      "SOSTITUZIONE DELLE BATTERIE PRESENTI NEI DISPOSITIVI DELL'IMPIANTO",
      "AGGIORNAMENTI SOFTWARE GARANTITI"
    ],
    seoText: (
      <div className="space-y-4 text-slate-300">
        <p>I rilevatori elettrici di incendi sono dispositivi elettronici progettati per individuare tempestivamente i segnali di un principio d’incendio — come fumo, calore o fiamma — e inviare un allarme a una centrale di rilevazione incendio, che a sua volta può attivare sistemi di allarme, evacuazione o spegnimento automatico.</p>
        <p>Il loro scopo è rilevare l’incendio nella fase iniziale, quando è ancora possibile intervenire in modo rapido ed efficace, limitando i danni e salvaguardando persone e beni. Appartengono alla categoria degli impianti di rivelazione e allarme incendio (IRAI), disciplinati in Italia dalla norma UNI EN 54 e dalle norme CEI 79-3 / UNI 9795.</p>
        <p>Con la formula ZERO PENSIERI dei professionisti elettrici di Baroni Impianti, garantisci al tuo impianto un’assistenza ed una manutenzione programmatica puntuale, che comprende la sostituzione a fine vita dei rilevatori dell’impianto, sostituzione batterie, verifica annuale e rilascio del verbale di manutenzione e non solo!</p>
      </div>
    )
  },
  ups: {
    name: "UPS (Gruppo di continuità)",
    icon: Battery,
    color: "blue",
    description: "Sistema progettato per fornire energia di emergenza e protezione alle apparecchiature. Mantiene l'alimentazione sempre continua e stabile.",
    features: [
      "ASSISTENZA DA REMOTO 7 GIORNI SU 7 ENTRO 24 ORE DALLA SEGNALAZIONE",
      "RISOLUZIONE DI QUALSIASI ANOMALIA ENTRO 4 GIORNI LAVORATIVI",
      "INTERVENTI DI ASSISTENZA URGENTE ILLIMITATI",
      "GARANZIA A VITA SU TUTTI I DISPOSITIVI DELL'IMPIANTO",
      "VERIFICA ANNUALE DELL'IMPIANTO CON RILASCIO DEL VERBALE DI MANUTENZIONE",
      "PULIZIA PERIODICA DEI DISPOSITIVI PRESENTI NELL'IMPIANTO",
      "SOSTITUZIONE DELLE BATTERIE PRESENTI NEI DISPOSITIVI DELL'IMPIANTO",
      "AGGIORNAMENTI SOFTWARE GARANTITI"
    ],
    seoText: (
      <div className="space-y-4 text-slate-300">
        <p>Un impianto elettrico UPS (dall’inglese Uninterruptible Power Supply, cioè Gruppo di Continuità) è un sistema progettato per fornire energia elettrica di emergenza e protezione di qualità alle apparecchiature in caso di interruzioni, cali o disturbi della rete elettrica.</p>
        <p>Il suo compito è mantenere l’alimentazione continua e stabile, anche quando:</p>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>si verifica un blackout (mancanza totale di corrente);</li>
          <li>ci sono variazioni di tensione o frequenza;</li>
          <li>si presentano disturbi o sovratensioni sulla linea.</li>
        </ul>
        <p>In pratica, l’UPS assorbe energia dalla rete, la stabilizza e la immagazzina in batterie interne, così da poterla fornire immediatamente in caso di anomalia.</p>
        <p>Con i professionisti elettrici di Baroni Impianti, sottoscrivendo il contratto di manutenzione "ZERO PENSIERI" hai la garanzia a vita su tutti i dispositivi presenti nell’impianto e interventi di assistenza urgenti illimitati.</p>
      </div>
    )
  }
}

const FAQS = [
  {
    q: "Quanto costa Zero Pensieri?",
    a: "Il costo dipende dal tipo di impianto e dalle dimensioni dell'edificio. Il sopralluogo per stimare la quota è gratuito e senza impegno.",
  },
  {
    q: "Cosa succede se ho un guasto?",
    a: "Ti basta chiamarci o segnalare il problema da remoto: rispondiamo entro 24 ore. L'intervento urgente è già incluso nella quota annuale, senza limite di numero.",
  },
  {
    q: "Posso disdire in qualsiasi momento?",
    a: "Il contratto è annuale, con preavviso di 30 giorni prima del rinnovo. Nessun vincolo pluriennale.",
  },
  {
    q: "Funziona anche per impianti non installati da voi?",
    a: "Sì. Facciamo prima un audit dell'impianto esistente: se c'è qualcosa da mettere a norma lo proponiamo prima dell'attivazione del contratto.",
  },
  {
    q: "Cosa significa 'garanzia a vita sui dispositivi'?",
    a: "Per tutta la durata del contratto, i dispositivi inclusi nell'impianto sono coperti: in caso di guasto li ripariamo o sostituiamo senza costi aggiuntivi.",
  },
]

export default function ZeroPensieriPage() {
  return (
    <>
      {/* Custom B2B Hero */}
      <section className="relative overflow-hidden flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950" />
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Formula Esclusiva Baroni Impianti
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              Zero Pensieri. <br />
              L'impianto che si prende <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-400">cura da solo.</span>
            </h1>
            
            <p className="mt-6 text-lg lg:text-2xl text-slate-300 max-w-3xl leading-relaxed font-light mx-auto mb-10">
              Manutenzione programmata, controlli periodici, pronto intervento. Paghi una quota annuale fissa e noi garantiamo l'efficienza a vita del tuo impianto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold w-full sm:w-auto rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-colors">
                <Link href="/contatti?service=zero-pensieri">
                  Richiedi un preventivo gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-semibold w-full sm:w-auto rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent transition-colors">
                <Link href="#come-funziona">
                  Scopri come funziona
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <SectionWrapper className="bg-slate-50 py-24 relative overflow-hidden border-b border-slate-200/50">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Quante volte ti sei <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">preoccupato?</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              L'incertezza è il nemico numero uno della sicurezza. Ecco le ansie che Zero Pensieri elimina definitivamente dalla tua testa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {PROBLEMS.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-5 rounded-3xl border border-red-100 bg-white p-8 shadow-[0_4px_20px_rgb(239,68,68,0.05)] transition-all hover:shadow-[0_4px_25px_rgb(239,68,68,0.1)] hover:-translate-y-1 group"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-500 border border-red-100 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <AlertCircle className="h-6 w-6" aria-hidden />
                </span>
                <p className="text-lg leading-relaxed text-slate-700 font-medium pt-2">
                  &ldquo;{problem}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Core Benefits */}
      <SectionWrapper variant="white" id="come-funziona" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest mb-6">
              Come Funziona
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Tutto questo non ti <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">riguarda più.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Sottoscrivendo Zero Pensieri ricevi assistenza prioritaria e benefici tangibili per la sicurezza dell'impianto e delle persone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200">
              <div className="h-14 w-14 rounded-2xl bg-white text-brand border border-slate-200 shadow-sm flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Controlli programmati</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Verifiche periodiche minuziose per assicurare la perfetta efficienza, in piena conformità alle normative CEI 64-8 e DPR 462/01.
              </p>
            </div>

            <div className="bg-brand rounded-3xl p-8 lg:p-10 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="h-14 w-14 rounded-2xl bg-white/20 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6 relative z-10">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Pronto intervento incluso</h3>
              <p className="text-brand-50 leading-relaxed font-light relative z-10">
                Interventi prioritari illimitati in caso di guasto. Non pagherai l'uscita né la manodopera d'emergenza.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200">
              <div className="h-14 w-14 rounded-2xl bg-white text-brand border border-slate-200 shadow-sm flex items-center justify-center mb-6">
                <FileCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Documentazione in regola</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Verbali di manutenzione, schemi elettrici e certificati conservati nei nostri archivi e sempre a tua disposizione.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* I 4 Contratti - DETAILED TABS */}
      <SectionWrapper className="bg-slate-950 py-24 relative overflow-hidden" id="contratti">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-brand-900/20 via-slate-950 to-slate-950" />
        </div>
        
        <div className="mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
              Cosa comprende <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-400">esattamente?</span>
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Seleziona il tuo impianto per scoprire tutte le garanzie specifiche incluse nel contratto di manutenzione programmata Zero Pensieri.
            </p>
          </div>

          <Tabs defaultValue="allarme" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-transparent p-0 mb-8 lg:mb-12 h-auto !h-auto group-data-horizontal/tabs:!h-auto">
              {Object.entries(CONTRACTS_DETAILS).map(([key, contract]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="w-full min-h-[3.5rem] h-auto py-2 px-2 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm sm:text-base font-semibold whitespace-normal !whitespace-normal justify-center data-active:!bg-brand data-active:!text-white data-active:!border-brand"
                >
                  <contract.icon className="w-5 h-5 mr-2 shrink-0" />
                  <span className="text-center leading-tight">{contract.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(CONTRACTS_DETAILS).map(([key, contract]) => {
              const colorClasses = 
                contract.color === "amber" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                contract.color === "blue" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                contract.color === "indigo" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                "bg-red-500/10 text-red-400 border-red-500/20"

              return (
                <TabsContent key={key} value={key} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
                    {/* Background glow per tab */}
                    <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full pointer-events-none opacity-20 ${
                      contract.color === "amber" ? "bg-amber-500" :
                      contract.color === "blue" ? "bg-blue-500" :
                      contract.color === "indigo" ? "bg-indigo-500" :
                      "bg-red-500"
                    }`} />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-10 pb-10 border-b border-slate-800">
                        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border shrink-0 ${colorClasses}`}>
                          <contract.icon className="h-8 w-8" aria-hidden />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-3">Formula {contract.name}</h3>
                          <p className="text-slate-400 text-lg leading-relaxed font-light max-w-3xl">
                            {contract.description}
                          </p>
                        </div>
                      </div>

                      <div className="mb-10">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8">
                          Il contratto comprende:
                        </h4>
                        <ul className="grid gap-5 lg:grid-cols-2">
                          {contract.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-4 bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50">
                              <span className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4" strokeWidth={3} />
                              </span>
                              <span className="text-slate-300 font-medium leading-relaxed uppercase text-sm tracking-wide">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* SEO Accordion */}
                      <Accordion className="w-full">
                        <AccordionItem value="seo" className="border-t border-b-0 border-slate-800 pt-2">
                          <AccordionTrigger className="text-base font-medium text-slate-300 hover:text-white py-4 data-[state=open]:text-white">
                            Perché è fondamentale la manutenzione di questo impianto?
                          </AccordionTrigger>
                          <AccordionContent className="text-base leading-relaxed pb-4 pt-2">
                            {contract.seoText}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                    </div>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </SectionWrapper>

      {/* Target & FAQs */}
      <SectionWrapper variant="muted" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-5xl mb-24 relative">
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-brand to-indigo-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
              
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-8">A chi è rivolto</h2>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 leading-relaxed font-light relative z-10">
                Zero Pensieri non è un semplice contratto, ma la scelta di chi rifiuta gli imprevisti. 
                È la formula su misura per le <strong className="font-semibold text-slate-900 border-b-2 border-brand/30 pb-1">Famiglie</strong> che esigono protezione H24, 
                per le <strong className="font-semibold text-slate-900 border-b-2 border-indigo-500/30 pb-1">Aziende e i Professionisti</strong> che non possono permettersi un fermo produzione, 
                e per gli <strong className="font-semibold text-slate-900 border-b-2 border-amber-500/30 pb-1">Amministratori di Condominio</strong> alla ricerca di un partner tecnico risolutivo e sempre reperibile.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl mt-32">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                Hai ancora qualche <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-600">dubbio?</span>
              </h3>
              <p className="text-slate-600 text-lg font-light">Le risposte alle domande più frequenti sui nostri contratti di manutenzione.</p>
            </div>
            
            <Accordion className="w-full flex flex-col gap-4">
              {FAQS.map((faq, i) => (
                <AccordionItem 
                  key={i} 
                  value={`faq-${i}`} 
                  className="bg-white border border-slate-200 rounded-2xl px-6 sm:px-8 py-2 shadow-sm data-[state=open]:border-brand/40 data-[state=open]:shadow-md transition-all"
                >
                  <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:text-brand data-[state=open]:text-brand text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-slate-600 leading-relaxed pb-4 pt-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Smettila di pensare all'impianto."
        lead="Attiva Zero Pensieri. Goditi la vera tranquillità, al resto ci pensiamo noi."
        primaryCta={{
          label: "Richiedi preventivo gratuito",
          href: "/contatti?service=zero-pensieri",
        }}
        secondaryCta={{
          label: "Parla con un tecnico",
          href: "/contatti?service=zero-pensieri",
        }}
        variant="primary"
      />
    </>
  )
}
