"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import {
  CheckCheck,
  Mail,
  Archive,
  ShieldAlert,
  Trash2,
  MoreHorizontal,
  Loader2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"
import { deleteContact, updateContactStatus } from "@/lib/admin/mutations/contacts"
import type { ContactStatus } from "@/lib/admin/utils/status"

export function ContactRowActions({ id }: { id: string }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

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
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Azioni">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setStatus("read")}>
          <CheckCheck className="mr-2 h-3.5 w-3.5" />
          Segna come letto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("replied")}>
          <Mail className="mr-2 h-3.5 w-3.5" />
          Segna come risposto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("archived")}>
          <Archive className="mr-2 h-3.5 w-3.5" />
          Archivia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatus("spam")}>
          <ShieldAlert className="mr-2 h-3.5 w-3.5" />
          Sposta in spam
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Elimina
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Fuori dal menu: dentro verrebbe smontato alla chiusura del menu. */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Eliminare il contatto?"
        description="Il messaggio verrà rimosso definitivamente."
        confirmLabel="Elimina"
        onConfirm={handleDelete}
      />
    </DropdownMenu>
  )
}
