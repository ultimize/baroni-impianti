"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { certificationFormSchema, type CertificationFormData } from "@/lib/admin/validation/certification"
import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/admin/mutations/certifications"

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
  certificationId?: string
  defaultValues: CertificationFormData
}

export function CertificationForm({ mode, certificationId, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, formState } = form
  const errors = formState.errors

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      if (mode === "create") {
        await createCertification(data)
        toast.success("Certificazione creata")
        router.push("/admin/certifications")
        router.refresh()
      } else if (certificationId) {
        await updateCertification(certificationId, data)
        toast.success("Certificazione salvata")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, notifyFormErrors)

  const handleDelete = async () => {
    if (!certificationId) return
    try {
      await deleteCertification(certificationId)
      toast.success("Certificazione eliminata")
      router.push("/admin/certifications")
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
            <Input {...register("title")} placeholder="es. Certificazione 0011 SGS" />
          </FormField>
          <FormField label="Descrizione" error={errors.description?.message}>
            <Textarea rows={5} {...register("description")} />
          </FormField>
          <FormField label="Immagine" error={errors.image_url?.message}>
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <MediaPicker
                  value={field.value ?? null}
                  onChange={(url) => field.onChange(url ?? "")}
                  defaultBucket="certifications"
                />
              )}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Ente" error={errors.issuer?.message}>
              <Input {...register("issuer")} placeholder="es. CEI, SGS" />
            </FormField>
            <FormField label="Anno rilascio" error={errors.issued_year?.message}>
              <Input type="number" min={1900} {...register("issued_year")} />
            </FormField>
            <FormField label="Valida fino al" error={errors.valid_until?.message}>
              <Input type="date" {...register("valid_until")} />
            </FormField>
          </div>
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

          {mode === "edit" && certificationId ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina certificazione
                    </Button>
                  }
                  title="Eliminare la certificazione?"
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
          <Link href="/admin/certifications">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          {mode === "create" ? "Crea certificazione" : "Salva modifiche"}
        </Button>
      </div>
    </form>
  )
}
