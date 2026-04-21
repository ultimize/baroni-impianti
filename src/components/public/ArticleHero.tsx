import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatItalianDate } from "@/lib/content/format-date"
import { ReadingTimeBadge } from "./ReadingTimeBadge"
import { CategoryBadge } from "./CategoryBadge"
import type { PostDetail } from "@/lib/queries/posts"

type Props = {
  post: PostDetail
}

export function ArticleHero({ post }: Props) {
  const alt = post.featured_image_alt || post.title
  const initials = post.author?.name
    ? post.author.name
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0])
        .filter(Boolean)
        .join("")
        .toUpperCase()
    : null

  return (
    <header className="mx-auto mt-8 max-w-3xl">
      {post.categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 3).map((c) => (
            <CategoryBadge key={c.id} slug={c.slug} name={c.name} />
          ))}
        </div>
      ) : null}

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {post.excerpt ? (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border/60 py-4 text-sm text-muted-foreground">
        {post.author ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {post.author.avatar_url ? (
                <AvatarImage
                  src={post.author.avatar_url}
                  alt={post.author.name}
                />
              ) : null}
              <AvatarFallback>
                {initials ?? <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/blog?author=${post.author.slug}`}
              className="font-medium text-foreground hover:text-primary"
            >
              {post.author.name}
            </Link>
          </div>
        ) : null}
        <span className="h-3 w-px bg-border" aria-hidden />
        <time dateTime={post.published_at}>
          {formatItalianDate(post.published_at)}
        </time>
        {post.reading_time_minutes ? (
          <>
            <span className="h-3 w-px bg-border" aria-hidden />
            <ReadingTimeBadge minutes={post.reading_time_minutes} />
          </>
        ) : null}
      </div>

      {post.featured_image_url ? (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
          <Image
            src={post.featured_image_url}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      ) : null}
    </header>
  )
}
