"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, Eye, ExternalLink, RefreshCw, Trash2, Clock } from "lucide-react"
import { toast } from "sonner"

import { postFormSchema, type PostFormData } from "@/lib/admin/validation/post"
import { createPost, updatePost, deletePost } from "@/lib/admin/mutations/posts"
import { slugify } from "@/lib/admin/utils/slugify"
import {
  POST_STATUSES,
  POST_STATUS_LABELS,
  type PostStatus,
} from "@/lib/admin/utils/status"
import {
  toLocalDatetimeInput,
  fromLocalDatetimeInput,
} from "@/lib/admin/utils/format"
import { calculateReadingTime } from "@/lib/admin/utils/reading-time"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { FormField } from "@/components/admin/shared/FormField"
import { SlugInput } from "@/components/admin/shared/SlugInput"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { createInvalidHandler } from "@/lib/admin/utils/form-errors"
import { CategoryPicker } from "./CategoryPicker"
import { TagPicker } from "./TagPicker"
import { RichTextEditor } from "@/components/admin/editor/RichTextEditor"
import { MediaPicker } from "@/components/admin/media/MediaPicker"

type Author = { id: string; name: string }
type Category = { id: string; name: string }
type Tag = { id: string; name: string }

type Props = {
  mode: "create" | "edit"
  postId?: string
  defaultValues: PostFormData
  authors: Author[]
  categories: Category[]
  tags: Tag[]
}

