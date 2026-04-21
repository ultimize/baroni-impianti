import Link from "next/link"
import { Plus, Quote, Video } from "lucide-react"

import { listTestimonials } from "@/lib/admin/queries/entities"
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
import { TestimonialRowActions } from "@/components/admin/testimonials/TestimonialRowActions"
import { formatRelativeFromNow } from "@/lib/admin/utils/format"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function AdminTestimonialsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined

  const { rows, total, pageSize } = await listTestimonials({ page, pageSize: 25, search })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonianze"
        description={`${total} testimonianz${total === 1 ? "a" : "e"} totali`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Testimonianze" }]}
        actions={
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <Plus className="mr-1 h-4 w-4" /> Nuova testimonianza
            </Link>
          </Button>
        }
      />

      <SearchInput placeholder="Cerca per nome cliente…" className="max-w-sm" />

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={Quote}
            title="Nessuna testimonianza"
            description="Crea la prima testimonianza video da mostrare sul sito."
            action={
              <Button asChild>
                <Link href="/admin/testimonials/new">
                  <Plus className="mr-1 h-4 w-4" /> Nuova testimonianza
                </Link>
              </Button>
            }
            className="m-4"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Progetto</TableHead>
                <TableHead>Località</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Modificata</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link href={`/admin/testimonials/${row.id}`} className="font-medium hover:underline">
                      {row.client_name}
                    </Link>
                    {row.youtube_video_id ? (
                      <Badge variant="outline" className="ml-2 text-[10px]">
                        <Video className="mr-0.5 h-3 w-3" />
                        Video
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-sm">{row.project_title ?? "—"}</TableCell>
                  <TableCell className="text-sm">{row.location ?? "—"}</TableCell>
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
                  <TableCell className="text-sm text-muted-foreground">
                    {formatRelativeFromNow(row.updated_at)}
                  </TableCell>
                  <TableCell>
                    <TestimonialRowActions id={row.id} name={row.client_name} />
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
