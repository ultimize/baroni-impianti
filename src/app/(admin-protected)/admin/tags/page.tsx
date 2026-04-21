import { listAdminTags } from "@/lib/admin/queries/taxonomies"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { TagsTable } from "@/components/admin/tags/TagsTable"

export const dynamic = "force-dynamic"

export default async function AdminTagsPage() {
  const tags = await listAdminTags()
  const unused = tags.filter((t) => t.post_count === 0).length
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tag"
        description={`${tags.length} tag totali · ${unused} senza articoli associati`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Tag" }]}
      />
      <TagsTable tags={tags} />
    </div>
  )
}
