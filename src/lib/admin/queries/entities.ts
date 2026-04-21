import "server-only"

import { createClient } from "@/lib/supabase/server"

type Pagination = {
  page?: number
  pageSize?: number
  search?: string
}

function pageRange(page = 1, size = 25) {
  const from = (Math.max(1, page) - 1) * size
  const to = from + size - 1
  return { from, to }
}

export async function listTestimonials(opts: Pagination = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 25
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("testimonials")
    .select(
      "id, client_name, project_title, location, youtube_video_id, thumbnail_url, order_index, is_featured, is_published, updated_at",
      { count: "exact" },
    )

  if (opts.search) {
    query = query.ilike("client_name", `%${opts.search}%`)
  }
  query = query.order("order_index", { ascending: true }).order("updated_at", { ascending: false }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function getTestimonialById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function listCertifications(opts: Pagination = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 25
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("certifications")
    .select(
      "id, title, issuer, issued_year, image_url, order_index, is_featured, is_published, updated_at",
      { count: "exact" },
    )
  if (opts.search) {
    query = query.ilike("title", `%${opts.search}%`)
  }
  query = query.order("order_index", { ascending: true }).order("updated_at", { ascending: false }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function getCertificationById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("certifications").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function listServices(opts: Pagination = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 25
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("services")
    .select(
      "id, slug, title, short_description, icon, featured_image_url, order_index, is_featured, is_published, updated_at",
      { count: "exact" },
    )
  if (opts.search) {
    query = query.ilike("title", `%${opts.search}%`)
  }
  query = query.order("order_index", { ascending: true }).order("updated_at", { ascending: false }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function getServiceById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("services").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function listPages(opts: Pagination = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 25
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("pages")
    .select(
      "id, slug, title, template, is_published, is_system, noindex, updated_at",
      { count: "exact" },
    )
  if (opts.search) {
    query = query.ilike("title", `%${opts.search}%`)
  }
  query = query.order("title", { ascending: true }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function getPageById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("pages").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function listRedirects(opts: Pagination = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 50
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("redirects")
    .select("id, old_path, new_path, status_code, is_active, hit_count, notes, last_hit_at, updated_at", {
      count: "exact",
    })
  if (opts.search) {
    query = query.ilike("old_path", `%${opts.search}%`)
  }
  query = query.order("old_path", { ascending: true }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function listAllSiteSettings() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value, description, category, is_public, updated_at")
    .order("category", { ascending: true })
    .order("key", { ascending: true })
  if (error) throw error
  return data ?? []
}

export type ContactListOptions = Pagination & {
  status?: "new" | "read" | "replied" | "archived" | "spam" | "all"
}

export async function listContacts(opts: ContactListOptions = {}) {
  const supabase = await createClient()
  const page = opts.page ?? 1
  const pageSize = opts.pageSize ?? 25
  const { from, to } = pageRange(page, pageSize)

  let query = supabase
    .from("contact_submissions")
    .select(
      "id, full_name, email, subject, message, status, source_page, created_at",
      { count: "exact" },
    )
  if (opts.status && opts.status !== "all") {
    query = query.eq("status", opts.status)
  }
  if (opts.search) {
    query = query.or(`full_name.ilike.%${opts.search}%,email.ilike.%${opts.search}%,subject.ilike.%${opts.search}%`)
  }
  query = query.order("created_at", { ascending: false }).range(from, to)

  const { data, count, error } = await query
  if (error) throw error
  return { rows: data ?? [], total: count ?? 0, page, pageSize }
}

export async function getContactById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("contact_submissions").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data
}

export async function getContactStatusCounts() {
  const supabase = await createClient()
  const [all, neu, read, replied, archived, spam] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "read"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "replied"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "archived"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "spam"),
  ])
  return {
    all: all.count ?? 0,
    new: neu.count ?? 0,
    read: read.count ?? 0,
    replied: replied.count ?? 0,
    archived: archived.count ?? 0,
    spam: spam.count ?? 0,
  }
}
