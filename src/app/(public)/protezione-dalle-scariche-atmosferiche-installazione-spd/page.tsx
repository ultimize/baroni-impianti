import type { Metadata } from "next"
import Script from "next/script"
import { ShieldAlert, Zap, CloudLightning, Home, Server, TriangleAlert, Activity } from "lucide-react"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { renderJsonLd, serviceSchema } from "@/lib/seo/json-ld"

export const revalidate = 3600

const SERVICE_TITLE =
  "Protezione dalle scariche atmosferiche, installazione SPD Sestri Levante"
const SERVICE_DESCRIPTION =
  "Proteggi i tuoi elettrodomestici e dispositivi elettronici dai fulmini con un impianto SPD e scaricatori di sovratensione a regola d'arte."
const SERVICE_SLUG =
  "protezione-dalle-scariche-atmosferiche-installazione-spd"

export const metadata: Metadata = {
  title: SERVICE_TITLE,
  description: SERVICE_DESCRIPTION,
}

export default function SPDPage() {
  return (
    <>
      <Script
        id="service-spd-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(
            serviceSchema({
              title: SERVICE_TITLE,
              description: SERVICE_DESCRIPTION,
              slug: SERVICE_SLUG,
              category: "Protezione da sovratensioni e scariche atmosferiche",
            }),
          ),
        }}
      />
      {/* Custom Hero SPD */}
      <section className="relative overflow-hidden lg:min-h-[60vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="absolute inset-0 opacity-[0.1]" 
               style={{ backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Servizi", url: "/elettricista-a-chiavari-e-sestri-levante" },
                { name: "Installazione SPD", url: `/${SERVICE_SLUG}` },
              ]}
              tone="light"
              scriptId="breadcrumb-spd-jsonld"
              className="mb-6"
            />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm animate-pulse">
              <CloudLightning className="w-4 h-4" /> Rischio Fulmini
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Protezione dalle <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500">sovratensioni.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Gli interruttori magnetotermici e i salvavita non bastano contro le scariche atmosferiche. Metti al sicuro i tuoi elettrodomestici.
            </p>
          </div>
        </div>
      </section>

      {/* Il Problema & Cosa Rischi */}
      <SectionWrapper variant="white" className="py-24 border-b border-slate-200/50">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
                Il Problema
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
                Perché i salvavita <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">non bastano.</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-light">
                <p>
                  Quasi tutti conoscono gli interruttori magnetotermici e i salvavita che proteggono l'impianto e le persone da sovraccarichi e contatti diretti o indiretti.
                </p>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <p className="text-red-900 font-medium">
                    Tuttavia, in assenza di un sistema di protezione scariche atmosferiche, il tuo impianto e <strong>tutti i dispositivi collegati</strong> sono gravemente a rischio.
                  </p>
                </div>
                <p>
                  I fulmini e le sovratensioni transitorie viaggiano sui cavi elettrici e possono bruciare schede elettroniche di TV, caldaie, frigoriferi e computer in una frazione di secondo. Il normale "salvavita" non è progettato per intercettare questi sbalzi di tensione estremi e rapidissimi.
                </p>
              </div>
            </div>

            {/* Cosa rischi senza SPD - Warning Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-red-200 shadow-xl overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-3xl rounded-full pointer-events-none" />
                
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 border border-red-200 text-red-600 mb-8 relative z-10">
                  <TriangleAlert className="h-8 w-8" />
                </div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-8 relative z-10">Cosa rischi senza SPD</h3>
                
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 grid h-8 w-8 place-items-center rounded-full bg-red-100 text-red-600 font-bold text-sm">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-slate-700 text-lg">Rottura irreparabile di elettrodomestici costosi (frigo, forno, lavatrice)</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 grid h-8 w-8 place-items-center rounded-full bg-red-100 text-red-600 font-bold text-sm">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-slate-700 text-lg">Danni ai sistemi di riscaldamento (schede elettroniche caldaie e pompe di calore)</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 grid h-8 w-8 place-items-center rounded-full bg-red-100 text-red-600 font-bold text-sm">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-slate-700 text-lg">Perdita permanente di dati su computer, NAS e server non protetti</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* La Soluzione SPD */}
      <SectionWrapper className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              La soluzione: <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Impianti SPD.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Per una protezione completa contro le sovratensioni distruttive, progettiamo e installiamo sistemi SPD (Surge Protection Device) multilivello.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Protezione Completa */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="h-14 w-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Protezione a Cascata</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Gli scaricatori di sovratensione SPD vengono installati in modo gerarchico: partendo dal quadro generale fino ad arrivare ai quadri di zona o alle singole prese, per proteggere in modo mirato i dispositivi elettronici più sensibili.
              </p>
            </div>

            {/* Deviazione - DARK CARD */}
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
              <div className="h-14 w-14 rounded-2xl bg-white/10 text-amber-400 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Deviazione dell'Energia</h3>
              <p className="text-slate-300 leading-relaxed font-light relative z-10">
                In caso di sovratensione o caduta di un fulmine, lo scaricatore interviene in pochi microsecondi deviando l'energia distruttiva in eccesso verso l'impianto di terra, proteggendo così la tua abitazione e bloccando i danni.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Il tuo impianto è protetto?"
        lead="Non aspettare il prossimo temporale per scoprirlo. Metti al sicuro i tuoi elettrodomestici e la tua attività."
        primaryCta={{ label: "Valuta la tua protezione", href: "/contatti" }}
      />
    </>
  )
}
