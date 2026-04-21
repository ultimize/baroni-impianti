"use client"

import Link from "next/link"
import { LogOut, ExternalLink, User as UserIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type TopBarProps = {
  name: string
  email: string
  avatarUrl: string | null
  role: "admin" | "editor" | "viewer"
  mobileNav?: React.ReactNode
}

export function TopBar({ name, email, avatarUrl, role, mobileNav }: TopBarProps) {
  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-2">
        <span className="lg:hidden">{mobileNav}</span>
        <Button asChild variant="ghost" size="sm">
          <Link href="/" target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Vedi sito</span>
          </Link>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="flex h-auto items-center gap-3 rounded-full p-1 pr-3">
              <Avatar className="h-8 w-8">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
                <AvatarFallback>{initials || "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden text-left text-sm sm:block">
                <span className="block font-medium leading-tight">{name}</span>
                <span className="block text-xs text-muted-foreground leading-tight">{email}</span>
              </span>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{name}</span>
                <Badge variant="secondary" className="w-fit text-xs">
                  {role}
                </Badge>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/admin/profile" />}>
            <UserIcon className="mr-2 h-4 w-4" />
            Profilo
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/" target="_blank" />}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Visita il sito
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => {
              const form = document.getElementById("admin-signout-form") as HTMLFormElement | null
              form?.submit()
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Esci
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <form id="admin-signout-form" action="/auth/signout" method="post" className="hidden" />
    </header>
  )
}
