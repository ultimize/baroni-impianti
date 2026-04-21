"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
  placeholder?: string
  paramName?: string
  className?: string
}

export function SearchInput({ placeholder = "Cerca…", paramName = "q", className }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initial = searchParams.get(paramName) ?? ""
  const [value, setValue] = useState(initial)
  const [pending, startTransition] = useTransition()
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    setValue(initial)
  }, [initial])

  const apply = (next: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (next) params.set(paramName, next)
    else params.delete(paramName)
    params.delete("page")
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setValue(next)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => apply(next), 350)
  }

  const handleClear = () => {
    setValue("")
    apply("")
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={value} onChange={handleChange} placeholder={placeholder} className="h-9 pl-8 pr-9" />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Pulisci ricerca"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
        </Button>
      ) : null}
    </div>
  )
}
