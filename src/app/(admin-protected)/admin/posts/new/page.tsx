import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { listAuthorsLite, listAdminCategories, listAdminTags } from "@/lib/admin/queries/taxonomies"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { PostForm } from "@/components/admin/forms/PostForm"
import type { PostFormData } from "@/lib/admin/validation/post"

export const dynamic = "force-dynamic"

export default async function NewPostPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const [authors, categories, tags] = await Promise.all([
    listAuthorsLite(),
    listAdminCategories(),
    listAdminTags(),
  ])

  // Default author = current user's matching author by email if exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", user.id)
    .maybeSingle()

  let defaultAuthorId: string = authors[0]?.id ?? ""
  if (profile?.email) {
    const { data: matched } = await supabase
      .from("authors")
      .select("id")
      .eq("email", profile.email)
      .maybeSingle()
    if (matched?.id) defaultAuthorId = matched.id
  }

  const defaultValues: PostFormData = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    featured_image_alt: "",
    author_id: defaultAuthorId,
    status: "draft",
    published_at: null,
    reading_time_minutes: 0,
    seo_title: "",
    seo_description: "",
    og_image_url: "",
    canonical_url: "",
    noindex: false,
    category_ids: [],
    tag_ids: [],
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuovo articolo"
        breadcrumb={[
          { label: "Admin", href: "/admin" },
          { label: "Articoli", href: "/admin/posts" },
          { label: "Nuovo" },
        ]}
      />
      <PostForm
        mode="create"
        defaultValues={defaultValues}
        authors={authors}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        tags={tags.map((t) => ({ id: t.id, name: t.name }))}
      />
    </div>
  )
}
