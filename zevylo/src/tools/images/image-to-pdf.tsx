'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, RefreshCw, Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { fileToImage, canvasToBlob } from '@/lib/image/canvas';
import { imagesToPdf, PdfImage, PdfPageSize, PdfOrientation } from '@/lib/image/pdf';
import { downloadBlob, formatBytes } from '@/lib/utils';

interface ImgItem {
  id: string;
  file: File;
  url: string;
  size: number;
}

export default function ImageToPdf() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const [pageSize, setPageSize] = useState<PdfPageSize>('a4');
  const [orientation, setOrientation] = useState<PdfOrientation>('auto');
  const [margin, setMargin] = useState(24);
  const [quality, setQuality] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<ImgItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      for (const it of itemsRef.current) URL.revokeObjectURL(it.url);
    };
  }, []);

  const addFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (incoming.length === 0) {
      alert('Please select image files (PNG, JPG, WebP, etc.).');
      return;
    }
    const newItems = incoming.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      url: URL.createObjectURL(file),
      size: file.size,
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const t = prev.find((i) => i.id === id);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const move = (index: number, dir: -1 | 1) => {
    setItems((prev) => {
      const next = index + dir;
      if (next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  };

  const buildPdf = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfImages: PdfImage[] = [];
      for (const item of items) {
        const img = await fileToImage(item.file);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas is not supported.');
        // Flatten onto white — JPEG has no alpha channel.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality / 100);
        pdfImages.push({
          jpeg: new Uint8Array(await blob.arrayBuffer()),
          width: canvas.width,
          height: canvas.height,
        });
      }
      const pdf = imagesToPdf(pdfImages, { pageSize, orientation, margin });
      downloadBlob(pdf, `zevylo-images-${Date.now()}.pdf`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to build PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalSize = items.reduce((s, i) => s + i.size, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
            : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
          }}
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Upload className="w-7 h-7" />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Images to PDF</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Drop images here or click to browse. Combine multiple images into a single PDF — one image per page.
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Page size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PdfPageSize)}
                className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium"
              >
                <option value="a4">A4</option>
                <option value="letter">US Letter</option>
                <option value="fit">Fit to image</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Orientation</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as PdfOrientation)}
                disabled={pageSize === 'fit'}
                className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium disabled:opacity-50"
              >
                <option value="auto">Auto</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Margin: {margin}pt</label>
              <input
                type="range"
                min={0}
                max={72}
                value={margin}
                disabled={pageSize === 'fit'}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Quality: {quality}%</label>
              <input
                type="range"
                min={30}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {items.length} image{items.length > 1 ? 's' : ''} · {formatBytes(totalSize)}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" /> Add more
              </button>
              <button
                onClick={buildPdf}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isProcessing ? 'Building…' : 'Create PDF'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group relative">
                <div className="aspect-square bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.file.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => move(index, -1)} disabled={index === 0} className="p-1 rounded bg-white/90 dark:bg-gray-800/90 disabled:opacity-30" title="Move up">
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-1 rounded bg-white/90 dark:bg-gray-800/90 disabled:opacity-30" title="Move down">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => remove(item.id)} className="p-1 rounded bg-white/90 dark:bg-gray-800/90 text-red-600" title="Remove">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> The PDF is generated entirely in your browser. Your images are never uploaded.
        </span>
      </div>
    </div>
  );
}
