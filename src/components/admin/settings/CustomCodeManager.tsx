"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Code2, Loader2, Plus, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { saveCustomCodeSnippets } from "@/lib/admin/mutations/custom-code"
import type {
  CustomCodeConsent,
  CustomCodePosition,
  CustomCodeSnippet,
} from "@/lib/custom-code/snippets"

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `snippet-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function emptySnippet(): CustomCodeSnippet {
  return { id: newId(), label: "", code: "", position: "head", consent: "always", enabled: true }
}

const CONSENT_LABELS: Record<CustomCodeConsent, string> = {
  always: "Sempre attivo",
  analytics: "Solo con consenso Analitico",
  marketing: "Solo con consenso Marketing",
}
const POSITION_LABELS: Record<CustomCodePosition, string> = {
  head: "Header (head)",
  body: "Body (body)",
}

export function CustomCodeManager({ initial }: { initial: CustomCodeSnippet[] }) {
  const router = useRouter()
  const [snippets, setSnippets] = React.useState<CustomCodeSnippet[]>(initial)
  const [pending, setPending] = React.useState(false)

  const dirty = React.useMemo(
    () => JSON.stringify(snippets) !== JSON.stringify(initial),
    [snippets, initial],
  )

  const update = (id: string, patch: Partial<CustomCodeSnippet>) =>
    setSnippets((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  const removeSnippet = (id: string) =>
    setSnippets((prev) => prev.filter((s) => s.id !== id))
  const add = () => setSnippets((prev) => [...prev, emptySnippet()])

  const onSave = async () => {
    const cleaned = snippets.filter((s) => s.label.trim() || s.code.trim())
    setPending(true)
    try {
      await saveCustomCodeSnippets(cleaned)
      setSnippets(cleaned)
      toast.success("Codice personalizzato salvato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore salvataggio")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-5 rounded-lg border bg-card p-5">
      <div className="space-y-1 border-b pb-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <h3 className="text-base font-semibold">Codice personalizzato (header / body)</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Inserisci snippet di codice (pixel, tag, verifiche) da caricare sul sito pubblico. Per
          ogni snippet scegli la posizione e se deve essere sempre attivo oppure vincolato al
          consenso cookie.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-200">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Il codice viene eseguito sul sito pubblico: usa solo snippet di cui ti fidi. Gli snippet
          &quot;Sempre attivo&quot; vengono caricati anche senza consenso: assicurati che sia
          legalmente corretto. Sezione riservata agli amministratori.
        </span>
      </div>

      {snippets.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nessuno snippet configurato.</p>
      ) : (
        <div className="space-y-4">
          {snippets.map((s, i) => (
            <div key={s.id} className="space-y-3 rounded-md border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">Snippet #{i + 1}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="m-0 text-xs text-muted-foreground">Attivo</Label>
                    <Switch
                      checked={s.enabled}
                      onCheckedChange={(v) => update(s.id, { enabled: v })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => removeSnippet(s.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="grid gap-1 sm:col-span-3">
                  <Label className="text-xs text-muted-foreground">Nome / descrizione</Label>
                  <Input
                    value={s.label}
                    placeholder="Es. Meta Pixel campagna estate"
                    onChange={(e) => update(s.id, { label: e.target.value })}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">Posizione</Label>
                  <Select
                    value={s.position}
                    onValueChange={(v) => update(s.id, { position: v as CustomCodePosition })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">{POSITION_LABELS.head}</SelectItem>
                      <SelectItem value="body">{POSITION_LABELS.body}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1 sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Attivazione</Label>
                  <Select
                    value={s.consent}
                    onValueChange={(v) => update(s.id, { consent: v as CustomCodeConsent })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">{CONSENT_LABELS.always}</SelectItem>
                      <SelectItem value="analytics">{CONSENT_LABELS.analytics}</SelectItem>
                      <SelectItem value="marketing">{CONSENT_LABELS.marketing}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Codice</Label>
                <Textarea
                  rows={5}
                  className="font-mono text-xs"
                  value={s.code}
                  placeholder="<script>...</script>"
                  onChange={(e) => update(s.id, { code: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="mr-1 h-3.5 w-3.5" /> Aggiungi snippet
        </Button>
        <Button type="button" size="sm" onClick={onSave} disabled={!dirty || pending}>
          {pending ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="mr-1 h-3.5 w-3.5" />
          )}
          Salva codice
        </Button>
      </div>
    </div>
  )
}
