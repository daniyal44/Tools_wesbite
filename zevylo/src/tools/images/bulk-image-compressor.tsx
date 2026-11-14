'use client';

import React, { useState } from 'react';
import { Minimize2, Download, Trash2, Sparkles, ShieldCheck, Plus, TrendingDown } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface CompressedFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  url: string;
}

type OutputFormat = 'image/jpeg' | 'image/webp';

export default function BulkImageCompressor() {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(75);
  const [maxWidth, setMaxWidth] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CompressedFile[]>([]);

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

  const processBatch = async () => {
    if (sourceFiles.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    const ext = outputFormat === 'image/webp' ? 'webp' : 'jpg';

    try {
      const output: CompressedFile[] = [];

      for (let i = 0; i < sourceFiles.length; i++) {
        const file = sourceFiles[i];
        const img = await loadImage(file);

        const scale = maxWidth > 0 ? Math.min(1, maxWidth / img.naturalWidth) : 1;
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b || new Blob()), outputFormat, quality / 100)
        );

        const baseName = file.name.replace(/\.[^/.]+$/, '');
        output.push({
          id: `${baseName}-${i}-${Date.now()}`,
          name: `${baseName}-compressed.${ext}`,
          originalSize: file.size,
          compressedSize: blob.size,
          url: URL.createObjectURL(blob),
        });

        setProgress(Math.round(((i + 1) / sourceFiles.length) * 100));
      }

      setResults(output);
    } catch {
      // Skip files that the browser cannot decode
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

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0);
  const totalSaved = totalOriginal - totalCompressed;
  const savedPercent = totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Minimize2 className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Image Compressor</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Compress dozens of photos at once and see exactly how much space you saved.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-500/20">
          <Plus className="w-4 h-4" />
          Select Multiple Images
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {sourceFiles.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold uppercase tracking-wider">Quality</span>
                <span className="text-gray-900 dark:text-white font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={quality}
                onChange={(e) => {
                  setQuality(parseInt(e.target.value));
                  setResults([]);
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Max Width (px, 0 = keep)
              </label>
              <input
                type="number"
                min={0}
                value={maxWidth}
                onChange={(e) => {
                  setMaxWidth(parseInt(e.target.value) || 0);
                  setResults([]);
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Output Format
              </label>
              <div className="flex items-center gap-2">
                {[
                  { label: 'JPG', val: 'image/jpeg' as const },
                  { label: 'WebP (smallest)', val: 'image/webp' as const },
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
                        ? 'bg-emerald-500 text-black'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% client-side compression · No server upload
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">{sourceFiles.length} files</span>
              <button
                type="button"
                onClick={clearAll}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-semibold"
              >
                Clear All
              </button>
              {results.length === 0 ? (
                <button
                  type="button"
                  onClick={processBatch}
                  disabled={isProcessing}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  {isProcessing ? `Compressing (${progress}%)...` : `Compress ${sourceFiles.length} Images`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={downloadAll}
                  className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download All ({results.length})
                </button>
              )}
            </div>
          </div>

          {results.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                <TrendingDown className="w-4 h-4" />
                Saved {formatBytes(totalSaved)} ({savedPercent}%)
              </div>
              <div className="text-xs text-emerald-700/80 dark:text-emerald-400/80 font-semibold">
                {formatBytes(totalOriginal)} → {formatBytes(totalCompressed)} across {results.length} files
              </div>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => {
                const saving = r.originalSize > 0 ? Math.round(((r.originalSize - r.compressedSize) / r.originalSize) * 100) : 0;
                return (
                  <div
                    key={r.id}
                    className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white truncate">{r.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                        {formatBytes(r.originalSize)} → {formatBytes(r.compressedSize)} · {saving > 0 ? `${saving}% smaller` : 'already small'}
                      </div>
                    </div>
                    <a
                      href={r.url}
                      download={r.name}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Save
                    </a>
                  </div>
                );
              })}
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
        </div>
      )}
    </div>
  );
}
