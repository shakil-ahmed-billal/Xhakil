# Professional Blog & Component Documentation Guide

This guide provides full instructions on how to create both standard blog posts and technical component documentation.

---

## 🚀 1. Basic Blog Post
For regular updates or articles.

### Step 1: Create File
Add a `.mdx` file to `src/features/doc/content/`.

### Step 2: Add Frontmatter
```markdown
---
title: "Your Post Title"
description: "Brief summary of the post."
image: "https://images.unsplash.com/photo-xxx"
createdAt: "2026-03-14"
updatedAt: "2026-03-14"
---
```

### Step 3: Write Content
Use standard Markdown (`##`, `###`, `**bold**`, `[links](url)`).

---

## 🛠️ 2. Technical Component Documentation
Use this for showcasing code, components, and installation guides.

### Frontmatter for Components
To make a post appear in the **Registry/Docs** instead of the Blog, add `category: components`.
```markdown
---
title: "Component Name"
description: "What this component does."
category: components
createdAt: "2026-03-14"
updatedAt: "2026-03-14"
---
```

### Displaying a Component Preview
Use `<ComponentPreview />` to show a live demo from your registry.
```markdown
<ComponentPreview name="your-component-demo-name" />
```

### Adding Installation Steps (Tabs)
Use `<CodeTabs>` to show both CLI and Manual installation options.
```markdown
<CodeTabs>

<TabsListInstallType />

<TabsContent value="cli">

```bash
npx shadcn@latest add @your-name/your-component
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Install dependencies</Step>

```bash
npm install motion clsx
```

<Step>Copy source code</Step>

<ComponentSource name="your-component" title="components/ui/your-component.tsx" showLineNumbers />

</Steps>

</TabsContent>

</CodeTabs>
```

### Using Callouts
Highlight important notes or warnings.
```markdown
<Callout>
  This is an important note for the user.
</Callout>
```

### API Reference (Props Table)
Automatically generate a table of props from your TypeScript types.
1. Add your types to `src/features/doc/content/props.ts`.
2. Reference them in your MDX:
```markdown
<AutoTypeTable path="src/features/doc/content/props.ts" name="YourPropsTypeName" />
```

---

## 💡 3. Pro Tips
- **Images**: Use Unsplash for high-quality placeholders during development.
- **Slug**: The filename becomes the URL (e.g., `my-post.mdx` -> `/blog/my-post`).
- **Code Blocks**: Specify the language for syntax highlighting (e.g., ` ```tsx `).
- **Auto-Sync**: Saving the file instantly updates the Live Site, Search Menu, RSS, and LLM routes.

---

## 📖 4. Summary Checklist
1. [ ] File in `src/features/doc/content/*.mdx`
2. [ ] Frontmatter included (Title, Desc, Date)
3. [ ] Category set correctly (Default for Blog, `components` for Docs)
4. [ ] Components/Steps added for technical guides
5. [ ] Verified in Local Dev (`pnpm dev`)
