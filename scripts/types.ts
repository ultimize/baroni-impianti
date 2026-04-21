// Tipi minimi per parsare le risposte della WP REST API e
// costruire le righe destinate alle tabelle Supabase.

export type WPRendered = {
  rendered: string
  protected?: boolean
}

export type WPYoastImage = {
  url?: string
  width?: number
  height?: number
}

export type WPYoastHead = {
  title?: string
  description?: string
  og_image?: WPYoastImage[]
  canonical?: string
}

export type WPEmbeddedMedia = {
  id: number
  source_url?: string
  alt_text?: string
  media_details?: {
    sizes?: Record<string, { source_url?: string } | undefined>
  }
}

export type WPPostEmbedded = {
  "wp:featuredmedia"?: WPEmbeddedMedia[]
}

export type WPPost = {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  link: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  yoast_head_json?: WPYoastHead
  meta?: Record<string, unknown>
  _embedded?: WPPostEmbedded
}

export type WPUser = {
  id: number
  name: string
  slug: string
  description?: string
  email?: string
  url?: string
  avatar_urls?: Record<string, string>
}

export type WPCategory = {
  id: number
  count: number
  description: string
  name: string
  slug: string
  parent: number
  meta?: Record<string, unknown>
  yoast_head_json?: WPYoastHead
}

export type WPTag = {
  id: number
  count: number
  description: string
  name: string
  slug: string
  meta?: Record<string, unknown>
}

// Mappings persistiti nel checkpoint: WP id -> Supabase UUID.
export type IdMap = Record<string, string>

export type Checkpoint = {
  phase: "authors" | "categories" | "tags" | "posts" | "validation" | "done"
  lastProcessedPostId: number | null
  mediaCache: Record<string, string>
  taxonomyMaps: {
    authors: IdMap
    categories: IdMap
    tags: IdMap
  }
}

export type ImportReport = {
  startedAt: string
  finishedAt: string | null
  durationSeconds: number | null
  mode: "full" | "dry-run" | "resume"
  limit: number | null
  counts: {
    authorsImported: number
    categoriesImported: number
    tagsImported: number
    postsImported: number
    postsSkipped: number
    mediaUploaded: number
    mediaSkipped: number
    errors: number
  }
  warnings: string[]
  errors: { message: string; stack?: string }[]
}

export type ImportCliOptions = {
  dryRun: boolean
  resume: boolean
  limit: number | null
  yes: boolean
}
