import Link from "next/link"
import { Tag as TagIcon } from "lucide-react"
import { buildTagUrl } from "@/lib/content/url-builder"
import { cn } from "@/lib/utils"

type Tag = { id: string; slug: string; name: string }

type Props = {
  tags: Tag[]
  className?: string
  heading?: string
}

export function TagsList({ tags, className, heading }: Props) {
  if (tags.length === 0) return null
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {heading ? (
        <span className="mr-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <TagIcon className="h-4 w-4" aria-hidden />
          {heading}
        </span>
      ) : null}
      {tags.map((t) => (
        <Link
          key={t.id}
          href={buildTagUrl(t.slug)}
          className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          #{t.name}
        </Link>
      ))}
    </div>
  )
}
