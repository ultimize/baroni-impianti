"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Check, X, Wand2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/admin/utils/slugify"

type Props = {
  value: string
  onChange: (value: string) => void
  generateFrom?: string
  table: "posts" | "pages" | "services" | "categories" | "tags" | "authors"
  excludeId?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
}

type State = "idle" | "checking" | "available" | "taken" | "error"

export function SlugInput({
  value,
  onChange,
  generateFrom,
  table,
  excludeId,
  disabled,
  invalid,
  className,
}: Props) {
  const [state, setState] = useState<State>("idle")
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!value || invalid) {
      setState("idle")
      return
    }
    setState("checking")
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ table, slug: value })
        if (excludeId) params.set("excludeId", excludeId)
        const res = await fetch(`/api/admin/slug-check?${params.toString()}`, { cache: "no-store" })
        if (!res.ok) {
          setState("error")
          return
        }
        const json = (await res.json()) as { available: boolean }
        setState(json.available ? "available" : "taken")
      } catch {
        setState("error")
      }
    }, 500)
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [value, table, excludeId, invalid])

  const handleGenerate = () => {
    if (!generateFrom) return
    onChange(slugify(generateFrom))
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          disabled={disabled}
          aria-invalid={invalid || state === "taken"}
          className="pr-9"
          placeholder="esempio-slug"
        />
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          {state === "checking" ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
          {state === "available" ? <Check className="h-4 w-4 text-emerald-600" /> : null}
          {state === "taken" || state === "error" ? <X className="h-4 w-4 text-destructive" /> : null}
        </div>
      </div>
      {generateFrom !== undefined ? (
        <Button type="button" variant="outline" size="sm" onClick={handleGenerate} disabled={disabled || !generateFrom}>
          <Wand2 className="mr-1 h-3.5 w-3.5" />
          Genera
        </Button>
      ) : null}
    </div>
  )
}
