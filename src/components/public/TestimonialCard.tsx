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
        "flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-brand/30",
        placeholder && "opacity-80",
        className,
      )}
    >
      {youtubeId ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-[1.5rem] bg-slate-900 shadow-inner">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={authorName ?? "Video testimonianza"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 h-full w-full border-0"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1" aria-label={`${rating} stelle`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < rating
                    ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    : "text-slate-200",
                )}
              />
            ))}
          </div>
          <Quote className="h-8 w-8 text-slate-100" aria-hidden strokeWidth={1.5} />
        </div>

        <blockquote className="mt-2 flex-1 text-base leading-relaxed text-slate-700 italic">
          {placeholder ? (
            <span className="text-slate-400">
              {placeholderLabel ?? "Presto qui — testimonianza di un cliente."}
            </span>
          ) : (
            `"${quote}"`
          )}
        </blockquote>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-lg">
            {(authorName ?? "C")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">
              {authorName ?? "Cliente"}
            </p>
            {authorRole ? (
              <p className="text-sm font-medium text-brand">{authorRole}</p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
