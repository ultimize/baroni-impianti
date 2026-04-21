import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  ALLOWED_UPLOAD_MIME,
  MAX_UPLOAD_BYTES,
  STORAGE_BUCKETS,
  buildStoragePath,
  type StorageBucketId,
} from "@/lib/admin/utils/storage"

function isAllowedBucket(value: string): value is StorageBucketId {
  return STORAGE_BUCKETS.some((b) => b.id === value)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = formData.get("file")
  const bucket = String(formData.get("bucket") ?? "")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }
  if (!bucket || !isAllowedBucket(bucket)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 })
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File troppo grande (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB)` },
      { status: 400 },
    )
  }
  if (!(ALLOWED_UPLOAD_MIME as readonly string[]).includes(file.type)) {
    return NextResponse.json({ error: `Tipo file non consentito (${file.type || "sconosciuto"})` }, { status: 400 })
  }

  const path = buildStoragePath(file.name)
  const admin = createAdminClient()
  const { error: uploadError } = await admin.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
    cacheControl: "31536000",
  })
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({
    path,
    publicUrl: data.publicUrl,
    bucket,
    name: file.name,
    size: file.size,
    contentType: file.type,
  })
}
