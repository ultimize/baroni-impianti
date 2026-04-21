import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"

export const metadata: Metadata = {
  title: "Certificazioni",
  description:
    "Le certificazioni e abilitazioni di Baroni Impianti: lavoriamo a norma con personale qualificato. Sezione in pubblicazione.",
}

export default function CertificazioniPage() {
  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: "Certificazioni", url: "/certificazioni" },
        ]}
      />

      <div className="mx-auto mt-6 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Certificazioni
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          La sicurezza è una questione di carte in regola e personale
          qualificato.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
          <Award className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-5 text-xl font-semibold">Sezione in arrivo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Stiamo raccogliendo le immagini ufficiali delle nostre certificazioni
          e abilitazioni. Per richieste specifiche, contattaci direttamente.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/contatti">
              Scrivici
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
