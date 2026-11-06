import { LICENSE } from "@/config/site"

const LICENSE_SECTION = `## License and usage

- Free to use and modify in both personal and commercial projects.
- Attribution is appreciated but not required.
- Released under the [${LICENSE.name}](${LICENSE.url}).`

export function withLicenseSection(content: string) {
  return `${content.trimEnd()}\n\n${LICENSE_SECTION}\n`
}
