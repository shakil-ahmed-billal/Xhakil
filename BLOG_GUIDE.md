# Professional Blog & Component Documentation Guide

This guide provides full instructions on how to create both standard blog posts and technical component documentation using MDX.

---

## 🚀 1. Basic Blog Post
For regular updates, tutorials, or articles.

### Step 1: Create File
Add a `.mdx` file to any folder inside `src/features/doc/content/`.
- Blog posts typically go in `src/features/doc/content/blog/` (optional, can be anywhere as long as it's `.mdx`).

### Step 2: Add Frontmatter
Every post MUST start with this metadata:
```markdown
---
title: "How to Start a Backend Project"
description: "A complete step-by-step guide for beginners."
category: "blog"
image: "https://images.unsplash.com/photo-xxx"
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---
```

### Step 3: Write Content
Use standard Markdown:
- `## Heading 2`
- `### Heading 3`
- `**bold**`, `*italic*`
- `[Link Text](https://example.com)`
- `- Bullet points`

---

## 🎥 2. Advanced Interactive Components
MDX allows you to use powerful React components directly in your text.

### YouTube Videos
Embed any YouTube video using only the video ID.
```markdown
<YouTubeEmbed videoId="dQw4w9WgXcQ" title="Never Gonna Give You Up" />
```

### Framed Images (with Zoom)
Use this for screenshots or important visuals. It adds a premium frame and click-to-zoom functionality.
```markdown
<FramedImage src="/images/your-screenshot.png" alt="Dashboard Preview" />
```
*Tip: Set `canZoom={false}` to disable zoom.*

### Callouts (Alerts)
Highlight notes, warnings, or tips.
```markdown
<Callout>
  **Note:** Make sure to install Node.js before proceeding.
</Callout>
```

### Testimonials
Showcase feedback or quotes from others.
```markdown
<Testimonial
  authorName="Elon Musk"
  authorTagline="CEO of Tesla"
  authorAvatar="https://pbs.twimg.com/profile_images/xxx.jpg"
  quote="This portfolio is exactly what the industry needs!"
  url="https://twitter.com/elonmusk"
/>
```

### Iframe Embeds
Embed any external website or tool.
```markdown
<IframeEmbed src="https://codesandbox.io/embed/xxx" title="Live Demo" />
```

---

## 🛠️ 3. Technical Component Documentation
Use this for showcasing code and installation guides for your UI registry.

### Frontmatter for Components
To make a post appear in the **Registry/Docs** instead of the Blog, add `category: components`.
```markdown
---
title: "Button Component"
description: "A flexible and accessible button."
category: components
---
```

### Displaying a Component Preview
Show a live demo from your registry.
```markdown
<ComponentPreview name="button-demo" />
```

### Installation Steps (Tabs)
Show both CLI and Manual installation options with beautiful tabs.
```markdown
<CodeTabs>

<TabsListInstallType />

<TabsContent value="cli">

```bash
npx shadcn@latest add @shakil/button
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Install dependencies</Step>

```bash
npm install motion clsx
```

<Step>Copy source code</Step>

<ComponentSource name="button" title="components/ui/button.tsx" />

</Steps>

</TabsContent>

</CodeTabs>
```

### API Reference (Props Table)
Automatically generate a table of props from your TypeScript types.
```markdown
<AutoTypeTable path="src/features/doc/content/props.ts" name="ButtonProps" />
```

---

## 💡 4. Pro Tips & Rules
- **Image Hosting**: 
  - For external images, use high-quality Unsplash URLs.
  - For local images, place them in `public/images/` and use paths like `/images/my-image.png`.
- **Slug**: The filename becomes the URL (e.g., `my-post.mdx` -> `xhakil.vercel.app/blog/my-post`).
- **Code Blocks**: Always specify the language (e.g., ` ```tsx ` or ` ```bash `).
- **Auto-Sync**: Saving the file instantly updates:
  - The live website.
  - The command menu search (`Cmd+K`).
  - RSS feeds and LLM documentation routes.

---

## 📖 5. Summary Checklist
1. [ ] File created in `src/features/doc/content/`
2. [ ] Frontmatter includes `title`, `description`, `image`, and `createdAt`
3. [ ] If it's a component doc, `category: components` is added
4. [ ] Interactive components (`YouTubeEmbed`, `FramedImage`) used for better UX
5. [ ] Verified look in Local Dev (`pnpm dev`)
