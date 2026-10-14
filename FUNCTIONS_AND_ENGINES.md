# ⚙️ Zevylo — Client-Side Functions & Processing Engines

> **Live Production Website**: [https://zevylo.netlify.app/](https://zevylo.netlify.app/)  
> **Source Repository**: [https://github.com/daniyal44/Tools_wesbite](https://github.com/daniyal44/Tools_wesbite)

This document provides a technical reference for the core client-side algorithms, WebAssembly pipelines, Canvas math, and utility functions powering **Zevylo**.

---

## 🎞️ 1. WebAssembly FFmpeg Processing Engine

For all heavy video and audio manipulations, Zevylo utilizes `@ffmpeg/ffmpeg` compiled to multi-threaded WebAssembly.

### Architecture & Initialization
```typescript
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export async function getFFmpeg(onProgress?: (progress: number) => void): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;

  ffmpeg = new FFmpeg();
  if (onProgress) {
    ffmpeg.on('progress', ({ progress }) => onProgress(Math.round(progress * 100)));
  }

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}
```

### Key Execution Routines

| Function / Tool | FFmpeg Virtual Command | Output Format |
|:---|:---|:---:|
| **Cut / Trim Video** | `ffmpeg -i input.mp4 -ss [start] -to [end] -c copy output.mp4` | `.mp4` |
| **Video to GIF** | `ffmpeg -i input.mp4 -vf "fps=15,scale=480:-1:flags=lanczos" output.gif` | `.gif` |
| **MP4 to MP3** | `ffmpeg -i input.mp4 -vn -acodec libmp3lame -q:a 2 output.mp3` | `.mp3` |
| **Reverse Video** | `ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4` | `.mp4` |
| **Speed Changer** | `ffmpeg -i input.mp4 -filter:v "setpts=[1/speed]*PTS" -filter:a "atempo=[speed]" output.mp4` | `.mp4` |
| **Extract Frames** | `ffmpeg -i input.mp4 -vf "fps=[fps]" frame_%04d.jpg` | `.zip` (JPGs) |

---

## 🎨 2. HTML5 Canvas 2D Graphics Engine

All image adjustments (resizing, cropping, filtering, watermarking, conversion) execute on the browser's hardware-accelerated Canvas.

### Image Resizing with Aspect Ratio Preservation
```typescript
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.round(srcWidth * ratio),
    height: Math.round(srcHeight * ratio)
  };
}
```

### Canvas Pixel Manipulation & Filters
```typescript
export function applyGrayscaleFilter(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = avg;     // Red
    data[i + 1] = avg; // Green
    data[i + 2] = avg; // Blue
  }
  ctx.putImageData(imgData, 0, 0);
}
```

### Lossless / High-Efficiency Blob Export
```typescript
export function exportCanvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'image/png' | 'image/jpeg' | 'image/webp',
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Export failed'))),
      format,
      quality
    );
  });
}
```

---

## 📑 3. PDF-Lib Document Mutation Engine

PDF operations use `pdf-lib` to read, split, merge, and watermark documents in browser memory.

### PDF Merge Routine
```typescript
import { PDFDocument } from 'pdf-lib';

export async function mergePDFs(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
}
```

### PDF Watermark Injection
```typescript
import { rgb, degrees } from 'pdf-lib';

export async function addWatermark(
  pdfBuffer: ArrayBuffer,
  watermarkText: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 4,
      y: height / 2,
      size: 48,
      color: rgb(0.75, 0.75, 0.75),
      opacity: 0.35,
      rotate: degrees(45)
    });
  }
  return await pdfDoc.save();
}
```

---

## 🔐 4. Web Crypto & Security Functions

Uses native W3C `window.crypto.subtle` for deterministic, hardware-backed cryptography:

### SHA-256 Checksum Calculation
```typescript
export async function calculateSHA256(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
```

### Cryptographically Secure Random String
```typescript
export function generateSecurePassword(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (num) => chars[num % chars.length]).join('');
}
```

---

## 🛠️ 5. General Utility Functions (`zevylo/src/lib/utils.ts`)

### Safe File Downloader
```typescript
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
```

### Human-Readable Byte Formatter
```typescript
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
```
