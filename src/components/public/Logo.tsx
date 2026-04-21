import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  variant?: "dark" | "light"
}

// TODO: appena arriva il logo vettoriale definitivo da Baroni, sostituire il
// file `public/logo.png` (o aggiungere una versione SVG) e mantenere il
// fallback grafico qui sotto. `HAS_LOGO_FILE` va ribaltato a `true` quando il
// file è presente in /public.
const HAS_LOGO_FILE = false

export function Logo({ className, variant = "dark" }: LogoProps) {
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
      {HAS_LOGO_FILE ? (
        <Image
          src="/logo.png"
          alt={SITE_NAME}
          height={40}
          width={160}
          priority
          className="h-10 w-auto"
        />
      ) : (
        <>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg leading-none">
            Baroni
            <span className="ml-1 text-primary">Impianti</span>
          </span>
        </>
      )}
    </Link>
  )
}
