'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Sliders, Upload, Download, RotateCcw, ShieldCheck } from 'lucide-react';

export default function ImageFilters() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filterStyle = useMemo(() => {
    return `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
  }, [brightness, contrast, grayscale, sepia, invert, blur, hueRotate]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setSepia(0);
    setInvert(0);
    setBlur(0);
    setHueRotate(0);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = filterStyle;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered-image.png';
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!imageSrc ? (
        /* Upload Card */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center hover:border-blue-500 transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-gray-900 dark:text-gray-100">
              Select or Drop a Photo to Edit
            </p>
            <p className="text-xs text-gray-400">Supports PNG, JPG, WebP, and SVG</p>
          </div>
        </div>
      ) : (
        /* Workspace */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Live Preview Display */}
          <div className="md:col-span-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-950 p-4 flex flex-col items-center justify-center shadow-xl overflow-hidden">
            <div className="relative max-h-[460px] max-w-full overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt="Filtered Result"
                style={{ filter: filterStyle }}
                className="max-h-[440px] max-w-full object-contain rounded-xl transition-all duration-150"
              />
            </div>
          </div>

          {/* Filter Sliders Panel */}
          <div className="md:col-span-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-600" />
                Filter Controls
              </h2>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-3 text-xs font-bold text-gray-700 dark:text-gray-300">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Brightness</span>
                  <span className="font-mono text-blue-600">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Contrast</span>
                  <span className="font-mono text-blue-600">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Grayscale (B&W)</span>
                  <span className="font-mono text-blue-600">{grayscale}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={grayscale}
                  onChange={(e) => setGrayscale(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Sepia Vintage</span>
                  <span className="font-mono text-blue-600">{sepia}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sepia}
                  onChange={(e) => setSepia(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Invert Colors</span>
                  <span className="font-mono text-blue-600">{invert}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={invert}
                  onChange={(e) => setInvert(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Blur</span>
                  <span className="font-mono text-blue-600">{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={blur}
                  onChange={(e) => setBlur(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Hue Rotation</span>
                  <span className="font-mono text-blue-600">{hueRotate}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hueRotate}
                  onChange={(e) => setHueRotate(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              <button
                onClick={handleDownload}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                <Download className="w-4 h-4" />
                Download Filtered Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Badge */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-xs text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% In-Browser Rendering:</strong> Image pixels are modified on your device with HTML5 Canvas.
        </span>
      </div>
    </div>
  );
}
