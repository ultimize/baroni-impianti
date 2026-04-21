import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  minutes: number | null | undefined
  className?: string
}

export function ReadingTimeBadge({ minutes, className }: Props) {
  if (!minutes || minutes <= 0) return null
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground",
        className,
      )}
    >
      <Clock className="h-3.5 w-3.5" aria-hidden />
      {minutes} min di lettura
    </span>
  )
}
