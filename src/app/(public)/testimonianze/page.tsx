import type { Metadata } from "next"
import { Star, ExternalLink, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { TestimonialCard } from "@/components/public/TestimonialCard"
import { ClosingCta } from "@/components/public/ClosingCta"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
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
          <BreadcrumbNav
            items={[
              { name: "Home", url: "/" },
              { name: "Testimonianze", url: "/testimonianze" },
            ]}
            tone="light"
            scriptId="breadcrumb-testimonianze-jsonld"
            className="mb-6"
          />
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[120px] rounded-[100%] pointer-events-none" />
        
        <div className="mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.806L1.24 17.35A11.997 11.997 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
              <path fill="#4A90E2" d="M23.636 12.273c0-.79-.08-1.545-.218-2.273H12v4.545h6.526a5.45 5.45 0 01-2.35 3.582l3.793 2.986c2.222-2.045 3.667-5.072 3.667-8.84Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
            </svg>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            La trasparenza <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-serif italic">prima di tutto.</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 font-light mb-12 max-w-2xl mx-auto">
            Visita la nostra scheda Google My Business per leggere le valutazioni imparziali di chi ci ha scelto. Nessun filtro, solo esperienze reali.
          </p>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-2xl mx-auto rounded-[3rem] border border-amber-500/20 bg-slate-900/80 backdrop-blur-xl p-10 sm:p-14 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/40 hover:shadow-[0_0_80px_rgba(245,158,11,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="flex items-center gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-12 w-12 sm:h-14 sm:w-14 fill-amber-400 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] transform transition-transform group-hover:scale-110"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mt-2">4.9 / 5.0 Eccellente</h3>
              <p className="text-lg text-amber-200/80 max-w-md">
                Sulla base delle recensioni verificate dei nostri clienti nel Tigullio.
              </p>
              
              <div className="mt-6 inline-flex items-center text-amber-400 font-semibold group-hover:text-amber-300 transition-colors">
                Leggi tutte le recensioni su Google
                <ExternalLink className="ml-2 h-5 w-5" />
              </div>
            </div>
          </a>
        </div>
      </SectionWrapper>

      {/* Custom Final CTA per la pagina Testimonianze */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-50 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-50 blur-[120px] rounded-full pointer-events-none" />
        </div>
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
          <div className="rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 p-10 sm:p-20 text-center shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Effetti luminosi interni */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-brand-500/20 to-transparent blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-amber-500/20 to-transparent blur-[80px]" />
            
            <Quote className="w-16 h-16 text-white/10 mx-auto mb-8 relative z-10" />
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 relative z-10 leading-[1.1]">
              Vuoi diventare la nostra prossima <br className="hidden lg:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-brand-300">
                storia di successo?
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-12 relative z-10">
              Un sopralluogo gratuito è il modo migliore per conoscerci, capire le tue reali esigenze e spiegarti come lavoriamo. Senza impegno.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 hover:text-slate-950 font-bold text-lg shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] w-full sm:w-auto">
                <a href="/contatti">
                  Richiedi Sopralluogo Gratuito
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-slate-700 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium text-lg backdrop-blur-sm w-full sm:w-auto">
                <a href="/zero-pensieri">
                  Scopri "Zero Pensieri"
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
