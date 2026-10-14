# 🗂️ Project Structure & Directory Guide

> **Live Production Website**: [https://zevylo.netlify.app/](https://zevylo.netlify.app/)  
> **Source Repository**: [https://github.com/daniyal44/Tools_wesbite](https://github.com/daniyal44/Tools_wesbite)

This document provides a comprehensive guide to the folder hierarchy, architectural conventions, and file organization of the **Zevylo** repository.

---

## 🌳 High-Level Directory Overview

```
Tools_wesbite/                     # Root Workspace Directory
├── .github/                       # GitHub Actions Workflows
│   └── workflows/
│       └── update-graph.yml       # Auto-updates codebase diagrams on push
├── desktop/                       # Cross-Platform Desktop Client (Electron)
│   ├── assets/                    # App icons (icon.ico, tray icons)
│   ├── src/                       # Main process, secure preload bridge, menu, tray
│   │   ├── main.js                # Window lifecycle, COOP/COEP headers, IPC
│   │   ├── preload.js             # contextBridge sandbox API
│   │   ├── menu.js                # Native application menus
│   │   ├── server.js              # Local Next.js background manager
│   │   └── tray.js                # Taskbar system tray quick launcher
│   ├── electron-builder.json      # Packaging configs for Windows, Mac & Linux
│   └── package.json               # Desktop dependencies & packaging scripts
├── docs/                          # Project documentation
├── scripts/                       # Root orchestration & automation scripts
│   ├── generate-codebase-graph.mjs# Codebase graph & category statistics parser
│   └── build-tools-directory.mjs  # Master tools directory generator
├── zevylo/                        # Next.js 16 Web Application Root
│   ├── docs/                      # Technical roadmaps, benchmarks & tool guides
│   ├── public/                    # Static assets (favicons, SVG logos, llms.txt)
│   ├── scripts/                   # Next.js specific build/doc generation scripts
│   │   └── generate-tool-docs.mjs # Definition parser -> individual tool MD docs
│   ├── src/                       # TypeScript application source code
│   │   ├── app/                   # Next.js App Router (pages & API routes)
│   │   ├── components/            # Reusable UI & layout design system
│   │   ├── lib/                   # Utility functions, constants, dynamic loaders
│   │   └── tools/                 # 206+ modular in-browser utility suites
│   ├── package.json               # Next.js dependencies, scripts & configs
│   ├── tsconfig.json              # TypeScript configuration
│   └── next.config.ts             # Next.js build & WASM header settings
├── .gitignore                     # Git ignore rules (node_modules, .next, dist)
├── AGENTS.md                      # AI agent instructions bound by UNIVERSAL_RULE
├── ARCHITECTURE.md                # System architecture & Mermaid graphs
├── BUTTONS_AND_CONTROLS.md        # Comprehensive catalog of all buttons & controls
├── CHANGELOG.md                   # Version history & update logs
├── CLAUDE.md                      # Claude guidelines pointing to UNIVERSAL_RULE
├── CONTRIBUTING.md                # Contribution guide & tool creation instructions
├── CONTRIBUTORS.md                # Lead architect & author profile (Muhammad Daniyal)
├── DEPLOYMENT.md                  # Production deployment configurations
├── DESKTOP.md                     # Cross-platform desktop application guide
├── DESIGN_SYSTEM.md               # Theme tokens, colors, typography & spacing
├── FEATURES.md                    # Exhaustive guide to all platform features
├── FUNCTIONS_AND_ENGINES.md       # Technical guide to WASM, Canvas, & PDF math
├── github.bat                     # Windows 1-click sync & push automation
├── package.json                   # Root monorepo workspace package.json
├── PROJECT_STRUCTURE.md           # Deep dive into folder architecture & file roles
├── README.md                      # Flagship presentation documentation
├── ROADMAP.md                     # Planned features & vision
├── SECURITY_AND_PRIVACY.md        # Client-side sandbox & security policies
├── TOOLS_DIRECTORY.md             # Master directory of all 206 tools
└── UNIVERSAL_RULE.md              # Supreme invariant: permanent zero-deletion law
```

---

## 🏛️ Deep Dive into Core Directories

### 1. `zevylo/src/tools/` — Modular Tool Ecosystem
Every single tool in Zevylo lives under its dedicated category folder inside `zevylo/src/tools/`.
Each category contains:
- `index.ts`: Category aggregator exporting all definitions and components.
- `[tool-slug].definition.ts`: The **Single Source of Truth** for the tool.
- `[tool-slug].tsx`: The React/Tailwind interactive tool component.

#### Anatomy of a Tool Definition (`*.definition.ts`)
```typescript
import { ToolDefinition } from '@/types/tool';

export const myToolDefinition: ToolDefinition = {
  id: 'my-custom-tool',
  slug: 'my-custom-tool',
  name: 'My Custom Tool',
  category: 'developer',
  subcategory: 'formatting',
  icon: 'Code2',
  shortDescription: 'Format and prettify data instantly in your browser.',
  longDescription: 'Comprehensive description explaining how the tool works...',
  features: [
    '100% Client-side execution',
    'Supports drag & drop input',
    'Instant copy & download'
  ],
  keywords: ['format', 'prettify', 'beautify', 'clean code'],
  faq: [
    {
      question: 'Is my data saved or uploaded?',
      answer: 'No. All processing happens in local browser memory.'
    }
  ]
};
```

---

### 2. `zevylo/src/app/` — Next.js 16 App Router
- `layout.tsx`: Root layout configuring Geist font, ThemeProvider (Dark/Light mode), Header, Footer, and global OpenGraph metadata.
- `page.tsx`: Main homepage featuring live tool search, category filters, trending utilities, and quick launcher cards.
- `tool/[slug]/page.tsx`: **Universal Tool Shell**. Dynamically resolves metadata from `*.definition.ts`, generates SEO tags + FAQ JSON-LD, and renders the tool component with full-screen, reset, and export options.
- `[category]/page.tsx`: Dedicated category portal pages (e.g. `/image`, `/pdf`, `/developer`).
- `ai-tools/`: AI discovery hub with A-to-Z alphabetical filtering and individual tool profile pages.
- `sitemap.ts` & `robots.ts`: Programmatic SEO sitemap generators indexing all 206+ tools.

---

### 3. `zevylo/src/components/` — UI & Design System
- `components/layout/`: Global Header, Navigation bar, Mobile drawer, and Footer.
- `components/tools/`:
  - `tool-wrapper.tsx`: Standard container providing title, description, badge tags, action buttons, and FAQ accordions.
  - `tool-icon.tsx`: Centralized Lucide icon mapping system.
- `components/ui/`: Primitive UI components (buttons, tabs, inputs, dropdowns, switches, badges, dialogs).

---

### 4. `zevylo/src/lib/` — Business Logic & Loaders
- `lib/tools/component-map.tsx`: Dynamic registry importing each tool component with `next/dynamic({ ssr: false })` to keep initial bundle sizes ultra-lean.
- `lib/ai-directory/`: Database and categories for the frontier AI tools directory.
- `lib/utils.ts`: Standard class merger (`clsx` + `tailwind-merge`) and formatting helpers.

---

### 5. `scripts/` — Project Automation
- `scripts/generate-codebase-graph.mjs`: Scans all tools, generates Mermaid diagrams, counts category metrics, and updates `ARCHITECTURE.md` and `README.md`.
- `zevylo/scripts/generate-tool-docs.mjs`: Parses definition files and generates 206 individual markdown documentation files in `zevylo/docs/tools/`.
