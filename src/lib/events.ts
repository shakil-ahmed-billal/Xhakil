import { z } from "zod"

import { op } from "./openpanel"

const eventSchema = z.object({
  name: z.enum([
    "screen_view",
    "contact_form_submitted",
    "contact_form_error",
    "download_vcard",
    "download_resume",
    "view_resume",
    "social_link_clicked",
    "project_clicked",
    "copy_npm_command",
    "copy_code_block",
    "copy_block_code",
    "copy_email",
    "copy_phone_number",
    "play_name_pronunciation",
    "open_command_menu",
    "command_menu_search",
    "command_menu_action",
    "blog_search",
    "toc_inline_toggle",
    "toc_inline_item_click",
    "toc_minimap_hover",
    "toc_minimap_item_click",
    "keyboard_shortcut_navigate",
    "block_viewer_tab_change",
    "block_viewer_resize",
    "block_viewer_open_preview",
    "block_viewer_refresh_preview",
    "block_viewer_theme_change",
    "doc_sponsors_close",
    "carbon_ads_close",
    "doc_feedback",
  ]),

  properties: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()])
    )
    .optional(),
})

export type Event = z.infer<typeof eventSchema>

// In-memory deduplication cache to prevent duplicate triggers
const dedupeCache = new Map<string, number>()
const DEDUPE_WINDOW_MS = 300

function isDuplicate(
  name: string,
  properties?: Record<string, unknown>
): boolean {
  const key = `${name}:${JSON.stringify(properties || {})}`
  const now = Date.now()
  const lastTime = dedupeCache.get(key)
  if (lastTime && now - lastTime < DEDUPE_WINDOW_MS) {
    return true
  }
  dedupeCache.set(key, now)

  // Prune cache if it grows too large
  if (dedupeCache.size > 200) {
    for (const [k, time] of dedupeCache.entries()) {
      if (now - time > 10000) {
        dedupeCache.delete(k)
      }
    }
  }
  return false
}

export function trackEvent(input: Event) {
  try {
    const event = eventSchema.parse(input)
    if (!event) return

    if (isDuplicate(event.name, event.properties)) {
      return
    }

    // Clean undefined values
    const cleanProps: Record<string, string | number | boolean | null> = {}
    if (event.properties) {
      for (const [key, value] of Object.entries(event.properties)) {
        if (value !== undefined) {
          cleanProps[key] = value
        }
      }
    }

    // Single dispatch: prefer window.op if loaded, fallback to op SDK instance
    const win =
      typeof window !== "undefined"
        ? (window as unknown as {
            op?: (
              cmd: string,
              name: string,
              props?: Record<string, unknown>
            ) => void
          })
        : undefined

    if (win && typeof win.op === "function") {
      try {
        win.op("track", event.name, cleanProps)
        return
      } catch {}
    }

    try {
      op.track(event.name, cleanProps as Parameters<typeof op.track>[1])
    } catch {}
  } catch (err) {
    console.warn("[OpenPanel] Failed to track event:", err)
  }
}

/**
 * Track Contact Form Submission
 */
export function trackContactFormSubmission(details: {
  name?: string
  email?: string
  subject?: string
  [key: string]: string | number | boolean | null | undefined
}) {
  trackEvent({
    name: "contact_form_submitted",
    properties: {
      sender_name: details.name,
      sender_email: details.email,
      subject: details.subject,
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Track vCard Download
 */
export function trackVCardDownload(details?: { source?: string }) {
  trackEvent({
    name: "download_vcard",
    properties: {
      source: details?.source || "command_menu",
      timestamp: new Date().toISOString(),
    },
  })
}

/**
 * Track Social Link Click
 */
export function trackSocialClick(details: {
  platform: string
  href: string
  handle?: string
}) {
  trackEvent({
    name: "social_link_clicked",
    properties: {
      platform: details.platform,
      href: details.href,
      handle: details.handle,
    },
  })
}

/**
 * Track Project Click / View
 */
export function trackProjectClick(details: {
  title: string
  href?: string
  category?: string
}) {
  trackEvent({
    name: "project_clicked",
    properties: {
      title: details.title,
      href: details.href,
      category: details.category,
    },
  })
}
