import { NextResponse, type NextRequest } from "next/server"

// Stub endpoint. Real validation, captcha, persistence into `contact_submissions`
// and Resend notification will be wired up in a follow-up step.
export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      message: "Endpoint /api/contact non ancora implementato.",
    },
    { status: 501 },
  )
}
