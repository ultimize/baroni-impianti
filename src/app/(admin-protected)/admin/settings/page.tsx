import { listAllSiteSettings } from "@/lib/admin/queries/entities"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { SettingsEditor } from "@/components/admin/settings/SettingsEditor"
import { CustomCodeManager } from "@/components/admin/settings/CustomCodeManager"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { Settings } from "lucide-react"
import { parseSnippets } from "@/lib/custom-code/snippets"

export const dynamic = "force-dynamic"

const CUSTOM_CODE_KEY = "custom_code_snippets"

export default async function AdminSettingsPage() {
  const settings = await listAllSiteSettings()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()
    isAdmin = profile?.role === "admin"
  }

  const codeRow = settings.find((s) => s.key === CUSTOM_CODE_KEY)
  const editorSettings = settings.filter((s) => s.key !== CUSTOM_CODE_KEY)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Impostazioni sito"
        description="Valori globali utilizzati dal sito pubblico (contatti, social, SEO, integrazioni)."
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Impostazioni" }]}
      />
      {editorSettings.length === 0 ? (
        <EmptyState
          icon={Settings}
          title="Nessuna impostazione"
          description="Le impostazioni verranno create automaticamente durante la migrazione iniziale."
        />
      ) : (
        <SettingsEditor settings={editorSettings} />
      )}
      {isAdmin ? <CustomCodeManager initial={parseSnippets(codeRow?.value ?? null)} /> : null}
    </div>
  )
}
