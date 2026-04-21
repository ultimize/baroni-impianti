"use client"

import { useMemo, useState } from "react"
import { Plus, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createTag } from "@/lib/admin/mutations/tags"
import { slugify } from "@/lib/admin/utils/slugify"

type Tag = { id: string; name: string }

type Props = {
  available: Tag[]
  selected: string[]
  onChange: (next: string[]) => void
  onTagCreated?: (tag: Tag) => void
}

export function TagPicker({ available, selected, onChange, onTagCreated }: Props) {
  const [query, setQuery] = useState("")
  const [creating, setCreating] = useState(false)

  const selectedTags = useMemo(
    () => selected.map((id) => available.find((a) => a.id === id)).filter(Boolean) as Tag[],
    [available, selected],
  )

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return available
      .filter((t) => !selected.includes(t.id) && t.name.toLowerCase().includes(q))
      .slice(0, 6)
  }, [query, available, selected])

  const add = (id: string) => {
    onChange(Array.from(new Set([...selected, id])))
    setQuery("")
  }
  const remove = (id: string) => onChange(selected.filter((s) => s !== id))

  const handleCreate = async () => {
    const name = query.trim()
    if (!name) return
    if (!confirm(`Creare il nuovo tag "${name}"?`)) return
    setCreating(true)
    try {
      const created = await createTag({ name, slug: slugify(name), description: null })
      const tag: Tag = { id: created.id, name }
      onTagCreated?.(tag)
      add(created.id)
      toast.success(`Tag "${name}" creato`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione tag")
    } finally {
      setCreating(false)
    }
  }

  const exists = available.some((t) => t.name.toLowerCase() === query.trim().toLowerCase())

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca o crea un tag…"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              if (suggestions[0]) add(suggestions[0].id)
              else if (!exists && query.trim()) handleCreate()
            }
          }}
        />
        {suggestions.length > 0 ? (
          <ul className="absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-md border bg-popover py-1 shadow-md">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="flex w-full items-center px-3 py-1.5 text-left text-sm hover:bg-accent"
                  onClick={() => add(s.id)}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {query.trim() && !exists ? (
        <Button type="button" variant="outline" size="sm" onClick={handleCreate} disabled={creating}>
          {creating ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Plus className="mr-1 h-3.5 w-3.5" />}
          Crea tag &ldquo;{query.trim()}&rdquo;
        </Button>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {selectedTags.length === 0 ? (
          <p className="text-xs text-muted-foreground">Nessun tag selezionato.</p>
        ) : (
          selectedTags.map((t) => (
            <span
              key={t.id}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {t.name}
              <button
                type="button"
                onClick={() => remove(t.id)}
                aria-label={`Rimuovi ${t.name}`}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  )
}
