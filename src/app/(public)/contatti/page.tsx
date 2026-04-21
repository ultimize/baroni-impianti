import type { Metadata } from "next"
import { Mail, MapPin, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { CONTACT_EMAIL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Baroni Impianti per un sopralluogo, un preventivo o una richiesta di assistenza elettrica a Sestri Levante e nel Tigullio.",
}

export default function ContattiPage() {
  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: "Contatti", url: "/contatti" },
        ]}
      />

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Parliamo del tuo impianto
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Raccontaci cosa ti serve e ti ricontattiamo per un sopralluogo o un
            preventivo. Rispondiamo entro 24 ore nei giorni lavorativi.
          </p>

          <form
            className="mt-10 space-y-5"
            aria-describedby="contact-form-note"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nome e cognome *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Oggetto</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Es. Sopralluogo fotovoltaico"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Messaggio *</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Raccontaci brevemente il progetto o il problema."
              />
            </div>

            <p
              id="contact-form-note"
              className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Il form sarà attivato a breve. Nel frattempo puoi scriverci a{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </span>
            </p>

            <div>
              <Button type="submit" size="lg" disabled>
                Invia richiesta
              </Button>
            </div>
          </form>
        </div>

        <aside className="space-y-6 rounded-2xl border border-border/60 bg-muted/20 p-8">
          <h2 className="text-lg font-semibold">Informazioni</h2>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium text-foreground">Zona di intervento</p>
                <p className="text-muted-foreground">
                  Sestri Levante (GE) e Tigullio
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium text-foreground">Orari</p>
                <p className="text-muted-foreground">
                  Lun – Ven · 8:00 – 18:00
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </Container>
  )
}
