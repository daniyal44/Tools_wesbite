'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';

interface ExtractedColor {
  hex: string;
  rgb: string;
  percentage: number;
}

export default function ColorPaletteExtractor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [palette, setPalette] = useState<ExtractedColor[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const extractPaletteFromImage = useCallback((img: HTMLImageElement) => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // Downscale for fast quantization
    const sampleSize = 120;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

    const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
    const colorCounts: Record<string, number> = {};
    const totalPixels = sampleSize * sampleSize;

    // Bucket into 16-step quantization
    for (let i = 0; i < imgData.length; i += 4) {
      const a = imgData[i + 3];
      if (a < 128) continue; // skip transparent

      const r = Math.round(imgData[i] / 24) * 24;
      const g = Math.round(imgData[i + 1] / 24) * 24;
      const b = Math.round(imgData[i + 2] / 24) * 24;

      const key = `${r},${g},${b}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    // Sort by count
    const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);

    // Select distinct clusters
    const result: ExtractedColor[] = [];
    const minDistance = 50;

    for (const [key, count] of sorted) {
      const [r, g, b] = key.split(',').map(Number);
      const isTooClose = result.some(c => {
        const [cr, cg, cb] = c.rgb.replace(/[^\d,]/g, '').split(',').map(Number);
        const dist = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
        return dist < minDistance;
      });

      if (!isTooClose) {
        const hex = `#${Math.min(255, r).toString(16).padStart(2, '0')}${Math.min(255, g).toString(16).padStart(2, '0')}${Math.min(255, b).toString(16).padStart(2, '0')}`;
        const pct = Math.round((count / totalPixels) * 100);
        result.push({
          hex: hex.toUpperCase(),
          rgb: `rgb(${r}, ${g}, ${b})`,
          percentage: pct > 0 ? pct : 1,
        });
      }

      if (result.length >= 8) break;
    }

    setPalette(result);
    setIsProcessing(false);
  }, []);

  const handleImageFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      extractPaletteFromImage(img);
    };
    img.src = url;
  };

  // Load initial demo gradient on mount
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 300, 200);
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(0.3, '#10b981');
      grad.addColorStop(0.7, '#f59e0b');
      grad.addColorStop(1, '#ec4899');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 300, 200);

      const demoUrl = canvas.toDataURL();
      const img = new Image();
      img.onload = () => {
        setImageSrc(demoUrl);
        extractPaletteFromImage(img);
      };
      img.src = demoUrl;
    }
  }, [extractPaletteFromImage]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const exportCss = () => {
    let css = ':root {\n';
    palette.forEach((c, idx) => {
      css += `  --color-palette-${idx + 1}: ${c.hex};\n`;
    });
    css += '}\n';
    copyToClipboard(css, 'css-export');
  };

  const exportJson = () => {
    const json = JSON.stringify(palette, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color_palette.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Upload & Image Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Dropzone */}
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors">
          <Upload className="h-8 w-8 text-blue-500 mb-2" />
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Upload Image to Extract Palette
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Supports PNG, JPEG, WebP. Analyzed locally in your browser memory.
          </p>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all active:scale-95">
            <ImageIcon className="h-4 w-4" /> Browse Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageFile(f);
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Source Image Preview */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col items-center justify-center min-h-[220px]">
          {imageSrc ? (
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt="Uploaded source"
                className="max-h-full max-w-full object-contain"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium backdrop-blur-sm">
                  Extracting Colors...
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs text-gray-400">Upload an image to preview</span>
          )}
        </div>
      </div>

      {/* Extracted Swatches Gallery */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Extracted Color Palette ({palette.length} Colors)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Click any color swatch to copy HEX code
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCss}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              {copiedKey === 'css-export' ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedKey === 'css-export' ? 'Copied CSS!' : 'Copy CSS :root'}
            </button>
            <button
              onClick={exportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Export JSON
            </button>
          </div>
        </div>

        {/* Palette Strip */}
        <div className="h-8 w-full rounded-xl overflow-hidden flex shadow-inner mb-6">
          {palette.map((col, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: col.hex, flex: col.percentage }}
              className="h-full transition-all hover:opacity-90 cursor-pointer"
              title={`${col.hex} (${col.percentage}%)`}
              onClick={() => copyToClipboard(col.hex, `strip-${idx}`)}
            />
          ))}
        </div>

        {/* Individual Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {palette.map((color, idx) => (
            <button
              key={idx}
              onClick={() => copyToClipboard(color.hex, `card-${idx}`)}
              className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-blue-500 transition-all text-left group"
            >
              <div
                className="w-full h-16 rounded-lg shadow-sm mb-2 border border-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-gray-900 dark:text-white">
                  {color.hex}
                </span>
                {copiedKey === `card-${idx}` ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <span className="text-[10px] text-gray-400 block font-mono mt-0.5">
                {color.rgb}
              </span>
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
