"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Option = { value: string; label: string }

type Props = {
  options: Option[]
  paramName?: string
  placeholder?: string
  className?: string
}

export function StatusFilter({ options, paramName = "status", placeholder = "Tutti", className }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get(paramName) ?? "all"

  const handleChange = (value: string | null) => {
    const next = value ?? ""
    const params = new URLSearchParams(searchParams.toString())
    if (!next || next === "all") params.delete(paramName)
    else params.set(paramName, next)
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }

  const labelFor = (value: string) => {
    if (value === "all") return "Tutti"
    return options.find((o) => o.value === value)?.label ?? placeholder
  }

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger size="sm" className={className}>
        <SelectValue placeholder={placeholder}>
          {(value) => labelFor(value as string)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tutti</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
