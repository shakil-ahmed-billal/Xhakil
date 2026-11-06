import fs from "node:fs"
import path from "node:path"
import { Index } from "@/__registry__/index"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"

import type { UnistNode, UnistTree } from "@/types/unist"

import { fixImport } from "./registry"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string
          value?: string
          type?: string
        }) || {}

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          string | undefined

        if (!name && !srcPath) {
          return null
        }

        try {
          let src: string

          if (srcPath) {
            src = path.join(process.cwd(), srcPath)
          } else {
            const component = Index[name]
            src = fileName
              ? component.files.find((file: unknown) => {
                  if (typeof file === "string") {
                    return (
                      file.endsWith(`${fileName}.tsx`) ||
                      file.endsWith(`${fileName}.ts`)
                    )
                  }
                  return false
                }) || component.files[0]?.path
              : component.files[0]?.path
          }

          const filePath = src
          let source = fs.readFileSync(filePath, "utf8")

          source = fixImport(source)

          const title = getNodeAttributeByName(node, "title")
          const showLineNumbers = getNodeAttributeByName(
            node,
            "showLineNumbers"
          )

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {},
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: [`language-${path.extname(filePath).slice(1)}`],
                  },
                  data: {
                    meta: [
                      title ? `title="${title.value}"` : "",
                      showLineNumbers ? "showLineNumbers" : "",
                    ].join(" "),
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string

        if (!name) {
          return null
        }

        try {
          const component = Index[name]

          const src = component.files[0]?.path

          const filePath = src
          let source = fs.readFileSync(filePath, "utf8")

          source = fixImport(source)

          const codeMeta = getNodeAttributeByName(node, "data-code-meta")

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {},
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: ["showLineNumbers"]
                      .concat(codeMeta ? [codeMeta.value as string] : [])
                      .join(" "),
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}
