"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { moveGalleryItem } from "@/lib/admin/mutations/gallery"

export function GalleryReorderControls({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      try {
        await moveGalleryItem(id, direction)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Errore riordino")
      }
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => move("up")}
        disabled={pending}
        aria-label="Sposta su"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowUp className="h-3.5 w-3.5" />}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => move("down")}
        disabled={pending}
        aria-label="Sposta giù"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
