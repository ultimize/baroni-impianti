"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Quote,
  Award,
  File,
  Inbox,
  ArrowRightLeft,
  Settings,
  Tag,
  Folder,
  Users,
  ImageIcon,
  Shield,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavLink = {
  href: string
  label: string
  icon: LucideIcon
  adminOnly?: boolean
  badgeKey?: "newContacts"
}

type NavSection = {
  label?: string
  links: NavLink[]
}

const SECTIONS: NavSection[] = [
  {
    links: [{ href: "/admin", label: "Panoramica", icon: LayoutDashboard }],
  },
  {
    label: "Contenuti",
    links: [
      { href: "/admin/posts", label: "Articoli", icon: FileText },
      { href: "/admin/pages", label: "Pagine", icon: File },
      { href: "/admin/services", label: "Servizi", icon: Wrench },
      { href: "/admin/gallery", label: "Galleria", icon: ImageIcon },
    ],
  },
  {
    label: "Relazioni cliente",
    links: [
      { href: "/admin/testimonials", label: "Testimonianze", icon: Quote },
      { href: "/admin/certifications", label: "Certificazioni", icon: Award },
      { href: "/admin/contacts", label: "Contatti", icon: Inbox, badgeKey: "newContacts" },
    ],
  },
  {
    label: "Tassonomie",
    links: [
      { href: "/admin/categories", label: "Categorie", icon: Folder },
      { href: "/admin/tags", label: "Tag", icon: Tag },
      { href: "/admin/authors", label: "Autori", icon: Users },
    ],
  },
  {
    label: "Tecnico",
    links: [
      { href: "/admin/media", label: "Media library", icon: ImageIcon, adminOnly: true },
      { href: "/admin/redirects", label: "Redirect SEO", icon: ArrowRightLeft, adminOnly: true },
      { href: "/admin/privacy", label: "Privacy & Cookie", icon: Shield, adminOnly: true },
      { href: "/admin/settings", label: "Impostazioni", icon: Settings, adminOnly: true },
    ],
  },
]

type Badges = { newContacts?: number }

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SidebarNav({
  role,
  badges,
  onNavigate,
}: {
  role: "admin" | "editor" | "viewer"
  badges?: Badges
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-5 overflow-y-auto p-3">
      {SECTIONS.map((section, idx) => {
        const visible = section.links.filter((l) => !l.adminOnly || role === "admin")
        if (visible.length === 0) return null
        return (
          <div key={idx} className="space-y-1">
            {section.label ? (
              <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section.label}
              </div>
            ) : null}
            {visible.map((link) => {
              const active = isActive(pathname, link.href)
              const Icon = link.icon
              const badge = link.badgeKey ? badges?.[link.badgeKey] : undefined
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{link.label}</span>
                  {badge && badge > 0 ? (
                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  ) : null}
                </Link>
              )
            })}
          </div>
        )
      })}
    </nav>
  )
}
