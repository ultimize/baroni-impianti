"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, Trash2, Copy, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { ImageUploader, type UploadedFile } from "./ImageUploader"
import type { StorageBucketId } from "@/lib/admin/utils/storage"

type StorageEntry = {
  name: string
  path: string
  size: number
  updatedAt: string | null
  publicUrl: string
}

function formatSize(bytes: number) {
  if (!bytes) return "—"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

type Props = {
  bucket: StorageBucketId
  selectable?: boolean
  onSelect?: (file: { url: string; name: string; path: string }) => void
}

export function BucketBrowser({ bucket, selectable, onSelect }: Props) {
  const [files, setFiles] = useState<StorageEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/storage?bucket=${bucket}`, { cache: "no-store" })
      const json = (await res.json()) as { files?: StorageEntry[]; error?: string }
      if (!res.ok) {
        toast.error(json.error ?? "Errore nel caricamento")
        setFiles([])
        return
      }
      setFiles(json.files ?? [])
    } finally {
      setLoading(false)
    }
  }, [bucket])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleUploaded = (file: UploadedFile) => {
    setFiles((prev) => [
      {
        name: file.name,
        path: file.path,
        size: file.size,
        updatedAt: new Date().toISOString(),
        publicUrl: file.publicUrl,
      },
      ...prev,
    ])
  }

  const handleDelete = async (path: string) => {
    const res = await fetch("/api/admin/storage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucket, path }),
    })
    const json = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      toast.error(json.error ?? "Errore nell'eliminazione")
      return
    }
    toast.success("File eliminato")
    setFiles((prev) => prev.filter((f) => f.path !== path))
  }

  const filtered = filter
    ? files.filter((f) => f.name.toLowerCase().includes(filter.toLowerCase()))
    : files

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <ImageUploader bucket={bucket} multiple onUploaded={handleUploaded} />
        <div className="flex items-end gap-2">
          <div className="w-full sm:w-64">
            <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filtra per nome…" />
          </div>
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Aggiorna"}
          </Button>
        </div>
      </div>

      {loading && files.length === 0 ? (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Caricamento…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">
          <ImageIcon className="mb-2 h-8 w-8" />
          Nessun file in questo bucket. Usa l&apos;uploader sopra per caricare.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {filtered.map((f) => {
            const isImage = /\.(jpe?g|png|webp|gif|svg)$/i.test(f.name)
            return (
              <div
                key={f.path}
                className="group relative overflow-hidden rounded-lg border border-border/60 bg-card"
              >
                <div className="relative aspect-square bg-muted">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.publicUrl} alt={f.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                      {f.name.split(".").pop()?.toUpperCase() ?? "FILE"}
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
                    {selectable ? (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => onSelect?.({ url: f.publicUrl, name: f.name, path: f.path })}
                      >
                        Seleziona
                      </Button>
                    ) : null}
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(f.publicUrl)
                          toast.success("URL copiato")
                        }}
                        aria-label="Copia URL"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <ConfirmDialog
                        trigger={
                          <Button type="button" size="icon-sm" variant="destructive" aria-label="Elimina">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        }
                        title="Eliminare il file?"
                        description="Il file verrà rimosso definitivamente dallo storage. Eventuali link in giro nel sito si interromperanno."
                        confirmLabel="Elimina"
                        onConfirm={() => handleDelete(f.path)}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium" title={f.name}>
                    {f.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{formatSize(f.size)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
