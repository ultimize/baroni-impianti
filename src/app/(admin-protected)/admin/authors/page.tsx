import Link from "next/link"
import { Users } from "lucide-react"

import { listAuthors } from "@/lib/admin/queries/taxonomies"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { EmptyState } from "@/components/admin/shared/EmptyState"

export const dynamic = "force-dynamic"

export default async function AdminAuthorsPage() {
  const authors = await listAuthors()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Autori"
        description={`${authors.length} autor${authors.length === 1 ? "e" : "i"} importati da WordPress`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Autori" }]}
      />

      <div className="rounded-lg border bg-card">
        {authors.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nessun autore"
            description="Gli autori vengono creati automaticamente in fase di import WordPress."
            className="m-4"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Autore</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Articoli</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.map((a) => {
                const initials = a.name
                  .split(/\s+/)
                  .map((s) => s[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
                return (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {a.avatar_url ? <AvatarImage src={a.avatar_url} alt={a.name} /> : null}
                          <AvatarFallback>{initials || "A"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/admin/authors/${a.id}`} className="font-medium hover:underline">
                            {a.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">/{a.slug}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{a.email ?? "—"}</TableCell>
                    <TableCell className="text-sm tabular-nums">{a.post_count}</TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/authors/${a.id}`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Modifica →
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
