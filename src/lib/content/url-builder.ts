import { getUrlDateParts } from "./format-date"

export function buildPostUrl(publishedAt: string, slug: string): string {
  const { year, month, day } = getUrlDateParts(publishedAt)
  return `/${year}/${month}/${day}/${slug}`
}

export function buildCategoryUrl(slug: string, page?: number): string {
  const base = `/blog/categoria/${slug}`
  return page && page > 1 ? `${base}/page/${page}` : base
}

export function buildTagUrl(slug: string, page?: number): string {
  const base = `/blog/tag/${slug}`
  return page && page > 1 ? `${base}/page/${page}` : base
}

export function buildBlogUrl(page?: number): string {
  return page && page > 1 ? `/blog/page/${page}` : "/blog"
}
