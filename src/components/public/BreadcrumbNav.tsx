import Link from "next/link"
import Script from "next/script"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { breadcrumbSchema, renderJsonLd } from "@/lib/seo/json-ld"

type Item = { name: string; url: string }

type Props = {
  items: Item[]
  className?: string
  scriptId?: string
}

export function BreadcrumbNav({ items, className, scriptId = "breadcrumb-jsonld" }: Props) {
  if (items.length === 0) return null
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={cn("text-sm text-muted-foreground", className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={`${i}-${item.url}`} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-muted-foreground/60"
                    aria-hidden
                  />
                ) : null}
                {isLast ? (
                  <span aria-current="page" className="line-clamp-1 text-foreground">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <Script
        id={scriptId}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: renderJsonLd(breadcrumbSchema(items)),
        }}
      />
    </>
  )
}
