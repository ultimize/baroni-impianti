import { existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs"
import { resolve } from "node:path"
import type { Checkpoint } from "../types.js"

const CHECKPOINT_PATH = resolve(process.cwd(), ".import-checkpoint.json")

export function loadCheckpoint(): Checkpoint | null {
  if (!existsSync(CHECKPOINT_PATH)) return null
  try {
    const raw = readFileSync(CHECKPOINT_PATH, "utf-8")
    const parsed = JSON.parse(raw) as Checkpoint
    return parsed
  } catch {
    return null
  }
}

export function saveCheckpoint(data: Checkpoint): void {
  writeFileSync(CHECKPOINT_PATH, JSON.stringify(data, null, 2), "utf-8")
}

export function clearCheckpoint(): void {
  if (existsSync(CHECKPOINT_PATH)) {
    unlinkSync(CHECKPOINT_PATH)
  }
}

export function emptyCheckpoint(): Checkpoint {
  return {
    phase: "authors",
    lastProcessedPostId: null,
    mediaCache: {},
    taxonomyMaps: {
      authors: {},
      categories: {},
      tags: {},
    },
  }
}
