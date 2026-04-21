import { notFound } from "next/navigation"
import { getAdminPostById } from "@/lib/admin/queries/posts"
import {
  listAuthorsLite,
  listAdminCategories,
  listAdminTags,
} from "@/lib/admin/queries/taxonomies"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { PostForm } from "@/components/admin/forms/PostForm"
import type { PostFormData } from "@/lib/admin/validation/post"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const data = await getAdminPostById(id)
  if (!data) notFound()

  const [authors, categories, tags] = await Promise.all([
    listAuthorsLite(),
    listAdminCategories(),
    listAdminTags(),
  ])

  const { post } = data
  const defaultValues: PostFormData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    featured_image_url: post.featured_image_url ?? "",
    featured_image_alt: post.featured_image_alt ?? "",
    author_id: post.author_id ?? authors[0]?.id ?? "",
    status: post.status,
    published_at: post.published_at,
    reading_time_minutes: post.reading_time_minutes ?? 0,
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
    og_image_url: post.og_image_url ?? "",
    canonical_url: post.canonical_url ?? "",
    noindex: post.noindex,
    category_ids: data.category_ids,
    tag_ids: data.tag_ids,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={post.title}
        description={`Slug: /${post.slug}`}
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Articoli", href: "/admin/posts" },
          { label: post.title.length > 50 ? post.title.slice(0, 50) + "…" : post.title },
        ]}
      />
      <PostForm
        mode="edit"
        postId={post.id}
        defaultValues={defaultValues}
        authors={authors}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
      />
    </div>
  )
}
