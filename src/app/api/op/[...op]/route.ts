import fs from "fs"
import path from "path"
import { NextResponse, type NextRequest } from "next/server"

const OPENPANEL_API_URL =
  process.env.OPENPANEL_UPSTREAM_API_URL ||
  process.env.NEXT_PUBLIC_OPENPANEL_API_URL ||
  "https://op-api.naxtbrand.com"

const DEFAULT_CLIENT_ID =
  process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ||
  "14db2126-a68c-4b6c-b3ef-fe43fdece27a"

const DEFAULT_CLIENT_SECRET =
  process.env.OPENPANEL_CLIENT_SECRET ||
  process.env.OPENPANEL_SECRET_KEY ||
  "sec_8b7eee20ff6cf23b739e"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  // Serve the local op1.js tracking script with caching
  if (url.pathname.endsWith("/op1.js")) {
    try {
      const localFilePath = path.join(process.cwd(), "public", "op1.js")
      if (fs.existsSync(localFilePath)) {
        const text = fs.readFileSync(localFilePath, "utf8")
        return new NextResponse(text, {
          headers: {
            "Content-Type": "text/javascript; charset=utf-8",
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=86400",
          },
        })
      }

      const res = await fetch("https://openpanel.dev/op1.js?v=1.5.4", {
        next: { revalidate: 86400 },
      })
      const text = await res.text()
      return new NextResponse(text, {
        headers: {
          "Content-Type": "text/javascript; charset=utf-8",
          "Cache-Control":
            "public, max-age=86400, stale-while-revalidate=86400",
        },
      })
    } catch {
      return NextResponse.json(
        { error: "Failed to fetch script" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 })
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const trackIndex = url.pathname.indexOf("/track")
    if (trackIndex === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const endpoint = url.pathname.substring(trackIndex)
    const body = await req.json().catch(() => ({}))

    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-vercel-forwarded-for") ||
      ""

    const incomingClientId = req.headers.get("openpanel-client-id")
    const clientId =
      incomingClientId &&
      incomingClientId !== "cb0fe719-94f4-4633-9303-5843ecdbb3b8" &&
      incomingClientId.length > 10
        ? incomingClientId
        : DEFAULT_CLIENT_ID

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "openpanel-client-id": clientId,
      "openpanel-client-secret": DEFAULT_CLIENT_SECRET,
      Origin: "https://xhakil.site",
      "User-Agent": req.headers.get("user-agent") || "",
    }

    if (clientIp) {
      headers["openpanel-client-ip"] = clientIp
    }

    const opRes = await fetch(`${OPENPANEL_API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    const data = await opRes.json().catch(() => null)
    return NextResponse.json(data || { success: true }, {
      status: opRes.status,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: "Proxy error", message }, { status: 500 })
  }
}
