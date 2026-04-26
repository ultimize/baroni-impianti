import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Zap, Network, Video, Speaker, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { ServiceCard } from "@/components/public/ServiceCard"
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
      <PageHero
        eyebrow="I nostri servizi"
        title="Scopri i servizi"
        lead="Dall'installazione di nuovi impianti alla riparazione, offriamo soluzioni per ogni necessità abitativa e commerciale."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
            La nostra offerta
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
            Elettricista a Chiavari e Sestri Levante
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Le esigenze che possono portarti a cercare l'intervento di un elettricista possono essere molte. Dall'installazione di un nuovo impianto elettrico in un edificio in fase di costruzione, alla riparazione di un guasto in un impianto già esistente.
            <br /><br />
            Qualunque sia il motivo per cui hai bisogno di un elettricista, è importante rivolgersi a un professionista qualificato e competente, che sia in grado di garantirti un lavoro eseguito a regola d'arte e nel rispetto delle normative vigenti.
            <br /><br />
            Con Baroni Impianti hai la certezza di affidarti a un team di professionisti esperti, che sapranno consigliarti la soluzione migliore per le tue esigenze e realizzare un impianto elettrico sicuro, efficiente e duraturo nel tempo.
          </p>
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
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Intervento elettricista a Chiavari e Sestri Levante
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Siamo specializzati in diverse tipologie di impianti. Scopri nel dettaglio cosa possiamo fare per te.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Impianti di Rete Cablata */}
            <div className="bg-card rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Network className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Impianti di Rete Cablata</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-8">
                Perché continuare a utilizzare il Wi-Fi per collegare tutti i dispositivi elettronici della tua casa? Oltre all'aumento delle radiazioni, ci sono molteplici problemi legati alla velocità di connessione, latenza e sicurezza. La soluzione è un impianto in rete cablata.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/progettazione-impianti-rete-cablata-a-sestri-levante">
                  Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Impianti digitali integrati */}
            <div className="bg-card rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Realizzazione di impianti digitali integrati</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-8">
                Gli impianti elettrici intelligenti offrono flessibilità e praticità d'uso per gestire la casa e tutti i sistemi ad essa connessi. Offriamo soluzioni personalizzate per l'automazione domestica, che ti permetteranno di controllare luci, riscaldamento, tapparelle e molto altro, anche da remoto.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/2024/01/30/realizzazione-di-impianti-digitali-integrati/">
                  Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Protezione scariche atmosferiche e SPD */}
            <div className="bg-card rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Protezione sovratensione atmosferica</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-8">
                Quasi tutti conoscono gli interruttori magnetotermici e i salvavita che proteggono l'impianto e le persone da sovraccarichi e contatti diretti o indiretti. Tuttavia, l'impianto in assenza di un sistema di protezione scariche atmosferiche è gravemente a rischio, compresi gli elettrodomestici.
              </p>
              <Button asChild className="w-fit" variant="outline">
                <Link href="/protezione-dalle-scariche-atmosferiche-installazione-spd">
                  Approfondisci <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Impianti di diffusione sonora */}
            <div className="bg-card rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                <Speaker className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Impianti di diffusione sonora</h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-8">
                Tornare a casa dopo un'intensa giornata lavorativa e immergersi nella propria poltrona preferita ascoltando della buona musica... In questi casi non ci si può affidare ai dispositivi usa e getta, un vero impianto di diffusione sonora ti avvolge rendendoti parte dell'ambiente stesso.
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
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Recensioni
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cosa dicono i nostri clienti del nostro lavoro.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {review.author.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-900">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/testimonianze">
                Leggi tutte le testimonianze
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="primary-soft">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white text-primary mb-6 shadow-sm">
            <MapPin className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
            Intervento impianti elettrici in queste zone
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Operiamo con prontezza ed efficienza a <strong className="text-foreground">Chiavari</strong>, <strong className="text-foreground">Sestri Levante</strong> e in tutto il <strong className="text-foreground">Tigullio</strong>. La nostra vicinanza al territorio ci permette di garantire interventi tempestivi per qualsiasi necessità impiantistica, civile o industriale.
          </p>
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
