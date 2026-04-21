"use client"

import { useState } from "react"
import { ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { BucketBrowser } from "./BucketBrowser"
import { STORAGE_BUCKETS, type StorageBucketId } from "@/lib/admin/utils/storage"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type MediaPickerProps = {
  value?: string | null
  onChange: (url: string | null) => void
  defaultBucket?: StorageBucketId
  triggerLabel?: string
  showPreview?: boolean
  withRemove?: boolean
}

export function MediaPicker({
  value,
  onChange,
  defaultBucket = "post-images",
  triggerLabel = "Scegli immagine",
  showPreview = true,
  withRemove = true,
}: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [bucket, setBucket] = useState<StorageBucketId>(defaultBucket)

  const handleSelect = (file: { url: string }) => {
    onChange(file.url)
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      {showPreview && value ? (
        <div className="relative inline-block overflow-hidden rounded-md border bg-muted">
          {/^(https?:)?\/\//.test(value) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-32 w-auto object-contain" />
          ) : (
            <div className="p-3 text-xs text-muted-foreground">{value}</div>
          )}
          {withRemove ? (
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="absolute top-1 right-1"
              onClick={() => onChange(null)}
              aria-label="Rimuovi"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          ) : null}
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="mr-1 h-3.5 w-3.5" />
              {value ? "Cambia immagine" : triggerLabel}
            </Button>
          }
        />
        <DialogContent
          className="sm:max-w-4xl"
          showCloseButton={false}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle>Media library</DialogTitle>
          </DialogHeader>

          <Tabs value={bucket} onValueChange={(v) => setBucket(v as StorageBucketId)}>
            <TabsList variant="line">
              {STORAGE_BUCKETS.map((b) => (
                <TabsTrigger key={b.id} value={b.id}>
                  {b.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {STORAGE_BUCKETS.map((b) => (
              <TabsContent key={b.id} value={b.id}>
                <BucketBrowser bucket={b.id} selectable onSelect={handleSelect} />
              </TabsContent>
            ))}
          </Tabs>

          <div className="-mx-4 -mb-4 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">
            <DialogClose render={<Button variant="outline" />}>Chiudi</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
