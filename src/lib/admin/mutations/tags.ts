"use client"

import { createClient } from "@/lib/supabase/client"
import type { TagFormData } from "../validation/tag"

function preparePayload(data: TagFormData) {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    description: data.description?.trim() || null,
  }
}

export async function createTag(data: TagFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("tags")
    .insert(preparePayload(data))
    .select("id")
    .single()
  if (error) throw error
  return row
}

export async function updateTag(id: string, data: TagFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("tags").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteTag(id: string) {
  const supabase = createClient()
  const { count } = await supabase
    .from("post_tags")
    .select("post_id", { count: "exact", head: true })
    .eq("tag_id", id)

  if ((count ?? 0) > 0) {
    throw new Error("Tag con articoli collegati: rimuovi prima i collegamenti.")
  }

  const { error } = await supabase.from("tags").delete().eq("id", id)
  if (error) throw error
}

export async function bulkDeleteUnusedTags(): Promise<number> {
  const supabase = createClient()

  const { data: usedRows } = await supabase.from("post_tags").select("tag_id")
  const usedSet = new Set((usedRows ?? []).map((r) => r.tag_id))

  const { data: allTags } = await supabase.from("tags").select("id")
  const unusedIds = (allTags ?? []).map((t) => t.id).filter((id) => !usedSet.has(id))

  if (unusedIds.length === 0) return 0

  const { error } = await supabase.from("tags").delete().in("id", unusedIds)
  if (error) throw error
  return unusedIds.length
}
