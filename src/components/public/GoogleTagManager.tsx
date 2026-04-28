import { getSettingValue } from "@/lib/queries/site-content"
import { GoogleTagManagerScript } from "./GoogleTagManagerScript"

export async function GoogleTagManager() {
  const [gtmId, ga4Id] = await Promise.all([
    getSettingValue<string>("tracking_gtm_id"),
    getSettingValue<string>("tracking_ga4_id"),
  ])

  if (!gtmId && !ga4Id) return null

  return <GoogleTagManagerScript gtmId={gtmId ?? null} ga4Id={ga4Id ?? null} />
}
