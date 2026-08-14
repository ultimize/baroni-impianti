"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  galleryFormSchema,
  GALLERY_CATEGORIES,
  type GalleryFormData,
} from "@/lib/admin/validation/gallery"
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/admin/mutations/gallery"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { FormField } from "@/components/admin/shared/FormField"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { MediaPicker } from "@/components/admin/media/MediaPicker"
import { notifyFormErrors } from "@/lib/admin/utils/form-errors"

type Props = {
  mode: "create" | "edit"
  galleryItemId?: string
  defaultValues: GalleryFormData
}

export function GalleryForm({ mode, galleryItemId, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, formState } = form
  const errors = formState.errors

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      if (mode === "create") {
        await createGalleryItem(data)
        toast.success("Foto aggiunta")
        router.push("/admin/gallery")
        router.refresh()
      } else if (galleryItemId) {
        await updateGalleryItem(galleryItemId, data)
        toast.success("Foto salvata")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, notifyFormErrors)

  const handleDelete = async () => {
    if (!galleryItemId) return
    try {
      await deleteGalleryItem(galleryItemId)
      toast.success("Foto eliminata")
      router.push("/admin/gallery")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Immagine" required error={errors.image_url?.message}>
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <MediaPicker
                  value={field.value || null}
                  onChange={(url) => field.onChange(url ?? "")}
                  defaultBucket="gallery"
                />
              )}
            />
          </FormField>

          <FormField label="Titolo" required error={errors.title?.message}>
            <Input {...register("title")} placeholder="es. Quadro elettrico industriale" />
          </FormField>

          <FormField label="Testo alternativo" error={errors.alt_text?.message}>
            <Input {...register("alt_text")} placeholder="Descrizione per accessibilità (default: titolo)" />
          </FormField>

          <FormField label="Descrizione" error={errors.description?.message}>
            <Textarea rows={4} {...register("description")} placeholder="Note interne o didascalia" />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Larghezza (px)" error={errors.width?.message}>
              <Input
                type="number"
                min={1}
                {...register("width", {
                  setValueAs: (v) => (v === "" || v === null ? null : Number(v)),
                })}
              />
            </FormField>
            <FormField label="Altezza (px)" error={errors.height?.message}>
              <Input
                type="number"
                min={1}
                {...register("height", {
                  setValueAs: (v) => (v === "" || v === null ? null : Number(v)),
                })}
              />
            </FormField>
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Classificazione</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Categoria" required error={errors.category?.message}>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                    >
                      {GALLERY_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Visibilità</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Ordine" error={errors.order_index?.message}>
                <Input
                  type="number"
                  min={0}
                  {...register("order_index", { valueAsNumber: true })}
                />
              </FormField>
              <Controller
                control={control}
                name="is_featured"
                render={({ field }) => (
                  <label className="flex items-center justify-between text-sm">
                    <Label className="m-0">In evidenza</Label>
                    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                  </label>
                )}
              />
              <Controller
                control={control}
                name="is_published"
                render={({ field }) => (
                  <label className="flex items-center justify-between text-sm">
                    <Label className="m-0">Pubblicata</Label>
                    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                  </label>
                )}
              />
            </div>
          </section>

          {mode === "edit" && galleryItemId ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina foto
                    </Button>
                  }
                  title="Eliminare la foto?"
                  description="L'azione cancella la riga e il file dal bucket. Non è reversibile."
                  confirmLabel="Elimina"
                  onConfirm={handleDelete}
                />
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <Button asChild type="button" variant="ghost" size="sm">
          <Link href="/admin/gallery">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="mr-1 h-3.5 w-3.5" />
          )}
          {mode === "create" ? "Aggiungi foto" : "Salva modifiche"}
        </Button>
      </div>
    </form>
  )
}
