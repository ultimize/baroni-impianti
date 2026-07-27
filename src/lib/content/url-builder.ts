import { getUrlDateParts } from "./format-date"
import { BLOG_BASE_PATH } from "@/lib/constants"

export function buildPostUrl(publishedAt: string, slug: string): string {
  const { year, month, day } = getUrlDateParts(publishedAt)
  return `/${year}/${month}/${day}/${slug}`
}

export function buildCategoryUrl(slug: string, page?: number): string {
  const base = `${BLOG_BASE_PATH}/categoria/${slug}`
  return page && page > 1 ? `${base}/page/${page}` : base
}

export function buildTagUrl(slug: string, page?: number): string {
  const base = `${BLOG_BASE_PATH}/tag/${slug}`
  return page && page > 1 ? `${base}/page/${page}` : base
}

export function buildBlogUrl(page?: number): string {
  return page && page > 1 ? `${BLOG_BASE_PATH}/page/${page}` : BLOG_BASE_PATH
}
