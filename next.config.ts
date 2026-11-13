import type { NextConfig } from "next"

const LEGACY_BLOG_COMPONENT_SLUGS = [
  "apple-hello-effect",
  "brand-assets-menu",
  "chevrons-up-down-icon",
  "code-block-command",
  "consent-manager",
  "copy-button",
  "dot-grid-spotlight",
  "elastic-slider",
  "fluid-gradient-text",
  "github-contributions",
  "github-stars",
  "glow-card-grid",
  "haptic",
  "icon-swap",
  "middle-truncation",
  "mobius-loop-icon",
  "react-wheel-picker",
  "scroll-fade-effect",
  "shimmering-text",
  "slide-to-unlock",
  "spinning-circular-text",
  "testimonial-spotlight",
  "testimonial",
  "testimonials-marquee",
  "text-flip",
  "theme-switcher",
  "theme-toggle-effect",
  "toc-minimap",
  "twemoji",
  "work-experience-component",
] as const

const legacyBlogComponentRedirects = LEGACY_BLOG_COMPONENT_SLUGS.map(
  (slug) => ({
    source: `/blog/${slug}`,
    destination: `/blog`,
    permanent: true,
  })
)

const acceptsMarkdown = {
  type: "header" as const,
  key: "accept",
  value: "(?<accept>.*text/markdown.*)",
}

const nextConfig: NextConfig = {
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "xhakil.localhost",
    "xhakil.local",
  ],
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@phosphor-icons/react",
      "@remixicon/react",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.xhakil.site",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.xhakil.site",
        port: "",
      },
      {
        protocol: "https",
        hostname: "xhakil.site",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "xhakil.site",
          },
        ],
        destination: "https://www.xhakil.site/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "xhakil.vercel.app",
          },
        ],
        destination: "https://www.xhakil.site/:path*",
        permanent: true,
      },
      {
        source: "/components/apple-hello-effect-hindi",
        destination: "/components/apple-hello-effect",
        permanent: true,
      },
      {
        source: "/components/apple-hello-effect-hindi.md",
        destination: "/components/apple-hello-effect.md",
        permanent: true,
      },
      {
        source: "/:section(blog|components)/theme-toggle",
        destination: "/:section/theme-switcher",
        permanent: true,
      },
      {
        source: "/components/testimonial-2",
        destination: "/components/pull-quote",
        permanent: true,
      },
      {
        source: "/components/testimonial-2.md",
        destination: "/components/pull-quote.md",
        permanent: true,
      },
      {
        source: "/components/text-flip",
        destination: "/components/text-swap",
        permanent: true,
      },
      {
        source: "/components/text-flip.md",
        destination: "/components/text-swap.md",
        permanent: true,
      },
      {
        source: "/wall-of-love",
        destination: "/testimonials",
        permanent: true,
      },

      {
        source: "/llms-full.txt",
        destination: "/llms.txt",
        permanent: true,
      },

      {
        source: "/:doc(awards|certifications|intellectual-property).md",
        destination: "/about.md",
        permanent: true,
      },
      {
        source: "/blocks/content",
        destination: "/blocks/marketing",
        permanent: true,
      },
      {
        source: "/blocks/content/blog-01",
        destination: "/blocks/marketing/blog-01",
        permanent: true,
      },
      {
        source: "/blocks/content/blog-02",
        destination: "/blocks/marketing/blog-02",
        permanent: true,
      },
      {
        source: "/blocks/content/experience-01",
        destination: "/blocks/marketing/experience-01",
        permanent: true,
      },
      {
        source: "/blocks/content/team-01",
        destination: "/blocks/marketing/team-01",
        permanent: true,
      },
      {
        source: "/:section(blog|components)/:slug.mdx",
        destination: "/:section/:slug.md",
        permanent: true,
      },
      ...legacyBlogComponentRedirects,
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:section(blog|components)/:slug.md",
          destination: "/doc.md/:slug",
        },
        {
          source: "/:section(blog|components)/:slug",
          destination: "/doc.md/:slug",
          has: [acceptsMarkdown],
        },
        {
          source: "/index.md",
          destination: "/llms.txt",
        },
        {
          source: "/",
          destination: "/llms.txt",
          has: [acceptsMarkdown],
        },
      ],
      afterFiles: [
        {
          source: "/rss",
          destination: "/blog/rss",
        },
        {
          source: "/registry/rss",
          destination: "/components/rss",
        },
      ],

      fallback: [
        {
          source: "/doc.md/:slug",
          destination: "/not-found.md",
        },
        {
          source: "/:path*",
          destination: "/not-found.md",
          has: [acceptsMarkdown],
        },
      ],
    }
  },
}

export default nextConfig
