import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildCategoryMetadata } from "@/lib/seo/metadata"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public-client"
import { getCategoryBySlug, getAllCategories } from "@/lib/queries/categories"

export const revalidate = 3600

type Params = { slug: string }

export async function generateStaticParams() {
  const supabase = createPublicClient()
  const categories = await getAllCategories(supabase)
  return categories.map((c) => ({ slug: c.slug }))
}

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const category = await getCategoryBySlug(supabase, slug)
  if (!category) notFound()

  return (
    <BlogListingView
      kind="category"
      page={1}
      categorySlug={category.slug}
      categoryName={category.name}
      categoryDescription={category.description}
    />
  )
}
