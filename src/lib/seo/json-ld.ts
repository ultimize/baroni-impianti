import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants"

type JsonLd = Record<string, unknown>

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/favicon.ico`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sestri Levante",
      addressRegion: "GE",
      addressCountry: "IT",
    },
  }
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
        url: `${SITE_URL}/favicon.ico`,
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

export function renderJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
