import Link from "next/link"
import Image from "next/image"
import { Plus, ImageIcon } from "lucide-react"

import { listGalleryItems } from "@/lib/admin/queries/entities"
import { GALLERY_CATEGORIES } from "@/lib/admin/validation/gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SearchInput } from "@/components/admin/shared/SearchInput"
import { PaginationControls } from "@/components/admin/shared/PaginationControls"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { GalleryRowActions } from "@/components/admin/gallery/GalleryRowActions"
import { GalleryReorderControls } from "@/components/admin/gallery/GalleryReorderControls"
import { GalleryPublishToggle } from "@/components/admin/gallery/GalleryPublishToggle"
import { GalleryCategoryFilter } from "@/components/admin/gallery/GalleryCategoryFilter"

export const dynamic = "force-dynamic"

type Props = { searchParams: Promise<{ q?: string; page?: string; category?: string }> }

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  GALLERY_CATEGORIES.map((c) => [c.value, c.label]),
)

export default async function AdminGalleryPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const category = params.category?.trim() || "all"
  const { rows, total, pageSize } = await listGalleryItems({ page, search, category })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Galleria"
        description={`${total} fot${total === 1 ? "o" : "o"}`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Galleria" }]}
        actions={
          <Button asChild>
            <Link href="/admin/gallery/new">
              <Plus className="mr-1 h-4 w-4" /> Aggiungi foto
            </Link>
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Cerca per titolo…" className="max-w-sm" />
        <GalleryCategoryFilter value={category} />
      </div>

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="Nessuna foto"
            action={
              <Button asChild>
                <Link href="/admin/gallery/new">
                  <Plus className="mr-1 h-4 w-4" /> Aggiungi foto
                </Link>
              </Button>
            }
            className="m-4"
          />
        ) : (
          <ul className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {rows.map((row) => (
              <li
                key={row.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border bg-background"
              >
                <Link
                  href={`/admin/gallery/${row.id}`}
                  className="relative block aspect-square w-full overflow-hidden bg-muted"
                >
                  {row.image_url ? (
                    <Image
                      src={row.image_url}
                      alt={row.alt_text ?? row.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/admin/gallery/${row.id}`}
                      className="line-clamp-2 text-sm font-medium hover:underline"
                    >
                      {row.title}
                    </Link>
                    <GalleryRowActions id={row.id} title={row.title} />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline" className="text-[10px]">
                      {CATEGORY_LABELS[row.category ?? ""] ?? row.category ?? "—"}
                    </Badge>
                    {row.is_featured ? <Badge className="text-[10px]">In evidenza</Badge> : null}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span>#{row.order_index}</span>
                      <GalleryReorderControls id={row.id} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={row.is_published ? "text-emerald-600" : "text-muted-foreground"}>
                        {row.is_published ? "Pubblicata" : "Bozza"}
                      </span>
                      <GalleryPublishToggle id={row.id} isPublished={row.is_published} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t px-3">
          <PaginationControls total={total} page={page} pageSize={pageSize} />
        </div>
      </div>
    </div>
  )
}
