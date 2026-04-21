import { cn } from "@/lib/utils"

type Props = {
  html: string
  className?: string
}

export function ArticleContent({ html, className }: Props) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-xl prose-img:border prose-img:border-border/60",
        "prose-blockquote:border-l-primary prose-blockquote:text-foreground",
        "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:hidden prose-code:after:hidden",
        "prose-li:marker:text-primary",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
