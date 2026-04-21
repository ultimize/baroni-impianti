import { PageHeader } from "@/components/admin/shared/PageHeader"
import { CertificationForm } from "@/components/admin/forms/CertificationForm"
import type { CertificationFormData } from "@/lib/admin/validation/certification"

export const dynamic = "force-dynamic"

export default function NewCertificationPage() {
  const defaultValues: CertificationFormData = {
    title: "",
    description: "",
    image_url: "",
    issuer: "",
    issued_year: null,
    valid_until: null,
    order_index: 0,
    is_featured: false,
    is_published: true,
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuova certificazione"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Certificazioni", href: "/admin/certifications" },
          { label: "Nuova" },
        ]}
      />
      <CertificationForm mode="create" defaultValues={defaultValues} />
    </div>
  )
}
