export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8"

type MarkdownResponseInit = ResponseInit & {
  negotiated?: boolean
}

export function markdownResponse(
  body: string,
  { negotiated = false, headers, ...init }: MarkdownResponseInit = {}
) {
  const responseHeaders = new Headers(headers)
  responseHeaders.set("Content-Type", MARKDOWN_CONTENT_TYPE)

  if (negotiated) {
    responseHeaders.append("Vary", "Accept")
  }

  return new Response(body, { ...init, headers: responseHeaders })
}
