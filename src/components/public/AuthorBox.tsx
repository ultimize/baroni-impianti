import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  author: {
    name: string
    bio: string | null
    avatar_url: string | null
  } | null
}

export function AuthorBox({ author }: Props) {
  if (!author) return null
  if (!author.bio && !author.avatar_url) return null

  const initials = author.name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()

  return (
    <aside className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border/60 bg-muted/30 p-6 sm:flex-row sm:items-center">
      <Avatar className="h-16 w-16">
        {author.avatar_url ? (
          <AvatarImage src={author.avatar_url} alt={author.name} />
        ) : null}
        <AvatarFallback>
          {initials || <User className="h-6 w-6" aria-hidden />}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Scritto da
        </p>
        <p className="text-lg font-semibold text-foreground">{author.name}</p>
        {author.bio ? (
          <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
        ) : null}
      </div>
    </aside>
  )
}
