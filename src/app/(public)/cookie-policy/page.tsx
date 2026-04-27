import type { Metadata } from "next"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa estesa sui cookie utilizzati dal sito Baroni Impianti.",
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Informativa cookie"
        title="Cookie Policy"
        lead="Informativa estesa sui cookie utilizzati dal sito Baroni Impianti."
      />
      <SectionWrapper>
        <article className="prose prose-slate max-w-3xl mx-auto">
          {/* TODO: incollare contenuto Iubenda */}
          <p>Contenuto in caricamento</p>
        </article>
      </SectionWrapper>
    </>
  )
}
