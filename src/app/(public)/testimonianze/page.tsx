import type { Metadata } from "next"
import { Star, ExternalLink, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { TestimonialCard } from "@/components/public/TestimonialCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import { getPublishedTestimonials } from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Testimonianze — I nostri clienti raccontano | Baroni Impianti",
  description:
    "Storie reali di clienti Baroni Impianti nel Tigullio. Scopri le testimonianze video di chi ha scelto la nostra qualità.",
}

const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=1694843707398316530"

export default async function TestimonianzePage() {
  const testimonials = await getPublishedTestimonials()

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
            <Quote className="w-4 h-4 text-brand-400" /> Le parole dei clienti
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            Storie reali, <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-400">voci reali.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
            Da oltre vent'anni costruiamo relazioni che durano nel tempo. Queste sono le voci di chi ha scelto la sicurezza e la qualità di Baroni Impianti.
          </p>
        </div>
      </section>

      <SectionWrapper variant="white" className="py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Le nostre <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">Video Recensioni.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Non ti chiediamo di fidarti solo della nostra parola. Ascolta l'esperienza diretta di chi ha già lavorato con noi nel Tigullio.
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {testimonials.map((t) => (
                <div key={t.id} className="group transition-all duration-300 hover:-translate-y-2">
                  <TestimonialCard
                    youtubeId={t.youtube_video_id ?? undefined}
                    authorName={t.client_name}
                    authorRole={
                      t.location || t.project_title
                        ? [t.project_title, t.location]
                            .filter(Boolean)
                            .join(" · ")
                        : undefined
                    }
                    quote={t.description ?? undefined}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-slate-200 bg-slate-50 p-12 text-center shadow-inner">
              <Quote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Stiamo raccogliendo le prime testimonianze video in alta qualità.<br />
                Se sei un nostro cliente soddisfatto e vuoi raccontare la tua storia, saremo felici di ascoltarti.
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-950 py-24 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 blur-[120px] rounded-[100%] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            Le recensioni Google
          </h2>
          <p className="text-lg text-slate-400 font-light mb-12">
            La trasparenza è tutto. Visita la nostra scheda Google My Business per leggere le valutazioni imparziali di chi ci ha scelto.
          </p>

          <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-10 sm:p-16 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="flex items-center gap-2" aria-label="Valutazione 5 Stelle">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-10 w-10 fill-amber-400 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                  />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white">4.9 / 5.0 Eccellente</h3>
              <p className="text-base text-slate-400 max-w-md">
                Sulla base delle recensioni verificate dei nostri clienti sul territorio ligure.
              </p>
              
              <Button asChild size="lg" className="mt-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full h-14 px-8 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:scale-105">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leggi su Google Maps
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <ClosingCta
        title="Vuoi diventare la prossima storia di successo?"
        lead="Un sopralluogo gratuito è il modo migliore per iniziare a lavorare insieme."
        primaryCta={{ label: "Richiedi sopralluogo", href: "/contatti" }}
        secondaryCta={{
          label: "Scopri Zero Pensieri",
          href: "/zero-pensieri",
        }}
        variant="primary"
      />
    </>
  )
}
