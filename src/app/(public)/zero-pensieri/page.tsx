import type { Metadata } from "next"
import {
  AlertCircle,
  Calendar,
  Zap,
  FileCheck,
  Check,
  Users,
  Building2,
  KeyRound,
} from "lucide-react"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { FeatureCard } from "@/components/public/FeatureCard"
import { StepList } from "@/components/public/StepList"
import { ClosingCta } from "@/components/public/ClosingCta"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title:
    "Zero Pensieri — La formula di manutenzione elettrica all-inclusive | Baroni Impianti",
  description:
    "Zero Pensieri è la formula esclusiva di Baroni Impianti: manutenzione programmata, pronto intervento e controlli periodici inclusi. Paghi una quota annuale e ti dimentichi dell'impianto.",
}

const PROBLEMS = [
  "L'impianto ha dieci anni, chissà se è ancora a norma.",
  "Quando si guasta qualcosa, devo trovare un elettricista al volo.",
  "Non so se i salvavita e le messe a terra sono ancora efficienti.",
  "La bolletta cresce ma non capisco se l'impianto consuma più del dovuto.",
]

const STEPS = [
  {
    number: 1,
    title: "Sopralluogo gratuito",
    description: "Valutiamo l'impianto, i tuoi spazi e le tue esigenze reali.",
  },
  {
    number: 2,
    title: "Preventivo personalizzato",
    description: "Quota annuale chiara, senza sorprese e senza spese nascoste.",
  },
  {
    number: 3,
    title: "Attivazione del contratto",
    description: "Pochi documenti, firma digitale: si parte subito.",
  },
  {
    number: 4,
    title: "Tranquillità",
    description: "Da qui in poi pensiamo noi a tutto, tu pensi alla tua vita.",
  },
]

const INCLUDED = [
  "Verifica annuale dello stato dell'impianto secondo CEI 64-8",
  "Test periodico messa a terra (DPR 462/01) per attività commerciali",
  "Pulizia e controllo quadro elettrico",
  "Verifica funzionamento salvavita differenziale",
  "Controllo cavi, prese e prolunghe in zone a rischio",
  "Pronto intervento entro 24h per guasti (48h per non urgenze)",
  "Sconto 15% sui materiali di eventuali interventi straordinari",
  "Sconto 10% su nuovi impianti (es. colonnine ricarica EV)",
  "Archivio documentale sempre accessibile",
]

const FAQS = [
  {
    q: "Quanto costa Zero Pensieri?",
    a: "Il costo dipende dal tipo di impianto e dai metri quadri. Il sopralluogo per stimare la quota è gratuito e senza impegno.",
  },
  {
    q: "Cosa succede se ho un guasto?",
    a: "Ti basta chiamarci: veniamo entro 24h per guasti urgenti, 48h per non urgenze. L'intervento è già incluso nella quota.",
  },
  {
    q: "Posso disdire in qualsiasi momento?",
    a: "Il contratto è annuale con preavviso di 30 giorni prima del rinnovo. Nessun vincolo pluriennale.",
  },
  {
    q: "Se rompo io qualcosa, è coperto?",
    a: "La manutenzione ordinaria e straordinaria per usura è coperta. Danni per uso improprio no, ma li ripariamo comunque a tariffa agevolata.",
  },
  {
    q: "Funziona anche per impianti non installati da voi?",
    a: "Sì. Facciamo prima un audit dell'impianto esistente: se c'è qualcosa da mettere a norma lo proponiamo prima dell'attivazione.",
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
        lead="Manutenzione programmata, controlli periodici, pronto intervento. Paghi una quota annuale e ti dimentichi di pensare all'impianto elettrico."
        tone="brand"
        primaryCta={{
          label: "Richiedi preventivo",
          href: "/contatti?service=zero-pensieri",
        }}
        secondaryCta={{
          label: "Scopri come funziona",
          href: "#come-funziona",
        }}
      >
        <span className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Disponibile per civili e aziende
        </span>
      </PageHero>

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
            Tre pilastri inclusi nella quota: controlli, interventi,
            documentazione.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Calendar}
            title="Controlli programmati"
            description="Verifiche periodiche secondo CEI 64-8 e DPR 462/01, pianificate in calendario."
          />
          <FeatureCard
            icon={Zap}
            title="Pronto intervento"
            description="Interventi prioritari inclusi: i clienti Zero Pensieri vengono prima di tutti."
          />
          <FeatureCard
            icon={FileCheck}
            title="Documentazione aggiornata"
            description="Certificazioni, DICO e registro interventi conservati e sempre accessibili."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Quattro step, zero complicazioni
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Dalla prima telefonata alla tranquillità, nel modo più semplice.
          </p>
        </div>
        <div className="mt-12">
          <StepList steps={STEPS} />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Chi sceglie Zero Pensieri
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Users}
            title="Famiglie"
            description="Case vissute ogni giorno dove la sicurezza elettrica non è opzionale."
          />
          <FeatureCard
            icon={Building2}
            title="Professionisti e piccole aziende"
            description="Uffici, studi, negozi che non possono permettersi fermi impianto."
          />
          <FeatureCard
            icon={KeyRound}
            title="Amministratori di condominio"
            description="Gestione centralizzata delle parti comuni con un interlocutore unico."
          />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="primary-soft">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Cosa c&apos;è in Zero Pensieri
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Tutto quello che ricevi con la quota annuale.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-4 w-4" aria-hidden strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
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
