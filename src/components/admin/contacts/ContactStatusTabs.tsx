"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ContactStatus } from "@/lib/admin/utils/status"

type Counts = Record<"all" | ContactStatus, number>

const TABS: { value: "all" | ContactStatus; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "new", label: "Nuovi" },
  { value: "read", label: "Letti" },
  { value: "replied", label: "Risposti" },
  { value: "archived", label: "Archiviati" },
  { value: "spam", label: "Spam" },
]

export function ContactStatusTabs({ counts }: { counts: Counts }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get("status") ?? "all"

  const buildHref = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") params.delete("status")
    else params.set("status", value)
    params.delete("page")
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex flex-wrap gap-1 border-b">
      {TABS.map((tab) => {
        const active = current === tab.value
        return (
          <Link
            key={tab.value}
            href={buildHref(tab.value)}
            className={cn(
              "inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
              {counts[tab.value]}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
