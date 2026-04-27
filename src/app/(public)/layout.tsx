import { Header } from "@/components/public/Header"
import { Footer } from "@/components/public/Footer"
import { CookieBanner } from "@/components/public/CookieBanner"
import { GoogleTagManager } from "@/components/public/GoogleTagManager"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GoogleTagManager />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
