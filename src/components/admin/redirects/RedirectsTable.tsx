"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2, Pencil, Trash2, Check, X } from "lucide-react"
import { toast } from "sonner"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { FormField } from "@/components/admin/shared/FormField"
import { redirectFormSchema, type RedirectFormData } from "@/lib/admin/validation/redirect"
import {
  createRedirect,
  updateRedirect,
  deleteRedirect,
  toggleRedirectActive,
} from "@/lib/admin/mutations/redirects"
import { formatRelativeFromNow } from "@/lib/admin/utils/format"

type RedirectRow = {
  id: string
  old_path: string
  new_path: string
  status_code: number
  is_active: boolean
  hit_count: number
  last_hit_at: string | null
  notes: string | null
  updated_at: string
}

type Props = { rows: RedirectRow[] }

export function RedirectsTable({ rows }: Props) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)

  const startEdit = (r: RedirectRow) => setEditingId(r.id)
  const cancelEdit = () => setEditingId(null)

  const handleDelete = async (id: string) => {
    try {
      await deleteRedirect(id)
      toast.success("Redirect eliminato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    }
  }

  const handleToggle = async (id: string, val: boolean) => {
    try {
      await toggleRedirectActive(id, val)
      toast.success(val ? "Attivato" : "Disattivato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <NewRedirectPopover onCreated={() => router.refresh()} />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Da</TableHead>
              <TableHead>A</TableHead>
              <TableHead>Codice</TableHead>
              <TableHead>Hit</TableHead>
              <TableHead>Ultimo hit</TableHead>
              <TableHead>Attivo</TableHead>
              <TableHead className="w-28" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) =>
              editingId === r.id ? (
                <EditRedirectRow
                  key={r.id}
                  row={r}
                  onSaved={() => {
                    setEditingId(null)
                    router.refresh()
                  }}
                  onCancel={cancelEdit}
                />
              ) : (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.old_path}</TableCell>
                  <TableCell className="font-mono text-xs">{r.new_path}</TableCell>
                  <TableCell>{r.status_code}</TableCell>
                  <TableCell className="tabular-nums">{r.hit_count}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {r.last_hit_at ? formatRelativeFromNow(r.last_hit_at) : "—"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={r.is_active} onCheckedChange={(v) => handleToggle(r.id, v)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button type="button" size="icon-sm" variant="ghost" onClick={() => startEdit(r)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <ConfirmDialog
                        trigger={
                          <Button type="button" size="icon-sm" variant="ghost">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        }
                        title="Eliminare il redirect?"
                        description={`${r.old_path} → ${r.new_path}`}
                        confirmLabel="Elimina"
                        onConfirm={() => handleDelete(r.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function EditRedirectRow({
  row,
  onSaved,
  onCancel,
}: {
  row: RedirectRow
  onSaved: () => void
  onCancel: () => void
}) {
  const form = useForm<RedirectFormData>({
    resolver: zodResolver(redirectFormSchema),
    defaultValues: {
      old_path: row.old_path,
      new_path: row.new_path,
      status_code: row.status_code,
      is_active: row.is_active,
      notes: row.notes ?? "",
    },
  })
  const [saving, setSaving] = useState(false)

  const onSave = form.handleSubmit(async (data) => {
    setSaving(true)
    try {
      await updateRedirect(row.id, data)
      toast.success("Redirect aggiornato")
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    } finally {
      setSaving(false)
    }
  })

  return (
    <TableRow>
      <TableCell><Input {...form.register("old_path")} /></TableCell>
      <TableCell><Input {...form.register("new_path")} /></TableCell>
      <TableCell>
        <Select
          value={String(form.watch("status_code"))}
          onValueChange={(v) => form.setValue("status_code", Number(v) as RedirectFormData["status_code"])}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[301, 302, 307, 308].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell colSpan={2}>
        <Input placeholder="Note interne" {...form.register("notes")} />
      </TableCell>
      <TableCell>
        <Switch
          checked={form.watch("is_active")}
          onCheckedChange={(v) => form.setValue("is_active", v)}
        />
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-1">
          <Button type="button" size="icon-sm" variant="ghost" disabled={saving} onClick={onSave}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          </Button>
          <Button type="button" size="icon-sm" variant="ghost" onClick={onCancel}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

function NewRedirectPopover({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const form = useForm<RedirectFormData>({
    resolver: zodResolver(redirectFormSchema),
    defaultValues: {
      old_path: "",
      new_path: "",
      status_code: 301,
      is_active: true,
      notes: "",
    },
  })
  const [pending, setPending] = useState(false)

  const onCreate = form.handleSubmit(async (data) => {
    setPending(true)
    try {
      await createRedirect(data)
      toast.success("Redirect creato")
      form.reset({ old_path: "", new_path: "", status_code: 301, is_active: true, notes: "" })
      setOpen(false)
      onCreated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore creazione")
    } finally {
      setPending(false)
    }
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button type="button" size="sm">
            <Plus className="mr-1 h-3.5 w-3.5" />
            Nuovo redirect
          </Button>
        }
      />
      <PopoverContent side="bottom" align="end" className="w-96">
        <div className="space-y-3">
          <FormField label="Path origine" required error={form.formState.errors.old_path?.message}>
            <Input placeholder="/vecchia-pagina" {...form.register("old_path")} />
          </FormField>
          <FormField label="Path destinazione" required error={form.formState.errors.new_path?.message}>
            <Input placeholder="/nuova-pagina o https://…" {...form.register("new_path")} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Codice">
              <Select
                value={String(form.watch("status_code"))}
                onValueChange={(v) => form.setValue("status_code", Number(v) as RedirectFormData["status_code"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 — Permanente</SelectItem>
                  <SelectItem value="302">302 — Temporaneo</SelectItem>
                  <SelectItem value="307">307</SelectItem>
                  <SelectItem value="308">308</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Attivo">
              <div className="pt-1.5">
                <Switch
                  checked={form.watch("is_active")}
                  onCheckedChange={(v) => form.setValue("is_active", v)}
                />
              </div>
            </FormField>
          </div>
          <FormField label="Note">
            <Textarea rows={2} {...form.register("notes")} />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button type="button" size="sm" onClick={onCreate} disabled={pending}>
              {pending ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : null}
              Crea
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
