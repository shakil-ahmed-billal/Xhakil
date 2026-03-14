export const registryConfig = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @example "@shakil-ahmed-billal" - Users can install components with: `npx shadcn add @shakil-ahmed-billal/wheel-picker`
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@shakil-ahmed-billal",
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * @example "https://xhakil.vercel.app/r/{name}.json" resolves to "https://xhakil.vercel.app/r/wheel-picker.json"
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL ||
    "https://xhakil.vercel.app/r/{name}.json",
}
