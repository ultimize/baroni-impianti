export const STORAGE_BUCKETS = [
  { id: "post-images", label: "Articoli" },
  { id: "testimonial-thumbnails", label: "Testimonianze" },
  { id: "certifications", label: "Certificazioni" },
  { id: "service-images", label: "Servizi" },
  { id: "gallery", label: "Galleria" },
  { id: "site-assets", label: "Asset sito" },
] as const

export type StorageBucketId = (typeof STORAGE_BUCKETS)[number]["id"]

export const ALLOWED_IMAGE_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
] as const

export const ALLOWED_UPLOAD_MIME = [
  ...ALLOWED_IMAGE_MIME,
  "application/pdf",
] as const

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024 // 10 MB

export function sanitizeFileName(name: string): string {
  const dot = name.lastIndexOf(".")
  const base = dot > 0 ? name.slice(0, dot) : name
  const ext = dot > 0 ? name.slice(dot) : ""
  const safeBase = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "")
  return `${safeBase || "file"}${safeExt}`
}

export function buildStoragePath(filename: string): string {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const sanitized = sanitizeFileName(filename)
  return `${yyyy}/${mm}/${Date.now()}-${sanitized}`
}
