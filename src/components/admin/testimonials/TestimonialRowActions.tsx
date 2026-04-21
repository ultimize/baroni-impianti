"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import { deleteTestimonial } from "@/lib/admin/mutations/testimonials"

export function TestimonialRowActions({ id, name }: { id: string; name: string }) {
  return (
    <RowActions
      editHref={`/admin/testimonials/${id}`}
      onDelete={() => deleteTestimonial(id)}
      deleteTitle="Eliminare la testimonianza?"
      deleteDescription={`Stai per eliminare la testimonianza di "${name}".`}
    />
  )
}
