'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, RefreshCw, Lock, Unlock } from 'lucide-react';
import { loadImage, canvasToBlob, baseName } from '@/lib/image/canvas';
import { formatBytes } from '@/lib/utils';

type OutFormat = 'original' | 'image/png' | 'image/jpeg' | 'image/webp';

const EXT: Record<Exclude<OutFormat, 'original'>, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState('');
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);

  const [mode, setMode] = useState<'pixels' | 'percent'>('pixels');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percent, setPercent] = useState(100);
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<OutFormat>('original');
  const [quality, setQuality] = useState(90);

  const [outUrl, setOutUrl] = useState('');
  const [outSize, setOutSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const srcUrlRef = useRef('');
  const outUrlRef = useRef('');

  useEffect(() => {
    return () => {
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    };
  }, []);

  const handleFile = async (f: File) => {
    if (!f.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    const url = URL.createObjectURL(f);
    srcUrlRef.current = url;
    const img = await loadImage(url);
    setFile(f);
    setSrcUrl(url);
    setOrigW(img.naturalWidth);
    setOrigH(img.naturalHeight);
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
    setPercent(100);
  };

  const effectiveMime: Exclude<OutFormat, 'original'> =
    format === 'original'
      ? file?.type === 'image/jpeg'
        ? 'image/jpeg'
        : file?.type === 'image/webp'
          ? 'image/webp'
          : 'image/png'
      : format;
  const isLossy = effectiveMime === 'image/jpeg' || effectiveMime === 'image/webp';

  const targetW = mode === 'percent' ? Math.max(1, Math.round((origW * percent) / 100)) : Math.max(1, width);
  const targetH = mode === 'percent' ? Math.max(1, Math.round((origH * percent) / 100)) : Math.max(1, height);

  const process = useCallback(async () => {
    if (!srcUrl || !origW) return;
    setIsProcessing(true);
    try {
      const img = await loadImage(srcUrl);
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported.');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      if (effectiveMime === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      }
      ctx.drawImage(img, 0, 0, targetW, targetH);
      const blob = await canvasToBlob(canvas, effectiveMime, isLossy ? quality / 100 : undefined);
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      const url = URL.createObjectURL(blob);
      outUrlRef.current = url;
      setOutUrl(url);
      setOutSize(blob.size);
    } catch {
      /* ignore transient errors while typing */
    } finally {
      setIsProcessing(false);
    }
  }, [srcUrl, origW, targetW, targetH, effectiveMime, isLossy, quality]);

  useEffect(() => {
    if (!srcUrl) return;
    const timer = setTimeout(process, 200);
    return () => clearTimeout(timer);
  }, [process, srcUrl]);

  const onWidthChange = (value: number) => {
    setWidth(value);
    if (lock && origW) setHeight(Math.max(1, Math.round((value * origH) / origW)));
  };
  const onHeightChange = (value: number) => {
    setHeight(value);
    if (lock && origH) setWidth(Math.max(1, Math.round((value * origW) / origH)));
  };

  const handleDownload = () => {
    if (!outUrl || !file) return;
    const link = document.createElement('a');
    link.href = outUrl;
    link.download = `${baseName(file.name)}-${targetW}x${targetH}.${EXT[effectiveMime]}`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
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
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Resize an image</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Scale up or down by pixels or percentage. PNG, JPG, WebP supported. Processed in your browser.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors">
              Select Image
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Original: <strong className="text-gray-900 dark:text-gray-100 font-mono">{origW}×{origH}</strong>
              </p>
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold text-blue-600 hover:underline">
                Change
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
            </div>

            <div className="flex gap-2">
              {(['pixels', 'percent'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    mode === m ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {m === 'pixels' ? 'By pixels' : 'By percentage'}
                </button>
              ))}
            </div>

            {mode === 'pixels' ? (
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Width (px)</label>
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => onWidthChange(Number(e.target.value))}
                      className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono"
                    />
                  </div>
                  <button
                    onClick={() => setLock((v) => !v)}
                    className={`mb-0.5 p-2.5 rounded-xl border ${lock ? 'border-blue-400 text-blue-600 bg-blue-50 dark:bg-blue-950/30' : 'border-gray-200 dark:border-gray-700 text-gray-400'}`}
                    title={lock ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                  >
                    {lock ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Height (px)</label>
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => onHeightChange(Number(e.target.value))}
                      className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <span>Scale</span>
                  <span className="font-mono text-blue-600">{percent}% → {targetW}×{targetH}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={400}
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex gap-2">
                  {[25, 50, 75, 200].map((p) => (
                    <button key={p} onClick={() => setPercent(p)} className="flex-1 px-2 py-1 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as OutFormat)}
                  className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium"
                >
                  <option value="original">Keep original</option>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              {isLossy && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Quality: {quality}%</label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!outUrl || isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download {targetW}×{targetH} ({formatBytes(outSize)})
            </button>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500">Preview</p>
            <div className="w-full h-80 rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outUrl || srcUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private:</strong> Resizing happens locally with HTML5 Canvas. Your image never leaves your browser.
        </span>
      </div>
    </div>
  );
}
