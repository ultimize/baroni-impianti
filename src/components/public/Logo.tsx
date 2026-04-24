import Link from "next/link"
import Image from "next/image"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  variant?: "dark" | "light"
  showText?: boolean
}

export function Logo({ className, variant = "dark", showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} — homepage`}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        variant === "light" ? "text-white" : "text-foreground",
        className,
      )}
    >
      <Image
        src="/Logo.png"
        alt={SITE_NAME}
        width={48}
        height={48}
        priority
        className="h-10 w-auto"
      />
      {showText ? (
        <span className="hidden text-base leading-none sm:inline">
          Baroni
          <span className="ml-1 text-primary">Impianti</span>
        </span>
      ) : null}
    </Link>
  )
}
