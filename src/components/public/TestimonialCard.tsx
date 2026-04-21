import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"

type TestimonialCardProps = {
  quote?: string
  authorName?: string
  authorRole?: string
  rating?: number
  youtubeId?: string
  placeholder?: boolean
  placeholderLabel?: string
  className?: string
}

// TODO: when the `testimonials` Supabase table is populated, fetch rows and
// render this component with real `quote`, `authorName`, `youtubeId` data.
// Until then, render in placeholder mode with `placeholder` flag.
export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  rating = 5,
  youtubeId,
  placeholder,
  placeholderLabel,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6",
        placeholder && "opacity-80",
        className,
      )}
    >
      {youtubeId ? (
        <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-muted">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={authorName ?? "Video testimonianza"}
            loading="lazy"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : null}

      <Quote
        className="h-8 w-8 text-primary/30"
        aria-hidden
        strokeWidth={1.5}
      />

      <div className="mt-3 flex gap-0.5" aria-label={`${rating} stelle`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30",
            )}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        {placeholder ? (
          <span className="italic text-muted-foreground">
            {placeholderLabel ?? "Presto qui — testimonianza di un cliente."}
          </span>
        ) : (
          quote
        )}
      </blockquote>

      <div className="mt-6 border-t border-border/60 pt-4">
        <p className="text-sm font-semibold text-foreground">
          {authorName ?? "Cliente"}
        </p>
        {authorRole ? (
          <p className="text-xs text-muted-foreground">{authorRole}</p>
        ) : null}
      </div>
    </article>
  )
}
