import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Container } from "@/components/public/Container"
import { Logo } from "@/components/public/Logo"
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants"

// TODO: leggere da site_settings quando disponibile
const COMPANY_PHONE_DISPLAY = "+39 XXX XXX XXXX"
const COMPANY_VAT = "02438410991"

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/zero-pensieri", label: "Zero Pensieri" },
  { href: "/testimonianze", label: "Testimonianze" },
  { href: "/certificazioni", label: "Certificazioni" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
]

const FOOTER_SERVICES = [
  { href: "/servizi/impianti-civili", label: "Impianti civili" },
  { href: "/servizi/impianti-industriali", label: "Impianti industriali" },
  { href: "/servizi/fotovoltaico", label: "Fotovoltaico" },
  { href: "/servizi/domotica", label: "Domotica" },
  { href: "/servizi/sicurezza", label: "Videosorveglianza" },
  { href: "/servizi/pronto-intervento", label: "Pronto intervento" },
  { href: "/zero-pensieri", label: "Zero Pensieri" },
]

// TODO: popolare con link reali quando Baroni fornirà gli account social
const SOCIAL = [
  { label: "FB", title: "Facebook", href: "#" },
  { label: "IG", title: "Instagram", href: "#" },
  { label: "YT", title: "YouTube", href: "#" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Elettricista impiantista nel Tigullio. Impianti civili,
              industriali, domotica, fotovoltaico e manutenzioni — con la
              formula Zero Pensieri.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {SOCIAL.map(({ label, title, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={title}
                  title={`${title} — in arrivo`}
                  aria-disabled="true"
                  tabIndex={-1}
                  className="pointer-events-none inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-xs font-semibold text-muted-foreground opacity-60"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label="Navigazione">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Navigazione
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servizi">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Servizi
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                <span>
                  Località Moggia, 9
                  <br />
                  16030 Castiglione Chiavarese (GE)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                <span>{COMPANY_PHONE_DISPLAY}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-all hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                <span>Lun–Ven 8:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {year} {SITE_NAME} di Baroni Luca
            </span>
            <span aria-hidden className="text-muted-foreground/40">
              ·
            </span>
            <span>P.IVA {COMPANY_VAT}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/cookie" className="hover:text-primary">
              Cookie
            </Link>
            <Link href="/termini" className="hover:text-primary">
              Termini
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
