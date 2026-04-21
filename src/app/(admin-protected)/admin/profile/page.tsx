import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/admin/shared/PageHeader"
import { ProfileForm } from "@/components/admin/forms/ProfileForm"
import type { ProfileFormData } from "@/lib/admin/validation/profile"

export const dynamic = "force-dynamic"

export default async function AdminProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, avatar_url, role")
    .eq("id", user.id)
    .maybeSingle()

  const defaultValues: ProfileFormData = {
    full_name: profile?.full_name ?? "",
    avatar_url: profile?.avatar_url ?? "",
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profilo"
        description={`Ruolo: ${profile?.role ?? "—"}`}
        breadcrumb={[{ label: "Admin", href: "/admin" }, { label: "Profilo" }]}
      />
      <ProfileForm
        userId={user.id}
        email={profile?.email ?? user.email ?? ""}
        defaultValues={defaultValues}
      />
    </div>
  )
}
