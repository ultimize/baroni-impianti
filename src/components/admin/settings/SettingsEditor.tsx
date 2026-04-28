"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, RotateCcw, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { batchUpdateSettings } from "@/lib/admin/mutations/settings"
import type { Json } from "@/types/database"

type Setting = {
  key: string
  value: Json | null
  description: string | null
  category: string | null
  is_public: boolean
  updated_at: string
}

type SettingUpdate = {
  key: string
  value: Json | null
}

type Props = { settings: Setting[] }

const CATEGORY_ORDER = ["general", "contact", "social", "seo", "tracking", "integrations", "legal"] as const
const CATEGORY_LABELS: Record<string, string> = {
  general: "Generale",
  contact: "Contatti",
  social: "Social",
  seo: "SEO",
  tracking: "Tracking & Analytics",
  integrations: "Integrazioni",
  legal: "Legale",
}

type CategoryHeader = {
  title: string
  description: string
  warning?: string
}

const CATEGORY_HEADERS: Record<string, CategoryHeader> = {
  tracking: {
    title: "Tracking & Analytics",
    description:
      "Codici di tracciamento per analytics e marketing. Tutti facoltativi, lascia vuoto per disabilitare.",
    warning:
      "Le modifiche sono attive immediatamente: al salvataggio la cache delle pagine pubbliche viene invalidata e le pagine vengono rigenerate al primo accesso successivo.",
  },
  seo: {
    title: "Verifica SEO",
    description: "Codici di verifica per i motori di ricerca.",
    warning:
      "Le modifiche sono attive immediatamente: al salvataggio la cache delle pagine pubbliche viene invalidata e le pagine vengono rigenerate al primo accesso successivo.",
  },
}

type FieldConfig = {
  label: string
  placeholder: string
  helper: string
}

const FIELD_CONFIG: Record<string, FieldConfig> = {
  tracking_gtm_id: {
    label: "Google Tag Manager ID",
    placeholder: "GTM-XXXXXXX",
    helper: "Container ID di GTM. Lascia vuoto se non usi GTM.",
  },
  tracking_ga4_id: {
    label: "Google Analytics 4 ID",
    placeholder: "G-XXXXXXXXXX",
    helper: "Misurazione GA4. Se usi GTM puoi gestire GA4 da lì.",
  },
  tracking_clarity_id: {
    label: "Microsoft Clarity ID",
    placeholder: "abc123xyz",
    helper: "Tag ID di Clarity per heatmap e session replay anonimi.",
  },
  tracking_meta_pixel_id: {
    label: "Meta Pixel ID",
    placeholder: "1234567890123456",
    helper: "Pixel Facebook/Instagram per misurazione campagne.",
  },
  seo_google_site_verification: {
    label: "Google Search Console",
    placeholder: "afL3O2Ec-vki_...",
    helper: "Solo il valore content del meta tag fornito da Google Search Console.",
  },
  seo_bing_site_verification: {
    label: "Bing Webmaster Tools",
    placeholder: "...",
    helper: "Codice verifica Bing. Opzionale.",
  },
}

const TRACKING_KEY_ORDER = [
  "tracking_gtm_id",
  "tracking_ga4_id",
  "tracking_clarity_id",
  "tracking_meta_pixel_id",
]
const SEO_VERIFICATION_KEY_ORDER = [
  "seo_google_site_verification",
  "seo_bing_site_verification",
]

function detectKind(value: Json | null): "string" | "number" | "boolean" | "array" | "object" | "null" {
  if (value === null || value === undefined) return "null"
  if (typeof value === "string") return "string"
  if (typeof value === "number") return "number"
  if (typeof value === "boolean") return "boolean"
  if (Array.isArray(value)) return "array"
  if (typeof value === "object") return "object"
  return "null"
}

