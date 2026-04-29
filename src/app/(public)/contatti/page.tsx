import type { Metadata } from "next"
import { Suspense } from "react"
import {
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/public/SectionWrapper"
import { ContactForm } from "@/components/public/ContactForm"
import { MapEmbed } from "@/components/public/MapEmbed"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import {
  getSiteSettings,
  settingAddress,
  settingString,
} from "@/lib/queries/site-content"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Contatti — Baroni Impianti | Sopralluogo gratuito a Sestri Levante",
  description:
    "Contatta Baroni Impianti per un sopralluogo gratuito. Tigullio, provincia di Genova e La Spezia. Risposta entro 24 ore.",
}

const AREAS = [
  "Sestri Levante",
  "Chiavari",
  "Rapallo",
  "Lavagna",
  "Santa Margherita Ligure",
  "Cogorno",
  "Castiglione Chiavarese",
  "Moneglia",
  "Deiva Marina",
  "Levanto",
  "Bonassola",
  "La Spezia",
]

const MAPS_EMBED_URL = "https://maps.google.com/maps?q=Baroni+Impianti+Srl+Castiglione+Chiavarese&t=&z=13&ie=UTF8&iwloc=&output=embed"
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Baroni+Impianti+Castiglione+Chiavarese"

export default async function ContattiPage() {
  const settings = await getSiteSettings()
  const address = settingAddress(settings)
  const phoneDisplay = settingString(settings, "company_phone_display")
  const phoneTel = settingString(settings, "company_phone_tel")
  const email = settingString(settings, "company_email")
  const hours = settingString(settings, "company_hours_display")

  return (
    <>
      {/* Custom Premium Hero */}
      <section className="relative overflow-hidden flex flex-col justify-end pt-32 pb-16 lg:pt-48 lg:pb-24 bg-slate-950 border-b border-slate-800 min-h-[50vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { name: "Home", url: "/" },
              { name: "Contatti", url: "/contatti" },
            ]}
            tone="light"
            scriptId="breadcrumb-contatti-jsonld"
            className="mb-6"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <MessageSquare className="w-4 h-4 text-brand-400" /> Parla con noi
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            Iniziamo da un <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-400">sopralluogo.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
            Siamo a tua disposizione per valutare il tuo impianto, offrirti una consulenza tecnica e proporti la soluzione più sicura ed efficiente. Ti rispondiamo entro 24 ore.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <SectionWrapper className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-5 items-start">
            
            {/* Form Card */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 sm:p-12 lg:col-span-3 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand to-indigo-500" />
              
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                Scrivici un messaggio
              </h2>
              <p className="text-slate-500 font-light text-lg mb-10">
                Compila il modulo per richiederci informazioni o un preventivo.
              </p>
              
              <div className="relative z-10">
                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 rounded-xl" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            {/* Contact Details Aside (Dark Bento) */}
            <aside className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500 mb-6 relative z-10">I nostri recapiti</h3>
                
                <div className="space-y-8 relative z-10">
                  {phoneDisplay ? (
                    <div className="flex items-start gap-4 group">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10 text-white transition-colors group-hover:bg-brand group-hover:border-brand">
                        <Phone className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-400 mb-1">Telefono</p>
                        <a href={`tel:${phoneTel}`} className="text-xl font-semibold text-white hover:text-brand transition-colors">
                          {phoneDisplay}
                        </a>
                        {hours ? (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="h-3.5 w-3.5" aria-hidden />
                            {hours}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {email ? (
                    <div className="flex items-start gap-4 group">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10 text-white transition-colors group-hover:bg-brand group-hover:border-brand">
                        <Mail className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-400 mb-1">Email</p>
                        <a href={`mailto:${email}`} className="text-lg font-semibold text-white hover:text-brand transition-colors break-all">
                          {email}
                        </a>
                        <p className="mt-1 text-xs text-slate-500">
                          Risposta entro 24 ore
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {address ? (
                    <div className="flex items-start gap-4 group">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10 text-white transition-colors group-hover:bg-brand group-hover:border-brand">
                        <MapPin className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-400 mb-1">Sede</p>
                        <p className="text-base text-white leading-relaxed">
                          {address.street}
                          <br />
                          {address.zip} {address.city}
                          {address.province ? ` (${address.province})` : ""}
                        </p>
                        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-sm font-medium text-brand hover:underline">
                          Apri in Google Maps
                          <ExternalLink className="ml-1 h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Emergency Card */}
              <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 shadow-sm text-slate-900 relative overflow-hidden group hover:bg-red-500/10 transition-colors">
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-red-500 text-white shadow-md shadow-red-500/20">
                    <AlertCircle className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-600 mb-1">
                      Pronto Intervento
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 mb-4">
                      Per emergenze elettriche nel Tigullio chiamaci subito.
                    </p>
                    {phoneTel ? (
                      <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white border-0">
                        <a href={`tel:${phoneTel}`}>Chiama emergenza</a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </SectionWrapper>

      {/* Map & Areas Section */}
      <SectionWrapper variant="white" className="py-24 border-t border-slate-200">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                Dove operiamo
              </h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-10">
                La nostra sede è a Castiglione Chiavarese, ma operiamo quotidianamente in tutto il Tigullio, raggiungendo rapidamente sia la provincia di Genova che quella di La Spezia.
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {AREAS.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-brand hover:text-brand transition-colors cursor-default"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-sm text-slate-500 font-light italic border-l-2 border-slate-200 pl-4">
                Non vedi la tua zona nell'elenco? Chiamaci: spesso interveniamo anche fuori area su specifica richiesta del cliente.
              </p>
            </div>

            {/* Map Frame */}
            <div className="w-full h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 relative bg-slate-100 flex items-center justify-center">
              <MapEmbed src={MAPS_EMBED_URL} title="Sede Baroni Impianti" />
            </div>

          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
