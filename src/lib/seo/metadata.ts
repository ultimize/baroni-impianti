import type { Metadata } from "next"
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  BLOG_BASE_PATH,
} from "@/lib/constants"

export type ArticleMetaInput = {
  title: string
  excerpt: string | null
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  featured_image_url: string | null
  canonical_url: string | null
  wp_original_url: string | null
  noindex: boolean
  published_at: string
  updated_at?: string
  author?: { name: string } | null
}

// Canonical manuale solo se punta a un altro dominio: quelli sullo stesso dominio
// sono vecchi URL WordPress (?p=123, date diverse) che finiscono in redirect o 404.
function articleCanonical(post: ArticleMetaInput, selfPath: string): string {
  const manual = post.canonical_url?.trim()
  if (manual) {
    try {
      const host = new URL(manual).hostname.replace(/^www\./, "")
      if (host !== new URL(SITE_URL).hostname.replace(/^www\./, "")) return manual
    } catch {}
  }
  return selfPath
}

// Se il title contiene già il nome del sito, evita il suffisso del template ("| Baroni Impianti" due volte)
function brandTitle(title: string): Metadata["title"] {
  return title.includes(SITE_NAME) ? { absolute: title } : title
}

export function buildArticleMetadata(post: ArticleMetaInput, selfPath: string): Metadata {
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt || SITE_DESCRIPTION
  const ogImage = post.og_image_url || post.featured_image_url

  return {
    title: brandTitle(title),
    description,
    alternates: {
      canonical: articleCanonical(post, selfPath),
    },
    robots: post.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: SITE_NAME,
      locale: "it_IT",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  }
}

export function buildCategoryMetadata(category: {
  name: string
  description: string | null
  seo_title: string | null
  seo_description: string | null
}): Metadata {
  const title = category.seo_title || `Categoria: ${category.name}`
  const description =
    category.seo_description ||
    category.description ||
    `Articoli della categoria ${category.name}.`
  return {
    title: brandTitle(title),
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      locale: "it_IT",
      // openGraph qui sovrascrive quello ereditato: rimettiamo l'immagine di default
      images: ["/opengraph-image.jpg"],
    },
  }
}

export function buildTagMetadata(tag: {
  name: string
  description: string | null
}): Metadata {
  const title = `Tag: ${tag.name}`
  const description =
    tag.description || `Articoli con il tag ${tag.name}.`
  return {
    title,
    description,
    // Pagine tag fuori dall'indice (crawl budget), ma i link agli articoli restano seguiti
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      locale: "it_IT",
    },
  }
}

export function buildPageMetadata(page: {
  title: string
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  noindex: boolean
}): Metadata {
  const title = page.seo_title || page.title
  const description = page.seo_description || SITE_DESCRIPTION
  return {
    title: brandTitle(title),
    description,
    robots: page.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: SITE_NAME,
      locale: "it_IT",
      images: page.og_image_url
        ? [{ url: page.og_image_url, width: 1200, height: 630 }]
        : undefined,
    },
  }
}

export function buildBlogListMetadata(pageNumber: number): Metadata {
  const base = "Blog: guide sugli impianti elettrici in Liguria"
  const suffix = pageNumber > 1 ? ` — Pagina ${pageNumber}` : ""
  return {
    title: `${base}${suffix}`,
    description:
      "Guide pratiche, normative, approfondimenti e consigli sull'impiantistica elettrica a Sestri Levante e nel Tigullio.",
    alternates: {
      canonical:
        pageNumber > 1
          ? `${BLOG_BASE_PATH}/page/${pageNumber}`
          : BLOG_BASE_PATH,
    },
  }
}

export { SITE_URL }
