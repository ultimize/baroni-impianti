import { listAllSiteSettings } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SettingsEditor } from "@/components/admin/settings/SettingsEditor"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { Settings } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await listAllSiteSettings()
  return (
    <div className="space-y-6">
      <PageHeader
        title="Impostazioni sito"
        description="Valori globali utilizzati dal sito pubblico (contatti, social, SEO, integrazioni)."
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Impostazioni" }]}
      />
      {settings.length === 0 ? (
        <EmptyState
          icon={Settings}
          title="Nessuna impostazione"
          description="Le impostazioni verranno create automaticamente durante la migrazione iniziale."
        />
      ) : (
        <SettingsEditor settings={settings} />
      )}
    </div>
  )
}
