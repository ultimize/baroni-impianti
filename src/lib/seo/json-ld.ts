import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants"
import {
  getSiteSettings,
  settingAddress,
  settingString,
} from "@/lib/queries/site-content"
import { createPublicClient } from "@/lib/supabase/public-client"

type JsonLd = Record<string, unknown>

async function getReviewsAggregate(): Promise<{
  rating: number
  count: number
} | null> {
  try {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from("google_reviews_sync_state")
      .select("total_rating, total_reviews_count")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    if (!data) return null
    const rating = data.total_rating
    const count = data.total_reviews_count
    if (rating == null || count == null || count <= 0) return null
    return { rating, count }
  } catch {
    return null
  }
}

export async function organizationSchema(): Promise<JsonLd> {
  const settings = await getSiteSettings()

  const legalName = settingString(
    settings,
    "company_legal_name",
    "BARONI IMPIANTI di Baroni Luca",
  )
  const vat = settingString(settings, "company_vat", "02438410991")
  const phone = settingString(settings, "company_phone")
  const email = settingString(settings, "company_email")
  const foundedYear = settingString(settings, "company_founded_year", "2000")
  const mainClaim = settingString(
    settings,
    "company_main_claim",
    SITE_DESCRIPTION,
  )
  const address = settingAddress(settings)

  const facebook = settingString(settings, "social_facebook")
  const instagram = settingString(settings, "social_instagram")
  const linkedin = settingString(settings, "social_linkedin")
  const youtube = settingString(settings, "social_youtube")
  const sameAs = [facebook, instagram, linkedin, youtube].filter(
    (u) => u.length > 0,
  )

  const reviews = await getReviewsAggregate()

  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: SITE_NAME,
    legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description: mainClaim,
    areaServed: [
      { "@type": "City", name: "Sestri Levante" },
      { "@type": "City", name: "Chiavari" },
      { "@type": "AdministrativeArea", name: "Provincia di Genova" },
      { "@type": "AdministrativeArea", name: "Provincia di La Spezia" },
    ],
  }

  if (phone) schema.telephone = phone
  if (email) schema.email = email
  if (vat) schema.vatID = `IT${vat}`
  if (foundedYear) schema.foundingDate = `${foundedYear}-01-01`

  if (address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.zip,
      addressLocality: address.city,
      addressRegion: address.province,
      addressCountry: address.country || "IT",
    }
  }

  if (sameAs.length > 0) schema.sameAs = sameAs

  if (reviews) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "it-IT",
  }
}

export function articleSchema(post: {
  title: string
  excerpt: string | null
  featured_image_url: string | null
  og_image_url: string | null
  published_at: string
  updated_at: string
  author?: { name: string; avatar_url?: string | null } | null
}, url: string): JsonLd {
  const image = post.og_image_url || post.featured_image_url
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: image ? [image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.avatar_url ?? undefined,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "it-IT",
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  }
}

export function serviceSchema(service: {
  title: string
  description: string
  slug: string
  category?: string
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/${service.slug}`,
    provider: {
      "@type": "Electrician",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Sestri Levante" },
      { "@type": "City", name: "Chiavari" },
      { "@type": "AdministrativeArea", name: "Provincia di Genova" },
    ],
    serviceType: service.category || "Impianti elettrici",
  }
}

export function renderJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
