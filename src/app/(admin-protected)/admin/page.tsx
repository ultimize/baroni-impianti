import { createClient } from "@/lib/supabase/server"
import {
  getDashboardStats,
  getRecentEditedPosts,
  getRecentContacts,
} from "@/lib/admin/queries/dashboard"
import { StatsCards } from "@/components/admin/dashboard/StatsCards"
import { QuickActions } from "@/components/admin/dashboard/QuickActions"
import { RecentPostsWidget } from "@/components/admin/dashboard/RecentPostsWidget"
import { RecentContactsWidget } from "@/components/admin/dashboard/RecentContactsWidget"
import { MigrationStatus } from "@/components/admin/dashboard/MigrationStatus"
import { formatItalianDate } from "@/lib/content/format-date"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const profileRes = user
    ? await supabase.from("profiles").select("full_name, email").eq("id", user.id).maybeSingle()
    : { data: null }
  const profile = profileRes.data

  const [stats, recentPosts, recentContacts] = await Promise.all([
    getDashboardStats(),
    getRecentEditedPosts(5),
    getRecentContacts(5),
  ])

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 6) return "Buona notte"
    if (h < 13) return "Buongiorno"
    if (h < 19) return "Buon pomeriggio"
    return "Buonasera"
  })()
  const firstName = (profile?.full_name ?? profile?.email ?? "").split(/[\s@]/)[0] || "amministratore"

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {formatItalianDate(new Date().toISOString(), "EEEE d MMMM yyyy")}
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {greeting}, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Una panoramica veloce dello stato del sito Baroni Impianti.
        </p>
      </header>

      <StatsCards stats={stats} />

      <QuickActions />

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentPostsWidget posts={recentPosts} />
        <RecentContactsWidget contacts={recentContacts} />
      </div>

      <MigrationStatus stats={stats} />
    </div>
  )
}
