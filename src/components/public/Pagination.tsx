import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  currentPage: number
  totalPages: number
  buildUrl: (page: number) => string
  className?: string
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | "ellipsis")[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  if (left > 2) pages.push("ellipsis")
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push("ellipsis")
  pages.push(total)
  return pages
}

export function Pagination({
  currentPage,
  totalPages,
  buildUrl,
  className,
}: Props) {
  if (totalPages <= 1) return null
  const pages = getPageNumbers(currentPage, totalPages)
  const prevUrl = currentPage > 1 ? buildUrl(currentPage - 1) : null
  const nextUrl = currentPage < totalPages ? buildUrl(currentPage + 1) : null

  const linkClasses =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
  const currentClasses =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-primary bg-primary px-3 text-sm font-medium text-primary-foreground"
  const disabledClasses =
    "inline-flex h-9 min-w-9 cursor-not-allowed items-center justify-center rounded-md border border-border bg-muted/40 px-3 text-sm font-medium text-muted-foreground"

  return (
    <nav
      aria-label="Paginazione"
      className={cn(
        "mt-12 flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      {prevUrl ? (
        <Link href={prevUrl} className={linkClasses} rel="prev" aria-label="Pagina precedente">
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">Precedente</span>
        </Link>
      ) : (
        <span className={disabledClasses} aria-disabled>
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">Precedente</span>
        </span>
      )}

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="px-2 text-sm text-muted-foreground"
            aria-hidden
          >
            …
          </span>
        ) : p === currentPage ? (
          <span key={p} className={currentClasses} aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} href={buildUrl(p)} className={linkClasses}>
            {p}
          </Link>
        ),
      )}

      {nextUrl ? (
        <Link href={nextUrl} className={linkClasses} rel="next" aria-label="Pagina successiva">
          <span className="mr-1 hidden sm:inline">Successiva</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={disabledClasses} aria-disabled>
          <span className="mr-1 hidden sm:inline">Successiva</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}
