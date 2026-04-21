import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Baroni Impianti: elettricista impiantista a Sestri Levante. Esperienza, normativa, attenzione al cliente nel Tigullio.",
}

export default function ChiSiamoPage() {
  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: "Chi siamo", url: "/chi-siamo" },
        ]}
      />

      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Chi siamo
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Baroni Impianti opera a Sestri Levante e nel Tigullio con un approccio
          pratico e normato: impianti elettrici civili e industriali,
          fotovoltaico, domotica, sicurezza, manutenzioni. Ogni lavoro viene
          progettato, realizzato e certificato secondo le norme CEI.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Lavoriamo per famiglie, professionisti e aziende: dal piccolo
          intervento all&apos;impianto completo, sempre con la stessa attenzione
          ai dettagli e alla sicurezza.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contatti">
              Contattaci
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/servizi">I nostri servizi</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
