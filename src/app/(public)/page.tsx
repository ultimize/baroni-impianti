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
  Play,
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

const CERTIFICATES = [
  {
    image: "/img/certificati/cert-1.jpg",
    title: "Networking Base",
    provider: "Altatensione / Netify",
  },
  {
    image: "/img/certificati/cert-2.jpg",
    title: "Autorimesse e ricarica veicoli elettrici",
    provider: "Il Professionista Elettrico",
  },
  {
    image: "/img/certificati/cert-3.jpg",
    title: "Elettrosistemista™",
    provider: "Corso di Elettrosistemista",
  },
  {
    image: "/img/certificati/cert-4.jpg",
    title: "System Integrator: DALI2",
    provider: "Ohmega Progettazioni",
  },
  {
    image: "/img/certificati/cert-5.jpg",
    title: "Metodo Reti IP",
    provider: "Altatensione",
  },
  {
    image: "/img/certificati/cert-6.jpg",
    title: "Certificazione Aggiuntiva",
    provider: "Baroni Impianti",
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
      <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-32 lg:pb-24">
        {/* Full Background Image */}
        <Image 
          src="/img/hero-impianto.jpg" 
          alt="Impianto elettrico realizzato da Baroni Impianti" 
          fill 
          className="object-cover z-0" 
          priority 
          sizes="100vw" 
        />
        
        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 z-10 bg-slate-950/80 sm:bg-slate-950/40 sm:bg-gradient-to-r sm:from-slate-950/95 sm:via-slate-900/80 sm:to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-8 flex flex-col items-start animate-fade-in">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 mb-6 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponibili per nuovi progetti
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
                Impianti elettrici <br className="hidden lg:block" />
                <span className="text-brand-400">fatti come si deve.</span>
              </h1>
              
              <p className="mt-6 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Da Sestri Levante al Tigullio: civili, industriali, fotovoltaico, domotica. 
                Lavoriamo a norma, garantiamo nel tempo, e con Zero Pensieri ci occupiamo di tutto noi.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center bg-brand hover:bg-brand-600 text-white font-medium px-8 h-14 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand/20"
                >
                  Richiedi sopralluogo gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/zero-pensieri"
                  className="inline-flex items-center justify-center border border-slate-600 text-white bg-white/5 hover:bg-white/10 hover:border-slate-400 font-medium px-8 h-14 rounded-xl transition-all backdrop-blur-sm"
                >
                  Scopri Zero Pensieri
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white/5 backdrop-blur-sm">
                    <Award className="h-4 w-4 text-brand-400" />
                  </div>
                  <span>20+ anni di esperienza</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white/5 backdrop-blur-sm">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span>Lavori a norma CEI 64-8</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white/5 backdrop-blur-sm">
                    <MapPin className="h-4 w-4 text-amber-400" />
                  </div>
                  <span>Sestri Levante e Tigullio</span>
                </div>
              </div>
            </div>

            {/* Right Column - Google Reviews Widget */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center animate-slide-up mt-8 lg:mt-0">
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-6 w-full max-w-sm hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">5.0</span>
                </div>
                
                <h3 className="text-white font-semibold text-lg mb-2">Eccezionale su Google</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Decine di clienti nel Tigullio ci hanno già scelto e recensito.
                </p>
                
                <Link
                  href="/testimonianze"
                  className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-brand/20 p-2 rounded-full text-brand-400 group-hover:scale-110 transition-transform">
                      <Play className="h-4 w-4 fill-current" />
                    </div>
                    <span className="text-white text-sm font-medium">Guarda le video recensioni</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perché Baroni / Differenziatori */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand/5 blur-3xl rounded-full pointer-events-none -z-10" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Perché ci scelgono
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Cerchi un <span className="font-serif italic text-brand font-normal">elettricista a Sestri Levante</span> <br className="hidden md:block" />
              qualificato e specializzato? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mt-2 block">
                L’hai appena trovato.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Item 1 */}
            <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-brand group-hover:text-white shadow-sm group-hover:shadow-brand/20">
                <FileCheck className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-4">
                Ditta Certificata
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Baroni Impianti dispone delle più importanti Certificazioni Elettriche.
              </p>
            </div>

            {/* Item 2 */}
            <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white shadow-sm group-hover:shadow-amber-500/20">
                <Sun className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-4">
                Impianti Fotovoltaici
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Offriamo garanzie tra le più alte sul mercato.
              </p>
            </div>

            {/* Item 3 */}
            <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white shadow-sm group-hover:shadow-emerald-500/20">
                <ShieldCheck className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-4">
                Impianti di Sicurezza
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Sostituzione in garanzia di tutti i componenti per sempre!
              </p>
            </div>
          </div>

                  </div>
      </section>

      {/* Servizi Section */}
      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-20 items-end relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-3xl rounded-full pointer-events-none -z-10" />
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Cosa facciamo
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Cinque competenze, <br className="hidden md:block" />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">
                  un solo elettricista.
                </span>
              </h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg lg:pb-2">
              Soluzioni integrate per la casa e l'azienda. Copriamo ogni aspetto dell'impiantistica 
              con un unico standard di qualità artigianale e rispetto delle normative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Zero Pensieri Premium Card - Spannning 2 columns */}
            <div className="group relative overflow-hidden flex flex-col justify-between bg-slate-900 rounded-3xl p-8 lg:p-10 md:col-span-2 shadow-sm border border-slate-800 transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Shield className="w-64 h-64 text-white transform translate-x-8 -translate-y-8" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/20 border border-brand/30 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-6">
                    <Shield className="w-3.5 h-3.5" /> Servizio Esclusivo
                  </div>
                  <h3 className="text-3xl font-semibold mb-4 text-white">Zero Pensieri</h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    Il nostro contratto di manutenzione programmata. Una quota annuale per un impianto 
                    sempre in perfetta efficienza, con verifiche e pronto intervento inclusi.
                  </p>
                </div>
                <Link
                  href="/zero-pensieri"
                  className="mt-10 w-fit inline-flex items-center justify-center bg-white text-slate-900 font-medium px-6 h-12 rounded-xl transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Scopri come funziona
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Other Services Cards - Each spanning 1 column */}
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group relative overflow-hidden flex flex-col justify-between bg-white rounded-3xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30"
              >
                {/* Background Macro Icon */}
                <div className="absolute bottom-0 right-0 opacity-[0.03] transform translate-x-1/4 translate-y-1/4 transition-transform duration-500 group-hover:scale-110">
                  <s.icon className="w-48 h-48 text-slate-900" />
                </div>
                
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-700 rounded-xl p-3 mb-6 transition-colors duration-300 group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/20">
                    <s.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 pr-4">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-sm font-semibold text-brand">
                  <span>Scopri di più</span>
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left animate-slide-up">
            <p className="text-slate-600 font-medium text-lg">
              Hai un progetto in mente o un impianto da controllare?
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-600 text-white font-medium px-6 h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              Richiedi sopralluogo gratuito
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certificazioni Section */}
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-3xl rounded-full pointer-events-none -z-10" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-slate-700 text-xs font-semibold uppercase tracking-widest mb-6">
              <Award className="w-4 h-4 text-amber-500 fill-amber-500" /> Le nostre certificazioni
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              La nostra formazione, <br className="hidden md:block" />
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-600">
                certificata sul campo.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Siamo costantemente aggiornati sulle ultime tecnologie e normative per offrirti sempre il massimo standard di sicurezza.
            </p>
          </div>
          
          <div className="relative">
              {/* Fade masks for horizontal scrolling */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
              
              <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CERTIFICATES.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="flex-none w-[280px] sm:w-[320px] snap-center group"
                  >
                    <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200/60 transition-all duration-300 group-hover:shadow-xl group-hover:border-brand/30 group-hover:-translate-y-1">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-4">
                        <Image
                          src={cert.image}
                          alt={`Certificato ${cert.title}`}
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="px-3 pb-3">
                        <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 mb-1">{cert.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{cert.provider}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
