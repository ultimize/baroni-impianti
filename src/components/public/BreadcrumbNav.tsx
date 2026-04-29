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
  tone?: "default" | "light"
}

export function BreadcrumbNav({
  items,
  className,
  scriptId = "breadcrumb-jsonld",
  tone = "default",
}: Props) {
  if (items.length === 0) return null
  const isLight = tone === "light"
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "text-sm",
          isLight ? "text-slate-300" : "text-muted-foreground",
          className,
        )}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li
                key={`${i}-${item.url}`}
                className={cn(
                  "items-center gap-1.5",
                  isLast ? "flex" : "hidden sm:flex",
                )}
              >
                {i > 0 ? (
                  <ChevronRight
                    className={cn(
                      "hidden h-3.5 w-3.5 sm:inline-block",
                      isLight ? "text-slate-500" : "text-muted-foreground/60",
                    )}
                    aria-hidden
                  />
                ) : null}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cn(
                      "line-clamp-1",
                      isLight ? "text-white" : "text-foreground",
                    )}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className={cn(
                      "transition-colors",
                      isLight ? "hover:text-white" : "hover:text-primary",
                    )}
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
