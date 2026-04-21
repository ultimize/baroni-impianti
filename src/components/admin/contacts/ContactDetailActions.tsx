"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import {
  CheckCheck,
  Mail,
  Archive,
  ShieldAlert,
  Trash2,
  Loader2,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import {
  deleteContact,
  updateContactNotes,
  updateContactStatus,
} from "@/lib/admin/mutations/contacts"
import type { ContactStatus } from "@/lib/admin/utils/status"

type Props = {
  id: string
  initialNotes: string
  currentStatus: ContactStatus
}

export function ContactDetailActions({ id, initialNotes, currentStatus }: Props) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [notes, setNotes] = useState(initialNotes)
  const [savingNotes, setSavingNotes] = useState(false)
  const debounceRef = useRef<number | null>(null)

  // Auto-mark "new" as "read" on first load
  useEffect(() => {
    if (currentStatus === "new") {
      void updateContactStatus(id, "read")
        .then(() => router.refresh())
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setStatus = async (status: ContactStatus) => {
    setPending(true)
    try {
      await updateContactStatus(id, status)
      toast.success("Stato aggiornato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    } finally {
      setPending(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteContact(id)
      toast.success("Contatto eliminato")
      router.push("/admin/contacts")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    }
  }

  const handleNotesChange = (v: string) => {
    setNotes(v)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      setSavingNotes(true)
      try {
        await updateContactNotes(id, v)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Errore note")
      } finally {
        setSavingNotes(false)
      }
    }, 700)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => setStatus("read")}>
          <CheckCheck className="mr-1 h-3.5 w-3.5" />
          Letto
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => setStatus("replied")}>
          <Mail className="mr-1 h-3.5 w-3.5" />
          Risposto
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => setStatus("archived")}>
          <Archive className="mr-1 h-3.5 w-3.5" />
          Archivia
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => setStatus("spam")}>
          <ShieldAlert className="mr-1 h-3.5 w-3.5" />
          Spam
        </Button>
        <ConfirmDialog
          trigger={
            <Button type="button" variant="destructive" size="sm">
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              Elimina
            </Button>
          }
          title="Eliminare il contatto?"
          description="Il messaggio verrà rimosso definitivamente."
          confirmLabel="Elimina"
          onConfirm={handleDelete}
        />
      </div>

      <div className="rounded-lg border bg-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-heading text-sm font-medium">Note interne</h3>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            {savingNotes ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            {savingNotes ? "Salvataggio…" : "Salvato"}
          </span>
        </div>
        <Textarea rows={4} value={notes} onChange={(e) => handleNotesChange(e.target.value)} placeholder="Aggiungi note per il team…" />
      </div>
    </div>
  )
}
