"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Loader2, Pencil, Trash2, Check, X, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { FormField } from "@/components/admin/shared/FormField"
import {
  createTag,
  updateTag,
  deleteTag,
  bulkDeleteUnusedTags,
} from "@/lib/admin/mutations/tags"
import { slugify } from "@/lib/admin/utils/slugify"
import type { AdminTag } from "@/lib/admin/queries/taxonomies"

type Props = { tags: AdminTag[] }

export function TagsTable({ tags }: Props) {
  const router = useRouter()
  const [filter, setFilter] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editSlug, setEditSlug] = useState("")
  const [pending, setPending] = useState(false)

  const filtered = useMemo(
    () =>
      filter
        ? tags.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()))
        : tags,
    [filter, tags],
  )
  const unusedCount = tags.filter((t) => t.post_count === 0).length

  const startEdit = (t: AdminTag) => {
    setEditingId(t.id)
    setEditName(t.name)
    setEditSlug(t.slug)
  }
  const cancelEdit = () => setEditingId(null)
  const saveEdit = async (t: AdminTag) => {
    setPending(true)
    try {
      await updateTag(t.id, { name: editName, slug: editSlug, description: t.description })
      toast.success("Tag aggiornato")
      setEditingId(null)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore salvataggio")
    } finally {
      setPending(false)
    }
  }
  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id)
      toast.success("Tag eliminato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  const cleanUnused = async () => {
    try {
      const removed = await bulkDeleteUnusedTags()
      toast.success(`${removed} tag inutilizzati eliminati`)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore pulizia")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtra per nome…"
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {unusedCount > 0 ? (
            <ConfirmDialog
              trigger={
                <Button type="button" variant="outline" size="sm">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  Elimina {unusedCount} inutilizzati
                </Button>
              }
              title="Eliminare i tag inutilizzati?"
              description={`Verranno eliminati ${unusedCount} tag senza articoli collegati.`}
              confirmLabel="Procedi"
              onConfirm={cleanUnused}
            />
          ) : null}
          <NewTagPopover onCreated={() => router.refresh()} />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Articoli</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => {
              const editing = editingId === t.id
              return (
                <TableRow key={t.id}>
                  <TableCell>
                    {editing ? (
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                    ) : (
                      <button
                        type="button"
                        className="text-left font-medium hover:underline"
                        onClick={() => startEdit(t)}
                      >
                        {t.name}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {editing ? (
                      <Input value={editSlug} onChange={(e) => setEditSlug(e.target.value.toLowerCase())} />
                    ) : (
                      `/${t.slug}`
                    )}
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">{t.post_count}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {editing ? (
                        <>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            disabled={pending}
                            onClick={() => saveEdit(t)}
                          >
                            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          </Button>
                          <Button type="button" size="icon-sm" variant="ghost" onClick={cancelEdit}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button type="button" size="icon-sm" variant="ghost" onClick={() => startEdit(t)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <ConfirmDialog
                            trigger={
                              <Button type="button" size="icon-sm" variant="ghost" disabled={t.post_count > 0}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            }
                            title="Eliminare il tag?"
                            description={`Stai per eliminare "${t.name}".`}
                            confirmLabel="Elimina"
                            onConfirm={() => handleDelete(t.id)}
                          />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function NewTagPopover({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  const handleCreate = async () => {
    if (!name.trim()) return
    setPending(true)
    try {
      await createTag({ name, slug: slug || slugify(name), description: null })
      toast.success("Tag creato")
      setName("")
      setSlug("")
      setOpen(false)
      onCreated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione")
    } finally {
      setPending(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button type="button" size="sm">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Nuovo tag
          </Button>
        }
      />
      <PopoverContent side="bottom" align="end" className="w-72">
        <div className="space-y-3">
          <FormField label="Nome" required>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!slug) setSlug(slugify(e.target.value))
              }}
            />
          </FormField>
          <FormField label="Slug" required>
            <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button type="button" size="sm" onClick={handleCreate} disabled={pending || !name.trim()}>
              {pending ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : null}
              Crea
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
