import Link from "next/link"
import { Plus, File, Lock } from "lucide-react"

import { listPages } from "@/lib/admin/queries/entities"
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
import { PageRowActions } from "@/components/admin/pages/PageRowActions"

export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ q?: string; page?: string }> }

export default async function AdminPagesPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const { rows, total, pageSize } = await listPages({ page, search })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pagine"
        description={`${total} pagin${total === 1 ? "a" : "e"} totali`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Pagine" }]}
        actions={
          <Button asChild>
            <Link href="/admin/pages/new">
              <Plus className="mr-1 h-4 w-4" /> Nuova pagina
            </Link>
          </Button>
        }
      />

      <SearchInput placeholder="Cerca per titolo…" className="max-w-sm" />

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={File}
            title="Nessuna pagina"
            action={
              <Button asChild>
                <Link href="/admin/pages/new">
                  <Plus className="mr-1 h-4 w-4" /> Nuova pagina
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
                <TableHead>Template</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/pages/${row.id}`} className="font-medium hover:underline">
                        {row.title}
                      </Link>
                      {row.is_system ? (
                        <Badge variant="outline" className="text-[10px]">
                          <Lock className="mr-0.5 h-3 w-3" />
                          Sistema
                        </Badge>
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">/{row.slug}</p>
                  </TableCell>
                  <TableCell className="text-sm">{row.template ?? "default"}</TableCell>
                  <TableCell>
                    {row.is_published ? (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        Pubblicata
                      </Badge>
                    ) : (
                      <Badge variant="outline">Bozza</Badge>
                    )}
                    {row.noindex ? (
                      <Badge variant="outline" className="ml-1 text-[10px]">
                        noindex
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <PageRowActions
                      id={row.id}
                      title={row.title}
                      slug={row.slug}
                      isSystem={row.is_system}
                    />
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
