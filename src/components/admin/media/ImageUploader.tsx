"use client"

import { useRef, useState } from "react"
import { UploadCloud, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { StorageBucketId } from "@/lib/admin/utils/storage"

export type UploadedFile = {
  path: string
  publicUrl: string
  bucket: string
  name: string
  size: number
  contentType: string
}

type Props = {
  bucket: StorageBucketId
  onUploaded?: (file: UploadedFile) => void
  multiple?: boolean
  className?: string
  compact?: boolean
}

export function ImageUploader({ bucket, onUploaded, multiple, className, compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setPending(true)
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("bucket", bucket)
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
        const json = (await res.json()) as { error?: string } & UploadedFile
        if (!res.ok) {
          toast.error(`Upload fallito: ${json.error ?? "errore sconosciuto"}`)
          continue
        }
        toast.success(`Caricato: ${file.name}`)
        onUploaded?.(json)
      }
    } finally {
      setPending(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  if (compact) {
    return (
      <div className={className}>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={pending}>
          {pending ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <UploadCloud className="mr-1 h-3.5 w-3.5" />}
          Carica
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        dragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30"
      } ${className ?? ""}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragActive(true)
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragActive(false)
        upload(e.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />
      <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium">Trascina file qui o</p>
      <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => inputRef.current?.click()} disabled={pending}>
        {pending ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : null}
        Sfoglia file
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">Max 10 MB. JPG, PNG, WebP, GIF, SVG, PDF.</p>
    </div>
  )
}
