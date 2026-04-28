import type { Metadata } from "next"
import { Cpu, Smartphone, Settings, Zap, Home, Lightbulb, Clock, CheckCircle2 } from "lucide-react"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Realizzazione di Impianti Digitali Integrati | Baroni Impianti",
  description: "Semplifica la tua vita con gli impianti digitali integrati (Domotica). Trasformiamo la tua casa in un ambiente tecnologicamente avanzato e facile da usare.",
}

export default function ImpiantiDigitaliPage() {
  return (
    <>
      {/* Custom Hero Impianti Digitali */}
      <section className="relative overflow-hidden lg:min-h-[60vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Tech Grid */}
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(rgba(96, 135, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 135, 250, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-md text-brand-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Cpu className="w-4 h-4" /> La Casa del Futuro
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Impianti Digitali <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">Integrati.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Semplifica la tua vita con la vera Domotica. Un solo sistema intelligente per il controllo totale, dentro casa e da remoto.
            </p>
          </div>
        </div>
      </section>

      {/* Evoluzione: Analogico vs Digitale */}
      <SectionWrapper variant="white" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Colonna Testo */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
                L'evoluzione impiantistica
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                Dall'Analogico al <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Digitale.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-light">
                <p>
                  Proprio come siamo passati dalla macchina da scrivere al computer, o dal telefono a rotella allo smartphone, anche le nostre case stanno affrontando un salto generazionale.
                </p>
                <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10">
                  <p className="text-slate-800 font-medium">
                    "Eseguire oggi un impianto analogico senza spiegarne le limitazioni è come un chirurgo che decide di operare senza usare le tecnologie moderne."
                  </p>
                </div>
                <p>
                  Oggi, chi sta costruendo o ristrutturando casa, deve conoscere le opportunità della <strong className="text-slate-900 font-medium">Domotica</strong>: un sistema digitale capace di unire luci, prese, riscaldamento e sicurezza in un unico cuore intelligente.
                </p>
              </div>
            </div>

            {/* Colonna Card Confronto */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent opacity-20 pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-400/20 blur-[80px] rounded-full pointer-events-none" />
                
                <h3 className="text-3xl font-bold text-white mb-8 relative z-10">L'Approccio Baroni</h3>
                
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Integrazione Totale</h4>
                      <p className="font-light text-slate-400 text-sm">Dispositivi interconnessi che comunicano tra loro, superando i vecchi limiti dei pulsanti meccanici.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                      <Settings className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Semplicità d'Uso</h4>
                      <p className="font-light text-slate-400 text-sm">Creiamo sistemi avanzati ma estremamente semplici da gestire per chi li vive ogni giorno.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Gestione Remota</h4>
                      <p className="font-light text-slate-400 text-sm">Controlla la tua casa ovunque tu sia tramite smartphone o tablet.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Vantaggi Bento Grid */}
      <SectionWrapper className="bg-slate-50 border-t border-slate-200/50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Cosa significa <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Vivere smart.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Controllo */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Pannelli Centralizzati</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Abbandona l'idea dei decine di interruttori sparsi sui muri. Un solo pannello elegante per gestire luci, temperature e automatismi.
              </p>
            </div>

            {/* Smartphone */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Controllo Tascabile</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                La tua casa in tasca. Grazie all'app dedicata, puoi verificare lo stato degli impianti o accendere il riscaldamento prima del tuo rientro.
              </p>
            </div>

            {/* Scenari - Wide/Dark Card */}
            <div className="md:col-span-2 lg:col-span-1 bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-white/10 text-brand-400 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Scenari su misura</h3>
              <p className="text-slate-300 leading-relaxed font-light relative z-10">
                L'automazione prende vita. Crea scenari come "Uscita": con un solo tocco spegni tutte le luci, abbassi le tapparelle e attivi l'allarme.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi scoprire la domotica?"
        lead="Non farti spaventare dalla tecnologia. Progettiamo impianti digitali intuitivi, che amerai fin dal primo utilizzo, garantendo un'assistenza completa."
        primaryCta={{ label: "Richiedi un preventivo personalizzato", href: "/contatti" }}
      />
    </>
  )
}
