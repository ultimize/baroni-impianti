import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildTagMetadata } from "@/lib/seo/metadata"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public-client"
import { getTagBySlug, getAllTags } from "@/lib/queries/tags"

export const revalidate = 3600

type Params = { slug: string }

export async function generateStaticParams() {
  const supabase = createPublicClient()
  const tags = await getAllTags(supabase)
  return tags.map((t) => ({ slug: t.slug }))
}

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

export default async function TagPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const tag = await getTagBySlug(supabase, slug)
  if (!tag) notFound()

  return (
    <BlogListingView
      kind="tag"
      page={1}
      tagSlug={tag.slug}
      tagName={tag.name}
      tagDescription={tag.description}
    />
  )
}
