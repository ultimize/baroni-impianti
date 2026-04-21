import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/public/Container"
import { BreadcrumbNav } from "@/components/public/BreadcrumbNav"
import { ArticleContent } from "@/components/public/ArticleContent"
import { createClient } from "@/lib/supabase/server"
import { sanitizeArticleHtml } from "@/lib/content/sanitize"

export const revalidate = 3600

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("services")
    .select("title, seo_title, seo_description, og_image_url")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (!data) return { title: "Servizio non trovato" }

  return {
    title: data.seo_title ?? data.title,
    description: data.seo_description ?? undefined,
    openGraph: data.og_image_url
      ? { images: [{ url: data.og_image_url }] }
      : undefined,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: service } = await supabase
    .from("services")
    .select("title, short_description, content")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (!service) notFound()

  const sanitized = service.content ? sanitizeArticleHtml(service.content) : ""

  return (
    <Container className="py-12 lg:py-16">
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: "Servizi", url: "/servizi" },
          { name: service.title, url: `/servizi/${slug}` },
        ]}
        scriptId={`breadcrumb-service-${slug}-jsonld`}
      />
      <article className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {service.title}
        </h1>
        {service.short_description ? (
          <p className="mt-4 text-lg text-muted-foreground">
            {service.short_description}
          </p>
        ) : null}
        {sanitized ? (
          <ArticleContent html={sanitized} className="mt-8" />
        ) : null}
      </article>
    </Container>
  )
}
