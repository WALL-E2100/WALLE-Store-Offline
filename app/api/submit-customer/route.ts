type OrderPayload = {
  fullName: string
  email: string
  game: string
  userId: string
  serverId: string
  product: string
  notes?: string
}

export async function POST(req: Request) {
  try {
    const webhook = process.env.SHEETS_WEBHOOK_URL
    if (!webhook) {
      return new Response("SHEETS_WEBHOOK_URL not configured", { status: 500 })
    }

    const payload = (await req.json()) as Partial<OrderPayload>

    // basic validation
    const required: (keyof OrderPayload)[] = ["fullName", "email", "game", "userId", "serverId", "product"]
    for (const k of required) {
      if (!payload[k]) {
        return new Response(`Missing field: ${k}`, { status: 400 })
      }
    }

    // Forward to your sheet webhook. Many Google Apps Script web apps accept JSON.
    const forward = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    })

    if (!forward.ok) {
      const text = await forward.text()
      return new Response(text || "Failed to forward to sheet", { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err: any) {
    return new Response(err?.message ?? "Unexpected error", { status: 500 })
  }
}
