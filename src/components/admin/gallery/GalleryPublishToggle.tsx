"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { toggleGalleryItemPublished } from "@/lib/admin/mutations/gallery"

type Props = {
  id: string
  isPublished: boolean
}

export function GalleryPublishToggle({ id, isPublished }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const handleChange = (next: boolean) => {
    startTransition(async () => {
      try {
        await toggleGalleryItemPublished(id, next)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Errore aggiornamento")
      }
    })
  }

  return (
    <Switch
      checked={isPublished}
      disabled={pending}
      onCheckedChange={handleChange}
      aria-label="Pubblicata"
    />
  )
}
