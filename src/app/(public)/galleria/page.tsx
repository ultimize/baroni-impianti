import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/public/Container"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ClosingCta } from "@/components/public/ClosingCta"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Galleria Lavori — Baroni Impianti",
  description: "Scopri alcuni dei nostri lavori eseguiti a Sestri Levante e in tutto il Tigullio: impianti civili, industriali, domotica e sicurezza.",
}

const GALLERY_IMAGES = [
  {
    src: "/img/gallery/work-1.jpg",
    alt: "Installazione quadro elettrico industriale",
    category: "Impianti Industriali"
  },
  {
    src: "/img/gallery/work-2.jpg",
    alt: "Impianto domotico KNX in villa privata",
    category: "Domotica"
  },
  {
    src: "/img/gallery/work-3.jpg",
    alt: "Posa cavi di rete strutturata",
    category: "Reti Cablate"
  },
  {
    src: "/img/gallery/work-4.jpg",
    alt: "Installazione telecamere di videosorveglianza",
    category: "Sicurezza"
  },
  {
    src: "/img/gallery/work-5.jpg",
    alt: "Impianto fotovoltaico con accumulo",
    category: "Fotovoltaico"
  },
  {
    src: "/img/gallery/work-6.jpg",
    alt: "Illuminazione di design per esterni",
    category: "Illuminazione"
  }
]

export default function GalleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galleria Lavori"
        title="Alcuni Lavori Eseguiti a Sestri Levante e Tigullio"
        lead="Abbiamo deciso di mostrare a chi non ci conosce una serie di lavori che rispecchiano il nostro metodo e la qualità delle nostre realizzazioni."
        tone="brand"
      />

      <SectionWrapper variant="white">
        <div className="mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((image, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden bg-slate-100 aspect-square shadow-sm">
                <div className="absolute inset-0 bg-brand/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                  <p className="text-sm font-semibold text-brand-400 mb-1">{image.category}</p>
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Fallback info in case images don't load (since they are placeholders) */}
          <div className="mt-12 text-center">
             <p className="text-sm text-muted-foreground italic">
              Nota: Stiamo aggiornando il nostro archivio fotografico con i lavori più recenti.
             </p>
          </div>
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
