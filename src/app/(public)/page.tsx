import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  Shield,
  Home,
  Sun,
  Video,
  BookOpen,
  FileCheck,
  Heart,
  Bell,
  Battery,
  Flame,
} from "lucide-react"
import { PostsGrid } from "@/components/public/PostsGrid"
import { createClient } from "@/lib/supabase/server"
import { getRecentPosts } from "@/lib/queries/posts"
import { organizationSchema, websiteSchema, renderJsonLd } from "@/lib/seo/json-ld"

export const revalidate = 3600

const SERVICES = [
  {
    icon: Zap,
    title: "Impianti elettrici civili e industriali",
    description: "Progettiamo e realizziamo impianti a norma CEI, dalla prima accensione alle certificazioni finali.",
    href: "/servizi/impianti-cablati",
  },
  {
    icon: Home,
    title: "Domotica KNX",
    description: "Automazioni intelligenti per controllare luci, clima e accessi, aumentando comfort e risparmio.",
    href: "/servizi/impianti-digitali-integrati",
  },
  {
    icon: Sun,
    title: "Fotovoltaico e accumulo",
    description: "Impianti solari chiavi in mano con sistemi di accumulo per l'indipendenza energetica.",
    href: "/servizi/impianti-fotovoltaici",
  },
  {
    icon: Video,
    title: "Sistemi di Sicurezza",
    description: "Antifurto, videosorveglianza e antincendio per proteggere i tuoi spazi 24/7.",
    href: "/servizi/impianti-sicurezza",
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const posts = await getRecentPosts(supabase, 3)

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd([organizationSchema(), websiteSchema()]),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-50/40 pt-20 lg:pt-32 pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - lg:col-span-7 */}
            <div className="lg:col-span-7 flex flex-col items-start animate-fade-in">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Disponibili per nuovi progetti
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
                Impianti elettrici <br className="hidden lg:block" />
                <span className="text-brand">fatti come si deve.</span>
              </h1>
              
              <p className="mt-6 text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed">
                Da Sestri Levante al Tigullio: civili, industriali, fotovoltaico, domotica. 
                Lavoriamo a norma, garantiamo nel tempo, e con Zero Pensieri ci occupiamo di tutto noi.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center bg-brand hover:bg-brand-700 text-white font-medium px-6 h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Richiedi sopralluogo gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/zero-pensieri"
                  className="inline-flex items-center justify-center border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-brand/40 font-medium px-6 h-12 rounded-xl transition-all"
                >
                  Scopri Zero Pensieri
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-brand" />
                  <span>20+ anni di esperienza</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Lavori a norma CEI 64-8</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span>Sestri Levante e Tigullio</span>
                </div>
              </div>
            </div>

            {/* Right Column - lg:col-span-5 */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 animate-slide-up">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100/60 ring-1 ring-brand/10 p-8 lg:p-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_theme(colors.brand.200)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-30 pointer-events-none" />
                
                <Image 
                  src="/logo.png" 
                  alt="Baroni Impianti Logo" 
                  width={400} 
                  height={400} 
                  className="relative z-10 w-full h-auto max-w-sm mx-auto drop-shadow-sm"
                  priority
                />

                {/* Floating Badges */}
                <div className="absolute -top-3 -right-3 lg:top-4 lg:right-4 z-20 inline-flex items-center gap-1.5 bg-white shadow-sm border border-slate-200 rounded-full px-3 py-2 text-xs font-medium text-slate-700">
                  <Zap className="h-3.5 w-3.5 text-brand-600" />
                  <span>KNX Partner certificato</span>
                </div>
                
                <div className="absolute bottom-6 left-6 z-20 bg-white shadow-sm border border-slate-200 rounded-full px-3 py-2 text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  5/5 su Google
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Section */}
      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-16 items-end">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-brand">
                Cosa facciamo
              </span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Cinque competenze, un solo elettricista
              </h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Soluzioni integrate per la casa e l'azienda. Copriamo ogni aspetto dell'impiantistica 
              con un unico standard di qualità artigianale e rispetto delle normative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Zero Pensieri Premium Card */}
            <div className="group relative flex flex-col justify-between bg-gradient-to-br from-brand to-brand-800 text-white rounded-2xl p-6 lg:p-8 ring-1 ring-brand-700 shadow-sm overflow-hidden lg:col-span-1">
              <div className="relative z-10">
                <span className="inline-block text-xs font-medium tracking-widest uppercase text-brand-100 mb-4">
                  Servizio esclusivo
                </span>
                <Shield className="h-9 w-9 text-white mb-4" />
                <h3 className="text-xl font-semibold mb-2">Zero Pensieri</h3>
                <p className="text-brand-100 text-sm leading-relaxed mb-6">
                  Il nostro contratto di manutenzione programmata. Una quota annuale per un impianto 
                  sempre in perfetta efficienza, con verifiche incluse.
                </p>
              </div>
              <Link
                href="/zero-pensieri"
                className="relative z-10 inline-flex items-center font-medium text-white group-hover:text-brand-50 transition-colors"
              >
                Scopri di più <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Other Services Cards */}
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-brand/40 hover:bg-slate-50/50 hover:shadow-sm"
              >
                <div>
                  <div className="inline-flex items-center justify-center bg-brand/10 text-brand rounded-xl p-3 mb-5">
                    <s.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <Link
                  href={s.href}
                  className="mt-6 inline-flex items-center text-sm font-medium text-brand group-hover:text-brand-600 transition-colors"
                >
                  Scopri di più <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perché Baroni / Differenziatori */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium tracking-widest uppercase text-brand">
              Perché ci scelgono
            </span>
            <h2 className="mt-2 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
              Non solo impianti elettrici. <br />Standard di lavoro.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Tre cose ci differenziano da chi "fa l'elettricista".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 lg:p-8 transition-all hover:border-brand/40 hover:bg-slate-50/50">
              <div className="inline-flex items-center justify-center bg-brand/10 text-brand rounded-xl p-3 mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Formazione continua</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Aggiornamenti normativi, corsi KNX, certificazioni del personale tecnico. Ogni anno, senza eccezioni.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 lg:p-8 transition-all hover:border-brand/40 hover:bg-slate-50/50">
              <div className="inline-flex items-center justify-center bg-brand/10 text-brand rounded-xl p-3 mb-5">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Documentazione completa</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                DICO, schemi elettrici, certificati materiali. Tutto consegnato a fine lavori, archiviato per te.
              </p>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 lg:p-8 transition-all hover:border-amber-500/40 hover:bg-amber-50/30">
              <div className="inline-flex items-center justify-center bg-amber-500/10 text-amber-600 rounded-xl p-3 mb-5">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Rapporti che durano</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Il 70% dei nostri clienti torna da noi entro 3 anni. Non clienti una tantum: partner di lungo periodo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Pensieri Spotlight */}
      <section className="bg-brand py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="text-sm font-medium tracking-widest uppercase text-white/70">
                Servizio di punta
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                Vorresti un elettricista, ma non doverlo cercare ogni volta?
              </h2>
              <p className="mt-5 text-lg text-brand-100 leading-relaxed max-w-lg">
                Zero Pensieri è il nostro contratto di manutenzione programmata. Una quota annuale, e noi ci occupiamo di tutto: verifiche periodiche, pronto intervento illimitato, garanzia a vita sui dispositivi.
              </p>
              <Link
                href="/zero-pensieri"
                className="mt-8 inline-flex items-center justify-center bg-white text-brand font-medium px-6 h-12 rounded-xl transition-transform hover:scale-[1.02]"
              >
                Scopri come funziona
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col justify-center">
                <Bell className="h-6 w-6 text-white mb-3" />
                <h4 className="text-sm font-semibold text-white">Allarme intrusione</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col justify-center">
                <Video className="h-6 w-6 text-white mb-3" />
                <h4 className="text-sm font-semibold text-white">Videosorveglianza</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col justify-center">
                <Battery className="h-6 w-6 text-white mb-3" />
                <h4 className="text-sm font-semibold text-white">Sistemi UPS</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col justify-center">
                <Flame className="h-6 w-6 text-white mb-3" />
                <h4 className="text-sm font-semibold text-white">Impianti STOP FIRE</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Snippet */}
      {posts && posts.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-brand">
                  Dal blog
                </span>
                <h2 className="mt-2 text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                  Approfondimenti dal nostro studio
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-brand hover:text-brand-600 transition-colors"
              >
                Vedi tutti gli articoli
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
            
            <PostsGrid posts={posts} priorityFirst />
          </div>
        </section>
      )}

      {/* CTA Finale */}
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 py-24 lg:py-32 border-t border-slate-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="text-sm font-medium tracking-widest uppercase text-white/70">
            Pronto a iniziare?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            Un sopralluogo gratuito,<br />
            zero impegni, zero sorprese.
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Veniamo a casa tua o nella tua attività, valutiamo l'impianto, ti diciamo cosa serve. Costi e tempi chiari prima di iniziare.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center bg-white text-brand hover:bg-slate-100 font-semibold px-8 h-12 rounded-xl transition-transform hover:scale-[1.02] w-full sm:w-auto"
            >
              Richiedi sopralluogo
            </Link>
            <a
              href="tel:+390185167704"
              className="inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 font-medium px-8 h-12 rounded-xl transition-colors w-full sm:w-auto"
            >
              Chiamaci ora
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
