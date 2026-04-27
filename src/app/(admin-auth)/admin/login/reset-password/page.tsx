import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm"
import { Logo } from "@/components/public/Logo"

export const metadata: Metadata = {
  title: "Reimposta password",
  robots: { index: false, follow: false },
}

export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
