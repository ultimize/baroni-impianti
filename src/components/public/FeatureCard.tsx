import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type IconColor = "primary" | "red" | "green" | "amber"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: React.ReactNode
  iconColor?: IconColor
  className?: string
}

const ICON_COLORS: Record<IconColor, string> = {
  primary: "bg-primary/10 text-primary",
  red: "bg-red-100 text-red-600",
  green: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "primary",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 place-items-center rounded-xl",
          ICON_COLORS[iconColor],
        )}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
