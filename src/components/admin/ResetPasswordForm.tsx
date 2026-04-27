"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/admin/shared/FormField"
import { createClient } from "@/lib/supabase/client"
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/lib/admin/validation/reset-password"

type SessionState = "checking" | "valid" | "invalid"

export function ResetPasswordForm() {
  const router = useRouter()
  const [sessionState, setSessionState] = useState<SessionState>("checking")
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirm: "" },
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data, error }) => {
      setSessionState(!error && data.user ? "valid" : "invalid")
    })
  }, [])

  const onSubmit = form.handleSubmit(async (data) => {
    setSubmitting(true)
    setServerError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })
      if (error) {
        setServerError(error.message)
        return
      }
      toast.success("Password aggiornata")
      router.push("/admin")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  })

  if (sessionState === "checking") {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          <Loader2 className="mx-auto mb-2 h-4 w-4 animate-spin" />
          Verifica del link in corso…
        </CardContent>
      </Card>
    )
  }

  if (sessionState === "invalid") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Link non valido o scaduto</CardTitle>
          <CardDescription>
            Il link di reimpostazione non è più valido. Richiedine uno nuovo
            per continuare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/admin/login/forgot">Richiedi un nuovo link</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imposta una nuova password</CardTitle>
        <CardDescription>
          Scegli una password di almeno 8 caratteri.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            label="Nuova password"
            htmlFor="password"
            required
            error={form.formState.errors.password?.message}
          >
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              disabled={submitting}
              {...form.register("password")}
            />
          </FormField>
          <FormField
            label="Conferma password"
            htmlFor="confirm"
            required
            error={form.formState.errors.confirm?.message}
          >
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              disabled={submitting}
              {...form.register("confirm")}
            />
          </FormField>
          {serverError ? (
            <p className="text-xs text-destructive">{serverError}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Aggiornamento…
              </>
            ) : (
              "Aggiorna password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
