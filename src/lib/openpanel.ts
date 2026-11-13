import { OpenPanel } from "@openpanel/web"

const clientId =
  process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ||
  "14db2126-a68c-4b6c-b3ef-fe43fdece27a"

const apiUrl = process.env.NEXT_PUBLIC_OPENPANEL_API_URL || "/api/op"

export const op = new OpenPanel({
  clientId,
  apiUrl,
  trackScreenViews: false, // Managed with metadata and deduplication by OpenPanelNavigationTracker
  trackAttributes: true,
  trackOutgoingLinks: true,
  disabled: process.env.NEXT_PUBLIC_OPENPANEL_DISABLED === "true",
})
