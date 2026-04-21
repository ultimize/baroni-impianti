import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/public/Container"
import { PostsGrid } from "@/components/public/PostsGrid"
import { Pagination } from "@/components/public/Pagination"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { createClient } from "@/lib/supabase/server"
import { getPostsPaginated } from "@/lib/queries/posts"
import { getCategoriesWithCounts } from "@/lib/queries/categories"
import { getPopularTags } from "@/lib/queries/tags"
import {
  buildBlogUrl,
  buildCategoryUrl,
  buildTagUrl,
} from "@/lib/content/url-builder"

type BaseProps = {
  page: number
}

type Props =
  | (BaseProps & {
      kind: "all"
    })
  | (BaseProps & {
      kind: "category"
      categorySlug: string
      categoryName: string
      categoryDescription: string | null
    })
  | (BaseProps & {
      kind: "tag"
      tagSlug: string
      tagName: string
      tagDescription: string | null
    })

const PAGE_SIZE = 12

export async function BlogListingView(props: Props) {
  const supabase = await createClient()

  const queryArgs: Parameters<typeof getPostsPaginated>[1] = {
    page: props.page,
    pageSize: PAGE_SIZE,
  }
  if (props.kind === "category") queryArgs.categorySlug = props.categorySlug
  if (props.kind === "tag") queryArgs.tagSlug = props.tagSlug

  const [listing, categories, tags] = await Promise.all([
    getPostsPaginated(supabase, queryArgs),
    getCategoriesWithCounts(supabase, 12),
    getPopularTags(supabase, 20),
  ])

  if (listing.posts.length === 0 && props.page > 1) {
    notFound()
  }

  const buildUrl =
    props.kind === "category"
      ? (p: number) => buildCategoryUrl(props.categorySlug, p)
      : props.kind === "tag"
      ? (p: number) => buildTagUrl(props.tagSlug, p)
      : (p: number) => buildBlogUrl(p)

  const heading =
    props.kind === "category"
      ? props.categoryName
      : props.kind === "tag"
      ? `#${props.tagName}`
      : "Blog"

  const subheading =
    props.kind === "category"
      ? props.categoryDescription ??
        `Articoli della categoria ${props.categoryName}.`
      : props.kind === "tag"
      ? props.tagDescription ??
        `Articoli con il tag ${props.tagName}.`
      : "Guide pratiche, approfondimenti normativi e consigli dal cantiere."

  const breadcrumbs =
    props.kind === "category"
      ? [
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: props.categoryName, url: buildCategoryUrl(props.categorySlug) },
        ]
      : props.kind === "tag"
      ? [
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: `#${props.tagName}`, url: buildTagUrl(props.tagSlug) },
        ]
      : [
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]

  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={breadcrumbs}
        scriptId={`breadcrumb-${props.kind}-jsonld`}
      />

      <div className="mt-6 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {heading}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{subheading}</p>
        {props.page > 1 ? (
          <p className="text-sm text-muted-foreground">Pagina {props.page}</p>
        ) : null}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_260px]">
        <div>
          {listing.posts.length > 0 ? (
            <>
              <PostsGrid posts={listing.posts} priorityFirst={props.page === 1} />
              <Pagination
                currentPage={listing.currentPage}
                totalPages={listing.totalPages}
                buildUrl={buildUrl}
              />
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">
                Nessun articolo pubblicato in questa sezione.
              </p>
              <Link
                href="/blog"
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                Torna al blog
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-10">
          {categories.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Categorie
              </h2>
              <ul className="mt-4 space-y-2">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={buildCategoryUrl(c.slug)}
                      className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {c.post_count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tags.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Tag popolari
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link
                    key={t.id}
                    href={buildTagUrl(t.slug)}
                    className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    #{t.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </Container>
  )
}
