"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { galleryFormSchema, type GalleryFormData } from "../validation/gallery"

const GALLERY_BUCKET = "gallery"

function preparePayload(data: GalleryFormData) {
  return {
    title: data.title.trim(),
    description: data.description?.trim() || null,
    image_url: data.image_url.trim(),
    alt_text: data.alt_text?.trim() || data.title.trim(),
    category: data.category,
    width: data.width ?? null,
    height: data.height ?? null,
    order_index: data.order_index,
    is_featured: data.is_featured,
    is_published: data.is_published,
  }
}

function revalidateAll() {
  revalidatePath("/galleria")
  revalidatePath("/admin/gallery")
}

// Estrae il path interno al bucket dato un URL pubblico Supabase Storage.
// Es. https://x.supabase.co/storage/v1/object/public/gallery/foo/bar.jpg → foo/bar.jpg
function extractBucketPath(publicUrl: string): string | null {
  const marker = `/storage/v1/object/public/${GALLERY_BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(publicUrl.slice(idx + marker.length))
}

export async function createGalleryItem(data: GalleryFormData) {
  const parsed = galleryFormSchema.parse(data)
  const supabase = await createClient()
  const { data: row, error } = await supabase
    .from("gallery_items")
    .insert(preparePayload(parsed))
    .select("id")
    .single()
  if (error) throw new Error(error.message)
  revalidateAll()
  return row
}

export async function updateGalleryItem(id: string, data: GalleryFormData) {
  const parsed = galleryFormSchema.parse(data)
  const supabase = await createClient()
  const { error } = await supabase.from("gallery_items").update(preparePayload(parsed)).eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  // Recupera l'image_url per cancellare anche il file dal bucket
  const { data: row } = await supabase
    .from("gallery_items")
    .select("image_url")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("gallery_items").delete().eq("id", id)
  if (error) throw new Error(error.message)

  if (row?.image_url) {
    const path = extractBucketPath(row.image_url)
    if (path) {
      // Best-effort: se il file non esiste o errore storage, non bloccare il delete.
      await supabase.storage.from(GALLERY_BUCKET).remove([path])
    }
  }
  revalidateAll()
}

export async function toggleGalleryItemPublished(id: string, isPublished: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("gallery_items")
    .update({ is_published: isPublished })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
}

// Sposta order_index su o giù scambiando con il vicino. Robusto a buchi.
export async function moveGalleryItem(id: string, direction: "up" | "down") {
  const supabase = await createClient()
  const { data: current, error: curErr } = await supabase
    .from("gallery_items")
    .select("id, order_index")
    .eq("id", id)
    .maybeSingle()
  if (curErr || !current) throw new Error(curErr?.message ?? "Elemento non trovato")

  const ascending = direction === "down"
  const baseQuery = supabase
    .from("gallery_items")
    .select("id, order_index")
  const filtered = direction === "down"
    ? baseQuery.gt("order_index", current.order_index)
    : baseQuery.lt("order_index", current.order_index)
  const { data: neighbor, error: nErr } = await filtered
    .order("order_index", { ascending })
    .limit(1)
    .maybeSingle()

  if (nErr) throw new Error(nErr.message)
  if (!neighbor) {
    revalidateAll()
    return
  }

  // Scambio: usa indici univoci se possibile. Per evitare conflitti UNIQUE
  // (qui non c'è), facciamo update diretti.
  const { error: e1 } = await supabase
    .from("gallery_items")
    .update({ order_index: neighbor.order_index })
    .eq("id", current.id)
  if (e1) throw new Error(e1.message)
  const { error: e2 } = await supabase
    .from("gallery_items")
    .update({ order_index: current.order_index })
    .eq("id", neighbor.id)
  if (e2) throw new Error(e2.message)

  revalidateAll()
}
