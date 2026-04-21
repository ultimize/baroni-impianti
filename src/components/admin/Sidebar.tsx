import { Logo } from "@/components/public/Logo"
import { SidebarNav } from "./SidebarNav"

type Props = {
  role: "admin" | "editor" | "viewer"
  newContacts: number
}

export function Sidebar({ role, newContacts }: Props) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card lg:flex">
      <div className="flex h-16 items-center border-b border-border/60 px-6">
        <Logo />
      </div>
      <SidebarNav role={role} badges={{ newContacts }} />
      <div className="border-t border-border/60 p-3 text-[11px] text-muted-foreground">
        <p className="font-medium">Baroni Impianti CMS</p>
        <p>Versione 1.0</p>
      </div>
    </aside>
  )
}
