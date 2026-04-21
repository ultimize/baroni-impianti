import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sun, Wrench, Zap, ShieldCheck, Cpu, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Tutti i servizi di Baroni Impianti: impianti elettrici civili e industriali, fotovoltaico, domotica, sicurezza, manutenzioni.",
}

const SERVICES = [
  {
    icon: Zap,
    title: "Impianti elettrici civili",
    description:
      "Nuovi impianti, rifacimenti e adeguamenti per appartamenti, villette e ristrutturazioni.",
  },
  {
    icon: Home,
    title: "Impianti industriali",
    description:
      "Quadri, linee di potenza, cablaggi dedicati per uffici, capannoni e attività produttive.",
  },
  {
    icon: Sun,
    title: "Fotovoltaico e accumulo",
    description:
      "Progettazione, installazione e monitoraggio di impianti fotovoltaici con sistemi di accumulo.",
  },
  {
    icon: Cpu,
    title: "Domotica e smart home",
    description:
      "Illuminazione, clima, tapparelle e scenari automatizzati per abitazioni moderne.",
  },
  {
    icon: ShieldCheck,
    title: "Sicurezza e allarmi",
    description:
      "Impianti di allarme, videosorveglianza e controllo accessi integrati e certificati.",
  },
  {
    icon: Wrench,
    title: "Manutenzioni e pronto intervento",
    description:
      "Guasti, blackout e manutenzioni programmate con tecnici rapidi e qualificati.",
  },
]

export default function ServiziPage() {
  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: "Servizi", url: "/servizi" },
        ]}
      />

      <div className="mx-auto mt-6 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Servizi
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Dal sopralluogo al collaudo: tutto quello che facciamo, sempre a
          norma e con materiali di qualità.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm"
          >
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-foreground">
              {s.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-primary/15 bg-primary/5 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Non trovi quello che cerchi?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Ogni progetto è diverso: raccontaci cosa ti serve e ti diciamo come
          possiamo aiutarti.
        </p>
        <div className="mt-6">
          <Button asChild size="lg">
            <Link href="/contatti">
              Parla con un tecnico
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
