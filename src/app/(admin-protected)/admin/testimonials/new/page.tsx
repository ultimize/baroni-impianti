import { PageHeader } from "@/components/admin/shared/PageHeader"
import { TestimonialForm } from "@/components/admin/forms/TestimonialForm"
import type { TestimonialFormData } from "@/lib/admin/validation/testimonial"

export const dynamic = "force-dynamic"

export default function NewTestimonialPage() {
  const defaultValues: TestimonialFormData = {
    client_name: "",
    project_title: "",
    description: "",
    location: "",
    youtube_url: "",
    thumbnail_url: "",
    order_index: 0,
    is_featured: false,
    is_published: true,
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuova testimonianza"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Testimonianze", href: "/admin/testimonials" },
          { label: "Nuova" },
        ]}
      />
      <TestimonialForm mode="create" defaultValues={defaultValues} />
    </div>
  )
}
