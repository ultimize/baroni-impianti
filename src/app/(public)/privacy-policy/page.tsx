import type { Metadata } from "next"
import { PageHero } from "@/components/public/PageHero"
import { SectionWrapper } from "@/components/public/SectionWrapper"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Informativa privacy"
        title="Privacy Policy"
        lead="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
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
