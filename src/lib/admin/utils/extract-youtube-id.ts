export function extractYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const trimmed = url.trim()
    if (!trimmed) return null

    const idOnly = /^[a-zA-Z0-9_-]{11}$/
    if (idOnly.test(trimmed)) return trimmed

    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\./, "")

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0]
      return id && idOnly.test(id) ? id : null
    }

    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v")
      if (v && idOnly.test(v)) return v

      const segments = u.pathname.split("/").filter(Boolean)
      const candidate =
        segments[0] === "embed" || segments[0] === "shorts" || segments[0] === "live" || segments[0] === "v"
          ? segments[1]
          : segments[0]
      return candidate && idOnly.test(candidate) ? candidate : null
    }

    return null
  } catch {
    return null
  }
}
