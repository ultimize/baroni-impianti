"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export type GalleryLightboxItem = {
  src: string
  alt: string
  width: number
  height: number
}

type Props = {
  items: GalleryLightboxItem[]
}

export function GalleryLightbox({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length))
  }, [items.length])
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length))
  }, [items.length])

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [activeIndex, close, prev, next])

  const active = activeIndex !== null ? items[activeIndex] : null

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            onClick={() => setActiveIndex(i)}
            className="block w-full overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Apri immagine"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-auto rounded-xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Chiudi"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Precedente"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Successivo"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div onClick={(e) => e.stopPropagation()} className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="90vw"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
