"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

import { authorFormSchema, type AuthorFormData } from "@/lib/admin/validation/author"
import { updateAuthor } from "@/lib/admin/mutations/authors"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { FormField } from "@/components/admin/shared/FormField"
import { SlugInput } from "@/components/admin/shared/SlugInput"
import { MediaPicker } from "@/components/admin/media/MediaPicker"
import { notifyFormErrors } from "@/lib/admin/utils/form-errors"

type Props = {
  authorId: string
  defaultValues: AuthorFormData
}

export function AuthorForm({ authorId, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<AuthorFormData>({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  })
  const { control, register, handleSubmit, watch, formState } = form
  const errors = formState.errors

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      await updateAuthor(authorId, data)
      toast.success("Autore aggiornato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, notifyFormErrors)

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Nome" required error={errors.name?.message}>
            <Input {...register("name")} />
          </FormField>
          <FormField label="Slug" required error={errors.slug?.message} hint={`/blog/autore/${watch("slug") || "…"}`}>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <SlugInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  generateFrom={watch("name")}
                  table="authors"
                  excludeId={authorId}
                  invalid={!!errors.slug}
                />
              )}
            />
          </FormField>
          <FormField label="Bio" error={errors.bio?.message}>
            <Textarea rows={5} {...register("bio")} />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} />
          </FormField>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Avatar</h3>
            <div className="mt-3">
              <Controller
                control={control}
                name="avatar_url"
                render={({ field }) => (
                  <MediaPicker
                    value={field.value ?? null}
                    onChange={(url) => field.onChange(url ?? "")}
                    defaultBucket="site-assets"
                  />
                )}
              />
            </div>
          </section>
        </aside>
      </div>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <Button asChild type="button" variant="ghost" size="sm">
          <Link href="/admin/authors">Annulla</Link>
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          Salva modifiche
        </Button>
      </div>
    </form>
  )
}
