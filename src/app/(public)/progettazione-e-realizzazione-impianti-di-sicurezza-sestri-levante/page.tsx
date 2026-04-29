import type { Metadata } from "next"
import Script from "next/script"
import { Shield, Lock, Eye, Bell, ShieldCheck, Zap, Crosshair } from "lucide-react"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { renderJsonLd, serviceSchema } from "@/lib/seo/json-ld"

export const revalidate = 3600

const SERVICE_TITLE =
  "Progettazione e realizzazione impianti di sicurezza Sestri Levante"
const SERVICE_DESCRIPTION =
  "Proteggi la tua famiglia e la tua azienda con i nostri impianti di sicurezza. Antifurto, videosorveglianza e controllo accessi a Sestri Levante e nel Tigullio."
const SERVICE_SLUG =
  "progettazione-e-realizzazione-impianti-di-sicurezza-sestri-levante"

export const metadata: Metadata = {
  title: SERVICE_TITLE,
  description: SERVICE_DESCRIPTION,
}

export default function SicurezzaPage() {
  return (
    <>
      <Script
        id="service-sicurezza-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            serviceSchema({
              title: SERVICE_TITLE,
              description: SERVICE_DESCRIPTION,
              slug: SERVICE_SLUG,
              category: "Impianti di sicurezza, antifurto e videosorveglianza",
            }),
          ),
        }}
      />
      {/* Custom Hero Sicurezza */}
      <section className="relative overflow-hidden lg:min-h-[60vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Security Grid */}
          <div className="absolute inset-0 opacity-[0.1]" 
               style={{ backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Servizi", url: "/elettricista-a-chiavari-e-sestri-levante" },
                { name: "Impianti di Sicurezza", url: `/${SERVICE_SLUG}` },
              ]}
              tone="light"
              scriptId="breadcrumb-sicurezza-jsonld"
              className="mb-6"
            />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4" /> Protezione Assoluta
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Impianti di <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">sicurezza.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Conoscere il grado di rischio reale è la base per la sicurezza della tua famiglia o del processo aziendale. Sistemi avanzati a Sestri Levante.
            </p>
          </div>
        </div>
      </section>

      {/* L'Installatore di fiducia & Nebbiogeno */}
      <SectionWrapper variant="white" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Colonna Testo */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
                L'Installatore di Fiducia
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                Analisi del Rischio e <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Professionalità.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-light">
                <p>
                  Molto spesso ci si affida a kit fai-da-te o a installatori che si improvvisano esperti della sicurezza, senza avere né le capacità tecniche né l'esperienza adeguata per analizzare i veri <strong className="text-slate-900 font-medium">gradi di rischio</strong> di un edificio.
                </p>
                <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10">
                  <p className="text-slate-800 font-medium">
                    Un sistema di allarme che suona non è più sufficiente per mettere in fuga gli intrusi più determinati. Serve un approccio attivo.
                  </p>
                </div>
                <p>
                  Il nostro team di esperti realizza sistemi antintrusione, controllo accessi e videosorveglianza integrati, studiati su misura per difendere preventivamente l'incolumità delle persone e la sicurezza dei tuoi beni.
                </p>
              </div>
            </div>

            {/* Colonna Card VIP Nebbiogeno */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/10 to-transparent opacity-20 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-400/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 relative z-10">
                  <Zap className="h-8 w-8" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">L'Evoluzione: <br />Il Nebbiogeno</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-8 relative z-10 text-lg">
                  Tutto cambia se a livello perimetrale e volumetrico interviene un <strong className="text-white font-semibold">impianto nebbiogeno</strong>.
                </p>
                
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-start gap-4">
                    <Crosshair className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-light text-slate-300">Azzeramento visivo istantaneo: l'intruso non può rubare ciò che non vede.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Crosshair className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-light text-slate-300">Fuga immediata forzata per la perdita completa dell'orientamento.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Crosshair className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-light text-slate-300">Nebbia densa, innocua per persone e animali, che non lascia residui.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* I 3 Servizi Bento Grid */}
      <SectionWrapper className="bg-slate-50 border-t border-slate-200/50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Le nostre <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">tecnologie.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Antintrusione */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Antintrusione</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Sistemi di allarme avanzati cablati e ibridi, progettati per prevenire le effrazioni ancor prima che l'intruso entri in casa.
              </p>
            </div>

            {/* Accessi */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Controllo Accessi</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Gestione sicura degli ingressi per abitazioni e aziende tramite badge, smartphone o biometria, monitorando ogni varco in tempo reale.
              </p>
            </div>

            {/* Videosorveglianza - Wide/Dark Card */}
            <div className="md:col-span-2 lg:col-span-1 bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-white/10 text-brand-400 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Videosorveglianza IA</h3>
              <p className="text-slate-300 leading-relaxed font-light relative z-10">
                Telecamere 4K ad altissima risoluzione dotate di intelligenza artificiale integrata per il riconoscimento e tracciamento di persone e veicoli in qualsiasi condizione di luce.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="La sicurezza non è un optional"
        lead="Non affidare la tua tranquillità al caso o al fai-da-te. Valutiamo insieme i rischi e troviamo la soluzione su misura per te."
        primaryCta={{ label: "Richiedi un preventivo", href: "/contatti" }}
      />
    </>
  )
}
