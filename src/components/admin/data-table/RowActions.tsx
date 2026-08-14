"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  MoreHorizontal,
  Pencil,
  ExternalLink,
  Copy,
  Trash2,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/admin/shared/ConfirmDialog"

type Action = {
  label: string
  icon?: React.ReactNode
  onClick?: () => Promise<void> | void
  href?: string
  external?: boolean
  destructive?: boolean
}

type Props = {
  editHref?: string
  viewHref?: string
  onDuplicate?: () => Promise<void> | void
  onDelete?: () => Promise<void>
  deleteTitle?: string
  deleteDescription?: string
  extra?: Action[]
}

export function RowActions({
  editHref,
  viewHref,
  onDuplicate,
  onDelete,
  deleteTitle = "Eliminare?",
  deleteDescription = "L'azione non è reversibile.",
  extra,
}: Props) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDuplicate = async () => {
    if (!onDuplicate) return
    setPending(true)
    try {
      await onDuplicate()
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete) return
    try {
      await onDelete()
      toast.success("Eliminato")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Errore eliminazione")
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
      <DropdownMenuContent align="end" className="w-44">
        {editHref ? (
          <DropdownMenuItem render={<Link href={editHref} />}>
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Modifica
          </DropdownMenuItem>
        ) : null}
        {viewHref ? (
          <DropdownMenuItem render={<Link href={viewHref} target="_blank" rel="noreferrer" />}>
            <ExternalLink className="mr-2 h-3.5 w-3.5" />
            Vedi sul sito
          </DropdownMenuItem>
        ) : null}
        {onDuplicate ? (
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-3.5 w-3.5" />
            Duplica
          </DropdownMenuItem>
        ) : null}
        {extra?.map((a, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={a.onClick}
            render={a.href ? <Link href={a.href} target={a.external ? "_blank" : undefined} /> : undefined}
          >
            {a.icon}
            {a.label}
          </DropdownMenuItem>
        ))}
        {onDelete ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Elimina
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>

      {/*
        Il dialog di conferma sta FUORI dal menu: se fosse dentro, alla chiusura
        del menu verrebbe smontato e il popup sparirebbe appena cliccato.
      */}
      {onDelete ? (
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={deleteTitle}
          description={deleteDescription}
          confirmLabel="Elimina"
          onConfirm={handleDelete}
        />
      ) : null}
    </DropdownMenu>
  )
}
