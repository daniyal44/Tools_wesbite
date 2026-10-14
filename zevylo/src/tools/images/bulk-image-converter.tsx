'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Download, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface ConvertedFile {
  id: string;
  name: string;
  originalSize: number;
  convertedSize: number;
  url: string;
  blob: Blob;
}

export default function BulkImageConverter() {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (incoming.length === 0) return;

    setSourceFiles((prev) => [...prev, ...incoming]);
    setConvertedFiles([]);
  };

  const removeSourceFile = (index: number) => {
    setSourceFiles((prev) => prev.filter((_, i) => i !== index));
    setConvertedFiles([]);
  };

  const clearAll = () => {
    setSourceFiles([]);
    setConvertedFiles([]);
  };

  const processBulkConvert = async () => {
    if (sourceFiles.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setConvertedFiles([]);

    const extMap = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };
    const targetExt = extMap[targetFormat];

    try {
      const results: ConvertedFile[] = [];

      for (let i = 0; i < sourceFiles.length; i++) {
        const file = sourceFiles[i];
        const originalUrl = URL.createObjectURL(file);

        const img = new Image();
        img.src = originalUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load image'));
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b || new Blob()), targetFormat, quality / 100);
        });

        const url = URL.createObjectURL(blob);
        const baseName = file.name.replace(/\.[^/.]+$/, '');

        results.push({
          id: Math.random().toString(36).substring(2, 9),
          name: `${baseName}.${targetExt}`,
          originalSize: file.size,
          convertedSize: blob.size,
          url,
          blob,
        });

        URL.revokeObjectURL(originalUrl);
        setProgress(Math.round(((i + 1) / sourceFiles.length) * 100));
      }

      setConvertedFiles(results);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const downloadAll = () => {
    convertedFiles.forEach((cf, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = cf.url;
        a.download = cf.name;
        a.click();
      }, idx * 150);
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-400">
            <Layers className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk Image Converter (Ezgif Bulk Converters)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Batch convert multiple WebP, AVIF, PNG, JPG, and BMP images simultaneously in your browser.
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
          {/* Conversion Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Target Output Format
              </label>
              <div className="flex items-center gap-2">
                {[
                  { label: 'JPG', val: 'image/jpeg' as const },
                  { label: 'PNG', val: 'image/png' as const },
                  { label: 'WebP', val: 'image/webp' as const },
                ].map((fmt) => (
                  <button
                    key={fmt.val}
                    type="button"
                    onClick={() => {
                      setTargetFormat(fmt.val);
                      setConvertedFiles([]);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      targetFormat === fmt.val ? 'bg-sky-500 text-black' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold uppercase tracking-wider">Quality:</span>
                <span className="text-gray-900 dark:text-white font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={quality}
                onChange={(e) => {
                  setQuality(parseInt(e.target.value));
                  setConvertedFiles([]);
                }}
                disabled={targetFormat === 'image/png'}
                className="w-full accent-sky-500 cursor-pointer disabled:opacity-30"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">{sourceFiles.length} files selected</span>
              <button
                type="button"
                onClick={clearAll}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Client-side batch conversion · No server upload
            </div>

            {convertedFiles.length === 0 ? (
              <button
                type="button"
                onClick={processBulkConvert}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Converting (${progress}%)...` : `Convert ${sourceFiles.length} Images`}
              </button>
            ) : (
              <button
                type="button"
                onClick={downloadAll}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All ({convertedFiles.length} Files)
              </button>
            )}
          </div>

          {/* Results List */}
          {convertedFiles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {convertedFiles.map((cf) => (
                <div
                  key={cf.id}
                  className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">{cf.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                      {formatBytes(cf.originalSize)} → {formatBytes(cf.convertedSize)}
                    </div>
                  </div>
                  <a
                    href={cf.url}
                    download={cf.name}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Save
                  </a>
                </div>
              ))}
            </div>
          )}

          {convertedFiles.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {sourceFiles.map((f, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300"
                >
                  <span className="truncate">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSourceFile(idx)}
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
