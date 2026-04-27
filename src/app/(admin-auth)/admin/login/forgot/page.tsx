import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm"
import { Logo } from "@/components/public/Logo"

export const metadata: Metadata = {
  title: "Password dimenticata",
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-muted/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
