import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildTagMetadata } from "@/lib/seo/metadata"
import { createClient } from "@/lib/supabase/server"
import { getTagBySlug } from "@/lib/queries/tags"

export const revalidate = 3600

type Params = { slug: string; page: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const tag = await getTagBySlug(supabase, slug)
  if (!tag) return { title: "Tag non trovato" }
  return buildTagMetadata(tag)
}

export default async function TagPaginatedPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug, page } = await params
  const n = parseInt(page, 10)
  if (!Number.isFinite(n) || n < 1) notFound()
  if (n === 1) redirect(`/blog/tag/${slug}`)

  const supabase = await createClient()
  const tag = await getTagBySlug(supabase, slug)
  if (!tag) notFound()

  return (
    <BlogListingView
      kind="tag"
      page={n}
      tagSlug={tag.slug}
      tagName={tag.name}
      tagDescription={tag.description}
    />
  )
}
