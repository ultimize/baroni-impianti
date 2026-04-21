import type { DashboardStats } from "@/lib/admin/queries/dashboard"
import { Database } from "lucide-react"

export function MigrationStatus({ stats }: { stats: DashboardStats }) {
  const chips = [
    { label: "Articoli", value: stats.posts.total },
    { label: "Autori", value: stats.authorsCount },
    { label: "Categorie", value: stats.categoriesCount },
    { label: "Tag", value: stats.tagsCount },
    { label: "Pagine", value: stats.pages },
    { label: "Servizi", value: stats.services },
    { label: "Testimonianze", value: stats.testimonials },
    { label: "Certificazioni", value: stats.certifications },
  ]

  return (
    <section className="rounded-lg border border-border/60 bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Database className="h-4 w-4 text-emerald-600" />
        <h2 className="font-heading text-sm font-medium">Stato dei contenuti</h2>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Riepilogo dei dati attualmente presenti nel database.
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
          >
            {c.label}
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] tabular-nums text-emerald-700">
              {c.value}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
