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
  const target = href ?? `/${slug}`

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden",
        highlight
          ? "bg-slate-950 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-amber-500/50"
          : "bg-white border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:border-brand/30"
      )}
    >
      {highlight && (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-500/10 blur-3xl rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
        </>
      )}

      <div className={cn(
        "absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-4 -translate-y-4 transition-transform duration-500 group-hover:scale-110 pointer-events-none",
        highlight ? "text-white" : "text-slate-900"
      )}>
        <Icon className="w-48 h-48" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <span
          className={cn(
            "inline-flex h-16 w-16 place-items-center justify-center rounded-2xl mb-8 transition-colors duration-300",
            highlight
              ? "bg-white/10 text-amber-400 border border-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400"
              : "bg-brand/10 text-brand border border-brand/20 group-hover:bg-brand group-hover:text-white"
          )}
        >
          <Icon className="h-7 w-7" aria-hidden strokeWidth={2} />
        </span>
        
        <h3 className={cn(
          "text-2xl font-bold tracking-tight mb-4",
          highlight ? "text-white" : "text-slate-900"
        )}>
          <Link
            href={target}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {name}
          </Link>
        </h3>
        
        <p className={cn(
          "flex-1 text-base leading-relaxed mb-8",
          highlight ? "text-slate-400 font-light" : "text-slate-600"
        )}>
          {shortDescription}
        </p>
        
        <span className={cn(
          "inline-flex items-center text-sm font-semibold mt-auto",
          highlight ? "text-amber-400" : "text-brand"
        )}>
          Scopri di più
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
