"use client"

import { createClient } from "@/lib/supabase/client"
import type { CategoryFormData } from "../validation/category"

function preparePayload(data: CategoryFormData) {
  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    description: data.description?.trim() || null,
    parent_id: data.parent_id || null,
    order_index: data.order_index,
  }
}

export async function createCategory(data: CategoryFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("categories")
    .insert(preparePayload(data))
    .select("id")
    .single()
  if (error) throw error
  return row
}

export async function updateCategory(id: string, data: CategoryFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("categories").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteCategory(id: string) {
  const supabase = createClient()
  const { count } = await supabase
    .from("post_categories")
    .select("post_id", { count: "exact", head: true })
    .eq("category_id", id)

  if ((count ?? 0) > 0) {
    throw new Error("Categoria con articoli collegati: rimuovi prima i collegamenti.")
  }

  const { error } = await supabase.from("categories").delete().eq("id", id)
  if (error) throw error
}
