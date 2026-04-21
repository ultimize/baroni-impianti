import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 bg-card p-10 text-center",
        className,
      )}
    >
      {Icon ? <Icon className="mb-3 h-9 w-9 text-muted-foreground" /> : null}
      <h3 className="font-heading text-base font-medium">{title}</h3>
      {description ? <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
