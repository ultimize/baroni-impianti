import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Sestri Levante &amp; Tigullio
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Impianti elettrici fatti come{" "}
            <span className="text-primary">si deve</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Da oltre vent&apos;anni progettiamo, installiamo e manuteniamo
            impianti elettrici civili e industriali. Sicurezza, normativa e
            servizio Zero Pensieri.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contatti">
                Richiedi un sopralluogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/zero-pensieri">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Scopri Zero Pensieri
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
