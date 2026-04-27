"use client"

import { useActionState } from "react"
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
import {
  updateUserPassword,
  type ResetPasswordState,
} from "@/app/(admin-auth)/admin/login/reset-password/actions"

const initialState: ResetPasswordState | null = null

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    updateUserPassword,
    initialState,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imposta una nuova password</CardTitle>
        <CardDescription>
          Scegli una password di almeno 8 caratteri.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nuova password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={pending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Conferma password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={pending}
            />
          </div>
          {state?.error ? (
            <p className="text-xs text-destructive">{state.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
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
