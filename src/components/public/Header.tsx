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
  { href: "/", label: "Home" },
  { href: "/specialista-elettrico-sestri-levante", label: "Chi siamo" },
  { 
    href: "/elettricista-a-chiavari-e-sestri-levante", 
    label: "Servizi",
    subItems: [
      { href: "/progettazione-impianti-rete-cablata-a-sestri-levante", label: "Impianti Cablati e wireless" },
      { href: "/realizzazione-di-impianti-digitali-integrati", label: "Impianti Digitali Integrati" },
      { href: "/progettazione-e-realizzazione-impianti-di-sicurezza-sestri-levante", label: "Impianti di Sicurezza" },
      { href: "/protezione-dalle-scariche-atmosferiche-installazione-spd", label: "Installazione SPD" },
      { href: "/zero-pensieri", label: 'Assistenza "ZERO PENSIERI"' },
    ]
  },
  { href: "/galleria", label: "Galleria" },
  { href: "/blog-per-elettricisti", label: "Blog" },
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

  const isHomePage = pathname === "/"
  const isDarkHero = isHomePage && !scrolled
  const headerSolid = scrolled || !isHomePage

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        headerSolid
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
              className={cn("h-10 lg:h-11 w-auto transition-all", isDarkHero && "brightness-0 invert")} 
              priority 
            />
            <span className={cn(
              "hidden sm:inline-block text-base font-semibold tracking-tight transition-colors",
              isDarkHero ? "text-white" : "text-slate-900"
            )}>
              Baroni Impianti
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
                  
              const baseLinkClass = cn(
                "text-sm transition-colors duration-200",
                active 
                  ? (isDarkHero ? "text-white font-bold" : "text-brand font-semibold")
                  : (isDarkHero ? "text-white/80 font-medium hover:text-white" : "text-slate-600 font-medium hover:text-brand")
              )

              if (link.subItems) {
                return (
                  <li key={link.href} className="group relative">
                    <Link href={link.href} className={cn(baseLinkClass, "flex items-center gap-1 py-4")}>
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Link>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-0 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                      <div className="rounded-xl border border-slate-200/60 bg-white p-2 shadow-lg relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200/60 rotate-45" />
                        <ul className="relative z-10 flex flex-col gap-1">
                          {link.subItems.map((sub) => {
                            const subActive = pathname === sub.href
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className={cn(
                                    "block w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    subActive ? "bg-brand/10 text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                                  )}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              }

              return (
                <li key={link.href}>
                  <Link href={link.href} className={baseLinkClass}>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/contatti"
              className={cn(
                "inline-flex items-center justify-center font-medium px-5 h-10 rounded-xl transition-colors hover:scale-[1.02] active:scale-[0.98]",
                isDarkHero 
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm" 
                  : "bg-brand hover:bg-brand-700 text-white"
              )}
            >
              Richiedi sopralluogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Apri menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl lg:hidden transition-colors",
                isDarkHero ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-slate-100 hover:text-brand"
              )}
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
                      
                  if (link.subItems) {
                    return (
                      <li key={link.href} className="flex flex-col gap-1">
                        <Link 
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors mt-2",
                            active ? "text-brand" : "text-slate-400 hover:text-brand"
                          )}
                        >
                          {link.label}
                        </Link>
                        <ul className="flex flex-col gap-1 pl-4 border-l-2 border-slate-100 ml-4 mb-2">
                          {link.subItems.map((sub) => {
                            const subActive = pathname === sub.href
                            return (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={() => setOpen(false)}
                                  className={cn(
                                    "block rounded-xl px-4 py-2.5 text-base font-medium transition-colors",
                                    subActive
                                      ? "bg-brand/10 text-brand"
                                      : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                                  )}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  }

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
