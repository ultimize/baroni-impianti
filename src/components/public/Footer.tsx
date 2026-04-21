import Link from "next/link"
import { Container } from "@/components/public/Container"
import { Logo } from "@/components/public/Logo"
import { NAV_LINKS, SITE_NAME, CONTACT_EMAIL } from "@/lib/constants"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              Elettricista impiantista a Sestri Levante. Impianti civili,
              industriali, domotica e manutenzioni — con il servizio Zero
              Pensieri.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Navigazione
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Contatti
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Sestri Levante (GE)</li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {year} {SITE_NAME}. Tutti i diritti riservati.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/cookie" className="hover:text-primary">
              Cookie
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
