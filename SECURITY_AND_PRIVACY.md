# 🔒 Security & Privacy Architecture

> **The Privacy Guarantee**: When you use Zevylo, **your files never leave your device**.  
> All computation happens locally in your web browser. No cloud storage, no temporary server uploads, no data harvesting.

---

## 🛡️ Technical Privacy Model

Traditional utility websites operate on a **Server-Side Upload Model**:
```
[User Device]  ───(Uploads Private PDF/Photo)───►  [Cloud Server Disk / DB]
[User Device]  ◄───(Downloads Result)───────────  [Cloud Server Processing]
```
*Risks*: Data retention, cloud breaches, third-party logging, IP logging, and compliance violations (GDPR, HIPAA).

**Zevylo operates on a 100% Client-Side Sandbox Model**:
```
┌─────────────────────────────────────────────────────────────┐
│                      User's Web Browser                     │
│                                                             │
│   [File on Device] ──► [In-Memory ArrayBuffer / Blob]       │
│                                │                            │
│                                ▼                            │
│                  [Local Processing Engine]                  │
│       • WebAssembly (FFmpeg)    • HTML5 Canvas 2D           │
│       • PDF-Lib Engine          • Web Audio & Web Crypto    │
│                                │                            │
│                                ▼                            │
│               [Direct Instant Local Download]               │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │ 🚫 0 Bytes Transferred
                               ▼
                    [External Cloud Servers]
```

---

## 📊 Comparison: Zevylo vs Traditional Cloud Tools

| Feature | Traditional Tools (iLovePDF, Ezgif, etc.) | **Zevylo** |
|:---|:---:|:---:|
| **File Upload Location** | Remote Cloud Servers (AWS / GCP / Cloudflare) | **Local Device RAM only** |
| **Server Access to Files** | Yes (stored on server disks temporarily) | **Zero (Server never sees bytes)** |
| **File Size Artificial Limits** | Heavy limits (paywall after 10–50MB) | **No limits (constrained only by RAM)** |
| **Network Speed Dependency** | Slow upload + slow download | **Instant processing at CPU/GPU speeds** |
| **Offline Execution** | ❌ No | **✅ Yes (Works without internet)** |
| **Cloud Breaches Risk** | High | **Zero (Nothing stored to breach)** |
| **GDPR / Privacy Compliance** | Requires Data Processing Agreements (DPA) | **Compliant by design (No data collected)** |

---

## ⚙️ In-Browser Processing Engines

### 1. WebAssembly (FFmpeg WASM)
- Video trimming, MP4 to MP3, reverse video, GIF creation, and frame extraction are powered by `@ffmpeg/ffmpeg`.
- The FFmpeg C library is compiled directly to WebAssembly (`.wasm`) and executes inside an isolated browser Web Worker.
- Input files are written to the virtual memory file system (`FS.writeFile`), converted in memory, and downloaded directly without any HTTP requests.

### 2. HTML5 Canvas 2D & WebGL
- Image resizing, cropping, color depth adjustment, filters, meme generation, and format conversion (PNG, JPG, WebP, AVIF, ICO) are performed on the browser's hardware-accelerated canvas.

### 3. PDF-Lib & Mozilla PDF.js
- PDF splitting, merging, rotating, watermarking, page reordering, and metadata stripping run entirely in JavaScript within the browser.

### 4. Web Crypto API
- Password generators, hash checksums (SHA-256, SHA-512, MD5), HMAC generators, and encryption utilities use the native W3C `window.crypto.subtle` API.

---

## 🔐 Content Security Policy (CSP) & Isolation

Zevylo configures strict HTTP response headers:
```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```
These headers enable `SharedArrayBuffer` for multi-threaded WebAssembly while ensuring cross-origin isolation and preventing side-channel attacks (Spectre/Meltdown).

---

## ❓ Frequently Asked Questions

#### Q: Can Zevylo see what I type or upload into tools?
**A:** No. Zevylo contains no backend upload endpoints. Open your browser Developer Tools (F12) -> Network tab while using any tool: you will observe zero upload requests.

#### Q: Where are my files saved when I close the tab?
**A:** Nowhere. Everything resides in ephemeral browser memory (`ArrayBuffer`). The moment you close the browser tab or navigate away, memory is automatically reclaimed by the browser garbage collector.
