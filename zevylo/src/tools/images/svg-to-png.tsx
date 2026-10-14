'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Upload, Download, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#grad)" />
  <path d="M35 50 L45 60 L65 40" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

export default function SvgToPng() {
  const [svgInput, setSvgInput] = useState<string>(DEFAULT_SVG);
  const [scale, setScale] = useState<number>(2); // 1x, 2x, 4x, 8x
  const [bgColor, setBgColor] = useState<string>('transparent');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewDataUrl = useMemo(() => {
    if (!svgInput.trim()) return '';
    try {
      const encoded = encodeURIComponent(svgInput);
      return `data:image/svg+xml;charset=utf-8,${encoded}`;
    } catch {
      return '';
    }
  }, [svgInput]);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      alert('Please upload a valid .svg file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) setSvgInput(text);
    };
    reader.readAsText(file);
  };

  const handleDownloadPng = async () => {
    if (!previewDataUrl) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = previewDataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const baseW = img.naturalWidth || 300;
      const baseH = img.naturalHeight || 300;
      const targetW = baseW * scale;
      const targetH = baseH * scale;

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vector-${targetW}x${targetH}.png`;
        link.click();
        URL.revokeObjectURL(url);
        setIsProcessing(false);
      }, 'image/png');
    } catch {
      alert('Failed to render SVG. Please ensure the SVG markup is valid.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Controls Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Scale / Resolution:</span>
          {[1, 2, 4, 8].map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scale === s
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-300'
              }`}
            >
              {s}x {s === 2 ? '(Retina)' : s === 4 ? '(UHD)' : ''}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Background:</span>
          <button
            onClick={() => setBgColor('transparent')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${bgColor === 'transparent' ? 'bg-blue-50 text-blue-600 border-blue-400' : 'text-gray-500'}`}
          >
            Transparent
          </button>
          <button
            onClick={() => setBgColor('#ffffff')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${bgColor === '#ffffff' ? 'bg-blue-50 text-blue-600 border-blue-400' : 'text-gray-500'}`}
          >
            White
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* SVG Source Editor */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>SVG Source Markup</span>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload .svg
              </button>
              <button
                onClick={() => setSvgInput(DEFAULT_SVG)}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
              >
                <RefreshCw className="w-3 h-3" />
                Sample
              </button>
            </div>
          </div>
          <textarea
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            rows={13}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder="Paste <svg> markup here..."
          />
        </div>

        {/* Live Vector Preview & Download */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              Raster Preview ({scale}x)
            </span>
            <button
              onClick={handleDownloadPng}
              disabled={isProcessing || !previewDataUrl}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {isProcessing ? 'Rendering...' : `Download ${scale}x PNG`}
            </button>
          </div>

          <div
            className="w-full h-72 rounded-2xl flex items-center justify-center p-6 border border-gray-200 dark:border-gray-800 overflow-hidden relative"
            style={{
              backgroundColor: bgColor === 'transparent' ? undefined : bgColor,
              backgroundImage:
                bgColor === 'transparent'
                  ? 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)'
                  : undefined,
              backgroundSize: '16px 16px',
            }}
          >
            {previewDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewDataUrl} alt="SVG Preview" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-xs text-gray-400">Enter valid SVG markup to view preview</div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Badge */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-xs text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>Zero Server Latency:</strong> All vector rasterization is executed client-side on your device.
        </span>
      </div>
    </div>
  );
}
