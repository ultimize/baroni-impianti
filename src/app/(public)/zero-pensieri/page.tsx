import type { Metadata } from "next"
import {
  AlertCircle,
  Calendar,
  Zap,
  FileCheck,
  CheckCircle2,
  Home,
  Building2,
  Building,
  Shield,
  Battery,
  Video,
  Flame,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { FeatureCard } from "@/components/public/FeatureCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

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

type Contract = {
  name: string
  icon: LucideIcon
  description: string
}

const CONTRACTS: Contract[] = [
  {
    name: "Allarme intrusione",
    icon: Shield,
    description:
      "Un allarme intrusione (o sistema antintrusione) è un impianto di sicurezza elettronico progettato per rilevare e segnalare tentativi di accesso non autorizzato a un edificio, un'area o un bene protetto. Rivolgersi a un professionista elettrico per la realizzazione di un impianto non è sufficiente per garantire nel tempo i massimi standard di sicurezza in caso di assenza di manutenzione programmata.",
  },
  {
    name: "UPS",
    icon: Battery,
    description:
      "Un impianto elettrico UPS (Uninterruptible Power Supply, cioè Gruppo di Continuità) è un sistema progettato per fornire energia elettrica di emergenza e protezione di qualità alle apparecchiature in caso di interruzioni, cali o disturbi della rete elettrica. Il suo compito è mantenere l'alimentazione continua e stabile.",
  },
  {
    name: "TVCC (videosorveglianza)",
    icon: Video,
    description:
      "Un impianto TVCC è composto da una rete di telecamere collegate a un sistema di registrazione e controllo, che permette di visualizzare le immagini in tempo reale o di archiviarle per consultazioni successive. È definito 'a circuito chiuso' perché le immagini non vengono trasmesse pubblicamente, ma restano visibili solo a utenti autorizzati.",
  },
  {
    name: "STOP FIRE (rilevazione incendi)",
    icon: Flame,
    description:
      "I rilevatori elettrici di incendi sono dispositivi elettronici progettati per individuare tempestivamente i segnali di un principio d'incendio — fumo, calore o fiamma — e inviare un allarme a una centrale di rilevazione. Appartengono alla categoria degli impianti di rivelazione e allarme incendio (IRAI), disciplinati dalla norma UNI EN 54 e dalle norme CEI 79-3 / UNI 9795.",
  },
]

type Feature = { title: string; description: string }

const FEATURES: Feature[] = [
  {
    title: "Assistenza da remoto 7/7",
    description: "Risposta entro 24 ore dalla segnalazione.",
  },
  {
    title: "Risoluzione anomalie",
    description: "Entro 4 giorni lavorativi dalla diagnosi.",
  },
  {
    title: "Interventi urgenti illimitati",
    description: "Nessun limite numerico in caso di emergenza.",
  },
  {
    title: "Garanzia a vita sui dispositivi",
    description: "Su tutti i dispositivi installati nell'impianto.",
  },
  {
    title: "Verifica annuale dell'impianto",
    description: "Con rilascio del verbale di manutenzione.",
  },
  {
    title: "Connessione GSM garantita",
    description: "Abbonamento al servizio di comunicazione fornito da noi.",
  },
  {
    title: "Sostituzione batterie",
    description: "Cambio periodico delle batterie nei dispositivi.",
  },
  {
    title: "Aggiornamenti software garantiti",
    description: "Mantenimento dei firmware sempre aggiornati.",
  },
]

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
      <Container className="pt-6">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Zero Pensieri", url: "/zero-pensieri" },
          ]}
        />
      </Container>

      <PageHero
        eyebrow="Servizio esclusivo"
        title="Zero Pensieri. L'impianto che si prende cura da solo."
        lead="Manutenzione programmata, controlli periodici, pronto intervento. Paghi una quota annuale e ti dimentichi di pensare all'impianto."
        tone="brand"
        primaryCta={{
          label: "Richiedi preventivo",
          href: "/contatti?service=zero-pensieri",
        }}
        secondaryCta={{
          label: "Come funziona",
          href: "#come-funziona",
        }}
      />

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Quante volte ti sei detto...
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Le preoccupazioni che Zero Pensieri toglie dalla tua testa.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <div
              key={problem}
              className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-100 text-red-600">
                <AlertCircle className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-sm leading-relaxed text-foreground">
                &ldquo;{problem}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white" id="come-funziona">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Con Zero Pensieri, tutto questo non ti riguarda più
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Sottoscrivendo il contratto Zero Pensieri ricevi assistenza da
            remoto 7 giorni su 7 entro 24 ore dalla segnalazione e tanti altri
            benefici per la sicurezza dell&apos;impianto e dei suoi utilizzatori.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Calendar}
            title="Controlli programmati"
            description="Verifiche periodiche secondo CEI 64-8 e DPR 462/01."
          />
          <FeatureCard
            icon={Zap}
            title="Pronto intervento incluso"
            description="Interventi prioritari illimitati in caso di guasto."
          />
          <FeatureCard
            icon={FileCheck}
            title="Documentazione sempre aggiornata"
            description="Verbali di manutenzione, schemi e certificati conservati per te."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted" id="contratti">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Zero Pensieri si adatta al tuo impianto
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Quattro contratti dedicati per coprire le aree più critiche della
            sicurezza elettrica.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CONTRACTS.map((c) => {
            const Icon = c.icon
            return (
              <article
                key={c.name}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {c.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </article>
            )
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white" id="cosa-include">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            8 garanzie, ogni anno
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Tutto quello che ottieni sottoscrivendo Zero Pensieri,
            indipendentemente dal tipo di impianto.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" aria-hidden strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {f.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Chi sceglie Zero Pensieri
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Home}
            title="Famiglie"
            description="Case dove la sicurezza elettrica non è opzionale."
          />
          <FeatureCard
            icon={Building2}
            title="Professionisti e piccole aziende"
            description="Uffici, studi, negozi che non possono permettersi fermi impianto."
          />
          <FeatureCard
            icon={Building}
            title="Amministratori di condominio"
            description="Gestione delle parti comuni con un interlocutore unico."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Domande frequenti
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Le risposte alle domande che ci fanno più spesso.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border/60 bg-card px-6">
          <Accordion>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Smettila di pensare all'impianto."
        lead="Attiva Zero Pensieri e lascia tutto a noi."
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
