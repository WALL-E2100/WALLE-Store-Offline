export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const game = url.searchParams.get("game") || "mobile-legends"
    const userId = url.searchParams.get("userId")
    const serverId = url.searchParams.get("serverId")

    if (!userId || !serverId) {
      return new Response("Missing userId or serverId", { status: 400 })
    }

    const rapidKey = process.env.RAPIDAPI_KEY
    if (!rapidKey) {
      return new Response("RAPIDAPI_KEY not configured", { status: 500 })
    }

    const apiUrl = `https://id-game-checker.p.rapidapi.com/${encodeURIComponent(
      game,
    )}/${encodeURIComponent(userId)}/${encodeURIComponent(serverId)}`

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "id-game-checker.p.rapidapi.com",
      },
      // You can add cache settings if desired
    })

    if (!res.ok) {
      const text = await res.text()
      return new Response(text || "Upstream error", { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (err: any) {
    return new Response(err?.message ?? "Unexpected error", { status: 500 })
  }
}
