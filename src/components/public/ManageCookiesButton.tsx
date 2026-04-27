"use client"

import { cn } from "@/lib/utils"

export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("baroni:open-cookie-banner"))
        }
      }}
      className={cn("transition-colors hover:text-white", className)}
    >
      Gestisci cookie
    </button>
  )
}
