import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildCategoryMetadata } from "@/lib/seo/metadata"
import { createClient } from "@/lib/supabase/server"
import { getCategoryBySlug } from "@/lib/queries/categories"

export const revalidate = 3600

type Params = { slug: string; page: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const category = await getCategoryBySlug(supabase, slug)
  if (!category) return { title: "Categoria non trovata" }
  return buildCategoryMetadata(category)
}

export default async function CategoryPaginatedPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug, page } = await params
  const n = parseInt(page, 10)
  if (!Number.isFinite(n) || n < 1) notFound()
  if (n === 1) redirect(`/blog/categoria/${slug}`)

  const supabase = await createClient()
  const category = await getCategoryBySlug(supabase, slug)
  if (!category) notFound()

  return (
    <BlogListingView
      kind="category"
      page={n}
      categorySlug={category.slug}
      categoryName={category.name}
      categoryDescription={category.description}
    />
  )
}
