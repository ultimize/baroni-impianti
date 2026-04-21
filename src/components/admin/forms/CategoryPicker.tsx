"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

type Item = { id: string; name: string }

type Props = {
  items: Item[]
  selected: string[]
  onChange: (next: string[]) => void
}

export function CategoryPicker({ items, selected, onChange }: Props) {
  const toggle = (id: string, checked: boolean) => {
    if (checked) onChange(Array.from(new Set([...selected, id])))
    else onChange(selected.filter((s) => s !== id))
  }

  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">Nessuna categoria disponibile.</p>
  }

  return (
    <ScrollArea className="h-44 rounded-md border">
      <ul className="space-y-1 p-2">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent">
              <Checkbox
                checked={selected.includes(item.id)}
                onCheckedChange={(checked) => toggle(item.id, Boolean(checked))}
              />
              <span className="truncate">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
