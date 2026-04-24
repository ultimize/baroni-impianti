import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Container } from "@/components/public/Container"
import { Logo } from "@/components/public/Logo"
import {
  getSiteSettings,
  getPublishedServices,
  settingAddress,
  settingString,
} from "@/lib/queries/site-content"

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82V14.706h-3.13v-3.63h3.13V8.408c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.764v2.31h3.59l-.467 3.63h-3.123V24h6.116c.73 0 1.323-.592 1.323-1.325V1.325C24 .593 23.408 0 22.675 0Z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.39 2.13a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-11.84a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
    </svg>
  )
}

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

export async function Footer() {
  const year = new Date().getFullYear()
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
  ])

  const legalName = settingString(
    settings,
    "company_legal_name",
    "BARONI IMPIANTI di Baroni Luca",
  )
  const vat = settingString(settings, "company_vat")
  const email = settingString(settings, "company_email")
  const phoneDisplay = settingString(settings, "company_phone_display")
  const phoneTel = settingString(settings, "company_phone_tel")
  const hours = settingString(settings, "company_hours_display")
  const address = settingAddress(settings)

  const youtubeUrl = settingString(settings, "social_youtube")
  const facebookUrl = settingString(settings, "social_facebook")
  const instagramUrl = settingString(settings, "social_instagram")
  const socials = [
    { url: youtubeUrl, label: "YouTube", icon: YoutubeIcon },
    { url: facebookUrl, label: "Facebook", icon: FacebookIcon },
    { url: instagramUrl, label: "Instagram", icon: InstagramIcon },
  ].filter((s) => s.url.length > 0)

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Impianti elettrici fatti come si deve. A Sestri Levante e nel
              Tigullio.
            </p>
            {socials.length > 0 ? (
              <div className="flex items-center gap-2 pt-2">
                {socials.map(({ url, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
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
              {services.map((service) => {
                const href =
                  service.slug === "zero-pensieri"
                    ? "/zero-pensieri"
                    : `/servizi/${service.slug}`
                return (
                  <li key={service.slug}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Contatti
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {address ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <span>
                    {address.street}
                    <br />
                    {address.zip} {address.city}
                    {address.province ? ` (${address.province})` : ""}
                  </span>
                </li>
              ) : null}
              {phoneDisplay ? (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  {phoneTel ? (
                    <a
                      href={`tel:${phoneTel}`}
                      className="hover:text-primary"
                    >
                      {phoneDisplay}
                    </a>
                  ) : (
                    <span>{phoneDisplay}</span>
                  )}
                </li>
              ) : null}
              {email ? (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <a
                    href={`mailto:${email}`}
                    className="break-all hover:text-primary"
                  >
                    {email}
                  </a>
                </li>
              ) : null}
              {hours ? (
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <span>{hours}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {year} {legalName}
            </span>
            {vat ? (
              <>
                <span aria-hidden className="text-muted-foreground/40">
                  ·
                </span>
                <span>P.IVA {vat}</span>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie
            </Link>
            <Link href="#" className="hover:text-primary">
              Termini
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
