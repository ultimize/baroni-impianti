import { getSettingValue } from "@/lib/queries/site-content"
import { ClarityScript } from "./ClarityScript"

export async function MicrosoftClarity() {
  const clarityId = await getSettingValue<string>("tracking_clarity_id")
  if (!clarityId) return null
  return <ClarityScript clarityId={clarityId} />
}
