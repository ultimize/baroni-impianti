import type { Metadata } from "next"
import { ShieldAlert, Zap, Network, Server, ArrowRight, Activity, WifiOff } from "lucide-react"
import { Container } from "@/components/public/Container"
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
      {/* Custom Hero Rete Cablata */}
      <section className="relative overflow-hidden lg:min-h-[60vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="absolute inset-0 opacity-[0.2]" 
               style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-200 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Network className="w-4 h-4 text-blue-400" /> Massime Prestazioni
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Progettazione reti <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-brand-500">cablate.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Sostituisci l'incertezza del Wi-Fi con un'infrastruttura di rete solida. Massimizza velocità, sicurezza e stabilità della tua connessione in ogni stanza.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-slate-50 border-b border-slate-200/50 relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
              I limiti del wireless
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Perché abbandonare il <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Wi-Fi.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Le reti wireless sono comode per i dispositivi mobili, ma presentano limiti tecnologici severi se utilizzate come spina dorsale della tua abitazione o azienda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Latenza e Velocità */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group hover:border-amber-500/30">
              <div className="h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mb-8 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                <WifiOff className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Latenza e Velocità</h3>
              <p className="text-slate-600 leading-relaxed font-light flex-1">
                Velocità di connessione instabile e alta latenza, specialmente quando più dispositivi sono connessi contemporaneamente o il segnale deve attraversare muri spessi e solette.
              </p>
            </div>

            {/* Radiazioni */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group hover:border-red-500/30">
              <div className="h-16 w-16 rounded-2xl bg-red-500/10 text-red-600 border border-red-500/20 flex items-center justify-center mb-8 transition-colors group-hover:bg-red-500 group-hover:text-white">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Inquinamento RF</h3>
              <p className="text-slate-600 leading-relaxed font-light flex-1">
                Aumento del fondo di radiazioni a radiofrequenza all'interno degli ambienti in cui vivi, a causa della continua emissione elettromagnetica di router e ripetitori.
              </p>
            </div>

            {/* Sicurezza Informatica - DARK CARD */}
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-2xl flex flex-col items-start relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="h-16 w-16 rounded-2xl bg-white/10 text-cyan-400 border border-white/10 flex items-center justify-center mb-8 transition-colors group-hover:bg-cyan-500 group-hover:text-slate-950 relative z-10">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Sicurezza Informatica</h3>
              <p className="text-slate-300 leading-relaxed font-light flex-1 relative z-10">
                Le reti Wi-Fi trasmettono dati nell'etere, rendendole drasticamente più vulnerabili ad attacchi esterni, packet sniffing e intrusioni rispetto alle connessioni fisiche cablate.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Colonna Testo */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest mb-6">
                La Soluzione
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                Infrastruttura <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">strutturata.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-light">
                <p>
                  Un impianto in rete cablata progettato su misura risolve definitivamente i limiti del wireless. Offre una connessione granitica, massimizza la banda disponibile, azzera le interferenze e blinda i tuoi dati all'interno della rete fisica.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <p className="text-slate-700 font-medium">
                    Tuttavia, una rete cablata efficiente non si improvvisa. Deve essere <strong className="text-slate-900">studiata prima dell'inizio del cantiere</strong> o durante la ristrutturazione.
                  </p>
                </div>
                <p>
                  Valutiamo le tue esigenze, i dispositivi da collegare (Smart TV, PC, console, sistemi di allarme, videosorveglianza) e progettiamo un'infrastruttura con cavi e componenti di altissima qualità, posizionando i punti di accesso esattamente dove ti serviranno in futuro.
                </p>
              </div>
            </div>

            {/* Colonna Card Vantaggi VIP */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-brand-400 mb-8 relative z-10">
                  <Server className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-8 relative z-10">I Vantaggi</h3>
                
                <ul className="space-y-6 relative z-10">
                  {[
                    "Nessuna dispersione o calo di segnale",
                    "Sfrutta il 100% della tua fibra (FTTH)",
                    "Latenza (ping) pari a zero",
                    "Immunità totale da interferenze RF",
                    "Sicurezza dei dati fisicamente isolata"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="flex-shrink-0 grid h-8 w-8 place-items-center rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="font-light text-slate-300 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
