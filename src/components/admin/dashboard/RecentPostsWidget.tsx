import Link from "next/link"
import { FileText } from "lucide-react"
import { StatusBadge } from "@/components/admin/shared/StatusBadge"
import { EmptyState } from "@/components/admin/shared/EmptyState"
import { formatRelativeFromNow } from "@/lib/admin/utils/format"
import type { RecentPostRow } from "@/lib/admin/queries/dashboard"

export function RecentPostsWidget({ posts }: { posts: RecentPostRow[] }) {
  return (
    <section className="rounded-lg border border-border/60 bg-card">
      <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
        <div>
          <h2 className="font-heading text-sm font-medium">Articoli recenti</h2>
          <p className="text-xs text-muted-foreground">Ultime modifiche</p>
        </div>
        <Link href="/admin/posts" className="text-xs font-medium text-primary hover:underline">
          Vedi tutti
        </Link>
      </header>
      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Nessun articolo"
          description="Inizia a creare il primo contenuto del blog."
          className="m-4"
        />
      ) : (
        <ul className="divide-y divide-border/60">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/posts/${p.id}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-accent"
              >
                <span className="flex-1 truncate">
                  <span className="block truncate text-sm font-medium">{p.title}</span>
                  <span className="text-xs text-muted-foreground">
                    Modificato {formatRelativeFromNow(p.updated_at)}
                  </span>
                </span>
                <StatusBadge variant="post" value={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
