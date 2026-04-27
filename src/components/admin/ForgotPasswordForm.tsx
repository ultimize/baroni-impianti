"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const supabase = createClient()
      const origin = window.location.origin
      const redirectTo = `${origin}/auth/callback?redirectTo=/admin/login/reset-password`
      await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Controlla la tua email</CardTitle>
          <CardDescription>
            Se l&apos;email esiste nel sistema, riceverai un link per
            reimpostare la password. Controlla anche lo spam.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin/login">Torna al login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password dimenticata</CardTitle>
        <CardDescription>
          Inserisci l&apos;email del tuo account. Ti invieremo un link per
          reimpostare la password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…
              </>
            ) : (
              "Invia link di recupero"
            )}
          </Button>
          <div className="text-center text-sm">
            <Link
              href="/admin/login"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Torna al login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
