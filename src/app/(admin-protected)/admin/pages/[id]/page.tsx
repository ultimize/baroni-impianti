import { notFound } from "next/navigation"
import { getPageById } from "@/lib/admin/queries/entities"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { PageForm } from "@/components/admin/forms/PageForm"
import type { PageFormData } from "@/lib/admin/validation/page"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

const TEMPLATE_VALUES = ["default", "legal", "landing"] as const
type Template = (typeof TEMPLATE_VALUES)[number]
function isTemplate(v: string | null): v is Template {
  return v != null && (TEMPLATE_VALUES as readonly string[]).includes(v)
}

export default async function EditPagePage({ params }: Props) {
  const { id } = await params
  const row = await getPageById(id)
  if (!row) notFound()

  const defaultValues: PageFormData = {
    title: row.title,
    slug: row.slug,
    content: row.content ?? "",
    template: isTemplate(row.template) ? row.template : "default",
    is_published: row.is_published,
    seo_title: row.seo_title ?? "",
    seo_description: row.seo_description ?? "",
    og_image_url: row.og_image_url ?? "",
    noindex: row.noindex,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={row.title}
        description={`Slug: /${row.slug}`}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Pagine", href: "/admin/pages" },
          { label: row.title },
        ]}
      />
      <PageForm mode="edit" pageId={row.id} isSystem={row.is_system} defaultValues={defaultValues} />
    </div>
  )
}
