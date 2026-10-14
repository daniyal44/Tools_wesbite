# 🗺️ Product Roadmap & Vision

This roadmap outlines the milestones, upcoming features, and long-term vision for **Zevylo**.

---

## 🧭 Project Vision
To build the world's most capable, private, and open-source in-browser utility suite — replacing dozens of fragmented, ad-ridden, paywalled cloud services with an instant, zero-upload local tool OS.

---

## 📌 Milestones & Progress

### 🟢 Phase 1: Foundation & Scale (Completed)
- [x] **Next.js 16 App Router & React 19 Core**
- [x] **206+ Interactive Built-in Tools across 18 Categories** (Image, Video, Audio, PDF, Dev, Math, AI, Text, SEO)
- [x] **WebAssembly Engine**: Multi-threaded FFmpeg WASM for in-browser video/audio processing.
- [x] **Dynamic Component Loader**: Lazy loading to preserve fast initial page loads (<100ms FCP).
- [x] **A-to-Z AI Directory**: 100+ curated frontier AI tools cataloged with alphabetical quick jump.
- [x] **Single Source of Truth (`*.definition.ts`)**: Programmatic SEO metadata, JSON-LD, FAQs, and sitemaps.
- [x] **Automated Codebase Graph CI**: Dynamic Mermaid diagrams updating on git push.

---

### 🟡 Phase 2: Offline PWA & Local Storage (Current Focus)
- [ ] **Full Progressive Web App (PWA)**:
  - Service Worker caching for offline tool execution.
  - Installable on desktop (Windows, macOS) and mobile devices (iOS, Android).
- [ ] **IndexedDB File Vault**:
  - Optional local history and workspace for saved calculations, converted files, and palette favorites.
- [ ] **Batch Processing Queue**:
  - Multithreaded parallel processing for batch image/video conversions.

---

### 🔵 Phase 3: WebGPU & Local In-Browser AI Models
- [ ] **WebLLM Integration**:
  - Run quantized small language models (Phi-3, Gemma-2, Llama-3.2) directly on user GPU via WebGPU.
  - 100% private local summarization, translation, and code explanation.
- [ ] **Whisper WebAssembly**:
  - Real-time client-side speech-to-text transcription without API keys.
- [ ] **Client-Side Optical Character Recognition (OCR)**:
  - Tesseract.js integration for extracting text from images and scanned PDFs.

---

### 🟣 Phase 4: Desktop & Native Distribution
- [ ] **Tauri Desktop Application**:
  - Lightweight (<15MB) native desktop application for Windows, macOS, and Linux.
- [ ] **Chrome & Firefox Browser Extension**:
  - Side-panel quick-launch popup for instant color picking, regex testing, JSON formatting, and unit conversion.

---

## 💡 Proposing New Features & Tools

Have an idea for a utility or improvement?
1. Open an issue on our [GitHub Issues](https://github.com/daniyal44/Tools_wesbite/issues) page using the **Feature Request** template.
2. Read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to build and submit your own tool.
