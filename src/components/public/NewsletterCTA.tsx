import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsletterCTA() {
  return (
    <section className="mt-12 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-background to-background p-8 sm:p-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Hai un progetto in mente?
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Richiedi un sopralluogo gratuito
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Parla con un nostro tecnico: valutiamo insieme l&apos;impianto
            migliore per la tua casa o la tua attività a Sestri Levante e nel
            Tigullio.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contatti">
              <Phone className="mr-2 h-4 w-4" />
              Contattaci
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/zero-pensieri">
              Zero Pensieri
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
