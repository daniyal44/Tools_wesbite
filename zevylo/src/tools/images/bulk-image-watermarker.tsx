'use client';

import React, { useState } from 'react';
import { Layers, Download, Trash2, Sparkles, ShieldCheck, Plus, Type } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface WatermarkedFile {
  id: string;
  name: string;
  originalSize: number;
  resultSize: number;
  url: string;
}

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
type Placement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'tiled';

const PLACEMENTS: { value: Placement; label: string }[] = [
  { value: 'top-left', label: '↖' },
  { value: 'top-center', label: '↑' },
  { value: 'top-right', label: '↗' },
  { value: 'middle-left', label: '←' },
  { value: 'center', label: '•' },
  { value: 'middle-right', label: '→' },
  { value: 'bottom-left', label: '↙' },
  { value: 'bottom-center', label: '↓' },
  { value: 'bottom-right', label: '↘' },
];

export default function BulkImageWatermarker() {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [text, setText] = useState('© Your Brand');
  const [placement, setPlacement] = useState<Placement>('bottom-right');
  const [fontSize, setFontSize] = useState(5);
  const [opacity, setOpacity] = useState(60);
  const [color, setColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [quality, setQuality] = useState(88);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<WatermarkedFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith('image/'));
    if (incoming.length === 0) return;
    setSourceFiles((prev) => [...prev, ...incoming]);
    setResults([]);
  };

  const removeFile = (index: number) => {
    setSourceFiles((prev) => prev.filter((_, i) => i !== index));
    setResults([]);
  };

  const clearAll = () => {
    setSourceFiles([]);
    setResults([]);
  };

  const loadImage = (file: File) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      img.src = url;
    });

  const drawWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const size = Math.max(10, Math.round((Math.min(width, height) * fontSize) / 100));
    ctx.font = `600 ${size}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity / 100;
    ctx.textBaseline = 'middle';
    const pad = Math.round(size * 0.8);
    const lines = text.split('\n');
    const lineHeight = size * 1.25;
    const blockHeight = lineHeight * lines.length;
    const maxLineWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));

    if (placement === 'tiled') {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 6);
      const stepX = maxLineWidth + size * 6;
      const stepY = blockHeight + size * 5;
      for (let x = -width; x < width; x += stepX) {
        for (let y = -height; y < height; y += stepY) {
          lines.forEach((line, i) => {
            ctx.fillText(line, x, y + i * lineHeight);
          });
        }
      }
      ctx.restore();
      ctx.globalAlpha = 1;
      return;
    }

    let x: number;
    if (placement.endsWith('left')) x = pad;
    else if (placement.endsWith('right')) x = width - maxLineWidth - pad;
    else x = (width - maxLineWidth) / 2;

    let top: number;
    if (placement.startsWith('top')) top = pad;
    else if (placement.startsWith('bottom')) top = height - pad - blockHeight;
    else top = (height - blockHeight) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, x, top + i * lineHeight + lineHeight / 2);
    });
    ctx.globalAlpha = 1;
  };

  const processBatch = async () => {
    if (sourceFiles.length === 0 || !text.trim()) return;
    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    const extMap: Record<OutputFormat, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };

    try {
      const output: WatermarkedFile[] = [];

      for (let i = 0; i < sourceFiles.length; i++) {
        const file = sourceFiles[i];
        const img = await loadImage(file);

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        drawWatermark(ctx, canvas.width, canvas.height);

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b || new Blob()), outputFormat, quality / 100)
        );

        const baseName = file.name.replace(/\.[^/.]+$/, '');
        output.push({
          id: `${baseName}-${i}-${Date.now()}`,
          name: `${baseName}-watermarked.${extMap[outputFormat]}`,
          originalSize: file.size,
          resultSize: blob.size,
          url: URL.createObjectURL(blob),
        });

        setProgress(Math.round(((i + 1) / sourceFiles.length) * 100));
      }

      setResults(output);
    } catch {
      // Skip files the browser cannot decode
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    results.forEach((r, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = r.url;
        a.download = r.name;
        a.click();
      }, idx * 150);
    });
  };

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-400">
            <Layers className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Image Watermarker</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Watermark many photos in one pass — set your text, placement, opacity, then download the whole batch.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-sky-500/20">
          <Plus className="w-4 h-4" />
          Select Multiple Images
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {sourceFiles.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Watermark Text
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setResults([]);
                }}
                rows={2}
                placeholder="© Your Brand 2026"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
              <p className="text-[11px] text-gray-400">Tip: press Enter for a second line.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Text Colour
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setResults([]);
                    }}
                    className="h-10 w-14 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{color}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Font
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => {
                    setFontFamily(e.target.value);
                    setResults([]);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Impact">Impact</option>
                  <option value="Verdana">Verdana</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Placement
              </label>
              <div className="grid grid-cols-3 gap-1.5 w-fit">
                {PLACEMENTS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      setPlacement(p.value);
                      setResults([]);
                    }}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                      placement === p.value
                        ? 'bg-sky-500 text-black'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setPlacement('tiled');
                  setResults([]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  placement === 'tiled'
                    ? 'bg-sky-500 text-black'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                }`}
              >
                Tiled pattern
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Font Size</span>
                  <span className="text-gray-900 dark:text-white font-bold">{fontSize}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={fontSize}
                  onChange={(e) => {
                    setFontSize(parseInt(e.target.value));
                    setResults([]);
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Opacity</span>
                  <span className="text-gray-900 dark:text-white font-bold">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={opacity}
                  onChange={(e) => {
                    setOpacity(parseInt(e.target.value));
                    setResults([]);
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                  Output Format
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'JPG', val: 'image/jpeg' as const },
                    { label: 'PNG', val: 'image/png' as const },
                    { label: 'WebP', val: 'image/webp' as const },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => {
                        setOutputFormat(f.val);
                        setResults([]);
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        outputFormat === f.val
                          ? 'bg-sky-500 text-black'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Quality</span>
                  <span className="text-gray-900 dark:text-white font-bold">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={quality}
                  onChange={(e) => {
                    setQuality(parseInt(e.target.value));
                    setResults([]);
                  }}
                  disabled={outputFormat === 'image/png'}
                  className="w-full accent-sky-500 cursor-pointer disabled:opacity-30"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% client-side watermarking · No server upload
            </div>

            {results.length === 0 ? (
              <button
                type="button"
                onClick={processBatch}
                disabled={isProcessing || !text.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Watermarking (${progress}%)...` : `Watermark ${sourceFiles.length} Images`}
              </button>
            ) : (
              <button
                type="button"
                onClick={downloadAll}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All ({results.length} Files)
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">{r.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5 flex items-center gap-1">
                      <Type className="w-3 h-3" />
                      {formatBytes(r.originalSize)} → {formatBytes(r.resultSize)}
                    </div>
                  </div>
                  <a
                    href={r.url}
                    download={r.name}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Save
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {sourceFiles.map((f, idx) => (
                <div
                  key={`${f.name}-${idx}`}
                  className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300"
                >
                  <span className="truncate">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-gray-400 dark:text-gray-500 hover:text-red-400 p-0.5 ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {sourceFiles.length > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearAll}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-semibold"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
