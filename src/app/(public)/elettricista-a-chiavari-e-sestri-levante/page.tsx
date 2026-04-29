import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Zap, Network, Video, Speaker, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { ServiceCard } from "@/components/public/ServiceCard"
import { MapEmbed } from "@/components/public/MapEmbed"
import { getPublishedServices } from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Elettricista a Chiavari e Sestri Levante — Baroni Impianti",
  description: "Dall'installazione di nuovi impianti alla riparazione. Scopri i nostri servizi di elettricista specializzato a Chiavari e Sestri Levante.",
}

const REVIEWS = [
  {
    author: "Gianluca M.",
    text: "Professionali, puntuali e precisi. Hanno rifatto l'impianto di casa mia consigliandomi le soluzioni migliori senza farmi spendere cifre folli.",
    rating: 5,
  },
  {
    author: "Elena S.",
    text: "Li ho chiamati per un problema all'impianto elettrico e sono intervenuti rapidamente risolvendo il guasto in modo definitivo. Consigliatissimi.",
    rating: 5,
  },
  {
    author: "Marco D.",
    text: "Ho installato con loro il sistema di allarme e videosorveglianza per il mio negozio. Lavoro eseguito a regola d'arte, personale molto preparato.",
    rating: 5,
  },
]

export default async function ServiziPage() {
  const services = await getPublishedServices()

  return (
    <>
      {/* Custom Hero for Servizi */}
      <section className="relative overflow-hidden lg:min-h-[60vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24 bg-slate-950 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Servizi", url: "/elettricista-a-chiavari-e-sestri-levante" },
              ]}
              tone="light"
              scriptId="breadcrumb-servizi-jsonld"
              className="mb-6"
            />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Zap className="w-4 h-4 text-amber-400" /> L'eccellenza al tuo fianco
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Scopri i <br className="hidden sm:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">servizi.</span>
            </h1>
            
            <p className="mt-8 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light mx-auto">
              Dall'installazione di nuovi impianti alla riparazione, offriamo soluzioni all'avanguardia per ogni necessità abitativa e commerciale.
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-slate-50 border-b border-slate-200/50">
        <div className="mx-auto max-w-6xl mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest mb-6">
                La nostra offerta
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6">
                Elettricista a Chiavari e <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Sestri Levante.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 font-light">
                <p>
                  Le esigenze che possono portarti a cercare l'intervento di un elettricista possono essere molte. Dall'installazione di un nuovo impianto elettrico in un edificio in fase di costruzione, alla riparazione di un guasto in un impianto già esistente.
                </p>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-slate-700">
                    Qualunque sia il motivo, è fondamentale rivolgersi a un professionista qualificato e competente, in grado di garantirti un lavoro eseguito a perfetta regola d'arte e nel totale rispetto delle normative vigenti.
                  </p>
                </div>
                <p>
                  Con Baroni Impianti hai la certezza di affidarti a un team esperto, capace di consigliarti la soluzione ideale e di realizzare un impianto elettrico sicuro, efficiente e progettato per durare nel tempo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {services.map((service) => {
              const isZeroPensieri = service.slug === "zero-pensieri"
              return (
                <ServiceCard
                  key={service.slug}
                  slug={service.slug}
                  name={service.title}
                  shortDescription={service.short_description ?? ""}
                  iconName={service.icon}
                  href={
                    isZeroPensieri
                      ? "/zero-pensieri"
                      : service.slug === "diffusione-sonora" || service.slug === "impianti-fotovoltaici"
                      ? "/contatti"
                      : `/${service.slug}`
                  }
                  highlight={isZeroPensieri}
                />
              )
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Stiamo aggiornando l'elenco dei servizi. Torna a trovarci tra poco.
          </p>
        )}
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
              Oltre l'ordinario
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Interventi <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">specialistici.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Siamo specializzati in diverse tipologie di impianti complessi. Scopri nel dettaglio cosa possiamo fare per la tua casa o azienda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="group bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <Network className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Impianti di Rete Cablata</h3>
              <p className="text-slate-600 leading-relaxed flex-1 mb-8">
                Perché continuare a utilizzare il Wi-Fi per collegare tutti i dispositivi elettronici della tua casa? Oltre all'aumento delle radiazioni, ci sono molteplici problemi legati alla velocità di connessione, latenza e sicurezza. La soluzione è un impianto in rete cablata.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/progettazione-impianti-rete-cablata-a-sestri-levante">
                  Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="group bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-2xl flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-amber-400 border border-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-300">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Impianti digitali integrati</h3>
                <p className="text-slate-300 leading-relaxed flex-1 mb-8 font-light">
                  Gli impianti elettrici intelligenti offrono flessibilità e praticità d'uso. Offriamo soluzioni personalizzate per l'automazione domestica, che ti permetteranno di controllare luci, riscaldamento, tapparelle e molto altro, anche da remoto.
                </p>
                <Button asChild className="w-fit bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" variant="outline">
                  <Link href="/realizzazione-di-impianti-digitali-integrati">
                    Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Protezione sovratensione atmosferica</h3>
              <p className="text-slate-600 leading-relaxed flex-1 mb-8">
                L'impianto in assenza di un sistema di protezione scariche atmosferiche è gravemente a rischio, compresi gli elettrodomestici. Scopri come gli scaricatori di sovratensione (SPD) proteggono la tua casa.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/protezione-dalle-scariche-atmosferiche-installazione-spd">
                  Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="group bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand border border-slate-200 shadow-sm group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <Speaker className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Impianti di diffusione sonora</h3>
              <p className="text-slate-600 leading-relaxed flex-1 mb-8">
                In questi casi non ci si può affidare ai dispositivi usa e getta, un vero impianto di diffusione sonora ti avvolge rendendoti parte dell'ambiente stesso. Goditi la tua musica preferita in ogni stanza.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/contatti">
                  Contattaci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Dicono di <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">noi.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              La soddisfazione dei nostri clienti è la migliore garanzia. Ecco alcune testimonianze di chi si è affidato a noi.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 hover:border-brand/30">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-serif text-8xl leading-none text-slate-900 pointer-events-none transition-transform group-hover:scale-110">
                  "
                </div>
                <div className="flex items-center gap-1 mb-6 text-amber-400 relative z-10">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-8 flex-1 leading-relaxed relative z-10">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {review.author.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-900">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" className="h-12 px-8 rounded-full border-slate-300 hover:border-brand hover:text-brand font-semibold transition-all">
              <Link href="/testimonianze">
                Leggi sul sito <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="h-12 px-8 rounded-full font-semibold transition-all shadow-md bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:text-brand">
              <a href="https://maps.google.com/?cid=1694843707398316530" target="_blank" rel="noopener noreferrer">
                Leggi su Google My Business
              </a>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50 relative overflow-hidden py-24 border-t border-slate-200/60">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-brand/10 text-brand mb-8 shadow-sm border border-brand/20">
            <MapPin className="h-10 w-10" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.15]">
            Intervento impianti elettrici <br className="hidden sm:block" />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">in queste zone.</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light max-w-3xl mx-auto">
            Operiamo con prontezza ed efficienza a <strong className="text-slate-900 font-medium">Chiavari</strong>, <strong className="text-slate-900 font-medium">Sestri Levante</strong> e in tutto il <strong className="text-slate-900 font-medium">Tigullio</strong>. La nostra vicinanza al territorio ci permette di garantire interventi tempestivi per qualsiasi necessità impiantistica, civile o industriale.
          </p>
        </div>

        <div className="mx-auto max-w-5xl mt-16 px-4 relative z-10">
          <div className="relative w-full aspect-square sm:aspect-video lg:aspect-[2.5/1] bg-slate-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            <MapEmbed
              src="https://maps.google.com/maps?q=Baroni+Impianti+Srl+Castiglione+Chiavarese&t=&z=13&ie=UTF8&iwloc=&output=embed"
              title="Zone di intervento Baroni Impianti"
              allowFullScreen={false}
            />
            {/* Overlay gradient to blend borders */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_50px_rgba(2,6,23,0.8)] border border-white/5" />
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Hai bisogno di un elettricista?"
        lead="Non aspettare che un piccolo problema si trasformi in un guasto serio. Contattaci subito per una consulenza senza impegno."
        primaryCta={{ label: "Contattaci", href: "/contatti" }}
        secondaryCta={{ label: "Torna alla Home", href: "/" }}
      />
    </>
  )
}
