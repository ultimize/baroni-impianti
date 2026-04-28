import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database, Json } from "@/types/database"
import { createPublicClient } from "@/lib/supabase/public-client"

type Supa = SupabaseClient<Database>

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"]
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"]
export type CertificationRow = Database["public"]["Tables"]["certifications"]["Row"]

export type SettingsMap = Record<string, Json | null>

export type CompanyAddress = {
  street: string
  zip: string
  city: string
  province: string
  country?: string
}

async function defaultClient(): Promise<Supa> {
  return createPublicClient() as unknown as Supa
}

export async function getSiteSettings(client?: Supa): Promise<SettingsMap> {
  const supabase = client ?? (await defaultClient())
  const { data } = await supabase
    .from("site_settings")
    .select("key, value")
    .eq("is_public", true)
  if (!data) return {}
  const map: SettingsMap = {}
  for (const row of data) map[row.key] = row.value
  return map
}

export async function getSettingValue<T = string>(
  key: string,
  client?: Supa,
): Promise<T | null> {
  const supabase = client ?? (await defaultClient())
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle()
  if (error || !data) return null
  return (data.value as unknown as T) ?? null
}

export function settingString(
  settings: SettingsMap,
  key: string,
  fallback = "",
): string {
  const v = settings[key]
  return typeof v === "string" ? v : fallback
}

export function settingAddress(
  settings: SettingsMap,
): CompanyAddress | null {
  const v = settings["company_address"]
  if (!v || typeof v !== "object" || Array.isArray(v)) return null
  const obj = v as Record<string, unknown>
  const street = typeof obj.street === "string" ? obj.street : ""
  const zip = typeof obj.zip === "string" ? obj.zip : ""
  const city = typeof obj.city === "string" ? obj.city : ""
  const province = typeof obj.province === "string" ? obj.province : ""
  const country = typeof obj.country === "string" ? obj.country : undefined
  if (!street && !city) return null
  return { street, zip, city, province, country }
}

export async function getPublishedTestimonials(
  client?: Supa,
): Promise<TestimonialRow[]> {
  const supabase = client ?? (await defaultClient())
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true })
  return data ?? []
}

export async function getPublishedCertifications(
  client?: Supa,
): Promise<CertificationRow[]> {
  const supabase = client ?? (await defaultClient())
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true })
  return data ?? []
}

export async function getPublishedServices(
  client?: Supa,
): Promise<ServiceRow[]> {
  const supabase = client ?? (await defaultClient())
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true })
  return data ?? []
}

export async function getServiceBySlug(
  slug: string,
  client?: Supa,
): Promise<ServiceRow | null> {
  const supabase = client ?? (await defaultClient())
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()
  return data
}
