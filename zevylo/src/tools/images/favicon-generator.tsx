'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Copy, Check, ShieldCheck, Globe } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface FaviconSize {
  size: number;
  label: string;
  dataUrl?: string;
}

export default function FaviconGenerator() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [sizes, setSizes] = useState<FaviconSize[]>([
    { size: 16, label: '16 × 16 (Browser Tab)' },
    { size: 32, label: '32 × 32 (Taskbar / Shortcut)' },
    { size: 48, label: '48 × 48 (Desktop High-DPI)' },
    { size: 180, label: '180 × 180 (Apple Touch Icon)' },
  ]);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSizes = useCallback(async (srcUrl: string) => {
    const img = new Image();
    img.src = srcUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const newSizes: FaviconSize[] = [];
    for (const s of [16, 32, 48, 180]) {
      const canvas = document.createElement('canvas');
      canvas.width = s;
      canvas.height = s;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, s, s);
        const dataUrl = canvas.toDataURL('image/png');
        newSizes.push({
          size: s,
          label: s === 16 ? '16 × 16 (Browser Tab)' : s === 32 ? '32 × 32 (Taskbar / Shortcut)' : s === 48 ? '48 × 48 (Desktop High-DPI)' : '180 × 180 (Apple Touch Icon)',
          dataUrl,
        });
      }
    }
    setSizes(newSizes);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  useEffect(() => {
    if (imageSrc) {
      const timer = setTimeout(() => {
        generateSizes(imageSrc);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [imageSrc, generateSizes]);

  const htmlTags = `<!-- Favicon & Apple Touch Icons -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  const downloadIcon = (s: FaviconSize) => {
    if (!s.dataUrl) return;
    const link = document.createElement('a');
    link.href = s.dataUrl;
    link.download = s.size === 180 ? 'apple-touch-icon.png' : `favicon-${s.size}x${s.size}.png`;
    link.click();
  };

  const handleCopyTags = async () => {
    await copyToClipboard(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Browser Tab Simulator Preview */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
        <div className="bg-gray-100 dark:bg-gray-800/80 px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          {/* Browser Tab */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-xs text-xs font-semibold text-gray-700 dark:text-gray-300">
            {sizes[0]?.dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sizes[0].dataUrl} alt="Favicon Tab" className="w-4 h-4 rounded-sm" />
            ) : (
              <Globe className="w-4 h-4 text-blue-600" />
            )}
            <span className="truncate">Your Website Title</span>
          </div>
        </div>
      </div>

      {!imageSrc ? (
        /* Upload Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center hover:border-blue-500 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-gray-900 dark:text-gray-100">
              Upload Square Logo or Graphic
            </p>
            <p className="text-xs text-gray-400">Recommended 512×512 PNG, SVG, or JPG</p>
          </div>
        </div>
      ) : (
        /* Icons Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sizes.map((s) => (
              <div
                key={s.size}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex flex-col items-center justify-between gap-4 text-center shadow-sm"
              >
                <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center justify-center p-2">
                  {s.dataUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.dataUrl}
                      alt={s.label}
                      style={{ width: `${Math.min(64, s.size)}px`, height: `${Math.min(64, s.size)}px` }}
                      className="object-contain"
                    />
                  )}
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-900 dark:text-gray-100 block">{s.label}</span>
                  <span className="font-mono text-[11px] text-gray-400">{s.size} × {s.size} PNG</span>
                </div>
                <button
                  onClick={() => downloadIcon(s)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-600 font-bold text-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            ))}
          </div>

          {/* HTML Link Tags */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                HTML Meta Link Tags
              </h2>
              <button
                onClick={handleCopyTags}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy HTML'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-xs text-blue-600 dark:text-blue-400 overflow-x-auto whitespace-pre">
              {htmlTags}
            </pre>
          </div>
        </div>
      )}

      {/* Privacy Badge */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-xs text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Favicon resizing happens strictly in your browser using Canvas.
        </span>
      </div>
    </div>
  );
}
