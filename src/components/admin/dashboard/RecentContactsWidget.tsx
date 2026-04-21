import Link from "next/link"
import { Inbox } from "lucide-react"
import { StatusBadge } from "@/components/admin/shared/StatusBadge"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { formatRelativeFromNow, truncate } from "@/lib/admin/utils/format"
import type { RecentContactRow } from "@/lib/admin/queries/dashboard"

export function RecentContactsWidget({ contacts }: { contacts: RecentContactRow[] }) {
  return (
    <section className="rounded-lg border border-border/60 bg-card">
      <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
        <div>
          <h2 className="font-heading text-sm font-medium">Ultimi contatti</h2>
          <p className="text-xs text-muted-foreground">Form inviati di recente</p>
        </div>
        <Link href="/admin/contacts" className="text-xs font-medium text-primary hover:underline">
          Apri inbox
        </Link>
      </header>
      {contacts.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Inbox vuota"
          description="Quando arriverà un messaggio dal sito comparirà qui."
          className="m-4"
        />
      ) : (
        <ul className="divide-y divide-border/60">
          {contacts.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/contacts/${c.id}`}
                className="block px-5 py-3 hover:bg-accent"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium">{c.full_name}</span>
                  <StatusBadge variant="contact" value={c.status} />
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{c.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">{truncate(c.message, 90)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  {formatRelativeFromNow(c.created_at)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
