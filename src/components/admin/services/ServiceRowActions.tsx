"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import { deleteService } from "@/lib/admin/mutations/services"

export function ServiceRowActions({ id, title, slug }: { id: string; title: string; slug: string }) {
  return (
    <RowActions
      editHref={`/admin/services/${id}`}
      viewHref={`/servizi/${slug}`}
      onDelete={() => deleteService(id)}
      deleteTitle="Eliminare il servizio?"
      deleteDescription={`Stai per eliminare "${title}".`}
    />
  )
}
