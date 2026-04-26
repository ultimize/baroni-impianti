import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award } from "lucide-react"
import { Container } from "@/components/public/Container"
import {
  getSiteSettings,
  getPublishedServices,
  settingAddress,
  settingString,
} from "@/lib/queries/site-content"
import { cn } from "@/lib/utils"

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
  const vat = settingString(settings, "company_vat", "02438410991")
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
    <footer className="bg-[#0a0f1c] border-t border-slate-800/60 mt-auto text-slate-400">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Block */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Baroni Impianti" 
                width={48} 
                height={48} 
                className="h-12 w-auto brightness-200 contrast-125" 
              />
              <span className="text-xl font-semibold tracking-tight text-white">
                Baroni Impianti
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-sm">
              Impianti elettrici fatti come si deve. A Sestri Levante e nel Tigullio dal 2017.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Garanzia a vita
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Award className="h-3.5 w-3.5 text-brand-400" />
                KNX Partner
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                Pronto intervento 24h
              </span>
            </div>

            {socials.length > 0 ? (
              <div className="flex items-center gap-3 pt-2">
                {socials.map(({ url, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-white/5 text-slate-400 transition-all hover:border-brand-500/50 hover:text-brand-400 hover:bg-brand-500/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Navigazione */}
          <nav aria-label="Navigazione" className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-semibold text-white mb-6">
              Navigazione
            </h3>
            <ul className="space-y-4">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servizi */}
          <nav aria-label="Servizi" className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-6">
              Servizi
            </h3>
            <ul className="space-y-4">
              {services.map((service) => {
                const href =
                  service.slug === "zero-pensieri"
                    ? "/zero-pensieri"
                    : `/servizi/${service.slug}`
                return (
                  <li key={service.slug}>
                    <Link
                      href={href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Contatti */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-6">
              Contatti
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed">
              {address ? (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>
                    {address.street}
                    <br />
                    {address.zip} {address.city}
                    {address.province ? ` (${address.province})` : ""}
                  </span>
                </li>
              ) : null}
              {phoneDisplay ? (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  {phoneTel ? (
                    <a
                      href={`tel:${phoneTel}`}
                      className="hover:text-white transition-colors"
                    >
                      {phoneDisplay}
                    </a>
                  ) : (
                     <span>{phoneDisplay}</span>
                  )}
                </li>
              ) : null}
              {email ? (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <a
                    href={`mailto:${email}`}
                    className="break-all hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </li>
              ) : null}
              {hours ? (
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>{hours}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5">
            <span>
              © {year} {legalName}
            </span>
            {vat ? (
              <>
                <span aria-hidden className="text-slate-600">
                  ·
                </span>
                <span>P.IVA {vat}</span>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Cookie
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Termini
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
