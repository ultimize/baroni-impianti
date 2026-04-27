import { Download, ShieldCheck } from "lucide-react"

import { createAdminClient } from "@/lib/supabase/admin"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { ConsentLogTable } from "@/components/admin/privacy/ConsentLogTable"

export const dynamic = "force-dynamic"

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
          <ConsentLogTable rows={rows} />
        )}
      </div>
    </div>
  )
}
