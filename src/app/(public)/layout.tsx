import { Header } from "@/components/public/Header"
import { Footer } from "@/components/public/Footer"
import { CookieBanner } from "@/components/public/CookieBanner"
import { GoogleAnalytics } from "@/components/public/GoogleAnalytics"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
      <GoogleAnalytics />
    </>
  )
}
