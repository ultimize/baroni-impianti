import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "@/components/ui/sonner"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"
import { getSettingValue } from "@/lib/queries/site-content"
import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const [googleVerification, bingVerification] = await Promise.all([
    getSettingValue<string>("seo_google_site_verification"),
    getSettingValue<string>("seo_bing_site_verification"),
  ])

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    // Rende il feed RSS auto-rilevabile: <link rel="alternate" type="application/rss+xml">
    alternates: {
      types: {
        "application/rss+xml": [
          { url: `${SITE_URL}/feed.xml`, title: `${SITE_NAME} — Blog` },
        ],
      },
    },
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    verification: {
      google: googleVerification || undefined,
      other: {
        ...(bingVerification ? { "msvalidate.01": bingVerification } : {}),
      },
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased overflow-x-hidden max-w-[100vw]`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden max-w-[100vw]">
        <div className="flex-1 flex flex-col w-full max-w-[100vw] overflow-x-hidden relative">
          {children}
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
