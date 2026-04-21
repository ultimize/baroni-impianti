import {
  FileText,
  Inbox,
  Quote,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { DashboardStats } from "@/lib/admin/queries/dashboard"

type Card = {
  label: string
  value: number
  hint?: string
  icon: LucideIcon
  tone: string
}

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards: Card[] = [
    {
      label: "Articoli pubblicati",
      value: stats.posts.published,
      hint: `${stats.posts.draft} in bozza · ${stats.posts.scheduled} programmati`,
      icon: FileText,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Contatti non letti",
      value: stats.newContacts,
      hint: stats.newContacts > 0 ? "Richiede attenzione" : "Tutto a posto",
      icon: Inbox,
      tone: stats.newContacts > 0 ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Testimonianze",
      value: stats.testimonials,
      hint: "Totale clienti",
      icon: Quote,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      label: "Servizi",
      value: stats.services,
      hint: `${stats.pages} pagine statiche`,
      icon: Wrench,
      tone: "bg-violet-50 text-violet-700",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.label}
            className="rounded-lg border border-border/60 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {c.label}
              </span>
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", c.tone)}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold tabular-nums">{c.value}</div>
            {c.hint ? <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
