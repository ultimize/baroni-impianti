"use client"

import { createClient } from "@/lib/supabase/client"
import type { ContactStatus } from "../utils/status"
import type { Database } from "@/types/database"

type ContactUpdate = Database["public"]["Tables"]["contact_submissions"]["Update"]

function buildStatusUpdate(status: ContactStatus): ContactUpdate {
  const updates: ContactUpdate = { status }
  if (status === "read") updates.read_at = new Date().toISOString()
  if (status === "replied") updates.replied_at = new Date().toISOString()
  return updates
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const supabase = createClient()
  const { error } = await supabase
    .from("contact_submissions")
    .update(buildStatusUpdate(status))
    .eq("id", id)
  if (error) throw error
}

export async function bulkUpdateContactStatus(ids: string[], status: ContactStatus) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase
    .from("contact_submissions")
    .update(buildStatusUpdate(status))
    .in("id", ids)
  if (error) throw error
}

export async function bulkDeleteContacts(ids: string[]) {
  if (ids.length === 0) return
  const supabase = createClient()
  const { error } = await supabase.from("contact_submissions").delete().in("id", ids)
  if (error) throw error
}

export async function deleteContact(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
  if (error) throw error
}

export async function updateContactNotes(id: string, notes: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("contact_submissions")
    .update({ internal_notes: notes || null })
    .eq("id", id)
  if (error) throw error
}
