import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  slug: string
  name: string
  shortDescription: string
  iconName?: string | null
  href?: string
  highlight?: boolean
}

function resolveIcon(iconName?: string | null): LucideIcon {
  if (!iconName) return Wrench
  const dict = Icons as unknown as Record<string, LucideIcon>
  const Icon = dict[iconName]
  return Icon ?? Wrench
}

export function ServiceCard({
  slug,
  name,
  shortDescription,
  iconName,
  href,
  highlight,
}: ServiceCardProps) {
  const Icon = resolveIcon(iconName)
  const target = href ?? `/servizi/${slug}`

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-7 shadow-sm transition-shadow hover:shadow-md",
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border/60",
      )}
    >
      <span
        className={cn(
          "grid h-14 w-14 place-items-center rounded-2xl",
          highlight
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-7 w-7" aria-hidden strokeWidth={1.75} />
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">
        <Link
          href={target}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {shortDescription}
      </p>
      <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
        Scopri di più
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  )
}
