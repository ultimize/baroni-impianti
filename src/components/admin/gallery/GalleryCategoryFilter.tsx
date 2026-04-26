"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { GALLERY_CATEGORIES } from "@/lib/admin/validation/gallery"

export function GalleryCategoryFilter({ value }: { value: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next === "all") {
      params.delete("category")
    } else {
      params.set("category", next)
    }
    params.delete("page")
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
    >
      <option value="all">Tutte le categorie</option>
      {GALLERY_CATEGORIES.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  )
}
