import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { cn } from "@/lib/utils"

type Cta = { label: string; href: string }

type ClosingCtaProps = {
  title: React.ReactNode
  lead?: React.ReactNode
  primaryCta: Cta
  secondaryCta?: Cta
  variant?: "muted" | "primary" | "primary-soft"
}

export function ClosingCta({
  title,
  lead,
  primaryCta,
  secondaryCta,
  variant = "primary-soft",
}: ClosingCtaProps) {
  const isFilled = variant === "primary"
  return (
    <section
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        variant === "muted" && "bg-muted/30",
        variant === "primary-soft" && "bg-primary/5",
        variant === "primary" && "bg-primary text-primary-foreground",
      )}
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {lead ? (
            <p
              className={cn(
                "mt-4 text-base sm:text-lg",
                isFilled ? "text-primary-foreground/85" : "text-muted-foreground",
              )}
            >
              {lead}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant={isFilled ? "secondary" : "default"}
            >
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {secondaryCta ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={cn(
                  isFilled &&
                    "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
