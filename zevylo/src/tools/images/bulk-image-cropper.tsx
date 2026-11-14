'use client';

import React, { useState } from 'react';
import { Crop, Download, Trash2, Sparkles, ShieldCheck, Plus, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface CroppedFile {
  id: string;
  name: string;
  originalSize: number;
  resultSize: number;
  width: number;
  height: number;
  url: string;
}

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

const PRESETS: { label: string; ratio: number | null; note: string }[] = [
  { label: '1:1 Square', ratio: 1, note: 'Feed posts' },
  { label: '4:5 Portrait', ratio: 4 / 5, note: 'Instagram' },
  { label: '9:16 Story', ratio: 9 / 16, note: 'Reels & Shorts' },
  { label: '16:9 Wide', ratio: 16 / 9, note: 'YouTube & web' },
  { label: '3:2 Photo', ratio: 3 / 2, note: 'Classic photo' },
  { label: 'Custom px', ratio: null, note: 'Exact size' },
];

export default function BulkImageCropper() {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [presetIndex, setPresetIndex] = useState(0);
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1080);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [quality, setQuality] = useState(88);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CroppedFile[]>([]);

  const isCustom = PRESETS[presetIndex].ratio === null;

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

  /* Returns the centred crop box (source coordinates) and the output size. */
  const computeCrop = (img: HTMLImageElement) => {
    const presetRatio = PRESETS[presetIndex].ratio;
    const targetRatio = presetRatio ?? customWidth / Math.max(1, customHeight);
    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;

    // Largest centred rectangle inside the source with the target aspect ratio.
    let sw: number;
    let sh: number;
    if (srcW / srcH > targetRatio) {
      sh = srcH;
      sw = Math.round(srcH * targetRatio);
    } else {
      sw = srcW;
      sh = Math.round(srcW / targetRatio);
    }
    sw = Math.max(1, Math.min(sw, srcW));
    sh = Math.max(1, Math.min(sh, srcH));

    const sx = Math.max(0, Math.round((srcW - sw) / 2));
    const sy = Math.max(0, Math.round((srcH - sh) / 2));

    const outWidth = presetRatio === null ? Math.max(1, customWidth) : sw;
    const outHeight = presetRatio === null ? Math.max(1, customHeight) : sh;

    return { sx, sy, sw, sh, outWidth, outHeight };
  };

  const processBatch = async () => {
    if (sourceFiles.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    const extMap: Record<OutputFormat, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };

    try {
      const output: CroppedFile[] = [];

      for (let i = 0; i < sourceFiles.length; i++) {
        const file = sourceFiles[i];
        const img = await loadImage(file);
        const { sx, sy, sw, sh, outWidth, outHeight } = computeCrop(img);

        const canvas = document.createElement('canvas');
        canvas.width = outWidth;
        canvas.height = outHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        if (outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, outWidth, outHeight);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outWidth, outHeight);

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b || new Blob()), outputFormat, quality / 100)
        );

        const baseName = file.name.replace(/\.[^/.]+$/, '');
        output.push({
          id: `${baseName}-${i}-${Date.now()}`,
          name: `${baseName}-cropped-${outWidth}x${outHeight}.${extMap[outputFormat]}`,
          originalSize: file.size,
          resultSize: blob.size,
          width: outWidth,
          height: outHeight,
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
            <Crop className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Image Cropper</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Crop many images to the same shape at once — pick a social ratio or a custom size and centre-crop the batch.
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
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Crop Aspect Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setPresetIndex(idx);
                      setResults([]);
                    }}
                    className={`p-3 rounded-xl text-left transition-colors border ${
                      presetIndex === idx
                        ? 'bg-sky-500 text-black border-sky-500'
                        : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-bold">{preset.label}</span>
                    <span className={`block text-[10px] mt-0.5 ${presetIndex === idx ? 'text-black/70' : 'text-gray-400'}`}>
                      {preset.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {isCustom && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={customWidth}
                      onChange={(e) => {
                        setCustomWidth(parseInt(e.target.value) || 1);
                        setResults([]);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={customHeight}
                      onChange={(e) => {
                        setCustomHeight(parseInt(e.target.value) || 1);
                        setResults([]);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </>
              )}
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
              100% client-side cropping · No server upload
            </div>

            {results.length === 0 ? (
              <button
                type="button"
                onClick={processBatch}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Cropping (${progress}%)...` : `Crop ${sourceFiles.length} Images`}
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
                      <ImageIcon className="w-3 h-3" />
                      {r.width}×{r.height} · {formatBytes(r.originalSize)} → {formatBytes(r.resultSize)}
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
