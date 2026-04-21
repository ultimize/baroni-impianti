import type { Metadata } from "next"
import { Award, ShieldCheck, Handshake } from "lucide-react"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { FeatureCard } from "@/components/public/FeatureCard"
import { ClosingCta } from "@/components/public/ClosingCta"

export const metadata: Metadata = {
  title: "Chi siamo — Baroni Impianti | Elettricista a Sestri Levante",
  description:
    "Scopri la storia di Baroni Impianti: oltre 20 anni di esperienza negli impianti elettrici civili, industriali e domotica a Sestri Levante e nel Tigullio.",
}

const TIMELINE = [
  { year: "2005", title: "Diploma perito elettrotecnico" },
  { year: "2006", title: "Ingresso in azienda di famiglia" },
  { year: "2017", title: "Fondazione BARONI IMPIANTI" },
  { year: "Oggi", title: "Specializzazione domotica, fotovoltaico, KNX" },
]

const AREAS = [
  "Sestri Levante",
  "Chiavari",
  "Rapallo",
  "Lavagna",
  "Castiglione Chiavarese",
  "Moneglia",
  "Deiva Marina",
  "Levanto",
  "La Spezia",
]

export default function ChiSiamoPage() {
  return (
    <>
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Chi siamo", url: "/chi-siamo" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="Chi siamo"
        title="Elettricisti per passione, da due generazioni"
        lead="Dal 2006 Luca Baroni porta avanti la tradizione di famiglia: impianti elettrici realizzati con cura, formazione continua e un servizio che dura nel tempo."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dalla bottega di famiglia a BARONI IMPIANTI
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              La storia di BARONI IMPIANTI inizia molto prima del 2017. Nasce
              negli anni in cui il padre di Luca gira le case e i cantieri del
              Tigullio tirando fili, montando quadri, risolvendo guasti. Una
              bottega piccola, ma con un&apos;idea chiara di cosa vuol dire fare
              impianti fatti bene.
            </p>
            <p>
              Luca Baroni entra in azienda nel 2006, subito dopo il diploma da
              perito elettrotecnico. Per oltre dieci anni lavora fianco a fianco
              con il padre: impara i cantieri, la normativa, i trucchi del
              mestiere che non si trovano sui manuali. Nel gennaio 2017, dopo
              il pensionamento del padre, nasce ufficialmente BARONI IMPIANTI.
            </p>
            <p>
              Oggi l&apos;azienda è cresciuta, specializzandosi in settori dove
              elettrotecnica e tecnologia si incontrano: fotovoltaico con
              accumulo, domotica KNX, videosorveglianza IP, colonnine di
              ricarica. Ma lo spirito è rimasto lo stesso del primo giorno:
              fare le cose come si deve.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item) => (
              <li
                key={item.year}
                className="relative flex flex-col rounded-2xl border border-border/60 bg-card p-6"
              >
                <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-primary/10" />
                <p className="mt-3 text-2xl font-semibold tracking-tight text-primary">
                  {item.year}
                </p>
                <p className="mt-2 text-sm text-foreground">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cosa ci guida ogni giorno
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Tre principi semplici che guidano ogni scelta, dal sopralluogo
            fino alla consegna dei lavori.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Award}
            title="Formazione continua"
            description="Restare fermi nel nostro mestiere significa rimanere indietro. Seguiamo corsi KNX, aggiornamenti normativi CEI e formazione sui nuovi standard di fotovoltaico e sicurezza elettrica."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Lavoro a norma"
            description="Ogni impianto viene progettato secondo la norma CEI 64-8 e realizzato da personale abilitato DM 37/2008. Al termine dei lavori ricevi sempre la dichiarazione di conformità."
          />
          <FeatureCard
            icon={Handshake}
            title="Rapporto a lungo termine"
            description="Non siamo semplici fornitori di manodopera, ma partner tecnici. Con la formula Zero Pensieri accompagniamo i clienti nel tempo, gestendo manutenzione e aggiornamenti."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Il titolare
          </h2>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="mx-auto md:mx-0">
              <div className="grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-4xl font-semibold tracking-tight text-primary-foreground shadow-lg shadow-primary/20">
                LB
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Titolare
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                Luca Baroni
              </p>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                <p>
                  Perito elettrotecnico diplomato nel 2005, Luca è cresciuto
                  nell&apos;azienda di famiglia imparando il mestiere sul campo.
                  Appassionato di automazione industriale e nuove tecnologie,
                  ha conseguito la certificazione KNX Partner per la
                  progettazione di impianti domotici avanzati.
                </p>
                <p>
                  Ogni progetto che entra in BARONI IMPIANTI passa dalle sue
                  mani: dal sopralluogo alla scelta dei materiali, fino al
                  collaudo finale.
                </p>
              </div>
              <blockquote className="mt-8 rounded-2xl border-l-4 border-primary bg-muted/30 p-6 text-base italic text-foreground">
                &ldquo;L&apos;impianto elettrico non è solo un lavoro: è la
                garanzia che la tua famiglia o la tua attività siano al sicuro
                ogni giorno.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dove lavoriamo
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Operiamo principalmente nel Tigullio e nelle province di Genova e
            La Spezia. Per progetti fuori area, valutiamo caso per caso: chiamaci.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {AREAS.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full border border-border/60 bg-card px-4 py-1.5 text-sm font-medium text-foreground"
            >
              {area}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Facciamo due chiacchiere?"
        lead="Un sopralluogo gratuito è il modo migliore per conoscerci. Senza impegno."
        primaryCta={{ label: "Richiedi sopralluogo", href: "/contatti" }}
        secondaryCta={{ label: "Esplora i servizi", href: "/servizi" }}
      />
    </>
  )
}
