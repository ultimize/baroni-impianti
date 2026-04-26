"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import { deleteGalleryItem } from "@/lib/admin/mutations/gallery"

export function GalleryRowActions({ id, title }: { id: string; title: string }) {
  return (
    <RowActions
      editHref={`/admin/gallery/${id}`}
      onDelete={() => deleteGalleryItem(id)}
      deleteTitle="Eliminare la foto?"
      deleteDescription={`Stai per eliminare "${title}". Verrà cancellato anche il file dal bucket.`}
    />
  )
}
