"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BucketBrowser } from "@/components/admin/media/BucketBrowser"
import { STORAGE_BUCKETS, type StorageBucketId } from "@/lib/admin/utils/storage"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultBucket?: StorageBucketId
  onPicked: (url: string) => void
}

export function MediaPickerDialog({ open, onOpenChange, defaultBucket = "post-images", onPicked }: Props) {
  const [bucket, setBucket] = useState<StorageBucketId>(defaultBucket)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Inserisci immagine</DialogTitle>
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
              <BucketBrowser bucket={b.id} selectable onSelect={(file) => onPicked(file.url)} />
            </TabsContent>
          ))}
        </Tabs>
        <div className="-mx-4 -mb-4 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">
          <DialogClose render={<Button variant="outline" />}>Chiudi</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
