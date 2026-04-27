"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Loader2, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { formatDateTime } from "@/lib/admin/utils/format"

const ACTION_LABELS: Record<string, string> = {
  accept_all: "Accetta tutti",
  reject_all: "Rifiuta",
  custom: "Personalizzato",
  revoke: "Revoca",
  update: "Aggiornamento",
}

export type ConsentLogRow = {
  id: string
  consent_id: string
  action: string
  analytics: boolean
  marketing: boolean
  policy_version: string
  created_at: string
}

export function ConsentLogTable({ rows }: { rows: ConsentLogRow[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/consent/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("Record eliminato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Identificativo</TableHead>
          <TableHead>Azione</TableHead>
          <TableHead>Analytics</TableHead>
          <TableHead>Marketing</TableHead>
          <TableHead>Versione policy</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <ConsentIdCell value={row.consent_id} />
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {ACTION_LABELS[row.action] ?? row.action}
              </Badge>
            </TableCell>
            <TableCell>
              <ConsentDot value={row.analytics} />
            </TableCell>
            <TableCell>
              <ConsentDot value={row.marketing} />
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              v{row.policy_version}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDateTime(row.created_at)}
            </TableCell>
            <TableCell>
              <ConfirmDialog
                trigger={
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    disabled={deletingId === row.id}
                    aria-label="Elimina record"
                  >
                    {deletingId === row.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                }
                title="Eliminare il record di consenso?"
                description={`Stai per eliminare il log con identificativo ${row.consent_id.slice(0, 8)}…. L'azione non è reversibile.`}
                confirmLabel="Elimina"
                onConfirm={() => handleDelete(row.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ConsentIdCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const short = value.slice(0, 8)
  const seed = parseInt(value.slice(0, 8), 16) || 0
  const hue = seed % 360

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success(`Copiato ${short}…`)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Copia non riuscita")
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 rounded-md px-1.5 py-1 text-xs font-mono hover:bg-muted"
      title={value}
    >
      <span
        aria-hidden
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
        style={{ backgroundColor: `hsl(${hue} 65% 45%)` }}
      >
        {short.slice(0, 2).toUpperCase()}
      </span>
      <span className="tabular-nums">{short}…</span>
      <Copy
        className={
          copied
            ? "h-3 w-3 text-emerald-600"
            : "h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60"
        }
      />
    </button>
  )
}

function ConsentDot({ value }: { value: boolean }) {
  return (
    <span
      className={
        value
          ? "inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700"
          : "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
      }
    >
      <span
        aria-hidden
        className={
          value
            ? "inline-block h-2 w-2 rounded-full bg-emerald-500"
            : "inline-block h-2 w-2 rounded-full bg-muted-foreground/40"
        }
      />
      {value ? "Sì" : "No"}
    </span>
  )
}
