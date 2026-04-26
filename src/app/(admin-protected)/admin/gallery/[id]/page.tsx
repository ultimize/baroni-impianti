import { notFound } from "next/navigation"
import { getGalleryItemById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { GalleryForm } from "@/components/admin/forms/GalleryForm"
import {
  galleryCategorySchema,
  type GalleryFormData,
} from "@/lib/admin/validation/gallery"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditGalleryItemPage({ params }: Props) {
  const { id } = await params
  const row = await getGalleryItemById(id)
  if (!row) notFound()

  const categoryParse = galleryCategorySchema.safeParse(row.category)
  const category = categoryParse.success ? categoryParse.data : "lavori-vari"

  const defaultValues: GalleryFormData = {
    title: row.title,
    description: row.description ?? "",
    image_url: row.image_url ?? "",
    alt_text: row.alt_text ?? "",
    category,
    width: row.width ?? null,
    height: row.height ?? null,
    order_index: row.order_index,
    is_featured: row.is_featured,
    is_published: row.is_published,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={row.title}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Galleria", href: "/admin/gallery" },
          { label: row.title },
        ]}
      />
      <GalleryForm mode="edit" galleryItemId={row.id} defaultValues={defaultValues} />
    </div>
  )
}
