import Link from "next/link"
import { Plus, Award } from "lucide-react"

import { listCertifications } from "@/lib/admin/queries/entities"
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
import { CertificationRowActions } from "@/components/admin/certifications/CertificationRowActions"

export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ q?: string; page?: string }> }

export default async function AdminCertificationsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const { rows, total, pageSize } = await listCertifications({ page, search })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificazioni"
        description={`${total} certificazion${total === 1 ? "e" : "i"}`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Certificazioni" }]}
        actions={
          <Button asChild>
            <Link href="/admin/certifications/new">
              <Plus className="mr-1 h-4 w-4" /> Nuova certificazione
            </Link>
          </Button>
        }
      />

      <SearchInput placeholder="Cerca per titolo…" className="max-w-sm" />

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={Award}
            title="Nessuna certificazione"
            action={
              <Button asChild>
                <Link href="/admin/certifications/new">
                  <Plus className="mr-1 h-4 w-4" /> Nuova certificazione
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
                <TableHead>Ente</TableHead>
                <TableHead>Anno</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link href={`/admin/certifications/${row.id}`} className="font-medium hover:underline">
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{row.issuer ?? "—"}</TableCell>
                  <TableCell className="text-sm">{row.issued_year ?? "—"}</TableCell>
                  <TableCell>
                    <span className="flex flex-wrap gap-1">
                      {row.is_published ? (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          Pubblicata
                        </Badge>
                      ) : (
                        <Badge variant="outline">Bozza</Badge>
                      )}
                      {row.is_featured ? <Badge>In evidenza</Badge> : null}
                    </span>
                  </TableCell>
                  <TableCell>
                    <CertificationRowActions id={row.id} title={row.title} />
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
