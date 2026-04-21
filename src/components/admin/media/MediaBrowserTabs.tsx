"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BucketBrowser } from "./BucketBrowser"
import { STORAGE_BUCKETS, type StorageBucketId } from "@/lib/admin/utils/storage"

export function MediaBrowserTabs({ defaultBucket = "post-images" as StorageBucketId }) {
  const [bucket, setBucket] = useState<StorageBucketId>(defaultBucket)
  return (
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
          <BucketBrowser bucket={b.id} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
