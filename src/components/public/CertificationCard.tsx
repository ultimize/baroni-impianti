import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type CertificationCardProps = {
  title: string
  issuer?: string | null
  description?: string | null
  imageUrl?: string | null
  icon: LucideIcon
  className?: string
}

export function CertificationCard({
  title,
  issuer,
  description,
  imageUrl,
  icon: Icon,
  className,
}: CertificationCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm",
        className,
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-[4/3] bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-primary/20 via-primary/10 to-muted">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-background text-primary shadow-md">
            <Icon className="h-10 w-10" aria-hidden strokeWidth={1.5} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {issuer ? (
          <p className="mt-1 text-sm italic text-muted-foreground">{issuer}</p>
        ) : null}
        {description ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  )
}
