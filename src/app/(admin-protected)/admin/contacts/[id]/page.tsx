import { notFound } from "next/navigation"
import Link from "next/link"
import { Mail, Clock, Globe, MapPin } from "lucide-react"

import { getContactById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { StatusBadge } from "@/components/admin/shared/StatusBadge"
import { Button } from "@/components/ui/button"
import { ContactDetailActions } from "@/components/admin/contacts/ContactDetailActions"
import { formatDateTime } from "@/lib/admin/utils/format"
import type { ContactStatus } from "@/lib/admin/utils/status"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params
  const contact = await getContactById(id)
  if (!contact) notFound()

  const mailtoSubject = encodeURIComponent(`Re: ${contact.subject ?? "Messaggio dal sito"}`)
  const mailtoBody = encodeURIComponent(
    `Ciao ${contact.full_name.split(" ")[0] ?? ""},\n\nGrazie per averci contattato.\n\n—\nBaroni Impianti`,
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={contact.full_name}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Contatti", href: "/admin/contacts" },
          { label: contact.full_name },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-lg font-medium">
                  {contact.subject ?? "Nessun oggetto"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Da <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                  {contact.phone ? <> · Tel: {contact.phone}</> : null}
                </p>
              </div>
              <StatusBadge variant="contact" value={contact.status as ContactStatus} />
            </div>
            <div className="mt-5 whitespace-pre-wrap rounded-md bg-muted/40 p-4 text-sm leading-relaxed">
              {contact.message}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a
                  href={`mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Mail className="mr-1 h-3.5 w-3.5" />
                  Rispondi via email
                </a>
              </Button>
              {contact.source_page ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={contact.source_page} target="_blank">
                    Pagina di origine
                  </Link>
                </Button>
              ) : null}
            </div>
          </section>

          <ContactDetailActions
            id={contact.id}
            initialNotes={contact.internal_notes ?? ""}
            currentStatus={contact.status as ContactStatus}
          />
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border bg-card p-5 text-sm">
            <h3 className="font-heading text-sm font-medium">Metadati</h3>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                <div>
                  <dt className="text-muted-foreground">Ricevuto</dt>
                  <dd>{formatDateTime(contact.created_at)}</dd>
                </div>
              </div>
              {contact.read_at ? (
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <dt className="text-muted-foreground">Letto</dt>
                    <dd>{formatDateTime(contact.read_at)}</dd>
                  </div>
                </div>
              ) : null}
              {contact.replied_at ? (
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <dt className="text-muted-foreground">Risposto</dt>
                    <dd>{formatDateTime(contact.replied_at)}</dd>
                  </div>
                </div>
              ) : null}
              {contact.service_interest ? (
                <div className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <dt className="text-muted-foreground">Interesse</dt>
                    <dd>{contact.service_interest}</dd>
                  </div>
                </div>
              ) : null}
              {contact.ip_address ? (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <dt className="text-muted-foreground">IP</dt>
                    <dd className="font-mono text-[11px]">{contact.ip_address}</dd>
                  </div>
                </div>
              ) : null}
              {contact.user_agent ? (
                <div>
                  <dt className="text-muted-foreground">User agent</dt>
                  <dd className="break-all font-mono text-[10px]">{contact.user_agent}</dd>
                </div>
              ) : null}
              {contact.referrer ? (
                <div>
                  <dt className="text-muted-foreground">Referrer</dt>
                  <dd className="break-all text-[11px]">{contact.referrer}</dd>
                </div>
              ) : null}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  )
}
