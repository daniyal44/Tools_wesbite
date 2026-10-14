'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, X, RefreshCw, ArrowRight, Plus } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { fileToImage, canvasToBlob, baseName } from '@/lib/image/canvas';

export interface ImageConverterProps {
  fromLabel: string; // e.g. "PNG"
  toLabel: string; // e.g. "JPG"
  accept: string; // input accept attribute, e.g. ".png,image/png"
  acceptExts: string[]; // e.g. ["png"]
  outputMime: string; // e.g. "image/jpeg"
  outputExt: string; // e.g. "jpg"
  lossy?: boolean; // show a quality slider
  flatten?: boolean; // fill a white background (for formats without alpha)
}

type ItemStatus = 'pending' | 'processing' | 'done' | 'error';

interface ConvItem {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  status: ItemStatus;
  convertedUrl?: string;
  convertedBlob?: Blob;
  convertedSize?: number;
  error?: string;
}

export default function ImageConverter({
  fromLabel,
  toLabel,
  accept,
  acceptExts,
  outputMime,
  outputExt,
  lossy = false,
  flatten = false,
}: ImageConverterProps) {
  const [items, setItems] = useState<ConvItem[]>([]);
  const [quality, setQuality] = useState(90);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<ConvItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Revoke every object URL we created when the component unmounts.
  useEffect(() => {
    return () => {
      for (const it of itemsRef.current) {
        URL.revokeObjectURL(it.originalUrl);
        if (it.convertedUrl) URL.revokeObjectURL(it.convertedUrl);
      }
    };
  }, []);

  const isValid = useCallback(
    (file: File) => {
      const name = file.name.toLowerCase();
      return (
        acceptExts.some((ext) => name.endsWith(`.${ext}`)) ||
        (file.type !== '' && acceptExts.some((ext) => file.type.includes(ext === 'jpg' ? 'jpeg' : ext)))
      );
    },
    [acceptExts]
  );

  const convertItem = useCallback(
    async (item: ConvItem, q: number): Promise<Partial<ConvItem>> => {
      try {
        const img = await fileToImage(item.file);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas is not supported in this browser.');
        if (flatten) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, outputMime, lossy ? q / 100 : undefined);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
        return {
          status: 'done',
          convertedBlob: blob,
          convertedUrl: URL.createObjectURL(blob),
          convertedSize: blob.size,
        };
      } catch (err) {
        return { status: 'error', error: err instanceof Error ? err.message : 'Conversion failed.' };
      }
    },
    [flatten, lossy, outputMime]
  );

  const runConversions = useCallback(
    async (targets: ConvItem[], q: number) => {
      for (const target of targets) {
        const patch = await convertItem(target, q);
        setItems((prev) => prev.map((it) => (it.id === target.id ? { ...it, ...patch } : it)));
      }
    },
    [convertItem]
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList).filter(isValid);
      if (incoming.length === 0) {
        alert(`Please select valid ${fromLabel} file(s).`);
        return;
      }
      const newItems: ConvItem[] = incoming.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        originalUrl: URL.createObjectURL(file),
        originalSize: file.size,
        status: 'processing',
      }));
      setItems((prev) => [...prev, ...newItems]);
      void runConversions(newItems, quality);
    },
    [isValid, fromLabel, quality, runConversions]
  );

  // Re-encode everything when the quality slider settles (lossy formats only).
  useEffect(() => {
    if (!lossy || items.length === 0) return;
    const timer = setTimeout(() => {
      setItems((prev) => prev.map((it) => ({ ...it, status: 'processing' as ItemStatus })));
      void runConversions(itemsRef.current, quality);
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      }
      return prev.filter((it) => it.id !== id);
    });
  };

  const clearAll = () => {
    for (const it of items) {
      URL.revokeObjectURL(it.originalUrl);
      if (it.convertedUrl) URL.revokeObjectURL(it.convertedUrl);
    }
    setItems([]);
  };

  const downloadItem = (item: ConvItem) => {
    if (!item.convertedUrl) return;
    const link = document.createElement('a');
    link.href = item.convertedUrl;
    link.download = `${baseName(item.file.name)}.${outputExt}`;
    link.click();
  };

  const downloadAll = () => {
    const done = items.filter((it) => it.status === 'done');
    done.forEach((item, index) => setTimeout(() => downloadItem(item), index * 150));
  };

  const doneCount = items.filter((it) => it.status === 'done').length;
  const totalOriginal = items.reduce((sum, it) => sum + it.originalSize, 0);
  const totalConverted = items.reduce((sum, it) => sum + (it.convertedSize ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {items.length === 0 ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
              : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
            }}
          />
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Convert {fromLabel} to {toLabel}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Drop {fromLabel} file(s) here or click to browse. Batch conversion supported — processed 100% in your browser.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors">
              Select {fromLabel} File(s)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Toolbar */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">{fromLabel}</span>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {toLabel}
                </span>
                <span className="text-xs text-gray-400 ml-1">
                  {doneCount}/{items.length} ready
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) addFiles(e.target.files);
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  Clear
                </button>
                <button
                  onClick={downloadAll}
                  disabled={doneCount === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download all{doneCount > 1 ? ` (${doneCount})` : ''}
                </button>
              </div>
            </div>

            {lossy && (
              <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <span>{toLabel} Quality</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
              </div>
            )}

            {totalConverted > 0 && (
              <div className="flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
                <span>
                  Total in: <strong className="font-mono text-gray-700 dark:text-gray-300">{formatBytes(totalOriginal)}</strong>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>
                  Total out: <strong className="font-mono text-green-600 dark:text-green-400">{formatBytes(totalConverted)}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 shrink-0"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="aspect-video w-full rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.convertedUrl || item.originalUrl} alt={item.file.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {formatBytes(item.originalSize)}
                    {item.convertedSize !== undefined && (
                      <>
                        {' '}
                        <ArrowRight className="w-3 h-3 inline" />{' '}
                        <span className="text-green-600 dark:text-green-400">{formatBytes(item.convertedSize)}</span>
                      </>
                    )}
                  </div>
                  {item.status === 'processing' && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Converting
                    </span>
                  )}
                  {item.status === 'error' && (
                    <span className="text-xs text-red-600" title={item.error}>
                      Failed
                    </span>
                  )}
                  {item.status === 'done' && (
                    <button
                      onClick={() => downloadItem(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download className="w-3.5 h-3.5" /> .{outputExt}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> Your {fromLabel} files are converted entirely inside your browser with HTML5 Canvas. Nothing is uploaded to any server.
        </span>
      </div>
    </div>
  );
}
