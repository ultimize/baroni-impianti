"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import { deleteCertification } from "@/lib/admin/mutations/certifications"

export function CertificationRowActions({ id, title }: { id: string; title: string }) {
  return (
    <RowActions
      editHref={`/admin/certifications/${id}`}
      onDelete={() => deleteCertification(id)}
      deleteTitle="Eliminare la certificazione?"
      deleteDescription={`Stai per eliminare "${title}".`}
    />
  )
}
