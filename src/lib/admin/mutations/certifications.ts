"use client"

import { createClient } from "@/lib/supabase/client"
import type { CertificationFormData } from "../validation/certification"

function preparePayload(data: CertificationFormData) {
  return {
    title: data.title.trim(),
    description: data.description?.trim() || null,
    image_url: data.image_url?.trim() || null,
    issuer: data.issuer?.trim() || null,
    issued_year: data.issued_year ?? null,
    valid_until: data.valid_until || null,
    order_index: data.order_index,
    is_featured: data.is_featured,
    is_published: data.is_published,
  }
}

export async function createCertification(data: CertificationFormData) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("certifications")
    .insert(preparePayload(data))
    .select("id")
    .single()
  if (error) throw error
  return row
}

export async function updateCertification(id: string, data: CertificationFormData) {
  const supabase = createClient()
  const { error } = await supabase.from("certifications").update(preparePayload(data)).eq("id", id)
  if (error) throw error
}

export async function deleteCertification(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("certifications").delete().eq("id", id)
  if (error) throw error
}

export async function bulkDeleteCertifications(ids: string[]) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase.from("certifications").delete().in("id", ids)
  if (error) throw error
}
