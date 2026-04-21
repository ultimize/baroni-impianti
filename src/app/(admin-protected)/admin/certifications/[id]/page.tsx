import { notFound } from "next/navigation"
import { getCertificationById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { CertificationForm } from "@/components/admin/forms/CertificationForm"
import type { CertificationFormData } from "@/lib/admin/validation/certification"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditCertificationPage({ params }: Props) {
  const { id } = await params
  const row = await getCertificationById(id)
  if (!row) notFound()

  const defaultValues: CertificationFormData = {
    title: row.title,
    description: row.description ?? "",
    image_url: row.image_url ?? "",
    issuer: row.issuer ?? "",
    issued_year: row.issued_year,
    valid_until: row.valid_until,
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
          { label: "Certificazioni", href: "/admin/certifications" },
          { label: row.title },
        ]}
      />
      <CertificationForm mode="edit" certificationId={row.id} defaultValues={defaultValues} />
    </div>
  )
}
