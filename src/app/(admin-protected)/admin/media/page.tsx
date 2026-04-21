import { PageHeader } from "@/components/admin/shared/PageHeader"
import { MediaBrowserTabs } from "@/components/admin/media/MediaBrowserTabs"

export const dynamic = "force-dynamic"

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media library"
        description="Sfoglia, carica e organizza i file nei bucket Supabase Storage."
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Media library" }]}
      />
      <MediaBrowserTabs />
    </div>
  )
}