function labelFromKey(key: string) {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function SettingsEditor({ settings }: Props) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, Json | null>>(() => {
    const m: Record<string, Json | null> = {}
    for (const s of settings) m[s.key] = s.value ?? null
    return m
  })
  const [pending, setPending] = useState(false)

  const dirty = useMemo(() => {
    for (const s of settings) {
      if (JSON.stringify(values[s.key]) !== JSON.stringify(s.value ?? null)) return true
    }
    return false
  }, [values, settings])

  const grouped = useMemo(() => {
    const map = new Map<string, Setting[]>()
    for (const s of settings) {
      const cat = s.category ?? "general"
      const arr = map.get(cat) ?? []
      arr.push(s)
      map.set(cat, arr)
    }
    const orderForCategory = (cat: string): string[] | null => {
      if (cat === "tracking") return TRACKING_KEY_ORDER
      if (cat === "seo") return SEO_VERIFICATION_KEY_ORDER
      return null
    }
    for (const [cat, rows] of map) {
      const order = orderForCategory(cat)
      if (!order) continue
      const indexOf = (k: string) => {
        const i = order.indexOf(k)
        return i === -1 ? order.length : i
      }
      rows.sort((a, b) => indexOf(a.key) - indexOf(b.key))
    }
    return map
  }, [settings])

  const categories = useMemo(() => {
    const known = Array.from(grouped.keys())
    const ordered: string[] = []
    for (const c of CATEGORY_ORDER) if (known.includes(c)) ordered.push(c)
    for (const c of known) if (!ordered.includes(c)) ordered.push(c)
    return ordered
  }, [grouped])

  const onReset = () => {
    const m: Record<string, Json | null> = {}
    for (const s of settings) m[s.key] = s.value ?? null
    setValues(m)
  }

  const onSave = async () => {
    setPending(true)
    try {
      const updates: SettingUpdate[] = []
      for (const s of settings) {
        if (JSON.stringify(values[s.key]) !== JSON.stringify(s.value ?? null)) {
          updates.push({ key: s.key, value: values[s.key] ?? null })
        }
      }
      await batchUpdateSettings(updates)
      toast.success(`Salvate ${updates.length} impostazion${updates.length === 1 ? "e" : "i"}`)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore salvataggio")
    } finally {
      setPending(false)
    }
  }

  const setKey = (key: string, v: Json | null) => setValues((prev) => ({ ...prev, [key]: v }))

  return (
    <div className="space-y-5">
      <Tabs defaultValue={categories[0]}>
        <TabsList variant="line">
          {categories.map((c) => (
            <TabsTrigger key={c} value={c}>
              {CATEGORY_LABELS[c] ?? labelFromKey(c)}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((c) => {
          const header = CATEGORY_HEADERS[c]
          return (
            <TabsContent key={c} value={c}>
              <div className="space-y-5 rounded-lg border bg-card p-5">
                {header ? (
                  <div className="space-y-1 border-b pb-4">
                    <h3 className="text-base font-semibold">{header.title}</h3>
                    <p className="text-sm text-muted-foreground">{header.description}</p>
                  </div>
                ) : null}
                {(grouped.get(c) ?? []).map((s) => (
                  <SettingRow
                    key={s.key}
                    setting={s}
                    value={values[s.key] ?? null}
                    onChange={(v) => setKey(s.key, v)}
                  />
                ))}
                {header?.warning ? (
                  <div className="flex items-start gap-2 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-200">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{header.warning}</span>
                  </div>
                ) : null}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <span className="text-xs text-muted-foreground">
          {dirty ? "Modifiche non salvate" : "Tutto salvato"}
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onReset} disabled={!dirty || pending}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Annulla modifiche
          </Button>
          <Button type="button" size="sm" onClick={onSave} disabled={!dirty || pending}>
            {pending ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
            Salva modifiche
          </Button>
        </div>
      </div>
    </div>
  )
}

function SettingRow({
  setting,
  value,
  onChange,
}: {
  setting: Setting
  value: Json | null
  onChange: (v: Json | null) => void
}) {
  const fieldConfig = FIELD_CONFIG[setting.key]
  if (fieldConfig) {
    const str = typeof value === "string" ? value : ""
    const isConfigured = str.trim().length > 0
    return (
      <FieldShell
        label={fieldConfig.label}
        description={fieldConfig.helper}
        statusBadge={isConfigured ? "configured" : "unconfigured"}
      >
        <Input
          value={str}
          placeholder={fieldConfig.placeholder}
          onChange={(e) => onChange(e.target.value || null)}
        />
      </FieldShell>
    )
  }

  const kind = detectKind(setting.value ?? value)
  const label = labelFromKey(setting.key)

  if (kind === "boolean") {
    return (
      <FieldShell label={label} description={setting.description}>
        <Switch checked={!!value} onCheckedChange={(v) => onChange(v)} />
      </FieldShell>
    )
  }
  if (kind === "number") {
    return (
      <FieldShell label={label} description={setting.description}>
        <Input
          type="number"
          value={value == null ? "" : String(value)}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          className="max-w-xs"
        />
      </FieldShell>
    )
  }
  if (kind === "string") {
    const str = (value as string) ?? ""
    const longish = str.length > 80 || setting.key.includes("description") || setting.key.includes("address")
    return (
      <FieldShell label={label} description={setting.description}>
        {longish ? (
          <Textarea rows={3} value={str} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <Input value={str} onChange={(e) => onChange(e.target.value)} />
        )}
      </FieldShell>
    )
  }
  if (kind === "array") {
    const arr = Array.isArray(value) ? (value as Json[]) : []
    // Array of strings (links, keywords, etc.) edited as textarea one-per-line
    const allStrings = arr.every((x) => typeof x === "string")
    if (allStrings) {
      return (
        <FieldShell label={label} description={setting.description}>
          <Textarea
            rows={4}
            value={(arr as string[]).join("\n")}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
          <p className="mt-1 text-xs text-muted-foreground">Un elemento per riga</p>
        </FieldShell>
      )
    }
    return (
      <FieldShell label={label} description={setting.description}>
        <JsonField value={value} onChange={onChange} />
      </FieldShell>
    )
  }
  if (kind === "object") {
    const obj = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, Json>) : {}
    return (
      <FieldShell label={label} description={setting.description}>
        <div className="space-y-2 rounded-md border bg-muted/30 p-3">
          {Object.keys(obj).map((subKey) => {
            const subVal = obj[subKey]
            if (typeof subVal === "boolean") {
              return (
                <div key={subKey} className="flex items-center justify-between gap-2 text-sm">
                  <Label className="m-0 text-xs text-muted-foreground">{labelFromKey(subKey)}</Label>
                  <Switch
                    checked={subVal}
                    onCheckedChange={(v) => onChange({ ...obj, [subKey]: v })}
                  />
                </div>
              )
            }
            if (typeof subVal === "number") {
              return (
                <div key={subKey} className="grid gap-1">
                  <Label className="m-0 text-xs text-muted-foreground">{labelFromKey(subKey)}</Label>
                  <Input
                    type="number"
                    value={String(subVal)}
                    onChange={(e) => onChange({ ...obj, [subKey]: Number(e.target.value) })}
                  />
                </div>
              )
            }
            return (
              <div key={subKey} className="grid gap-1">
                <Label className="m-0 text-xs text-muted-foreground">{labelFromKey(subKey)}</Label>
                <Input
                  value={typeof subVal === "string" ? subVal : ""}
                  onChange={(e) => onChange({ ...obj, [subKey]: e.target.value })}
                />
              </div>
            )
          })}
        </div>
      </FieldShell>
    )
  }
  // null
  return (
    <FieldShell label={label} description={setting.description}>
      <Input
        value={value == null ? "" : String(value)}
        onChange={(e) => onChange(e.target.value || null)}
      />
    </FieldShell>
  )
}

function FieldShell({
  label,
  description,
  children,
  statusBadge,
}: {
  label: string
  description: string | null
  children: React.ReactNode
  statusBadge?: "configured" | "unconfigured"
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">{label}</Label>
          {statusBadge ? <StatusBadge status={statusBadge} /> : null}
        </div>
      </div>
      {children}
      {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
    </div>
  )
}

function StatusBadge({ status }: { status: "configured" | "unconfigured" }) {
  if (status === "configured") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
        <span aria-hidden>●</span> Configurato
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/20 bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
      <span aria-hidden>○</span> Non configurato
    </span>
  )
}

function JsonField({ value, onChange }: { value: Json | null; onChange: (v: Json | null) => void }) {
  const [draft, setDraft] = useState(() => JSON.stringify(value ?? null, null, 2))
  const [valid, setValid] = useState(true)
  return (
    <>
      <Textarea
        rows={6}
        className="font-mono text-xs"
        value={draft}
        onChange={(e) => {
          const v = e.target.value
          setDraft(v)
          try {
            const parsed = v.trim() === "" ? null : (JSON.parse(v) as Json)
            setValid(true)
            onChange(parsed)
          } catch {
            setValid(false)
          }
        }}
      />
      {!valid ? <p className="mt-1 text-xs text-destructive">JSON non valido</p> : null}
    </>
  )
}
