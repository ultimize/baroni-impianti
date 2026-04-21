import { PostCard } from "./PostCard"
import type { PostCard as PostCardType } from "@/lib/queries/posts"

type Props = {
  posts: PostCardType[]
  heading?: string
}

export function RelatedPosts({ posts, heading = "Articoli correlati" }: Props) {
  if (posts.length === 0) return null
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
