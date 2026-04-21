"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

import { profileFormSchema, type ProfileFormData } from "@/lib/admin/validation/profile"
import { updateOwnProfile } from "@/lib/admin/mutations/profile"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/admin/shared/FormField"
import { MediaPicker } from "@/components/admin/media/MediaPicker"

type Props = {
  userId: string
  email: string
  defaultValues: ProfileFormData
}

export function ProfileForm({ userId, email, defaultValues }: Props) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      await updateOwnProfile(userId, data)
      toast.success("Profilo aggiornato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Email" description="L'indirizzo email è gestito da Supabase Auth">
            <Input value={email} disabled />
          </FormField>
          <FormField label="Nome completo" required error={form.formState.errors.full_name?.message}>
            <Input {...form.register("full_name")} />
          </FormField>
        </div>
        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Avatar</h3>
            <div className="mt-3">
              <Controller
                control={form.control}
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

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
          Salva modifiche
        </Button>
      </div>
    </form>
  )
}
