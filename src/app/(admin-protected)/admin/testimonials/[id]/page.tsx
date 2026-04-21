import { notFound } from "next/navigation"
import { getTestimonialById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm"
import type { TestimonialFormData } from "@/lib/admin/validation/testimonial"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params
  const row = await getTestimonialById(id)
  if (!row) notFound()

  const defaultValues: TestimonialFormData = {
    client_name: row.client_name,
    project_title: row.project_title ?? "",
    description: row.description ?? "",
    location: row.location ?? "",
    youtube_url: row.youtube_url ?? "",
    thumbnail_url: row.thumbnail_url ?? "",
    order_index: row.order_index,
    is_featured: row.is_featured,
    is_published: row.is_published,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={row.client_name}
        description={row.project_title ?? undefined}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Testimonianze", href: "/admin/testimonials" },
          { label: row.client_name },
        ]}
      />
      <TestimonialForm mode="edit" testimonialId={row.id} defaultValues={defaultValues} />
    </div>
  )
}
