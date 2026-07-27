import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildBlogListMetadata } from "@/lib/seo/metadata"
import { createPublicClient } from "@/lib/supabase/public-client"
import { BLOG_BASE_PATH } from "@/lib/constants"

export const revalidate = 3600

type Params = { page: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { page } = await params
  const n = parseInt(page, 10)
  if (!Number.isFinite(n) || n < 1) return {}
  return buildBlogListMetadata(n)
}

export async function generateStaticParams() {
  const supabase = createPublicClient()
  const { count } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())

  const pageSize = 12
  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const params: { page: string }[] = []
  for (let p = 2; p <= totalPages && p <= 6; p++) {
    params.push({ page: String(p) })
  }
  return params
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { page } = await params
  const n = parseInt(page, 10)
  if (!Number.isFinite(n) || n < 1) notFound()
  if (n === 1) redirect(BLOG_BASE_PATH)

  return <BlogListingView kind="all" page={n} />
}
