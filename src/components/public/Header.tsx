"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, ArrowRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/zero-pensieri", label: "Zero Pensieri" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/85"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 lg:h-20 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            <Image 
              src="/logo.png" 
              alt="Baroni Impianti" 
              width={48} 
              height={48} 
              className="h-10 lg:h-11 w-auto" 
              priority 
            />
            <span className="hidden sm:inline-block text-base font-semibold tracking-tight text-slate-900">
              Baroni Impianti
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors duration-200",
                      active 
                        ? "text-brand font-semibold" 
                        : "text-slate-600 font-medium hover:text-brand"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-700 text-white font-medium px-5 h-10 rounded-xl transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              Richiedi sopralluogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Apri menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand lg:hidden transition-colors"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:max-w-sm border-l border-slate-200/60 bg-white">
              <SheetHeader className="text-left mb-6">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                    <Image 
                      src="/logo.png" 
                      alt="Baroni Impianti" 
                      width={40} 
                      height={40} 
                      className="h-8 w-auto" 
                    />
                    <span className="text-base font-semibold tracking-tight text-slate-900">
                      Baroni Impianti
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-brand/10 text-brand"
                            : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-8">
                <Link
                  href="/contatti"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center bg-brand text-white font-medium px-5 h-12 rounded-xl transition-colors hover:bg-brand-700"
                >
                  Richiedi sopralluogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
