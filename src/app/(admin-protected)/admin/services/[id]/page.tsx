import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ServiceForm } from "@/components/admin/forms/ServiceForm"
import type { ServiceFormData, ServiceFeature, ServiceGalleryImage } from "@/lib/admin/validation/service"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

function isFeatureArray(v: unknown): v is ServiceFeature[] {
  return Array.isArray(v) && v.every((x) => typeof x === "object" && x !== null && "title" in (x as object))
}
function isGalleryArray(v: unknown): v is ServiceGalleryImage[] {
  return Array.isArray(v) && v.every((x) => typeof x === "object" && x !== null && "url" in (x as object))
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const row = await getServiceById(id)
  if (!row) notFound()

  const defaultValues: ServiceFormData = {
    title: row.title,
    slug: row.slug,
    short_description: row.short_description ?? "",
    content: row.content ?? "",
    icon: row.icon ?? null,
    featured_image_url: row.featured_image_url ?? "",
    gallery_images: isGalleryArray(row.gallery_images) ? row.gallery_images : [],
    features: isFeatureArray(row.features) ? row.features : [],
    cta_text: row.cta_text ?? "Richiedi preventivo",
    cta_url: row.cta_url ?? "/contatti",
    order_index: row.order_index,
    is_featured: row.is_featured,
    is_published: row.is_published,
    seo_title: row.seo_title ?? "",
    seo_description: row.seo_description ?? "",
    og_image_url: row.og_image_url ?? "",
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={row.title}
        description={`Slug: /servizi/${row.slug}`}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Servizi", href: "/admin/services" },
          { label: row.title },
        ]}
      />
      <ServiceForm mode="edit" serviceId={row.id} defaultValues={defaultValues} />
    </div>
  )
}
