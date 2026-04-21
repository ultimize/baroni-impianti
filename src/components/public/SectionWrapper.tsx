import { Container } from "@/components/public/Container"
import { cn } from "@/lib/utils"

type Variant = "white" | "muted" | "primary-soft" | "primary"

type SectionWrapperProps = {
  variant?: Variant
  id?: string
  className?: string
  children: React.ReactNode
}

const VARIANTS: Record<Variant, string> = {
  white: "bg-background",
  muted: "bg-muted/30",
  "primary-soft": "bg-primary/5",
  primary: "bg-primary text-primary-foreground",
}

export function SectionWrapper({
  variant = "white",
  id,
  className,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        VARIANTS[variant],
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}
