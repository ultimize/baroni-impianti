"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  total: number
  page: number
  pageSize: number
}

export function PaginationControls({ total, page, pageSize }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (total === 0) return null

  const buildHref = (next: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(next))
    return `${pathname}?${params.toString()}`
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs text-muted-foreground">
      <span>
        {start}–{end} di {total}
      </span>
      <div className="flex items-center gap-1">
        <Button asChild variant="outline" size="sm" disabled={page <= 1} aria-disabled={page <= 1}>
          <Link href={page > 1 ? buildHref(page - 1) : "#"}>
            <ChevronLeft className="mr-1 h-3.5 w-3.5" />
            Prec
          </Link>
        </Button>
        <span className="px-2 text-foreground">
          Pagina {page} di {totalPages}
        </span>
        <Button asChild variant="outline" size="sm" disabled={page >= totalPages} aria-disabled={page >= totalPages}>
          <Link href={page < totalPages ? buildHref(page + 1) : "#"}>
            Succ
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
