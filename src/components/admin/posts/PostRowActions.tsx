"use client"

import { RowActions } from "@/components/admin/data-table/RowActions"
import {
  deletePost,
  duplicatePost,
} from "@/lib/admin/mutations/posts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
  id: string
  title: string
  publishedHref?: string
}

export function PostRowActions({ id, title, publishedHref }: Props) {
  const router = useRouter()
  return (
    <RowActions
      editHref={`/admin/posts/${id}`}
      viewHref={publishedHref}
      onDuplicate={async () => {
        try {
          const copy = await duplicatePost(id)
          toast.success("Articolo duplicato")
          router.push(`/admin/posts/${copy.id}`)
        } catch (err) {
          toast.error(err instanceof Error ? err.message : "Errore duplicazione")
        }
      }}
      onDelete={() => deletePost(id)}
      deleteTitle="Eliminare l'articolo?"
      deleteDescription={`Stai per eliminare "${title}". L'azione non è reversibile.`}
    />
  )
}
