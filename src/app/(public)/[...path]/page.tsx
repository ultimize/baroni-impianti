import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"
import { Container } from "@/components/public/Container"
import { ArticleHero } from "@/components/public/ArticleHero"
import { ArticleContent } from "@/components/public/ArticleContent"
import { TagsList } from "@/components/public/TagsList"
import { AuthorBox } from "@/components/public/AuthorBox"
import { NewsletterCTA } from "@/components/public/NewsletterCTA"
import { RelatedPosts } from "@/components/public/RelatedPosts"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public-client"
import {
  getPostByDateAndSlug,
  getRelatedPosts,
  getAllPublishedPostSlugs,
} from "@/lib/queries/posts"
import { getPageBySlug, getAllPublishedPages } from "@/lib/queries/pages"
import { sanitizeArticleHtml } from "@/lib/content/sanitize"
import { buildPostUrl } from "@/lib/content/url-builder"
import { getUrlDateParts } from "@/lib/content/format-date"
import {
  buildArticleMetadata,
  buildPageMetadata,
} from "@/lib/seo/metadata"
import { articleSchema, renderJsonLd } from "@/lib/seo/json-ld"
import { SITE_URL } from "@/lib/constants"

export const revalidate = 3600
export const dynamicParams = true

type Params = { path: string[] }

const RESERVED_STATIC_PATHS = new Set([
  "blog",
  "chi-siamo",
  "servizi",
  "zero-pensieri",
  "testimonianze",
  "certificazioni",
  "contatti",
  "admin",
  "auth",
  "api",
])

function isArticlePath(path: string[]): path is [string, string, string, string] {
  return (
    path.length === 4 &&
    /^\d{4}$/.test(path[0]) &&
    /^\d{2}$/.test(path[1]) &&
    /^\d{2}$/.test(path[2])
  )
}

function isStaticPagePath(path: string[]): path is [string] {
  return path.length === 1 && !RESERVED_STATIC_PATHS.has(path[0])
}

export async function generateStaticParams() {
  const supabase = createPublicClient()
  const [posts, pages] = await Promise.all([
    getAllPublishedPostSlugs(supabase),
    getAllPublishedPages(supabase),
  ])

  const postParams = posts.map((p) => {
    const { year, month, day } = getUrlDateParts(p.published_at)
    return { path: [year, month, day, p.slug] }
  })

  const pageParams = pages
    .filter((p) => !RESERVED_STATIC_PATHS.has(p.slug))
    .map((p) => ({ path: [p.slug] }))

  return [...postParams, ...pageParams]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { path } = await params
  const supabase = await createClient()

  if (isArticlePath(path)) {
    const [year, month, day, slug] = path
    const post = await getPostByDateAndSlug(supabase, year, month, day, slug)
    if (!post) return { title: "Articolo non trovato" }
    return buildArticleMetadata(post)
  }

  if (isStaticPagePath(path)) {
    const page = await getPageBySlug(supabase, path[0])
    if (!page) return { title: "Pagina non trovata" }
    return buildPageMetadata(page)
  }

  return { title: "Pagina non trovata" }
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { path } = await params
  const supabase = await createClient()

  if (isArticlePath(path)) {
    const [year, month, day, slug] = path
    const post = await getPostByDateAndSlug(supabase, year, month, day, slug)
    if (!post) notFound()

    const related = await getRelatedPosts(supabase, post.id, 3)
    const sanitized = post.content ? sanitizeArticleHtml(post.content) : ""
    const postUrl = `${SITE_URL}${buildPostUrl(post.published_at, post.slug)}`

    const primaryCategory = post.categories[0]
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      ...(primaryCategory
        ? [
            {
              name: primaryCategory.name,
              url: `/blog/categoria/${primaryCategory.slug}`,
            },
          ]
        : []),
      { name: post.title, url: buildPostUrl(post.published_at, post.slug) },
    ]

    return (
      <>
        <Script
          id="article-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: renderJsonLd(
              articleSchema(
                {
                  title: post.title,
                  excerpt: post.excerpt,
                  featured_image_url: post.featured_image_url,
                  og_image_url: post.og_image_url,
                  published_at: post.published_at,
                  updated_at: post.updated_at,
                  author: post.author
                    ? {
                        name: post.author.name,
                        avatar_url: post.author.avatar_url,
                      }
                    : null,
                },
                postUrl,
              ),
            ),
          }}
        />

        <Container className="pt-28 lg:pt-32 pb-16 lg:pb-24">
          <article>
            <ArticleHero post={post} />

            <div className="mx-auto max-w-3xl">
              {sanitized ? (
                <ArticleContent html={sanitized} className="mt-10" />
              ) : null}

              {post.tags.length > 0 ? (
                <TagsList
                  tags={post.tags}
                  heading="Argomenti"
                  className="mt-10"
                />
              ) : null}

              <AuthorBox author={post.author} />

              <NewsletterCTA />
            </div>
          </article>

          <RelatedPosts posts={related} />
        </Container>
      </>
    )
  }

  if (isStaticPagePath(path)) {
    const page = await getPageBySlug(supabase, path[0])
    if (!page) notFound()

    const sanitized = page.content ? sanitizeArticleHtml(page.content) : ""
    const breadcrumbs = [
      { name: "Home", url: "/" },
      { name: page.title, url: `/${page.slug}` },
    ]

    return (
      <Container className="pt-28 lg:pt-32 pb-12 lg:pb-16">
        <article className="mx-auto mt-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {page.title}
          </h1>
          {sanitized ? (
            <ArticleContent html={sanitized} className="mt-8" />
          ) : null}
        </article>
      </Container>
    )
  }

  notFound()
}
