'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Sliders, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevUrlRef = useRef<string>('');

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPEG, WebP).');
      return;
    }
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
  };

  const processImage = useCallback(async () => {
    if (!originalUrl || !originalFile) return;

    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = originalUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let targetWidth = img.naturalWidth;
      let targetHeight = img.naturalHeight;

      if (maxWidth > 0 && targetWidth > maxWidth) {
        const ratio = maxWidth / targetWidth;
        targetWidth = maxWidth;
        targetHeight = Math.round(targetHeight * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw and compress
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const q = format === 'image/png' ? undefined : quality / 100;
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsProcessing(false);
            return;
          }
          if (prevUrlRef.current) {
            URL.revokeObjectURL(prevUrlRef.current);
          }
          const newUrl = URL.createObjectURL(blob);
          prevUrlRef.current = newUrl;
          setCompressedUrl(newUrl);
          setCompressedBlob(blob);
          setIsProcessing(false);
        },
        format,
        q
      );
    } catch {
      setIsProcessing(false);
    }
  }, [originalUrl, originalFile, maxWidth, quality, format]);

  useEffect(() => {
    if (originalUrl) {
      const timer = setTimeout(() => {
        processImage();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [processImage, originalUrl]);

  const handleDownload = () => {
    if (!compressedUrl || !originalFile) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/png' ? 'png' : 'jpg';
    const nameWithoutExt = originalFile.name.substring(0, originalFile.name.lastIndexOf('.')) || 'image';
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `${nameWithoutExt}-compressed.${ext}`;
    link.click();
  };

  const originalSize = originalFile ? originalFile.size : 0;
  const compressedSize = compressedBlob ? compressedBlob.size : 0;
  const savedBytes = originalSize > compressedSize ? originalSize - compressedSize : 0;
  const percentSaved = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Upload Zone */}
      {!originalFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
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
            accept="image/png,image/jpeg,image/webp"
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
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Choose an image or drop it here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports PNG, JPEG, and WebP up to 50MB. Processed 100% in your browser.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors">
              Select Image File
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{originalFile.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Original Size: {formatBytes(originalSize)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Change Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFile(e.target.files[0]);
                  }}
                />
                <button
                  onClick={handleDownload}
                  disabled={!compressedUrl || isProcessing}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ({formatBytes(compressedSize)})</span>
                </button>
              </div>
            </div>

            {/* Parameter Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <span>Compression Quality</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Maximum compression</span>
                  <span>Highest fidelity</span>
                </div>
              </div>

              {/* Format Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Output Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'image/webp' | 'image/jpeg' | 'image/png')}
                  className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium"
                >
                  <option value="image/webp">WebP (Recommended • Smallest Size)</option>
                  <option value="image/jpeg">JPEG (Standard Web Compatibility)</option>
                  <option value="image/png">PNG (Lossless Transparency)</option>
                </select>
              </div>

              {/* Resize Resolution */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Resize Max Width
                </label>
                <select
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(Number(e.target.value))}
                  className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 font-medium"
                >
                  <option value={0}>Original Dimensions (No Resize)</option>
                  <option value={1920}>Full HD (1920px max)</option>
                  <option value={1280}>HD / Standard Web (1280px max)</option>
                  <option value={800}>Blog & Content (800px max)</option>
                  <option value={500}>Thumbnail (500px max)</option>
                </select>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Original</span>
                  <span className="text-base font-bold text-gray-900 dark:text-gray-100 font-mono">
                    {formatBytes(originalSize)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Compressed</span>
                  <span className="text-base font-bold text-green-600 dark:text-green-400 font-mono">
                    {formatBytes(compressedSize)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Bandwidth Saved</span>
                <span className={`text-lg font-extrabold ${percentSaved > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-600'}`}>
                  {percentSaved > 0 ? `-${percentSaved}% (${formatBytes(savedBytes)})` : 'Original Size'}
                </span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Visual Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                <span>Original</span>
                <span>{formatBytes(originalSize)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1.5 text-green-600 font-bold">
                  {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  Compressed Preview
                </span>
                <span className="font-mono text-green-600 font-bold">{formatBytes(compressedSize)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800">
                {compressedUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-xs text-gray-400">Processing...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Privacy Notice */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your images are processed entirely inside your browser using HTML5 Canvas. No image data is ever uploaded to any cloud server.
        </span>
      </div>
    </div>
  );
}
