"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import { deletePage } from "@/lib/admin/mutations/pages"

type Props = { id: string; title: string; slug: string; isSystem: boolean }

export function PageRowActions({ id, title, slug, isSystem }: Props) {
  return (
    <RowActions
      editHref={`/admin/pages/${id}`}
      viewHref={`/${slug}`}
      onDelete={isSystem ? undefined : () => deletePage(id)}
      deleteTitle="Eliminare la pagina?"
      deleteDescription={`Stai per eliminare "${title}".`}
    />
  )
}
