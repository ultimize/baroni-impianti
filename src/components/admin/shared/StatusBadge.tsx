import { cn } from "@/lib/utils"
import {
  POST_STATUS_COLORS,
  POST_STATUS_LABELS,
  CONTACT_STATUS_COLORS,
  CONTACT_STATUS_LABELS,
  type PostStatus,
  type ContactStatus,
} from "@/lib/admin/utils/status"

type Props = {
  variant: "post" | "contact"
  value: PostStatus | ContactStatus
  className?: string
}

export function StatusBadge({ variant, value, className }: Props) {
  const colors = variant === "post" ? POST_STATUS_COLORS : CONTACT_STATUS_COLORS
  const labels = variant === "post" ? POST_STATUS_LABELS : CONTACT_STATUS_LABELS
  const color = (colors as Record<string, string>)[value] ?? "bg-slate-100 text-slate-700 border-slate-200"
  const label = (labels as Record<string, string>)[value] ?? value
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        color,
        className,
      )}
    >
      {label}
    </span>
  )
}
