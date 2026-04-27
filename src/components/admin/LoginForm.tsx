"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
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

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/admin"
  const errorParam = searchParams.get("error")
  const errorReason = searchParams.get("reason")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (errorParam === "auth_failed") {
      toast.error(
        errorReason
          ? `Autenticazione fallita: ${errorReason}`
          : "Autenticazione fallita. Riprova.",
      )
    } else if (errorParam === "forbidden") {
      toast.error("Il tuo account non ha i permessi per accedere all'area admin.")
    }
  }, [errorParam, errorReason])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error(error.message)
        return
      }
      toast.success("Accesso effettuato")
      router.push(redirectTo)
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accedi all&apos;area amministrativa</CardTitle>
        <CardDescription>
          Inserisci le credenziali fornite dall&apos;amministratore del sito.
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accesso…
              </>
            ) : (
              "Accedi"
            )}
          </Button>
          <div className="text-center text-sm">
            <Link
              href="/admin/login/forgot"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Hai dimenticato la password?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
