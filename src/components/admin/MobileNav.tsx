"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/public/Logo"
import { SidebarNav } from "./SidebarNav"

type Props = {
  role: "admin" | "editor" | "viewer"
  newContacts: number
}

export function MobileNav({ role, newContacts }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Apri menu">
            <Menu className="h-5 w-5" />
          </Button>
        }
      />
      <SheetContent side="left" className="flex w-72 flex-col p-0">
        <div className="flex h-16 items-center border-b px-6">
          <Logo />
        </div>
        <SidebarNav role={role} badges={{ newContacts }} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
