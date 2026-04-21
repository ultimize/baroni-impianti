import Link from "next/link"
import { Plus, Wrench } from "lucide-react"

import { listServices } from "@/lib/admin/queries/entities"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SearchInput } from "@/components/admin/shared/SearchInput"
import { PaginationControls } from "@/components/admin/shared/PaginationControls"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { ServiceRowActions } from "@/components/admin/services/ServiceRowActions"
import { formatRelativeFromNow } from "@/lib/admin/utils/format"

export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ q?: string; page?: string }> }

export default async function AdminServicesPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const { rows, total, pageSize } = await listServices({ page, search })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Servizi"
        description={`${total} serviz${total === 1 ? "io" : "i"}`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Servizi" }]}
        actions={
          <Button asChild>
            <Link href="/admin/services/new">
              <Plus className="mr-1 h-4 w-4" /> Nuovo servizio
            </Link>
          </Button>
        }
      />

      <SearchInput placeholder="Cerca per titolo…" className="max-w-sm" />

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="Nessun servizio"
            description="Crea il primo servizio per il sito."
            action={
              <Button asChild>
                <Link href="/admin/services/new">
                  <Plus className="mr-1 h-4 w-4" /> Nuovo servizio
                </Link>
              </Button>
            }
            className="m-4"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titolo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Ordine</TableHead>
                <TableHead>Modificato</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link href={`/admin/services/${row.id}`} className="font-medium hover:underline">
                      {row.title}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">/{row.slug}</p>
                  </TableCell>
                  <TableCell>
                    <span className="flex flex-wrap gap-1">
                      {row.is_published ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          Pubblicato
                        </Badge>
                      ) : (
                        <Badge variant="outline">Bozza</Badge>
                      )}
                      {row.is_featured ? <Badge>In evidenza</Badge> : null}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{row.order_index}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatRelativeFromNow(row.updated_at)}
                  </TableCell>
                  <TableCell>
                    <ServiceRowActions id={row.id} title={row.title} slug={row.slug} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="border-t px-3">
          <PaginationControls total={total} page={page} pageSize={pageSize} />
        </div>
      </div>
    </div>
  )
}
