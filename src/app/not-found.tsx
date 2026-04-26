import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { Header } from "@/components/public/Header"
import { Footer } from "@/components/public/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center">
        <Container className="py-24 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Search className="h-8 w-8" aria-hidden />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary">
            Errore 404
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Pagina non trovata
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            La pagina che cerchi non esiste o è stata spostata. Puoi tornare
            alla home oppure dare un&apos;occhiata alle nostre guide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">
                Torna alla home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog-per-elettricisti">Vai al blog</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contatti">Contattaci</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
