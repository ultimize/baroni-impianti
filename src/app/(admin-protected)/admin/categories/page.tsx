import { listAdminCategories } from "@/lib/admin/queries/taxonomies"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { CategoriesTable } from "@/components/admin/categories/CategoriesTable"

export const dynamic = "force-dynamic"

export default async function AdminCategoriesPage() {
  const categories = await listAdminCategories()
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorie"
        description={`${categories.length} categorie totali. Modifica inline cliccando sul nome.`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Categorie" }]}
      />
      <CategoriesTable categories={categories} />
    </div>
  )
}
