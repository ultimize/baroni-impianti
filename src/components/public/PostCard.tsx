import Link from "next/link"
import Image from "next/image"
import { formatItalianDate } from "@/lib/content/format-date"
import { buildPostUrl } from "@/lib/content/url-builder"
import { CategoryBadge } from "./CategoryBadge"
import { ReadingTimeBadge } from "./ReadingTimeBadge"
import type { PostCard as PostCardType } from "@/lib/queries/posts"

type Props = {
  post: PostCardType
  priority?: boolean
}

export function PostCard({ post, priority = false }: Props) {
  const url = buildPostUrl(post.published_at, post.slug)
  const primaryCategory = post.categories?.[0]
  const alt = post.featured_image_alt || post.title

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {post.featured_image_url ? (
          <Image
            src={post.featured_image_url}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-muted-foreground">
            Baroni Impianti
          </div>
        )}
        {primaryCategory ? (
          <div className="absolute left-3 top-3 z-10">
            <CategoryBadge
              slug={primaryCategory.slug}
              name={primaryCategory.name}
              variant="overlay"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          <Link
            href={url}
            className="transition-colors hover:text-primary after:absolute after:inset-0 after:content-['']"
          >
            <span className="line-clamp-2">{post.title}</span>
          </Link>
        </h3>

        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-muted-foreground">
          <time dateTime={post.published_at}>
            {formatItalianDate(post.published_at)}
          </time>
          <ReadingTimeBadge minutes={post.reading_time_minutes} />
        </div>
      </div>
    </article>
  )
}
