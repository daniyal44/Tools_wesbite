'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, ArrowLeftRight, Columns, Layers, ShieldCheck } from 'lucide-react';

type CompareMode = 'slider' | 'sideBySide' | 'difference';

export default function ImageComparator() {
  const [imgAUrl, setImgAUrl] = useState<string>('');
  const [imgBUrl, setImgBUrl] = useState<string>('');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [mode, setMode] = useState<CompareMode>('slider');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const urlsRef = useRef<{ a: string; b: string }>({ a: '', b: '' });

  useEffect(() => {
    urlsRef.current = { a: imgAUrl, b: imgBUrl };
  }, [imgAUrl, imgBUrl]);

  useEffect(() => {
    return () => {
      if (urlsRef.current.a) URL.revokeObjectURL(urlsRef.current.a);
      if (urlsRef.current.b) URL.revokeObjectURL(urlsRef.current.b);
    };
  }, []);

  const handleFileChange = (slot: 'A' | 'B', file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    if (slot === 'A') {
      if (imgAUrl) URL.revokeObjectURL(imgAUrl);
      setImgAUrl(url);
    } else {
      if (imgBUrl) URL.revokeObjectURL(imgBUrl);
      setImgBUrl(url);
    }
  };

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(pct);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handlePointerMove(e.clientX);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Dual Dropzones */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Slot A: Before / Original */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Image A (Before / Original)
            </span>
            {imgAUrl && (
              <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('A', e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {!imgAUrl ? (
            <label className="flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-blue-500 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Upload Before Image
              </span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG, WebP</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('A', e.target.files?.[0])}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgAUrl} alt="Before preview" className="h-full w-full object-contain" />
            </div>
          )}
        </div>

        {/* Slot B: After / Processed */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Image B (After / Processed)
            </span>
            {imgBUrl && (
              <label className="text-xs text-emerald-600 cursor-pointer hover:underline">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('B', e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {!imgBUrl ? (
            <label className="flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-emerald-500 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Upload After Image
              </span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG, WebP</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('B', e.target.files?.[0])}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgBUrl} alt="After preview" className="h-full w-full object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('slider')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              mode === 'slider'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <ArrowLeftRight className="h-3.5 w-3.5" /> Interactive Split Slider
          </button>
          <button
            onClick={() => setMode('sideBySide')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              mode === 'sideBySide'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Columns className="h-3.5 w-3.5" /> Side by Side
          </button>
          <button
            onClick={() => setMode('difference')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              mode === 'difference'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Difference Blend
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4" /> Client-side private comparison
        </div>
      </div>

      {/* Comparison Viewer Stage */}
      {imgAUrl && imgBUrl ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col items-center">
          {mode === 'slider' && (
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full max-w-3xl h-[450px] rounded-2xl overflow-hidden shadow-md select-none cursor-ew-resize bg-gray-100 dark:bg-gray-800"
            >
              {/* Image B (Bottom layer) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgBUrl}
                alt="After"
                className="absolute inset-0 h-full w-full object-contain pointer-events-none"
              />

              {/* Image A (Clipped top layer) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgAUrl}
                  alt="Before"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-lg border-2 border-blue-600 flex items-center justify-center">
                  <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 left-4 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md pointer-events-none">
                Before ({Math.round(sliderPos)}%)
              </div>
              <div className="absolute top-4 right-4 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md pointer-events-none">
                After ({Math.round(100 - sliderPos)}%)
              </div>
            </div>
          )}

          {mode === 'sideBySide' && (
            <div className="grid gap-4 sm:grid-cols-2 w-full max-w-4xl">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/40 p-2">
                <span className="block text-xs font-bold text-center text-gray-500 mb-2">Before</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgAUrl} alt="Before" className="h-72 w-full object-contain rounded" />
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/40 p-2">
                <span className="block text-xs font-bold text-center text-gray-500 mb-2">After</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgBUrl} alt="After" className="h-72 w-full object-contain rounded" />
              </div>
            </div>
          )}

          {mode === 'difference' && (
            <div className="relative w-full max-w-3xl h-[450px] rounded-2xl overflow-hidden bg-gray-950 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgAUrl} alt="Before" className="absolute inset-0 h-full w-full object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgBUrl}
                alt="After"
                className="absolute inset-0 h-full w-full object-contain mix-blend-difference"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white">
                Difference blend mode: identical pixels appear pitch black.
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center text-gray-400">
          Upload both <strong>Before</strong> and <strong>After</strong> images above to launch the interactive comparison slider.
        </div>
      )}
    </div>
  );
}
