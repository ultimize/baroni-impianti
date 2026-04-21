export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elettricistasestrilevante.it"
).replace(/\/+$/, "")

export const SITE_NAME = "Baroni Impianti"

export const SITE_DESCRIPTION =
  "Elettricista impiantista a Sestri Levante. Impianti elettrici civili e industriali, domotica, sicurezza, manutenzioni. Servizio Zero Pensieri."

export const CONTACT_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL ?? "info@elettricistasestrilevante.it"

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/zero-pensieri", label: "Zero Pensieri" },
  { href: "/testimonianze", label: "Testimonianze" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
] as const

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/posts", label: "Articoli", icon: "FileText" },
  { href: "/admin/services", label: "Servizi", icon: "Wrench" },
  { href: "/admin/testimonials", label: "Testimonianze", icon: "Quote" },
  { href: "/admin/certifications", label: "Certificazioni", icon: "Award" },
  { href: "/admin/pages", label: "Pagine", icon: "File" },
  { href: "/admin/contacts", label: "Contatti", icon: "Inbox" },
  { href: "/admin/redirects", label: "Redirect", icon: "ArrowRightLeft" },
  { href: "/admin/settings", label: "Impostazioni", icon: "Settings" },
] as const
