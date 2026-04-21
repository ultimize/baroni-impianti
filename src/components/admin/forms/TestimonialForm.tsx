"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { testimonialFormSchema, type TestimonialFormData } from "@/lib/admin/validation/testimonial"
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/admin/mutations/testimonials"
import { extractYoutubeId } from "@/lib/admin/utils/extract-youtube-id"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { FormField } from "@/components/admin/shared/FormField"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { MediaPicker } from "@/components/admin/media/MediaPicker"

type Props = {
  mode: "create" | "edit"
  testimonialId?: string
  defaultValues: TestimonialFormData
}

export function TestimonialForm({ mode, testimonialId, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, watch, formState } = form
  const errors = formState.errors

  const ytUrl = watch("youtube_url") ?? ""
  const [videoId, setVideoId] = useState<string | null>(extractYoutubeId(ytUrl))
  useEffect(() => {
    setVideoId(extractYoutubeId(ytUrl))
  }, [ytUrl])

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      if (mode === "create") {
        await createTestimonial(data)
        toast.success("Testimonianza creata")
        router.push("/admin/testimonials")
        router.refresh()
      } else if (testimonialId) {
        await updateTestimonial(testimonialId, data)
        toast.success("Testimonianza salvata")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  })

  const handleDelete = async () => {
    if (!testimonialId) return
    try {
      await deleteTestimonial(testimonialId)
      toast.success("Testimonianza eliminata")
      router.push("/admin/testimonials")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Nome cliente" required error={errors.client_name?.message}>
            <Input {...register("client_name")} placeholder="es. Mario Rossi" />
          </FormField>
          <FormField label="Titolo progetto" error={errors.project_title?.message}>
            <Input {...register("project_title")} placeholder="es. Ristrutturazione villa" />
          </FormField>
          <FormField label="Descrizione" error={errors.description?.message}>
            <Textarea rows={5} {...register("description")} placeholder="La testimonianza completa…" />
          </FormField>
          <FormField label="Località" error={errors.location?.message}>
            <Input {...register("location")} placeholder="es. Sestri Levante (GE)" />
          </FormField>
          <FormField label="URL video YouTube" error={errors.youtube_url?.message}>
            <Input {...register("youtube_url")} placeholder="https://youtu.be/…" />
            {videoId ? (
              <div className="mt-3 overflow-hidden rounded-md border">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title="Anteprima video"
                  className="aspect-video w-full"
                  allowFullScreen
                />
              </div>
            ) : null}
          </FormField>
          <FormField label="Thumbnail (opzionale)" error={errors.thumbnail_url?.message}>
            <Controller
              control={control}
              name="thumbnail_url"
              render={({ field }) => (
                <MediaPicker
                  value={field.value ?? null}
                  onChange={(url) => field.onChange(url ?? "")}
                  defaultBucket="testimonial-thumbnails"
                />
              )}
            />
          </FormField>
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

          {mode === "edit" && testimonialId ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina testimonianza
                    </Button>
                  }
                  title="Eliminare la testimonianza?"
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
          <Link href="/admin/testimonials">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          {mode === "create" ? "Crea testimonianza" : "Salva modifiche"}
        </Button>
      </div>
    </form>
  )
}
