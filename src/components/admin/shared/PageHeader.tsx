import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumb?: Crumb[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, breadcrumb, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {breadcrumb && breadcrumb.length > 0 ? (
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          {breadcrumb.map((crumb, idx) => {
            const isLast = idx === breadcrumb.length - 1
            return (
              <span key={`${crumb.label}-${idx}`} className="flex items-center gap-1">
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={cn(isLast && "text-foreground font-medium")}>{crumb.label}</span>
                )}
                {!isLast ? <ChevronRight className="h-3 w-3" /> : null}
              </span>
            )
          })}
        </nav>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}
