import { cn } from "@/lib/utils"
import { PostCard } from "./PostCard"
import type { PostCard as PostCardType } from "@/lib/queries/posts"

type Props = {
  posts: PostCardType[]
  className?: string
  priorityFirst?: boolean
}

export function PostsGrid({ posts, className, priorityFirst = false }: Props) {
  if (posts.length === 0) return null
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} priority={priorityFirst && i === 0} />
      ))}
    </div>
  )
}
