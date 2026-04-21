import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/admin/Sidebar"
import { MobileNav } from "@/components/admin/MobileNav"
import { TopBar } from "@/components/admin/TopBar"
import { getNewContactsCount } from "@/lib/admin/queries/dashboard"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email, avatar_url")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    redirect("/?error=not_authorized")
  }

  const newContacts = await getNewContactsCount()

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar role={profile.role} newContacts={newContacts} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          name={profile.full_name ?? profile.email ?? user.email ?? "Utente"}
          email={profile.email ?? user.email ?? ""}
          avatarUrl={profile.avatar_url}
          role={profile.role}
          mobileNav={<MobileNav role={profile.role} newContacts={newContacts} />}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
