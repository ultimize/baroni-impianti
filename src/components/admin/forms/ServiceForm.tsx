"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Trash2, Plus, GripVertical, ArrowDown, ArrowUp } from "lucide-react"
import { toast } from "sonner"

import { serviceFormSchema, type ServiceFormData } from "@/lib/admin/validation/service"
import { createService, updateService, deleteService } from "@/lib/admin/mutations/services"
import { slugify } from "@/lib/admin/utils/slugify"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FormField } from "@/components/admin/shared/FormField"
import { SlugInput } from "@/components/admin/shared/SlugInput"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { MediaPicker } from "@/components/admin/media/MediaPicker"
import { RichTextEditor } from "@/components/admin/editor/RichTextEditor"
import { notifyFormErrors } from "@/lib/admin/utils/form-errors"

const ICON_OPTIONS = [
  "Zap",
  "ShieldCheck",
  "Home",
  "Wrench",
  "Sun",
  "Lightbulb",
  "Plug",
  "Cable",
  "Building2",
  "Sparkles",
  "Settings",
  "Activity",
]

type Props = {
  mode: "create" | "edit"
  serviceId?: string
  defaultValues: ServiceFormData
}

export function ServiceForm({ mode, serviceId, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, watch, setValue, formState } = form
  const errors = formState.errors

  const featuresArray = useFieldArray({ control, name: "features" })
  const galleryArray = useFieldArray({ control, name: "gallery_images" })

  const watchedTitle = watch("title")
  const watchedSlug = watch("slug")

  useEffect(() => {
    if (mode === "create" && !watchedSlug && watchedTitle) {
      setValue("slug", slugify(watchedTitle), { shouldDirty: true })
    }
  }, [watchedTitle, watchedSlug, mode, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      if (mode === "create") {
        const created = await createService(data)
        toast.success("Servizio creato")
        router.push(`/admin/services/${created.id}`)
        router.refresh()
      } else if (serviceId) {
        await updateService(serviceId, data)
        toast.success("Servizio salvato")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, notifyFormErrors)

  const handleDelete = async () => {
    if (!serviceId) return
    try {
      await deleteService(serviceId)
      toast.success("Servizio eliminato")
      router.push("/admin/services")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Titolo" required error={errors.title?.message}>
            <Input {...register("title")} className="h-11 text-lg" />
          </FormField>
          <FormField label="Slug" required error={errors.slug?.message} hint={`/servizi/${watchedSlug || "…"}`}>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <SlugInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  generateFrom={watchedTitle}
                  table="services"
                  excludeId={serviceId}
                  invalid={!!errors.slug}
                />
              )}
            />
          </FormField>
          <FormField label="Descrizione breve" error={errors.short_description?.message}>
            <Textarea rows={2} {...register("short_description")} />
          </FormField>
          <FormField label="Contenuto pagina">
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor value={field.value ?? ""} onChange={field.onChange} bucket="service-images" />
              )}
            />
          </FormField>

          <section className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-medium">Punti di forza (features)</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => featuresArray.append({ title: "", description: "" })}
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Aggiungi
              </Button>
            </div>
            <div className="mt-3 space-y-3">
              {featuresArray.fields.length === 0 ? (
                <p className="text-xs text-muted-foreground">Nessun punto di forza.</p>
              ) : (
                featuresArray.fields.map((field, idx) => (
                  <div key={field.id} className="grid gap-2 rounded-md border p-3 sm:grid-cols-[auto_1fr_2fr_auto]">
                    <span className="hidden items-center text-muted-foreground sm:flex">
                      <GripVertical className="h-4 w-4" />
                    </span>
                    <Input placeholder="Titolo" {...register(`features.${idx}.title`)} />
                    <Input placeholder="Descrizione" {...register(`features.${idx}.description`)} />
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => featuresArray.remove(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-medium">Galleria immagini</h3>
              <Controller
                control={control}
                name="gallery_images"
                render={({ field }) => (
                  <MediaPicker
                    value={null}
                    onChange={(url) => {
                      if (!url) return
                      const next = [...(field.value ?? []), { url, alt: "" }]
                      field.onChange(next)
                    }}
                    triggerLabel="Aggiungi immagine"
                    showPreview={false}
                    defaultBucket="service-images"
                  />
                )}
              />
            </div>
            <div className="mt-3 grid gap-2">
              {galleryArray.fields.length === 0 ? (
                <p className="text-xs text-muted-foreground">Nessuna immagine.</p>
              ) : (
                galleryArray.fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-3 rounded-md border p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={watch(`gallery_images.${idx}.url`)}
                      alt=""
                      className="h-12 w-16 rounded object-cover"
                    />
                    <Input
                      placeholder="Testo alternativo"
                      className="flex-1"
                      {...register(`gallery_images.${idx}.alt`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={idx === 0}
                      onClick={() => galleryArray.move(idx, idx - 1)}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={idx === galleryArray.fields.length - 1}
                      onClick={() => galleryArray.move(idx, idx + 1)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon-sm" onClick={() => galleryArray.remove(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">SEO &amp; meta tag</h3>
            <div className="mt-3 space-y-3">
              <FormField label="SEO title" error={errors.seo_title?.message} hint="Max 70 caratteri">
                <Input {...register("seo_title")} />
              </FormField>
              <FormField label="SEO description" error={errors.seo_description?.message} hint="Max 170 caratteri">
                <Textarea rows={2} {...register("seo_description")} />
              </FormField>
              <FormField label="OG image" error={errors.og_image_url?.message}>
                <Controller
                  control={control}
                  name="og_image_url"
                  render={({ field }) => (
                    <MediaPicker
                      value={field.value ?? null}
                      onChange={(url) => field.onChange(url ?? "")}
                      defaultBucket="service-images"
                    />
                  )}
                />
              </FormField>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Visibilità</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Ordine" error={errors.order_index?.message}>
                <Input type="number" min={0} {...register("order_index", { valueAsNumber: true })} />
              </FormField>
              <Controller
                control={control}
                name="is_featured"
                render={({ field }) => (
                  <label className="flex items-center justify-between text-sm">
                    <Label className="m-0">Servizio principale (home)</Label>
                    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                  </label>
                )}
              />
              <Controller
                control={control}
                name="is_published"
                render={({ field }) => (
                  <label className="flex items-center justify-between text-sm">
                    <Label className="m-0">Pubblicato</Label>
                    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                  </label>
                )}
              />
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Aspetto</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Icona">
                <Controller
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v || null)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Nessuna" />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
              <FormField label="Immagine in evidenza" error={errors.featured_image_url?.message}>
                <Controller
                  control={control}
                  name="featured_image_url"
                  render={({ field }) => (
                    <MediaPicker
                      value={field.value ?? null}
                      onChange={(url) => field.onChange(url ?? "")}
                      defaultBucket="service-images"
                    />
                  )}
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Call to action</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Testo CTA">
                <Input {...register("cta_text")} placeholder="Richiedi preventivo" />
              </FormField>
              <FormField label="URL CTA">
                <Input {...register("cta_url")} placeholder="/contatti" />
              </FormField>
            </div>
          </section>

          {mode === "edit" && serviceId ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina servizio
                    </Button>
                  }
                  title="Eliminare il servizio?"
                  description="L'azione non è reversibile."
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
          <Link href="/admin/services">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          {mode === "create" ? "Crea servizio" : "Salva modifiche"}
        </Button>
      </div>
    </form>
  )
}
