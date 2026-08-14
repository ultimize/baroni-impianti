"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Trash2, ShieldAlert } from "lucide-react"
import { toast } from "sonner"

import { pageFormSchema, type PageFormData } from "@/lib/admin/validation/page"
import { createPage, updatePage, deletePage } from "@/lib/admin/mutations/pages"
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

type Props = {
  mode: "create" | "edit"
  pageId?: string
  isSystem?: boolean
  defaultValues: PageFormData
}

export function PageForm({ mode, pageId, isSystem, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<PageFormData>({
    resolver: zodResolver(pageFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, watch, setValue, formState } = form
  const errors = formState.errors

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
        const created = await createPage(data)
        toast.success("Pagina creata")
        router.push(`/admin/pages/${created.id}`)
        router.refresh()
      } else if (pageId) {
        await updatePage(pageId, data, !isSystem)
        toast.success("Pagina salvata")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, notifyFormErrors)

  const handleDelete = async () => {
    if (!pageId) return
    try {
      await deletePage(pageId)
      toast.success("Pagina eliminata")
      router.push("/admin/pages")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          {isSystem ? (
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              <ShieldAlert className="mt-0.5 h-4 w-4" />
              <p>
                Questa è una pagina di sistema. Lo slug è bloccato per evitare di rompere link interni e SEO.
              </p>
            </div>
          ) : null}
          <FormField label="Titolo" required error={errors.title?.message}>
            <Input {...register("title")} className="h-11 text-lg" />
          </FormField>
          <FormField label="Slug" required error={errors.slug?.message} hint={`/${watchedSlug || "…"}`}>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <SlugInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  generateFrom={watchedTitle}
                  table="pages"
                  excludeId={pageId}
                  invalid={!!errors.slug}
                  disabled={!!isSystem}
                />
              )}
            />
          </FormField>
          <FormField label="Contenuto">
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor value={field.value ?? ""} onChange={field.onChange} bucket="site-assets" />
              )}
            />
          </FormField>
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
                      defaultBucket="site-assets"
                    />
                  )}
                />
              </FormField>
              <Controller
                control={control}
                name="noindex"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                    Escludi dai motori di ricerca (noindex)
                  </label>
                )}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Pubblicazione</h3>
            <div className="mt-3 space-y-3">
              <FormField label="Template">
                <Controller
                  control={control}
                  name="template"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as PageFormData["template"])}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="landing">Landing</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
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

          {mode === "edit" && pageId && !isSystem ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina pagina
                    </Button>
                  }
                  title="Eliminare la pagina?"
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
          <Link href="/admin/pages">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          {mode === "create" ? "Crea pagina" : "Salva modifiche"}
        </Button>
      </div>
    </form>
  )
}
