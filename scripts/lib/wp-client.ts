import { logger } from "./logger.js"
import type { WPCategory, WPPost, WPTag, WPUser } from "../types.js"

type FetchAllOptions = {
  status?: string
  perPage?: number
  context?: "view" | "edit" | "embed"
  embed?: boolean
  extraQuery?: Record<string, string>
}

type BinaryResponse = {
  buffer: Buffer
  contentType: string
}

function authHeader(): string {
  const user = process.env.WP_AUTH_USER
  const pass = process.env.WP_AUTH_PASSWORD
  if (!user || !pass) throw new Error("WP_AUTH_USER / WP_AUTH_PASSWORD mancanti")
  // La application password contiene spazi intenzionali: NON normalizzare.
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64")
}

function baseUrl(): string {
  const b = process.env.WP_API_BASE
  if (!b) throw new Error("WP_API_BASE mancante")
  return b.replace(/\/+$/, "")
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms))
}

// Wrapper fetch con retry/backoff e timeout 30s.
async function wpFetch(url: string, init: RequestInit = {}, attempt = 1): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: authHeader(),
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
    })
    if (res.ok) return res

    // Rate limit: rispetta Retry-After quando presente.
    if (res.status === 429) {
      const ra = Number(res.headers.get("retry-after") ?? "5")
      const wait = Math.max(1, isFinite(ra) ? ra : 5) * 1000
      logger.warn(`WP 429 rate limit, attendo ${wait}ms`)
      await sleep(wait)
      if (attempt < 5) return wpFetch(url, init, attempt + 1)
    }

    // Retriabile solo sui 5xx.
    if (res.status >= 500 && attempt < 3) {
      const wait = Math.pow(3, attempt - 1) * 1000
      logger.warn(`WP ${res.status} su ${url}, retry in ${wait}ms (tentativo ${attempt}/3)`)
      await sleep(wait)
      return wpFetch(url, init, attempt + 1)
    }

    const body = await res.text().catch(() => "")
    throw new Error(`WP request failed ${res.status} ${res.statusText} :: ${url}\n${body.slice(0, 500)}`)
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      if (attempt < 3) {
        const wait = Math.pow(3, attempt - 1) * 1000
        logger.warn(`WP timeout su ${url}, retry in ${wait}ms`)
        await sleep(wait)
        return wpFetch(url, init, attempt + 1)
      }
      throw new Error(`WP timeout definitivo su ${url}`)
    }
    // Errori di rete (ECONNRESET, ENOTFOUND, ecc.)
    if (attempt < 3 && err instanceof Error && err.message.includes("fetch")) {
      const wait = Math.pow(3, attempt - 1) * 1000
      logger.warn(`WP network error (${err.message}), retry in ${wait}ms`)
      await sleep(wait)
      return wpFetch(url, init, attempt + 1)
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

function buildUrl(endpoint: string, params: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${baseUrl()}${endpoint}`)
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    url.searchParams.set(k, String(v))
  }
  return url.toString()
}

async function fetchAllPaginated<T>(
  endpoint: string,
  options: FetchAllOptions = {},
  label = endpoint,
): Promise<T[]> {
  const perPage = options.perPage ?? 100
  const results: T[] = []
  let page = 1
  let totalPages = 1
  while (true) {
    const params: Record<string, string | number | boolean | undefined> = {
      per_page: perPage,
      page,
      context: options.context,
      status: options.status,
      _embed: options.embed ? 1 : undefined,
      ...(options.extraQuery ?? {}),
    }
    const url = buildUrl(endpoint, params)
    const res = await wpFetch(url)
    const headerTotalPages = Number(res.headers.get("x-wp-totalpages") ?? "1")
    if (page === 1) {
      totalPages = isFinite(headerTotalPages) && headerTotalPages > 0 ? headerTotalPages : 1
      logger.info(`Fetching ${label} page 1/${totalPages}...`)
    } else {
      logger.info(`Fetching ${label} page ${page}/${totalPages}...`)
    }
    const chunk = (await res.json()) as T[]
    if (!Array.isArray(chunk)) {
      throw new Error(`Risposta WP non è array per ${label}`)
    }
    results.push(...chunk)
    if (page >= totalPages) break
    page += 1
  }
  return results
}

export async function fetchAllUsers(): Promise<WPUser[]> {
  // context=edit richiede auth e restituisce email/url oltre ai campi pubblici.
  return fetchAllPaginated<WPUser>("/users", { context: "edit" }, "users")
}

export async function fetchAllCategories(): Promise<WPCategory[]> {
  // hide_empty=false esplicito: alcuni plugin (SEO, custom REST) alterano
  // il default WP e nascondono tassonomie non assegnate a post pubblicati.
  return fetchAllPaginated<WPCategory>(
    "/categories",
    { extraQuery: { hide_empty: "false" } },
    "categories",
  )
}

export async function fetchAllTags(): Promise<WPTag[]> {
  return fetchAllPaginated<WPTag>(
    "/tags",
    { extraQuery: { hide_empty: "false" } },
    "tags",
  )
}

export async function fetchAllPosts(): Promise<WPPost[]> {
  // status=publish,future include sia pubblicati sia programmati.
  // context=edit + _embed per avere meta completi e featured media embedded.
  return fetchAllPaginated<WPPost>(
    "/posts",
    {
      status: "publish,future",
      context: "edit",
      embed: true,
    },
    "posts",
  )
}

export async function fetchPostById(id: number): Promise<WPPost> {
  const url = buildUrl(`/posts/${id}`, { context: "edit", _embed: 1 })
  const res = await wpFetch(url)
  return (await res.json()) as WPPost
}

// Discovery leggera: totali senza scaricare i dati, usata solo per il banner.
export async function fetchTotals(): Promise<{
  authors: number
  categories: number
  tags: number
  postsPublished: number
  postsScheduled: number
}> {
  const [authorsRes, catsRes, tagsRes, pubRes, schedRes] = await Promise.all([
    wpFetch(buildUrl("/users", { per_page: 1, context: "edit" })),
    wpFetch(buildUrl("/categories", { per_page: 1 })),
    wpFetch(buildUrl("/tags", { per_page: 1 })),
    wpFetch(buildUrl("/posts", { per_page: 1, status: "publish", context: "edit" })),
    wpFetch(buildUrl("/posts", { per_page: 1, status: "future", context: "edit" })),
  ])
  const parseTotal = (res: Response): number => Number(res.headers.get("x-wp-total") ?? "0")
  // Consumiamo i body per liberare le connessioni (senza usarli).
  await Promise.all([authorsRes.text(), catsRes.text(), tagsRes.text(), pubRes.text(), schedRes.text()])
  return {
    authors: parseTotal(authorsRes),
    categories: parseTotal(catsRes),
    tags: parseTotal(tagsRes),
    postsPublished: parseTotal(pubRes),
    postsScheduled: parseTotal(schedRes),
  }
}

export async function downloadBinary(url: string): Promise<BinaryResponse> {
  // Le immagini/media possono stare su CDN esterni: non mandiamo l'Authorization
  // di WP verso terzi (evita leak di credenziali su domini non WP).
  const targetIsWp = url.startsWith(baseUrl().replace(/\/wp-json\/?.*$/, ""))
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: targetIsWp ? { Authorization: authHeader() } : {},
    })
    if (!res.ok) {
      throw new Error(`Download fallito ${res.status} ${res.statusText} :: ${url}`)
    }
    const contentType = res.headers.get("content-type") ?? "application/octet-stream"
    const arrayBuffer = await res.arrayBuffer()
    return { buffer: Buffer.from(arrayBuffer), contentType }
  } finally {
    clearTimeout(timeout)
  }
}
