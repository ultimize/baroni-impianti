import { z } from "zod"

export const settingValueSchema = z.unknown()

export const settingPatchSchema = z.object({
  key: z.string().min(1).max(100),
  value: settingValueSchema,
})

export type SettingPatch = z.infer<typeof settingPatchSchema>
