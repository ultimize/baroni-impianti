"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Loader2, Pencil, Trash2, Check, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { FormField } from "@/components/admin/shared/FormField"
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/admin/mutations/categories"
import { slugify } from "@/lib/admin/utils/slugify"
import type { AdminCategory } from "@/lib/admin/queries/taxonomies"

type Props = {
  categories: AdminCategory[]
}

export function CategoriesTable({ categories }: Props) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [editName, setEditName] = useState("")
  const [editSlug, setEditSlug] = useState("")

  const startEdit = (cat: AdminCategory) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditSlug(cat.slug)
  }
  const cancelEdit = () => setEditingId(null)

  const saveEdit = async (cat: AdminCategory) => {
    setPending(true)
    try {
      await updateCategory(cat.id, {
        name: editName,
        slug: editSlug,
        description: cat.description,
        parent_id: cat.parent_id,
        order_index: cat.order_index,
      })
      toast.success("Categoria aggiornata")
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
      await deleteCategory(id)
      toast.success("Categoria eliminata")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NewCategoryPopover categories={categories} onCreated={() => router.refresh()} />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Genitore</TableHead>
              <TableHead>Articoli</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => {
              const isEditing = editingId === c.id
              const parent = c.parent_id ? categories.find((p) => p.id === c.parent_id)?.name ?? "—" : "—"
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    {isEditing ? (
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                    ) : (
                      <button
                        type="button"
                        className="text-left font-medium hover:underline"
                        onClick={() => startEdit(c)}
                      >
                        {c.name}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {isEditing ? (
                      <Input value={editSlug} onChange={(e) => setEditSlug(e.target.value.toLowerCase())} />
                    ) : (
                      `/${c.slug}`
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{parent}</TableCell>
                  <TableCell className="text-sm tabular-nums">{c.post_count}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            disabled={pending}
                            onClick={() => saveEdit(c)}
                            aria-label="Salva"
                          >
                            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          </Button>
                          <Button type="button" size="icon-sm" variant="ghost" onClick={cancelEdit} aria-label="Annulla">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => startEdit(c)}
                            aria-label="Modifica"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <ConfirmDialog
                            trigger={
                              <Button type="button" size="icon-sm" variant="ghost" disabled={c.post_count > 0} aria-label="Elimina">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            }
                            title="Eliminare la categoria?"
                            description={`Stai per eliminare "${c.name}". L'azione non è reversibile.`}
                            confirmLabel="Elimina"
                            onConfirm={() => handleDelete(c.id)}
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

function NewCategoryPopover({
  categories,
  onCreated,
}: {
  categories: AdminCategory[]
  onCreated: () => void
}) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [parentId, setParentId] = useState<string>("")

  const handleCreate = async () => {
    if (!name.trim()) return
    setPending(true)
    try {
      await createCategory({
        name,
        slug: slug || slugify(name),
        description,
        parent_id: parentId || null,
        order_index: 0,
      })
      toast.success("Categoria creata")
      setName("")
      setSlug("")
      setDescription("")
      setParentId("")
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
            Nuova categoria
          </Button>
        }
      />
      <PopoverContent side="bottom" align="end" className="w-80">
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
          <FormField label="Descrizione">
            <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormField>
          <FormField label="Categoria genitore">
            <Select value={parentId} onValueChange={(v) => setParentId(v == null || v === "__none" ? "" : String(v))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Nessuna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none">Nessuna</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
