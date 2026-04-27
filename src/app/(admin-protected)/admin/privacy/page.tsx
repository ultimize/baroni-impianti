import { Download, ShieldCheck } from "lucide-react"

import { createAdminClient } from "@/lib/supabase/admin"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDateTime } from "@/lib/admin/utils/format"

export const dynamic = "force-dynamic"

const ACTION_LABELS: Record<string, string> = {
  accept_all: "Accetta tutti",
  reject_all: "Rifiuta",
  custom: "Personalizzato",
  revoke: "Revoca",
  update: "Aggiornamento",
}

export default async function AdminPrivacyPage() {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from("consent_logs")
    .select(
      "id, consent_id, action, analytics, marketing, policy_version, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(100)

  const rows = error ? [] : data ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Privacy & Cookie"
        description="Audit log dei consensi raccolti dal banner cookie. Ultimi 100 record."
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Privacy" }]}
        actions={
          <Button asChild variant="outline" size="lg">
            <a href="/api/admin/consent-export" download>
              <Download className="mr-2 h-4 w-4" />
              Esporta CSV
            </a>
          </Button>
        }
      />

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Impossibile leggere consent_logs. Verifica che la tabella esista su
          Supabase e che SUPABASE_SERVICE_ROLE_KEY sia configurato.
        </div>
      ) : null}

      <div className="rounded-lg border bg-card">
        {rows.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="Nessun consenso registrato"
            description="I consensi raccolti dal banner cookie compariranno qui."
            className="m-4"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Consent ID</TableHead>
                <TableHead>Azione</TableHead>
                <TableHead>Analytics</TableHead>
                <TableHead>Marketing</TableHead>
                <TableHead>Versione policy</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">
                    {row.consent_id.slice(0, 8)}…
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {ACTION_LABELS[row.action] ?? row.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ConsentDot value={row.analytics} />
                  </TableCell>
                  <TableCell>
                    <ConsentDot value={row.marketing} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    v{row.policy_version}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(row.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

function ConsentDot({ value }: { value: boolean }) {
  return (
    <span
      className={
        value
          ? "inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700"
          : "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
      }
    >
      <span
        aria-hidden
        className={
          value
            ? "inline-block h-2 w-2 rounded-full bg-emerald-500"
            : "inline-block h-2 w-2 rounded-full bg-muted-foreground/40"
        }
      />
      {value ? "Sì" : "No"}
    </span>
  )
}
