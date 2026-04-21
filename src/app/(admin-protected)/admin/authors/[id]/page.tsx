import { notFound } from "next/navigation"
import { getAuthorById } from "@/lib/admin/queries/taxonomies"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { AuthorForm } from "@/components/admin/forms/AuthorForm"
import type { AuthorFormData } from "@/lib/admin/validation/author"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditAuthorPage({ params }: Props) {
  const { id } = await params
  const author = await getAuthorById(id)
  if (!author) notFound()

  const defaultValues: AuthorFormData = {
    name: author.name,
    slug: author.slug,
    bio: author.bio ?? "",
    avatar_url: author.avatar_url ?? "",
    email: author.email ?? "",
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={author.name}
        description={`/blog/autore/${author.slug}`}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Autori", href: "/admin/authors" },
          { label: author.name },
        ]}
      />
      <AuthorForm authorId={author.id} defaultValues={defaultValues} />
    </div>
  )
}
