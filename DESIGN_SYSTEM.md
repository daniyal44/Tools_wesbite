# 🎨 Zevylo — Design System & Visual Architecture

This document specifies the design philosophy, visual design tokens, typography, color system, and layout principles implemented across the **Zevylo** web application.

---

## 💎 Design Philosophy

Zevylo follows a modern, developer-centric aesthetic inspired by Vercel and Linear:
1. **Utility-First**: The UI gets out of the user's way. Tools take center stage.
2. **High-Contrast Clarity**: Text and controls maintain WCAG AAA contrast ratios in both light and dark themes.
3. **Micro-Interactions**: Subtle, fluid transitions (`duration-200`) on hover, focus, and state updates.
4. **Zero Layout Shift (CLS)**: Skeleton loaders and fixed-dimension containers eliminate jarring page jumps.

---

## 🌓 Theme Engine & Color Tokens

Zevylo utilizes **Tailwind CSS v4** paired with `next-themes` for seamless dark/light mode execution.

### Semantic Color Matrix

| Token | Light Theme Value | Dark Theme Value | Usage |
|:---|:---:|:---:|:---|
| `--background` | `#FFFFFF` | `#030712` (Gray 950) | Main page background |
| `--card` | `#F9FAFB` (Gray 50) | `#111827` (Gray 900) | Tool containers & modal dialogs |
| `--card-foreground` | `#111827` | `#F9FAFB` | Card titles and body text |
| `--primary` | `#2563EB` (Blue 600) | `#3B82F6` (Blue 500) | Primary CTA buttons & active highlights |
| `--primary-hover` | `#1D4ED8` (Blue 700) | `#60A5FA` (Blue 400) | Interactive hover states |
| `--secondary` | `#E5E7EB` (Gray 200) | `#1F2937` (Gray 800) | Secondary action buttons |
| `--muted` | `#F3F4F6` (Gray 100) | `#1E293B` (Slate 800) | Input backgrounds & code snippets |
| `--muted-foreground`| `#6B7280` (Gray 500) | `#9CA3AF` (Gray 400) | Subtitles, labels, and timestamps |
| `--border` | `#E5E7EB` (Gray 200) | `#1F2937` (Gray 800) | Container borders & divider lines |
| `--accent-gold` | `#D97706` (Amber 600) | `#FBBF24` (Amber 400) | Favorite star & pinned status |
| `--accent-green` | `#059669` (Emerald 600)| `#10B981` (Emerald 500)| Success indicators & copy checks |
| `--destructive` | `#DC2626` (Red 600) | `#EF4444` (Red 500) | Reset actions & error states |

---

## 🔤 Typography & Font Hierarchy

Zevylo implements Google's next-generation font family: **Geist** and **Geist Mono**.

```
Geist Sans    ──► UI Headlines, Card Titles, Navigation, Body Prose
Geist Mono    ──► Code Inputs, Hashes, RegEx, File Paths, Coordinates
```

### Scale & Hierarchy

| Element | Class Names | Size | Weight | Line Height |
|:---|:---|:---:|:---:|:---:|
| **Hero Title** | `text-3xl md:text-5xl font-extrabold tracking-tight` | 36px – 48px | 800 | 1.15 |
| **Section Heading (`h2`)** | `text-xl md:text-2xl font-bold tracking-tight` | 20px – 24px | 700 | 1.25 |
| **Tool Title (`h1`)** | `text-2xl md:text-3xl font-extrabold` | 24px – 30px | 800 | 1.2 |
| **Card Heading (`h3`)** | `text-base md:text-lg font-bold` | 16px – 18px | 700 | 1.3 |
| **Body Text** | `text-sm text-muted-foreground leading-relaxed` | 14px | 400 | 1.6 |
| **Label / Caption** | `text-xs font-semibold text-gray-500` | 12px | 600 | 1.4 |
| **Code / Monospace** | `font-mono text-xs md:text-sm` | 12px – 14px | 500 | 1.5 |

---

## 📐 Spacing, Containers & Breakpoints

### Base Grid: 4px Increments
- Standard padding: `p-3` (12px), `p-4` (16px), `p-6` (24px)
- Gap spacing: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)

### Responsive Viewport Breakpoints

| Breakpoint | Minimum Width | Target Devices | Layout Adaptations |
|:---:|:---:|:---|:---|
| `sm` | 640px | Large Phones & Phablets | 2-column tool grid |
| `md` | 768px | Tablets & Small Laptops | Navigation bar expands, sidebar opens |
| `lg` | 1024px | Laptops & Desktops | 3-column tool grid, dual-pane playground |
| `xl` | 1280px | Desktop Monitors | 4-column tool grid, max container width |
| `2xl`| 1536px | Ultra-wide Screens | Centered max-w-7xl with fluid margins |

---

## 📦 Component Styling Standards

### 1. Tool Cards
- **Border Radius**: `rounded-2xl` (16px) for outer container cards; `rounded-xl` (12px) for inner interactive surfaces.
- **Borders**: Thin, crisp 1px borders (`border border-gray-200 dark:border-gray-800`).
- **Hover State**: Gentle lift with border color highlight (`hover:border-blue-500/50 hover:shadow-lg transition-all`).

### 2. Modals & Dialogs
- **Backdrop**: Translucent black overlay with gaussian blur (`bg-black/60 backdrop-blur-sm`).
- **Card**: Elevated rounded container (`rounded-2xl bg-white dark:bg-gray-900 shadow-2xl`).

### 3. Iconography
- Powered by **Lucide React**.
- Standard Stroke Width: `1.75px` or `2px`.
- Dimensions: `w-4 h-4` (inline icons), `w-5 h-5` (button icons), `w-8 h-8` (hero category badges).
