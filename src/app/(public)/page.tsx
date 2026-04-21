import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Wrench,
  Zap,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { Hero } from "@/components/public/Hero"
import { PostsGrid } from "@/components/public/PostsGrid"
import { createClient } from "@/lib/supabase/server"
import { getRecentPosts } from "@/lib/queries/posts"
import { organizationSchema, websiteSchema, renderJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

const SERVICES = [
  {
    icon: Zap,
    title: "Impianti elettrici civili e industriali",
    description:
      "Progettiamo e realizziamo impianti a norma CEI, dalla prima accensione alle certificazioni finali.",
    href: "/servizi",
  },
  {
    icon: Sun,
    title: "Fotovoltaico e accumulo",
    description:
      "Impianti fotovoltaici chiavi in mano con sistemi di accumulo e monitoraggio per la tua indipendenza energetica.",
    href: "/servizi",
  },
  {
    icon: Wrench,
    title: "Pronto intervento e manutenzione",
    description:
      "Guasti, blackout, manutenzioni programmate. Interventi rapidi nel Tigullio con tecnici qualificati.",
    href: "/servizi",
  },
]

const CERTIFICATIONS = [
  {
    icon: ShieldCheck,
    title: "A norma CEI",
    description:
      "Ogni impianto viene realizzato e certificato secondo le norme CEI 64-8 e DM 37/08.",
  },
  {
    icon: Award,
    title: "Tecnici abilitati",
    description:
      "Personale qualificato, formazione continua e attrezzature certificate.",
  },
  {
    icon: Zap,
    title: "Materiali selezionati",
    description:
      "Solo brand leader per garantire durata, sicurezza e facilità di manutenzione.",
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const posts = await getRecentPosts(supabase, 3)

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd([organizationSchema(), websiteSchema()]),
        }}
      />

      <Hero />

      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cosa facciamo
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tre aree di specializzazione per accompagnare privati e aziende
              dall&apos;idea all&apos;impianto finito.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {s.description}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Scopri di più
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {posts.length > 0 ? (
        <section className="bg-muted/30 py-16 lg:py-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ultime guide e approfondimenti
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Contenuti pratici su sicurezza, efficienza e novità
                  normative.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">
                  Vedi tutti gli articoli
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-10">
              <PostsGrid posts={posts} priorityFirst />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Lavoriamo secondo le norme CEI
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sicurezza, tracciabilità, qualità dei materiali. Ogni lavoro è
              documentato e certificato.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col items-start rounded-xl border border-border/60 bg-background p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="ghost">
              <Link href="/certificazioni">
                Scopri le nostre certificazioni
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              I nostri clienti raccontano
            </h2>
            <p className="mt-3 text-muted-foreground">
              Storie reali di impianti realizzati nel Tigullio. La sezione è in
              fase di pubblicazione.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/testimonianze">
                  Vai alle testimonianze
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background px-6 py-14 sm:px-12 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Servizio Zero Pensieri
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Il tuo impianto, sempre in salute.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Manutenzione programmata, controlli periodici e pronto
                intervento inclusi: paghi una quota annuale e ti dimentichi di
                pensare all&apos;impianto.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/zero-pensieri">
                    Scopri Zero Pensieri
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contatti">Richiedi informazioni</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
