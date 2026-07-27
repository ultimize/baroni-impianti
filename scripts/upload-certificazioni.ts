/**
 * Carica i certificati presenti in public/img/certificati su Supabase Storage
 * (bucket "certifications") e aggiorna certifications.image_url.
 *
 * USO:
 *   npx tsx scripts/upload-certificazioni.ts        → dry-run (non scrive nulla)
 *   npx tsx scripts/upload-certificazioni.ts run    → esegue davvero
 *
 * REQUISITI in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { config as loadEnv } from "dotenv"
import { createClient } from "@supabase/supabase-js"
import { readFile } from "node:fs/promises"
import path from "node:path"

loadEnv({ path: ".env.local" })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Mancano NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY in .env.local")
  process.exit(1)
}

const BUCKET = "certifications"
const DRY_RUN = process.argv[2] !== "run"

/** Abbinamento verificato aprendo una per una le immagini in public/img/certificati */
const MAPPING = [
  {
    id: "f5d563cf-a9fb-4191-9015-189a66446651",
    titolo: "Zucchetti — Installatore Certificato ZCS Azzurro",
    file: "cert-1.jpg",
    nome: "zucchetti-zcs-azzurro.jpg",
  },
  {
    id: "23fe3fbd-9b82-441a-9763-c010438fedfb",
    titolo: "Il Professionista Elettrico — Autorimesse e Ricarica Veicoli",
    file: "cert-2.jpg",
    nome: "professionista-elettrico-autorimesse-ricarica.jpg",
  },
  {
    id: "e6d1f1bd-d253-4304-a385-b988a624654c",
    titolo: "OHMEGA Progettazioni — System Integrator",
    file: "cert-3.jpg",
    nome: "ohmega-system-integrator-dali2.jpg",
  },
  {
    id: "d1b36832-fc14-467c-951f-6b5f4d805742",
    titolo: "NETIFY ACADEMY — Networking Base",
    file: "cert-4.jpg",
    nome: "netify-academy-networking-base.jpg",
  },
  {
    id: "7e159944-ad4b-4249-8d35-ec4857fc0e6f",
    titolo: "Metodo Reti IP — Altatensione",
    file: "cert-5.jpg",
    nome: "metodo-reti-ip-altatensione.jpg",
  },
  {
    id: "0c762024-01d9-4d02-bb21-bd8c2ef8c91d",
    titolo: "Metodo Reti IP — Elettrosistemista",
    file: "cert-6.jpg",
    nome: "metodo-reti-ip-elettrosistemista.jpg",
  },
] as const

/** Stesso schema di src/lib/admin/utils/storage.ts → buildStoragePath */
function buildStoragePath(filename: string): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  return `${yyyy}/${mm}/${Date.now()}-${filename}`
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SERVICE_KEY!, {
    auth: { persistSession: false },
  })

  console.log(DRY_RUN ? "== DRY RUN (nessuna scrittura) ==\n" : "== ESECUZIONE ==\n")

  for (const item of MAPPING) {
    const { data: row, error: readErr } = await supabase
      .from("certifications")
      .select("id, title, image_url")
      .eq("id", item.id)
      .maybeSingle()

    if (readErr || !row) {
      console.error(`✗ ${item.titolo}: riga non trovata (${readErr?.message ?? "id inesistente"})`)
      continue
    }
    if (row.image_url) {
      console.log(`− ${row.title}: ha già un'immagine, salto (${row.image_url})`)
      continue
    }

    const localPath = path.join(process.cwd(), "public", "img", "certificati", item.file)
    const buffer = await readFile(localPath)
    const storagePath = buildStoragePath(item.nome)

    if (DRY_RUN) {
      console.log(`→ ${row.title}\n    ${item.file} (${Math.round(buffer.byteLength / 1024)} KB) → ${BUCKET}/${storagePath}`)
      continue
    }

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: false, cacheControl: "31536000" })

    if (upErr) {
      console.error(`✗ ${row.title}: upload fallito — ${upErr.message}`)
      continue
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

    const { error: updErr } = await supabase
      .from("certifications")
      .update({ image_url: pub.publicUrl })
      .eq("id", item.id)

    if (updErr) {
      console.error(`✗ ${row.title}: upload ok ma update fallito — ${updErr.message}`)
      continue
    }

    console.log(`✓ ${row.title}\n    ${pub.publicUrl}`)
  }

  const { data: mancanti } = await supabase
    .from("certifications")
    .select("title")
    .is("image_url", null)

  if (mancanti?.length) {
    console.log("\nCertificazioni ancora senza immagine (da chiedere al cliente):")
    for (const m of mancanti) console.log(`  · ${m.title}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
