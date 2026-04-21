import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ServiceForm } from "@/components/admin/forms/ServiceForm"
import type { ServiceFormData } from "@/lib/admin/validation/service"

export const dynamic = "force-dynamic"

export default function NewServicePage() {
  const defaultValues: ServiceFormData = {
    title: "",
    slug: "",
    short_description: "",
    content: "",
    icon: null,
    featured_image_url: "",
    gallery_images: [],
    features: [],
    cta_text: "Richiedi preventivo",
    cta_url: "/contatti",
    order_index: 0,
    is_featured: false,
    is_published: true,
    seo_title: "",
    seo_description: "",
    og_image_url: "",
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuovo servizio"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Servizi", href: "/admin/services" },
          { label: "Nuovo" },
        ]}
      />
      <ServiceForm mode="create" defaultValues={defaultValues} />
    </div>
  )
}
