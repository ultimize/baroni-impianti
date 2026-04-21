"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { useEffect, useState } from "react"
import { EditorToolbar } from "./EditorToolbar"
import { MediaPickerDialog } from "./MediaPickerDialog"
import type { StorageBucketId } from "@/lib/admin/utils/storage"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  bucket?: StorageBucketId
  minHeight?: number
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Inizia a scrivere il tuo articolo…",
  bucket = "post-images",
  minHeight = 480,
}: Props) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        autolink: true,
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
      Typography,
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none px-5 py-4 focus:outline-none min-h-full prose-headings:font-heading prose-a:text-primary",
      },
    },
    onUpdate({ editor: ed }) {
      onChange(ed.getHTML())
    },
    immediatelyRender: false,
  })

  // Reset content when external value changes (e.g. switching from edit to a new record)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [editor, value])

  const handlePickedImage = (url: string | null) => {
    if (!editor || !url) return
    editor.chain().focus().setImage({ src: url, alt: "" }).run()
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <EditorToolbar editor={editor} onPickImage={() => setMediaPickerOpen(true)} />
      <div className="overflow-y-auto" style={{ maxHeight: minHeight + 200 }}>
        <div style={{ minHeight }}>
          <EditorContent editor={editor} />
        </div>
      </div>
      <MediaPickerDialog
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        defaultBucket={bucket}
        onPicked={(url) => {
          handlePickedImage(url)
          setMediaPickerOpen(false)
        }}
      />
    </div>
  )
}
