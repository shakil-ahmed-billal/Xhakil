import {
  createFileSystemGeneratorCache,
  createGenerator,
} from "fumadocs-typescript"

export const generator = createGenerator({
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
})
