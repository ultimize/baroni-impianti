import { listRedirects } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SearchInput } from "@/components/admin/shared/SearchInput"
import { PaginationControls } from "@/components/admin/shared/PaginationControls"
import { RedirectsTable } from "@/components/admin/redirects/RedirectsTable"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { ArrowRightLeft } from "lucide-react"

export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ q?: string; page?: string }> }

export default async function AdminRedirectsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const { rows, total, pageSize } = await listRedirects({ page, search, pageSize: 50 })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Redirect SEO"
        description={`${total} redirect attivi. Gestisci reindirizzamenti dalle vecchie URL.`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Redirect" }]}
      />

      <SearchInput placeholder="Filtra per path…" className="max-w-sm" />

      {rows.length === 0 && !search ? (
        <EmptyState
          icon={ArrowRightLeft}
          title="Nessun redirect"
          description="Crea il primo reindirizzamento usando il bottone in alto a destra della tabella."
        />
      ) : (
        <RedirectsTable rows={rows} />
      )}

      <PaginationControls total={total} page={page} pageSize={pageSize} />
    </div>
  )
}
