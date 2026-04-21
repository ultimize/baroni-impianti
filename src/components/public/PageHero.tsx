import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/public/Container"
import { cn } from "@/lib/utils"

type Cta = { label: string; href: string }

type PageHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  primaryCta?: Cta
  secondaryCta?: Cta
  align?: "left" | "center"
  tone?: "default" | "brand"
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  align = "center",
  tone = "default",
  children,
}: PageHeroProps) {
  const isBrand = tone === "brand"
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60",
        isBrand
          ? "bg-gradient-to-b from-primary/10 via-background to-background"
          : "bg-background",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.06) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col",
            align === "center" ? "items-center text-center" : "items-start",
          )}
        >
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {lead}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div
              className={cn(
                "mt-8 flex flex-wrap gap-3",
                align === "center" ? "justify-center" : "",
              )}
            >
              {primaryCta ? (
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}
