import Link from "next/link"
import { Inbox } from "lucide-react"

import { listContacts, getContactStatusCounts } from "@/lib/admin/queries/entities"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SearchInput } from "@/components/admin/shared/SearchInput"
import { PaginationControls } from "@/components/admin/shared/PaginationControls"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { StatusBadge } from "@/components/admin/shared/StatusBadge"
import { ContactStatusTabs } from "@/components/admin/contacts/ContactStatusTabs"
import { ContactRowActions } from "@/components/admin/contacts/ContactRowActions"
import { formatRelativeFromNow, truncate } from "@/lib/admin/utils/format"
import type { ContactStatus } from "@/lib/admin/utils/status"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}

export default async function AdminContactsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1", 10)
  const search = params.q?.trim() || undefined
  const status = (params.status as ContactStatus | "all" | undefined) ?? "all"

  const [{ rows, total, pageSize }, counts] = await Promise.all([
    listContacts({ page, search, status }),
    getContactStatusCounts(),
  ])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox contatti"
        description={`${total} messaggi`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Contatti" }]}
      />

      <ContactStatusTabs counts={counts} />

      <SearchInput placeholder="Cerca per nome, email, oggetto…" className="max-w-md" />

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Nessun messaggio"
            description="Quando arriverà un messaggio dal form comparirà qui."
            className="m-4"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contatto</TableHead>
                <TableHead>Messaggio</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Ricevuto</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className={row.status === "new" ? "font-medium" : undefined}>
                  <TableCell>
                    <Link href={`/admin/contacts/${row.id}`} className="hover:underline">
                      <span className="block">{row.full_name}</span>
                      <span className="block text-xs font-normal text-muted-foreground">{row.email}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/contacts/${row.id}`} className="block max-w-md hover:underline">
                      {row.subject ? (
                        <span className="block text-sm">{row.subject}</span>
                      ) : (
                        <span className="block text-sm italic text-muted-foreground">Nessun oggetto</span>
                      )}
                      <span className="block truncate text-xs font-normal text-muted-foreground">
                        {truncate(row.message, 100)}
                      </span>
                    </Link>
                    {row.source_page ? (
                      <Badge variant="outline" className="mt-1 text-[10px]">
                        {row.source_page}
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant="contact" value={row.status} />
                  </TableCell>
                  <TableCell className="text-sm font-normal text-muted-foreground">
                    {formatRelativeFromNow(row.created_at)}
                  </TableCell>
                  <TableCell>
                    <ContactRowActions id={row.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="border-t px-3">
          <PaginationControls total={total} page={page} pageSize={pageSize} />
        </div>
      </div>
    </div>
  )
}
