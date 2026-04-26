import { PageHeader } from "@/components/admin/shared/PageHeader"
import { GalleryForm } from "@/components/admin/forms/GalleryForm"
import { getMaxGalleryOrderIndex } from "@/lib/admin/queries/entities"
import type { GalleryFormData } from "@/lib/admin/validation/gallery"

export const dynamic = "force-dynamic"

export default async function NewGalleryItemPage() {
  const maxOrder = await getMaxGalleryOrderIndex()
  const defaultValues: GalleryFormData = {
    title: "",
    description: "",
    image_url: "",
    alt_text: "",
    category: "lavori-vari",
    width: null,
    height: null,
    order_index: maxOrder + 10,
    is_featured: false,
    is_published: true,
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Aggiungi foto"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Galleria", href: "/admin/gallery" },
          { label: "Nuova" },
        ]}
      />
      <GalleryForm mode="create" defaultValues={defaultValues} />
    </div>
  )
}
