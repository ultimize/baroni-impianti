import { Header } from "@/components/public/Header"
import { Footer } from "@/components/public/Footer"
import { CookieBanner } from "@/components/public/CookieBanner"
import { GoogleTagManager } from "@/components/public/GoogleTagManager"
import { MicrosoftClarity } from "@/components/public/MicrosoftClarity"
import { WhatsAppFab } from "@/components/public/WhatsAppFab"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GoogleTagManager />
      <MicrosoftClarity />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </>
  )
}
