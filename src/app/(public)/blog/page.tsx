import type { Metadata } from "next"
import { BlogListingView } from "@/components/public/BlogListingView"
import { buildBlogListMetadata } from "@/lib/seo/metadata"

export const revalidate = 3600

export const metadata: Metadata = buildBlogListMetadata(1)

export default async function BlogIndexPage() {
  return <BlogListingView kind="all" page={1} />
}
