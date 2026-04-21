import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginForm } from "@/components/admin/LoginForm"
import { Logo } from "@/components/public/Logo"

export const metadata: Metadata = {
  title: "Login admin",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <Suspense
          fallback={
            <div className="rounded-lg border bg-card p-6 text-center text-sm text-muted-foreground">
              Caricamento…
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
