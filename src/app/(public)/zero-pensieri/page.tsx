import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Wrench, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/public/Container"

export const metadata: Metadata = {
  title: "Zero Pensieri",
  description:
    "Il servizio di assistenza programmata di Baroni Impianti: controlli, interventi prioritari, sicurezza garantita.",
}

const PILLARS = [
  {
    title: "Controlli annuali",
    description: "Verifiche programmate dell'impianto e del quadro elettrico.",
    Icon: Calendar,
  },
  {
    title: "Pronto intervento prioritario",
    description: "I clienti Zero Pensieri vengono prima di tutti gli altri.",
    Icon: Phone,
  },
  {
    title: "Manutenzione preventiva",
    description: "Sostituiamo i componenti prima che si guastino.",
    Icon: Wrench,
  },
  {
    title: "Sicurezza certificata",
    description: "Documentazione sempre aggiornata, normativa rispettata.",
    Icon: ShieldCheck,
  },
] as const

export default function ZeroPensieriPage() {
  return (
    <>
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/10 via-background to-background">
        <Container className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Zero Pensieri.
              <br />
              <span className="text-primary">Il tuo impianto, sotto controllo.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Un servizio di assistenza tecnica programmata pensato per chi non
              vuole più preoccuparsi del proprio impianto elettrico.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/contatti?subject=Zero+Pensieri">
                  Voglio Zero Pensieri
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ title, description, Icon }) => (
            <Card key={title}>
              <CardHeader>
                <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4 text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}
