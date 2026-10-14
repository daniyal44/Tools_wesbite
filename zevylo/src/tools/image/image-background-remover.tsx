'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Sparkles, Pipette, Sliders, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ImageBackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState<number>(30);
  const [targetColor, setTargetColor] = useState<{ r: number; g: number; b: number }>({ r: 255, g: 255, b: 255 });
  const [feather, setFeather] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isEyedropper, setIsEyedropper] = useState<boolean>(false);

  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const processRemoval = useCallback(() => {
    if (!originalCanvasRef.current || !resultCanvasRef.current || !imageElementRef.current) return;
    setIsProcessing(true);

    const origCanvas = originalCanvasRef.current;
    const resCanvas = resultCanvasRef.current;
    const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
    const resCtx = resCanvas.getContext('2d');
    if (!origCtx || !resCtx) {
      setIsProcessing(false);
      return;
    }

    const width = origCanvas.width;
    const height = origCanvas.height;
    resCanvas.width = width;
    resCanvas.height = height;

    const imgData = origCtx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const { r: tr, g: tg, b: tb } = targetColor;
    const tolDist = (tolerance / 100) * 441.67; // max distance between (0,0,0) and (255,255,255) is ~441.67
    const featherDist = (feather / 100) * 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Euclidean color distance
      const dist = Math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2);

      if (dist <= tolDist) {
        data[i + 3] = 0; // Completely transparent
      } else if (dist <= tolDist + featherDist && featherDist > 0) {
        // Smooth alpha feather
        const alphaFraction = (dist - tolDist) / featherDist;
        data[i + 3] = Math.round(alphaFraction * 255);
      }
    }

    resCtx.putImageData(imgData, 0, 0);
    setIsProcessing(false);
  }, [targetColor, tolerance, feather]);

  const handleImageLoaded = (img: HTMLImageElement) => {
    imageElementRef.current = img;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      originalCanvasRef.current = canvas;

      // Auto-sample corner pixel for default background color
      const sample = ctx.getImageData(0, 0, 1, 1).data;
      setTargetColor({ r: sample[0], g: sample[1], b: sample[2] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setImageUrl(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => handleImageLoaded(img);
    img.src = url;
  };

  useEffect(() => {
    if (originalCanvasRef.current) {
      processRemoval();
    }
  }, [processRemoval]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isEyedropper || !resultCanvasRef.current || !originalCanvasRef.current) return;
    const rect = resultCanvasRef.current.getBoundingClientRect();
    const scaleX = originalCanvasRef.current.width / rect.width;
    const scaleY = originalCanvasRef.current.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const origCtx = originalCanvasRef.current.getContext('2d', { willReadFrequently: true });
    if (origCtx) {
      const pixel = origCtx.getImageData(x, y, 1, 1).data;
      setTargetColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
      setIsEyedropper(false);
    }
  };

  const handleDownloadPng = () => {
    if (!resultCanvasRef.current) return;
    const a = document.createElement('a');
    a.href = resultCanvasRef.current.toDataURL('image/png');
    a.download = `transparent-${file?.name.replace(/\.[^/.]+$/, '') || 'image'}.png`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Remove Background & Make Transparent PNG</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Instantly key out white, black, green screen, or custom color backdrops with feathering.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-amber-500/20">
          <Upload className="w-4 h-4" />
          Select Photo to Key Out
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {file && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>Color to Remove</span>
                <button
                  onClick={() => setIsEyedropper(!isEyedropper)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                    isEyedropper ? 'bg-amber-500 text-black font-bold' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Pipette className="w-3 h-3" /> {isEyedropper ? 'Click Image to Pick' : 'Eyedropper'}
                </button>
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-700 shrink-0"
                  style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }}
                />
                <div className="flex gap-1.5 flex-1">
                  {[
                    { label: 'White', color: { r: 255, g: 255, b: 255 } },
                    { label: 'Black', color: { r: 0, g: 0, b: 0 } },
                    { label: 'Green', color: { r: 0, g: 255, b: 0 } },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setTargetColor(preset.color)}
                      className="px-2.5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>Color Tolerance ({tolerance}%)</span>
                <Sliders className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </label>
              <input
                type="range"
                min="1"
                max="80"
                value={tolerance}
                onChange={(e) => setTolerance(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>Edge Feathering ({feather}%)</span>
                <RefreshCw className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={feather}
                onChange={(e) => setFeather(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Interactive Result Canvas with Checkerboard Background */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Transparent Output Preview</h3>
              <button
                onClick={handleDownloadPng}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                Download Transparent PNG
              </button>
            </div>

            <div
              className={`rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 flex justify-center items-center p-4 min-h-[300px] ${
                isEyedropper ? 'cursor-crosshair' : 'cursor-default'
              }`}
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #18181b 25%, transparent 25%), linear-gradient(-45deg, #18181b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #18181b 75%), linear-gradient(-45deg, transparent 75%, #18181b 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                backgroundColor: '#27272a',
              }}
            >
              <canvas
                ref={resultCanvasRef}
                onClick={handleCanvasClick}
                className="max-w-full max-h-[500px] object-contain shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>Zero Uploads: Pixel-level chroma keying runs 100% locally in your web browser. Your images remain private.</span>
      </div>
    </div>
  );
}
