# 🖥️ Zevylo Desktop — Open Source Native Application

> **Official Cross-Platform Desktop Application for Zevylo**  
> Run 206+ in-browser privacy-first utilities as a standalone native desktop app on Windows, macOS, and Linux.

---

## ✨ Desktop Features

- 🚀 **Offline Native Window**: Launches in an isolated, hardware-accelerated Chromium window with dark mode native frame.
- 🗂️ **System Tray Integration**: Stays docked in your taskbar system tray with quick-launch menus to Image, PDF, Developer, and Video tools.
- ⌨️ **Global Hotkeys**:
  - `Ctrl+Shift+T` / `Cmd+Shift+T`: Toggle / bring Zevylo window to front.
  - `Ctrl+K`: Global instant tool search.
- 📁 **Native OS File Dialogs**: Seamless integration with OS file selection and save dialogs.
- 🔔 **Native Desktop Notifications**: Alerts when long-running conversions (FFmpeg video trims, bulk image conversions) complete.
- 🛡️ **Zero Cloud Uploads**: Retains 100% client-side privacy. No files are ever sent to external cloud servers.

---

## 🚀 Quick Start (Development)

### 1. Prerequisites
- **Node.js**: v18+ (Node v20+ recommended)
- **npm** or **pnpm**

### 2. Install Desktop Dependencies
From the repository root:
```bash
cd desktop
npm install
```

### 3. Run in Development Mode
```bash
npm run dev
```
*(This connects to the local Next.js instance and opens the developer tools).*

---

## 📦 Building Standalone Installers & Portable Binaries

To generate release packages for your operating system:

```bash
# Build Windows Installer (.exe) and Portable Binary (.exe)
npm run dist:win

# Build macOS DMG (.dmg)
npm run dist:mac

# Build Linux AppImage & Debian package (.deb)
npm run dist:linux
```

All compiled binaries will be output into `desktop/dist/`.

---

## 🔒 Security Architecture

The desktop application enforces strict Electron security best practices:
- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- WebAssembly multi-threading headers (`Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp`)
- Whitelisted IPC channels via `window.zevyloDesktop`

---

## 📄 License & Attribution

- **Author**: Muhammad Daniyal ([@daniyal44](https://github.com/daniyal44))
- **License**: MIT Open Source License
