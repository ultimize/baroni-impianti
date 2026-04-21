import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { STORAGE_BUCKETS, type StorageBucketId } from "@/lib/admin/utils/storage"

function isAllowedBucket(value: string): value is StorageBucketId {
  return STORAGE_BUCKETS.some((b) => b.id === value)
}

async function ensureAuthorized() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" as const, status: 401 }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return { error: "Forbidden" as const, status: 403 }
  }
  return { user, role: profile.role }
}

export async function GET(request: NextRequest) {
  const auth = await ensureAuthorized()
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const url = new URL(request.url)
  const bucket = url.searchParams.get("bucket")
  if (!bucket || !isAllowedBucket(bucket)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 })
  }

  const admin = createAdminClient()

  // List recursively by traversing year/month directories.
  type Entry = {
    name: string
    path: string
    size: number
    updatedAt: string | null
    publicUrl: string
  }
  const entries: Entry[] = []

  const { data: years } = await admin.storage.from(bucket).list("", {
    limit: 100,
    sortBy: { column: "name", order: "desc" },
  })

  for (const year of years ?? []) {
    if (!year.id && /^\d{4}$/.test(year.name)) {
      const { data: months } = await admin.storage.from(bucket).list(year.name, {
        limit: 100,
        sortBy: { column: "name", order: "desc" },
      })
      for (const month of months ?? []) {
        if (!month.id && /^\d{2}$/.test(month.name)) {
          const prefix = `${year.name}/${month.name}`
          const { data: files } = await admin.storage.from(bucket).list(prefix, {
            limit: 1000,
            sortBy: { column: "created_at", order: "desc" },
          })
          for (const f of files ?? []) {
            if (f.id) {
              const path = `${prefix}/${f.name}`
              const { data: pub } = admin.storage.from(bucket).getPublicUrl(path)
              entries.push({
                name: f.name,
                path,
                size: (f.metadata?.size as number) ?? 0,
                updatedAt: f.updated_at ?? f.created_at ?? null,
                publicUrl: pub.publicUrl,
              })
            }
          }
        }
      }
    } else if (year.id) {
      // Files at root.
      const { data: pub } = admin.storage.from(bucket).getPublicUrl(year.name)
      entries.push({
        name: year.name,
        path: year.name,
        size: (year.metadata?.size as number) ?? 0,
        updatedAt: year.updated_at ?? year.created_at ?? null,
        publicUrl: pub.publicUrl,
      })
    }
  }

  entries.sort((a, b) => {
    const av = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
    const bv = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
    return bv - av
  })

  return NextResponse.json({ files: entries })
}

export async function DELETE(request: NextRequest) {
  const auth = await ensureAuthorized()
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const body = (await request.json().catch(() => null)) as
    | { bucket?: string; path?: string }
    | null
  if (!body || !body.bucket || !body.path) {
    return NextResponse.json({ error: "Missing bucket or path" }, { status: 400 })
  }
  if (!isAllowedBucket(body.bucket)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 })
  }

  const admin = createAdminClient()
  const { error } = await admin.storage.from(body.bucket).remove([body.path])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
