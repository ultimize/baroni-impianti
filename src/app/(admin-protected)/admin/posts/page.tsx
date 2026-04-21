import Link from "next/link"
import { Plus, FileText } from "lucide-react"

import { listAdminPosts } from "@/lib/admin/queries/posts"
import { Button } from "@/components/ui/button"
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
import { StatusFilter } from "@/components/admin/shared/StatusFilter"
import { StatusBadge } from "@/components/admin/shared/StatusBadge"
import { PaginationControls } from "@/components/admin/shared/PaginationControls"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { PostRowActions } from "@/components/admin/posts/PostRowActions"
import { POST_STATUSES, POST_STATUS_LABELS, type PostStatus } from "@/lib/admin/utils/status"
import { formatRelativeFromNow, formatDate } from "@/lib/admin/utils/format"
import { getUrlDateParts } from "@/lib/content/format-date"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}

export default async function AdminPostsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const status = (params.status as PostStatus | "all" | undefined) ?? undefined

  const { rows, total, pageSize } = await listAdminPosts({
    page,
    pageSize: 25,
    search,
    status: status === "all" ? undefined : status,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Articoli"
        description={`${total} articol${total === 1 ? "o" : "i"} totali`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Articoli" }]}
        actions={
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="mr-1 h-4 w-4" /> Nuovo articolo
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput placeholder="Cerca per titolo…" className="max-w-sm" />
        <StatusFilter
          options={POST_STATUSES.map((s) => ({ value: s, label: POST_STATUS_LABELS[s] }))}
        />
      </div>

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Nessun articolo trovato"
            description="Modifica i filtri o crea un nuovo articolo."
            action={
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-1 h-4 w-4" /> Nuovo articolo
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
                <TableHead>Autore</TableHead>
                <TableHead>Pubblicato il</TableHead>
                <TableHead>Modificato</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const publishedHref =
                  row.status === "published" && row.published_at
                    ? (() => {
                        const d = getUrlDateParts(row.published_at)
                        return `/blog/${d.year}/${d.month}/${d.day}/${row.slug}`
                      })()
                    : undefined
                return (
                  <TableRow key={row.id}>
                    <TableCell className="max-w-md">
                      <Link href={`/admin/posts/${row.id}`} className="font-medium hover:underline">
                        {row.title}
                      </Link>
                      <p className="truncate text-xs text-muted-foreground">/{row.slug}</p>
                    </TableCell>
                    <TableCell>
                      <StatusBadge variant="post" value={row.status} />
                    </TableCell>
                    <TableCell className="text-sm">{row.author?.name ?? "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(row.published_at)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatRelativeFromNow(row.updated_at)}
                    </TableCell>
                    <TableCell>
                      <PostRowActions id={row.id} title={row.title} publishedHref={publishedHref} />
                    </TableCell>
                  </TableRow>
                )
              })}
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
