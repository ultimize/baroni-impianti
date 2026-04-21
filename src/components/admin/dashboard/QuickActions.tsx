import Link from "next/link"
import { FileText, Quote, Inbox, Settings, ArrowUpRight } from "lucide-react"

const ACTIONS = [
  { href: "/admin/posts/new", label: "Nuovo articolo", icon: FileText },
  { href: "/admin/testimonials/new", label: "Nuova testimonianza", icon: Quote },
  { href: "/admin/contacts", label: "Apri inbox contatti", icon: Inbox },
  { href: "/admin/settings", label: "Vai alle impostazioni", icon: Settings },
]

export function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ACTIONS.map((a) => {
        const Icon = a.icon
        return (
          <Link
            key={a.href}
            href={a.href}
            className="group flex items-center justify-between rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{a.label}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </Link>
        )
      })}
    </div>
  )
}
