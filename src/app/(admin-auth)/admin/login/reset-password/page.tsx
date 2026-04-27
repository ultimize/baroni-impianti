import type { Metadata } from "next"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm"
import { Logo } from "@/components/public/Logo"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Reimposta password",
  robots: { index: false, follow: false },
}

export default async function ResetPasswordPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  const hasRecoverySession = !error && !!data.user

  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        {hasRecoverySession ? (
          <ResetPasswordForm />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Link non valido o scaduto</CardTitle>
              <CardDescription>
                Il link di reimpostazione non è più valido. Richiedine uno
                nuovo per continuare.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/login/forgot">Richiedi un nuovo link</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
