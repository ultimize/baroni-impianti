import type { Metadata } from "next"
import { Image as ImageIcon } from "lucide-react"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"
import { GalleryLightbox, type GalleryLightboxItem } from "@/components/public/GalleryLightbox"
import { createPublicClient } from "@/lib/supabase/public-client"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Galleria Lavori — Baroni Impianti",
  description: "Scopri alcuni dei nostri lavori eseguiti a Sestri Levante e in tutto il Tigullio: impianti civili, industriali, domotica e sicurezza.",
}

const FALLBACK_IMAGES: GalleryLightboxItem[] = [
  { src: "/img/gallery/work-1.jpg", alt: "Installazione quadro elettrico industriale", width: 1200, height: 900 },
  { src: "/img/gallery/work-2.jpg", alt: "Impianto domotico KNX in villa privata", width: 1200, height: 900 },
  { src: "/img/gallery/work-3.jpg", alt: "Posa cavi di rete strutturata", width: 1200, height: 900 },
  { src: "/img/gallery/work-4.jpg", alt: "Installazione telecamere di videosorveglianza", width: 1200, height: 900 },
  { src: "/img/gallery/work-5.jpg", alt: "Impianto fotovoltaico con accumulo", width: 1200, height: 900 },
  { src: "/img/gallery/work-6.jpg", alt: "Illuminazione di design per esterni", width: 1200, height: 900 },
]

async function fetchGalleryItems(): Promise<GalleryLightboxItem[]> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from("gallery_items")
    .select("title, image_url, alt_text, width, height")
    .eq("is_published", true)
    .order("order_index", { ascending: true })

  if (error || !data || data.length === 0) {
    return []
  }

  return (data as Array<{
    title: string
    image_url: string
    alt_text: string | null
    width: number | null
    height: number | null
  }>).map((row) => ({
    src: row.image_url,
    alt: row.alt_text ?? row.title ?? "",
    width: row.width ?? 1200,
    height: row.height ?? 900,
  }))
}

export default async function GalleriaPage() {
  const items = await fetchGalleryItems()
  const images = items.length > 0 ? items : FALLBACK_IMAGES
  const isFallback = items.length === 0

  return (
    <>
      {/* Custom Premium Hero */}
      <section className="relative overflow-hidden flex flex-col justify-end pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-950 border-b border-slate-800 min-h-[45vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <ImageIcon className="w-4 h-4 text-brand-400" /> Il Nostro Portfolio
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            Lavori eseguiti nel <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-400">Tigullio.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
            Abbiamo deciso di mostrare a chi non ci conosce una serie di lavori che rispecchiano il nostro metodo e la qualità delle nostre realizzazioni a Sestri Levante e dintorni.
          </p>
        </div>
      </section>

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-7xl">
          <GalleryLightbox items={images} />

          {isFallback && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground italic">
                Nota: Stiamo aggiornando il nostro archivio fotografico con i lavori più recenti.
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi essere il prossimo cliente soddisfatto?"
        lead="Il nostro team è pronto a mettere la stessa cura e attenzione nel tuo progetto. Parlaci delle tue idee."
        primaryCta={{ label: "Contattaci ora", href: "/contatti" }}
      />
    </>
  )
}
