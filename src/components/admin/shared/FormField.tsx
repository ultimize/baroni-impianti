import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type Props = {
  label: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
  hint?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function FormField({ label, htmlFor, description, error, required, hint, className, children }: Props) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
          {required ? <span className="text-destructive">*</span> : null}
        </Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {description && !error ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