export function PostForm({ mode, postId, defaultValues, authors, categories, tags }: Props) {
  const router = useRouter()
  const [availableTags, setAvailableTags] = useState<Tag[]>(tags)
  const [submitting, setSubmitting] = useState(false)
  const [seoOpen, setSeoOpen] = useState(false)

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { control, handleSubmit, watch, setValue, register, formState } = form

  const watchedTitle = watch("title")
  const watchedSlug = watch("slug")
  const watchedExcerpt = watch("excerpt") ?? ""
  const watchedContent = watch("content")
  const watchedStatus = watch("status")

  // Auto-generate slug from title when creating and slug is empty.
  useEffect(() => {
    if (mode === "create" && !watchedSlug && watchedTitle) {
      setValue("slug", slugify(watchedTitle), { shouldDirty: true })
    }
  }, [watchedTitle, watchedSlug, mode, setValue])

  // Recalc reading time (debounced) on content change.
  useEffect(() => {
    const t = setTimeout(() => {
      setValue("reading_time_minutes", calculateReadingTime(watchedContent ?? ""), {
        shouldDirty: false,
      })
    }, 600)
    return () => clearTimeout(t)
  }, [watchedContent, setValue])

  // Warn on unload when dirty.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (formState.isDirty && !submitting) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [formState.isDirty, submitting])

  const readingTime = watch("reading_time_minutes") ?? 0

  const SEO_FIELDS = ["seo_title", "seo_description", "og_image_url", "canonical_url", "noindex"]

  // Riapre il pannello SEO quando e' li' dentro che sta il campo non valido:
  // era il caso piu' insidioso, l'utente non vedeva proprio l'errore.
  const onInvalid = createInvalidHandler((fields) => {
    if (fields.some((field) => SEO_FIELDS.includes(field))) setSeoOpen(true)
  })

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true)
    try {
      if (mode === "create") {
        const created = await createPost(data)
        toast.success("Articolo creato")
        router.push(`/admin/posts/${created.id}`)
        router.refresh()
      } else if (postId) {
        await updatePost(postId, data)
        toast.success("Articolo salvato")
        router.refresh()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore durante il salvataggio")
    } finally {
      setSubmitting(false)
    }
  }, onInvalid)

  const handleSaveDraft = async () => {
    setValue("status", "draft", { shouldDirty: true })
    await onSubmit()
  }

  const handlePublish = async () => {
    if (!watch("published_at")) {
      setValue("published_at", new Date().toISOString(), { shouldDirty: true })
    }
    setValue("status", "published", { shouldDirty: true })
    await onSubmit()
  }

  const handleDelete = async () => {
    if (!postId) return
    try {
      await deletePost(postId)
      toast.success("Articolo eliminato")
      router.push("/admin/posts")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    }
  }

  const showPublishedAt = watchedStatus !== "draft"

  const errors = formState.errors

  const isPublishedView = useMemo(() => watchedStatus === "published", [watchedStatus])

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          <FormField label="Titolo" required error={errors.title?.message} htmlFor="title">
            <Input
              id="title"
              {...register("title")}
              placeholder="Titolo dell'articolo"
              className="h-11 text-lg"
            />
          </FormField>

          <FormField label="Slug" required error={errors.slug?.message} htmlFor="slug" hint={`/blog/.../${watchedSlug || "…"}`}>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <SlugInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  generateFrom={watchedTitle}
                  table="posts"
                  excludeId={postId}
                  invalid={!!errors.slug}
                />
              )}
            />
          </FormField>

          <FormField
            label="Estratto"
            description="Breve sommario mostrato nelle anteprime e nei meta SEO."
            error={errors.excerpt?.message}
            htmlFor="excerpt"
            hint={`${watchedExcerpt.length}/300`}
          >
            <Textarea id="excerpt" rows={3} {...register("excerpt")} />
          </FormField>

          <FormField label="Contenuto" error={errors.content?.message}>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  bucket="post-images"
                />
              )}
            />
          </FormField>

          <section className="rounded-lg border bg-card">
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-3 text-left"
              onClick={() => setSeoOpen((o) => !o)}
            >
              <span className="font-heading text-sm font-medium">SEO &amp; meta tag</span>
              <span className="text-xs text-muted-foreground">{seoOpen ? "Nascondi" : "Mostra"}</span>
            </button>
            {seoOpen ? (
              <div className="space-y-4 border-t px-5 py-4">
                <FormField label="SEO title" error={errors.seo_title?.message} hint="Max 70 caratteri">
                  <Input {...register("seo_title")} />
                </FormField>
                <FormField label="SEO description" error={errors.seo_description?.message} hint="Max 170 caratteri">
                  <Textarea rows={2} {...register("seo_description")} />
                </FormField>
                <FormField label="OG image" error={errors.og_image_url?.message}>
                  <Controller
                    control={control}
                    name="og_image_url"
                    render={({ field }) => (
                      <MediaPicker
                        value={field.value ?? null}
                        onChange={(url) => field.onChange(url ?? "")}
                        defaultBucket="post-images"
                      />
                    )}
                  />
                </FormField>
                <FormField label="Canonical URL" error={errors.canonical_url?.message}>
                  <Input placeholder="https://…" {...register("canonical_url")} />
                </FormField>
                <Controller
                  control={control}
                  name="noindex"
                  render={({ field }) => (
                    <label className="flex items-center gap-2 text-sm">
                      <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                      Escludi dai motori di ricerca (noindex)
                    </label>
                  )}
                />
              </div>
            ) : null}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Pubblicazione</h3>
            <div className="mt-4 space-y-3">
              <FormField label="Stato" error={errors.status?.message}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as PostStatus)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleziona stato">
                          {(value) => POST_STATUS_LABELS[value as PostStatus] ?? "Seleziona stato"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {POST_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {POST_STATUS_LABELS[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              {showPublishedAt ? (
                <FormField label="Data di pubblicazione" error={errors.published_at?.message}>
                  <Controller
                    control={control}
                    name="published_at"
                    render={({ field }) => (
                      <Input
                        type="datetime-local"
                        value={toLocalDatetimeInput(field.value)}
                        onChange={(e) => field.onChange(fromLocalDatetimeInput(e.target.value))}
                      />
                    )}
                  />
                </FormField>
              ) : null}

              <FormField label="Autore" error={errors.author_id?.message}>
                <Controller
                  control={control}
                  name="author_id"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleziona un autore">
                          {(value) =>
                            authors.find((a) => a.id === value)?.name ?? "Seleziona un autore"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Tempo di lettura
                </span>
                <span className="flex items-center gap-2 font-medium">
                  {readingTime} min
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setValue("reading_time_minutes", calculateReadingTime(watchedContent ?? ""))}
                    aria-label="Ricalcola"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Immagine in evidenza</h3>
            <div className="mt-3 space-y-3">
              <Controller
                control={control}
                name="featured_image_url"
                render={({ field }) => (
                  <MediaPicker
                    value={field.value ?? null}
                    onChange={(url) => field.onChange(url ?? "")}
                    defaultBucket="post-images"
                  />
                )}
              />
              <div>
                <Label className="text-xs">Testo alternativo</Label>
                <Input {...register("featured_image_alt")} placeholder="Descrizione immagine" className="mt-1" />
              </div>
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Categorie</h3>
            <div className="mt-3">
              <Controller
                control={control}
                name="category_ids"
                render={({ field }) => (
                  <CategoryPicker items={categories} selected={field.value ?? []} onChange={field.onChange} />
                )}
              />
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5">
            <h3 className="font-heading text-sm font-medium">Tag</h3>
            <div className="mt-3">
              <Controller
                control={control}
                name="tag_ids"
                render={({ field }) => (
                  <TagPicker
                    available={availableTags}
                    selected={field.value ?? []}
                    onChange={field.onChange}
                    onTagCreated={(t) => setAvailableTags((prev) => [...prev, t])}
                  />
                )}
              />
            </div>
          </section>

          {mode === "edit" && postId ? (
            <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <h3 className="font-heading text-sm font-medium text-destructive">Zona pericolo</h3>
              <p className="mt-1 text-xs text-muted-foreground">L&apos;eliminazione è permanente.</p>
              <div className="mt-3">
                <ConfirmDialog
                  trigger={
                    <Button type="button" variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Elimina articolo
                    </Button>
                  }
                  title="Eliminare l'articolo?"
                  description={`Stai per eliminare "${watchedTitle}". L'azione non è reversibile.`}
                  confirmLabel="Elimina"
                  onConfirm={handleDelete}
                />
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {formState.isDirty ? <span>Modifiche non salvate</span> : <span>Tutto salvato</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild type="button" variant="ghost" size="sm">
            <Link href="/admin/posts">Annulla</Link>
          </Button>
          {mode === "edit" && isPublishedView ? (
            <Button asChild type="button" variant="outline" size="sm">
              <a href={`/blog`} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                Vedi sul sito
              </a>
            </Button>
          ) : null}
          {watchedStatus !== "published" ? (
            <Button type="button" variant="outline" size="sm" onClick={handleSaveDraft} disabled={submitting}>
              {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
              Salva bozza
            </Button>
          ) : null}
          {watchedStatus === "published" ? (
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
              Aggiorna
            </Button>
          ) : (
            <Button type="button" size="sm" onClick={handlePublish} disabled={submitting}>
              {submitting ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Eye className="mr-1 h-3.5 w-3.5" />}
              Pubblica
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
