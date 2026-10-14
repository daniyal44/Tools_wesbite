# 🔘 Zevylo — Buttons, Controls & Interactive UI Catalog

This document details every button, interactive control, modal trigger, and input widget implemented across the **Zevylo** application.

---

## 🧭 Navigation & Global Header Controls

Located in `zevylo/src/components/layout/header.tsx` and available on every page:

| Control | Type | Location | Behavior & Action |
|:---|:---:|:---:|:---|
| **Logo Link** | `Link` | Top Left | Navigates back to the root homepage (`/`). |
| **Search Bar Trigger** | `Button` | Center / Right | Opens the global search modal (`Ctrl+K`). Displays keyboard shortcut badge. |
| **AI Tools Link** | `Link` | Nav Bar | Navigates to `/ai-tools` (A-to-Z frontier AI directory). |
| **Categories Dropdown** | `Menu` | Nav Bar | Displays quick-links to all 18 tool categories (`Image`, `PDF`, `Video`, etc.). |
| **Theme Toggle** | `Button` | Top Right | Toggles between **Dark Mode** 🌙 and **Light Mode** ☀️. |
| **Mobile Menu Hamburger** | `Button` | Top Right (Mobile) | Toggles the responsive mobile slide-out navigation drawer. |

---

## 🛠️ Tool Action Bar (`ToolInteractiveBar`)

Located at the top of every tool container (`zevylo/src/components/tools/tool-interactive-bar.tsx`):

### 1. ⭐ Favorite Pin Button
- **Default State**: Gray pill with star icon (`Favorite`).
- **Active / Pinned State**: Amber highlight with filled star icon (`Pinned`).
- **Functionality**: Saves the tool slug to `localStorage.getItem('zevylo_favorite_tools')`. Dispatches a global `zevylo_favorites_updated` event to refresh the user workspace strip.

### 2. 🔗 Share Button
- **Icon**: `Share2` (Blue)
- **Action**: Opens the **Share Modal** containing 1-click social sharing links and direct URL copy.

### 3. `<>` Embed Widget Button
- **Icon**: `Code2` (Purple)
- **Action**: Opens the **Embed Modal** generating a zero-dependency responsive `<iframe>` code snippet for blogs and external sites.

### 4. ❝ Cite / Backlink Button
- **Icon**: `Quote` (Emerald)
- **Action**: Opens the **Citation Modal** providing pre-formatted citations in Markdown, HTML anchor, and academic APA formats.

### 5. 👍 / 👎 Helpful Feedback Widget
- **Controls**: Thumbs Up (`ThumbsUp`) and Thumbs Down (`ThumbsDown`) buttons.
- **Action**: Records user satisfaction in local browser storage (`zevylo_tool_feedback`) and displays an ephemeral *"Thanks!"* acknowledgment.

---

## 🪟 Modal Dialog Controls & Actions

### 1. Share Modal
- **Share on X / Twitter**: Opens Twitter web intent with pre-filled tool title and URL.
- **Share on LinkedIn**: Opens LinkedIn share window.
- **Share on Reddit**: Opens Reddit post submitter with title.
- **Share on WhatsApp**: Triggers WhatsApp Web / mobile chat share.
- **Share on Facebook**: Opens Facebook share dialog.
- **Direct Copy Link Button**: Copies clean canonical URL to clipboard and changes icon to green `Check` for 2 seconds.
- **Close Button (`X`)**: Dismisses the modal.

### 2. Embed Modal
- **Iframe Preview Box**: Displays responsive `<iframe>` code with 100% width, fixed height, border-radius, and backlink attribution.
- **Copy Embed Code Button**: 1-click copy with instant feedback.
- **Close Button (`X`)**: Dismisses the modal.

### 3. Citation Modal
- **Markdown Link Copy**: Copies `[Tool Name — Free Online Tool](https://zevylo.netlify.app/...)`.
- **HTML Link Copy**: Copies `<a href="..." title="...">Tool Name</a>`.
- **APA Citation Copy**: Copies `Zevylo. (2026). Tool Name [Web Application]...`.
- **Close Button (`X`)**: Dismisses the modal.

---

## 🎛️ Tool Playground Controls

Located inside individual tool interfaces (`zevylo/src/tools/`):

### 1. File Upload Dropzone (`FileUpload`)
- **Drag & Drop Area**: Accepts drag-and-drop files with hover ring highlight (`border-blue-500/50`).
- **Browse Files Button**: Triggers hidden `<input type="file">` dialog.
- **File Meta Tag**: Displays selected file name, dimensions, and human-readable byte size.

### 2. Primary Processing Button (`Button`)
- **Action**: Triggers WebAssembly, Canvas, or PDF-Lib processing.
- **Loading State**: Disables button, dims background, and renders an animated SVG spinner (`animate-spin`).
- **Class**: `bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-xl`.

### 3. Reset / Clear Button
- **Icon**: `RotateCcw` or `Trash2`
- **Action**: Clears input text, resets sliders to defaults, and revokes active Object URLs to free browser RAM.

### 4. Copy Output Button (`CopyButton`)
- **Icon**: `Copy` transitioning to `Check` (Green).
- **Action**: Writes result text, JSON, or Base64 string to `navigator.clipboard`.

### 5. Download Result Button
- **Icon**: `Download`
- **Action**: Creates a temporary anchor element (`<a download="...">`) pointing to the local blob URL, programmatically clicks it, and revokes the URL after 1000ms.

---

## 🧱 Primitive UI Button Variants (`zevylo/src/components/ui/button.tsx`)

The shared `Button` component supports standard variant styling:

| Variant | Tailwind Classes | Use Case |
|:---|:---|:---|
| **`default`** | `bg-blue-600 text-white hover:bg-blue-700` | Primary Call-to-Actions (Convert, Process, Generate, Download) |
| **`secondary`**| `bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700` | Secondary options (Share, Favorite, Copy, View Details) |
| **`outline`**  | `border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800` | Subtle tools (Cancel, Options, Backlinks) |
| **`ghost`**    | `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300` | Inline actions, icon triggers, close buttons |
| **`destructive`**| `bg-red-600 text-white hover:bg-red-700` | Irreversible form clears, resets |

### Button Sizes
- **`sm`**: `h-8 px-3 text-xs` (Tool header badges, inline copy)
- **`md`**: `h-10 px-4 py-2 text-sm` (Standard form actions)
- **`lg`**: `h-12 px-8 text-base` (Hero CTA buttons, main processing triggers)
