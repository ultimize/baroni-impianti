import "server-only"

import { createClient } from "@/lib/supabase/server"

export type DashboardStats = {
  posts: { total: number; published: number; draft: number; scheduled: number }
  testimonials: number
  certifications: number
  services: number
  pages: number
  newContacts: number
  authorsCount: number
  categoriesCount: number
  tagsCount: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()
  const [
    postsTotal,
    postsPublished,
    postsDraft,
    postsScheduled,
    testimonials,
    certifications,
    services,
    pages,
    newContacts,
    authors,
    categories,
    tags,
  ] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("certifications").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("authors").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("tags").select("id", { count: "exact", head: true }),
  ])

  return {
    posts: {
      total: postsTotal.count ?? 0,
      published: postsPublished.count ?? 0,
      draft: postsDraft.count ?? 0,
      scheduled: postsScheduled.count ?? 0,
    },
    testimonials: testimonials.count ?? 0,
    certifications: certifications.count ?? 0,
    services: services.count ?? 0,
    pages: pages.count ?? 0,
    newContacts: newContacts.count ?? 0,
    authorsCount: authors.count ?? 0,
    categoriesCount: categories.count ?? 0,
    tagsCount: tags.count ?? 0,
  }
}

export type RecentPostRow = {
  id: string
  title: string
  slug: string
  status: "draft" | "scheduled" | "published" | "archived"
  updated_at: string
  published_at: string | null
}

export async function getRecentEditedPosts(limit = 5): Promise<RecentPostRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, status, updated_at, published_at")
    .order("updated_at", { ascending: false })
    .limit(limit)
  return (data ?? []) as RecentPostRow[]
}

export type RecentContactRow = {
  id: string
  full_name: string
  email: string
  message: string
  status: "new" | "read" | "replied" | "archived" | "spam"
  created_at: string
}

export async function getRecentContacts(limit = 5): Promise<RecentContactRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("contact_submissions")
    .select("id, full_name, email, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit)
  return (data ?? []) as RecentContactRow[]
}

export async function getNewContactsCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("status", "new")
  return count ?? 0
}
