'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, Trash2, ChevronUp, ChevronDown, Plus, RefreshCw } from 'lucide-react';
import { loadImage, canvasToBlob } from '@/lib/image/canvas';
import { formatBytes } from '@/lib/utils';

type Layout = 'horizontal' | 'vertical' | 'grid';
type OutFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface Item {
  id: string;
  file: File;
  url: string;
  img: HTMLImageElement;
}

const EXT: Record<OutFormat, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };

export default function ImageCombiner() {
  const [items, setItems] = useState<Item[]>([]);
  const [layout, setLayout] = useState<Layout>('horizontal');
  const [gap, setGap] = useState(10);
  const [bg, setBg] = useState('#ffffff');
  const [transparent, setTransparent] = useState(false);
  const [columns, setColumns] = useState(2);
  const [format, setFormat] = useState<OutFormat>('image/png');
  const [quality, setQuality] = useState(90);
  const [outUrl, setOutUrl] = useState('');
  const [outSize, setOutSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<Item[]>([]);
  const outUrlRef = useRef('');

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      for (const it of itemsRef.current) URL.revokeObjectURL(it.url);
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    };
  }, []);

  const addFiles = async (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (incoming.length === 0) {
      alert('Please select image files.');
      return;
    }
    for (const file of incoming) {
      const url = URL.createObjectURL(file);
      try {
        const img = await loadImage(url);
        setItems((prev) => [...prev, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, file, url, img }]);
      } catch {
        URL.revokeObjectURL(url);
      }
    }
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

  const isLossy = format === 'image/jpeg' || format === 'image/webp';
  const useTransparent = transparent && format !== 'image/jpeg';

  const build = useCallback(async () => {
    if (items.length === 0) {
      setOutUrl('');
      setOutSize(0);
      return;
    }
    setIsProcessing(true);
    try {
      const imgs = items.map((i) => i.img);
      const maxW = Math.max(...imgs.map((i) => i.naturalWidth));
      const maxH = Math.max(...imgs.map((i) => i.naturalHeight));

      let canvasW = 0;
      let canvasH = 0;
      let cols = 1;
      let rows = 1;

      if (layout === 'horizontal') {
        canvasW = imgs.reduce((s, i) => s + i.naturalWidth, 0) + gap * (imgs.length - 1);
        canvasH = maxH;
      } else if (layout === 'vertical') {
        canvasW = maxW;
        canvasH = imgs.reduce((s, i) => s + i.naturalHeight, 0) + gap * (imgs.length - 1);
      } else {
        cols = Math.max(1, Math.min(columns, imgs.length));
        rows = Math.ceil(imgs.length / cols);
        canvasW = cols * maxW + gap * (cols - 1);
        canvasH = rows * maxH + gap * (rows - 1);
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(canvasW));
      canvas.height = Math.max(1, Math.round(canvasH));
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported.');
      ctx.imageSmoothingQuality = 'high';
      if (!useTransparent) {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (layout === 'horizontal') {
        let x = 0;
        for (const img of imgs) {
          ctx.drawImage(img, x, (maxH - img.naturalHeight) / 2);
          x += img.naturalWidth + gap;
        }
      } else if (layout === 'vertical') {
        let y = 0;
        for (const img of imgs) {
          ctx.drawImage(img, (maxW - img.naturalWidth) / 2, y);
          y += img.naturalHeight + gap;
        }
      } else {
        imgs.forEach((img, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const cellX = col * (maxW + gap);
          const cellY = row * (maxH + gap);
          // contain within the cell, centered
          const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          ctx.drawImage(img, cellX + (maxW - w) / 2, cellY + (maxH - h) / 2, w, h);
        });
      }

      const blob = await canvasToBlob(canvas, format, isLossy ? quality / 100 : undefined);
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      const url = URL.createObjectURL(blob);
      outUrlRef.current = url;
      setOutUrl(url);
      setOutSize(blob.size);
    } catch {
      /* ignore */
    } finally {
      setIsProcessing(false);
    }
  }, [items, layout, gap, bg, useTransparent, columns, format, isLossy, quality]);

  useEffect(() => {
    const timer = setTimeout(build, 150);
    return () => clearTimeout(timer);
  }, [build]);

  const handleDownload = () => {
    if (!outUrl) return;
    const link = document.createElement('a');
    link.href = outUrl;
    link.download = `zevylo-combined-${Date.now()}.${EXT[format]}`;
    link.click();
  };

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
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Combine images</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Merge multiple images side-by-side, stacked, or in a grid. Drop images to begin.
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Layout</label>
              <select value={layout} onChange={(e) => setLayout(e.target.value as Layout)} className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium">
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            {layout === 'grid' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Columns</label>
                <input type="number" min={1} max={10} value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono" />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Gap: {gap}px</label>
              <input type="range" min={0} max={100} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} disabled={useTransparent} className="h-10 w-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent disabled:opacity-40" />
                <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} disabled={format === 'image/jpeg'} />
                  Transparent
                </label>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as OutFormat)} className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium">
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            {isLossy && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Quality: {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <div key={item.id} className="relative group">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-950 overflow-hidden border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                    <button onClick={() => move(index, -1)} disabled={index === 0} className="p-1 text-white disabled:opacity-30" title="Move left"><ChevronUp className="w-3.5 h-3.5 -rotate-90" /></button>
                    <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="p-1 text-white disabled:opacity-30" title="Move right"><ChevronDown className="w-3.5 h-3.5 -rotate-90" /></button>
                    <button onClick={() => remove(item.id)} className="p-1 text-red-300" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
              <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-blue-400">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleDownload}
              disabled={!outUrl || isProcessing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download ({formatBytes(outSize)})
            </button>
          </div>

          <div className="rounded-xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-center min-h-[180px] overflow-auto">
            {outUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={outUrl} alt="Combined preview" className="max-w-full max-h-[480px] object-contain" />
            ) : (
              <span className="text-xs text-gray-400">Preview appears here</span>
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> Images are combined locally with HTML5 Canvas. Nothing is uploaded.
        </span>
      </div>
    </div>
  );
}
