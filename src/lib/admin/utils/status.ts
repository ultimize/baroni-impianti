export const POST_STATUSES = ["draft", "scheduled", "published", "archived"] as const
export type PostStatus = (typeof POST_STATUSES)[number]

export const POST_STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Bozza",
  scheduled: "Programmato",
  published: "Pubblicato",
  archived: "Archiviato",
}

export const POST_STATUS_COLORS: Record<PostStatus, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  scheduled: "bg-amber-100 text-amber-800 border-amber-200",
  published: "bg-emerald-100 text-emerald-800 border-emerald-200",
  archived: "bg-zinc-100 text-zinc-600 border-zinc-200",
}

export const CONTACT_STATUSES = ["new", "read", "replied", "archived", "spam"] as const
export type ContactStatus = (typeof CONTACT_STATUSES)[number]

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: "Nuovo",
  read: "Letto",
  replied: "Risposto",
  archived: "Archiviato",
  spam: "Spam",
}

export const CONTACT_STATUS_COLORS: Record<ContactStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  read: "bg-slate-100 text-slate-700 border-slate-200",
  replied: "bg-emerald-100 text-emerald-800 border-emerald-200",
  archived: "bg-zinc-100 text-zinc-600 border-zinc-200",
  spam: "bg-rose-100 text-rose-700 border-rose-200",
}
