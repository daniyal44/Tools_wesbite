'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Crop, Upload, Download, RefreshCw, ShieldCheck } from 'lucide-react';

export default function ImageCropper() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [aspect, setAspect] = useState<'free' | '1:1' | '16:9' | '4:3'>('1:1');
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 }); // in percentages
  const [croppedDataUrl, setCroppedDataUrl] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const applyCrop = useCallback(() => {
    if (!imageSrc || !imageElementRef.current) return;
    const img = imageElementRef.current;

    const canvas = document.createElement('canvas');
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const pixelX = Math.round((cropBox.x / 100) * naturalW);
    const pixelY = Math.round((cropBox.y / 100) * naturalH);
    const pixelW = Math.round((cropBox.width / 100) * naturalW);
    const pixelH = Math.round((cropBox.height / 100) * naturalH);

    canvas.width = Math.max(1, pixelW);
    canvas.height = Math.max(1, pixelH);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, pixelX, pixelY, pixelW, pixelH, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCroppedDataUrl(dataUrl);
  }, [imageSrc, cropBox]);

  useEffect(() => {
    if (imageSrc) {
      const timer = setTimeout(() => {
        applyCrop();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [applyCrop, imageSrc, cropBox]);

  const handleAspectChange = (newAspect: 'free' | '1:1' | '16:9' | '4:3') => {
    setAspect(newAspect);
    if (newAspect === '1:1') {
      setCropBox({ x: 20, y: 20, width: 60, height: 60 });
    } else if (newAspect === '16:9') {
      setCropBox({ x: 10, y: 25, width: 80, height: 45 });
    } else if (newAspect === '4:3') {
      setCropBox({ x: 15, y: 20, width: 70, height: 52 });
    }
  };

  const handleDownload = () => {
    if (!croppedDataUrl) return;
    const link = document.createElement('a');
    link.href = croppedDataUrl;
    link.download = `cropped-${imageFile?.name || 'image.png'}`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!imageSrc ? (
        /* Upload Area */
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
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-gray-900 dark:text-gray-100">
              Select or Drop an Image to Crop
            </p>
            <p className="text-xs text-gray-400">Supports PNG, JPG, WebP, and GIF</p>
          </div>
        </div>
      ) : (
        /* Workspace */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Aspect Ratio:</span>
              {(['1:1', '16:9', '4:3', 'free'] as const).map((asp) => (
                <button
                  key={asp}
                  onClick={() => handleAspectChange(asp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    aspect === asp
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {asp}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setImageSrc('');
                  setImageFile(null);
                }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-600 dark:text-gray-400"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Image
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                Download Cropped PNG
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Cropper Preview Area */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-950 p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative inline-block max-w-full max-h-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageElementRef}
                  src={imageSrc}
                  alt="Original"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
                  }}
                  className="max-h-96 max-w-full object-contain rounded-lg"
                />

                {/* Simulated Visual Crop Box Overlay */}
                <div
                  className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] pointer-events-none"
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.width}%`,
                    height: `${cropBox.height}%`,
                  }}
                >
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-white border border-blue-600 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-white border border-blue-600 translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-white border border-blue-600 -translate-x-1/2 translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white border border-blue-600 translate-x-1/2 translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Sliders & Crop Result */}
            <div className="space-y-6">
              {/* Sliders */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3 text-xs font-bold text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-1.5">
                    <Crop className="w-4 h-4 text-blue-600" />
                    Crop Dimensions
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    Source: {imageDimensions.width} × {imageDimensions.height} px
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Horizontal Position (X)</span>
                    <span className="font-mono text-blue-600">{cropBox.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={100 - cropBox.width}
                    value={cropBox.x}
                    onChange={(e) => setCropBox((p) => ({ ...p, x: parseInt(e.target.value, 10) }))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Vertical Position (Y)</span>
                    <span className="font-mono text-blue-600">{cropBox.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={100 - cropBox.height}
                    value={cropBox.y}
                    onChange={(e) => setCropBox((p) => ({ ...p, y: parseInt(e.target.value, 10) }))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Crop Size / Scale</span>
                    <span className="font-mono text-blue-600">{cropBox.width}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max={100 - cropBox.x}
                    value={cropBox.width}
                    onChange={(e) => {
                      const w = parseInt(e.target.value, 10);
                      const h = aspect === '1:1' ? w : aspect === '16:9' ? Math.round((w * 9) / 16) : Math.round((w * 3) / 4);
                      setCropBox((p) => ({ ...p, width: w, height: h }));
                    }}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Cropped Output */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
                <span className="text-xs font-bold text-gray-500 block">Cropped Live Preview:</span>
                <div className="h-44 rounded-xl bg-gray-50 dark:bg-gray-950 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800 p-2">
                  {croppedDataUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={croppedDataUrl} alt="Cropped Preview" className="max-h-full max-w-full object-contain" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Badge */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-xs text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>100% Private Local Processing:</strong> Your image is cropped right inside your web browser. No photos are ever sent over the network.
        </span>
      </div>
    </div>
  );
}
