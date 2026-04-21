import { PageHeader } from "@/components/admin/shared/PageHeader"
import { PageForm } from "@/components/admin/forms/PageForm"
import type { PageFormData } from "@/lib/admin/validation/page"

export const dynamic = "force-dynamic"

export default function NewPagePage() {
  const defaultValues: PageFormData = {
    title: "",
    slug: "",
    content: "",
    template: "default",
    is_published: false,
    seo_title: "",
    seo_description: "",
    og_image_url: "",
    noindex: false,
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuova pagina"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Pagine", href: "/admin/pages" },
          { label: "Nuova" },
        ]}
      />
      <PageForm mode="create" defaultValues={defaultValues} />
    </div>
  )
}
