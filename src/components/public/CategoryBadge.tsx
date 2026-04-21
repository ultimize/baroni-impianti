import Link from "next/link"
import { cn } from "@/lib/utils"
import { buildCategoryUrl } from "@/lib/content/url-builder"

type Props = {
  slug: string
  name: string
  className?: string
  variant?: "solid" | "overlay"
}

export function CategoryBadge({ slug, name, className, variant = "solid" }: Props) {
  return (
    <Link
      href={buildCategoryUrl(slug)}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "solid"
          ? "bg-primary/10 text-primary hover:bg-primary/15"
          : "bg-background/90 text-foreground shadow-sm hover:bg-background",
        className,
      )}
    >
      {name}
    </Link>
  )
}
