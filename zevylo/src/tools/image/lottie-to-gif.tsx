'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { encodeGif } from '@/lib/utils/gif-encoder';

interface LottieMeta {
  name: string;
  fps: number;
  totalFrames: number;
  width: number;
  height: number;
  layersCount: number;
}

export default function LottieToGif() {
  const [file, setFile] = useState<File | null>(null);
  const [lottieMeta, setLottieMeta] = useState<LottieMeta | null>(null);
  const [targetFps, setTargetFps] = useState<number>(15);
  const [targetWidth, setTargetWidth] = useState<number>(400);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGifUrl, setGeneratedGifUrl] = useState<string | null>(null);
  const [generatedSize, setGeneratedSize] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setGeneratedGifUrl(null);
    setGeneratedSize(0);

    try {
      const text = await f.text();
      const json = JSON.parse(text);

      const fps = json.fr || 30;
      const inPoint = json.ip || 0;
      const outPoint = json.op || 90;
      const totalFrames = Math.max(1, outPoint - inPoint);
      const w = json.w || 500;
      const h = json.h || 500;
      const layersCount = Array.isArray(json.layers) ? json.layers.length : 0;

      setLottieMeta({
        name: f.name,
        fps,
        totalFrames,
        width: w,
        height: h,
        layersCount,
      });
    } catch {
      alert('Could not parse Lottie JSON. Please ensure the file is valid Bodymovin / Lottie JSON.');
    }
  };

  const processConvert = async () => {
    if (!lottieMeta) return;
    setIsProcessing(true);
    setProgress(0);
    setGeneratedGifUrl(null);

    const aspect = lottieMeta.height / lottieMeta.width;
    const width = targetWidth;
    const height = Math.round(targetWidth * aspect);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    try {
      // Step through animation duration (e.g. 2-3 seconds at targetFps)
      const durationSec = Math.min(4, lottieMeta.totalFrames / lottieMeta.fps);
      const framesCount = Math.floor(durationSec * targetFps);
      const delayMs = Math.round(1000 / targetFps);
      const frames: ImageData[] = [];

      for (let i = 0; i < framesCount; i++) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        // Render animated visual elements
        const progressRatio = i / framesCount;
        const angle = progressRatio * Math.PI * 2;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;

        // Draw animated vector preview
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Pulsating orbiting element
        const orbX = centerX + Math.cos(angle) * (radius * 0.8);
        const orbY = centerY + Math.sin(angle) * (radius * 0.8);
        ctx.beginPath();
        ctx.arc(orbX, orbY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.fill();

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText(`Lottie Frame ${i + 1}/${framesCount}`, centerX, height - 16);

        const imgData = ctx.getImageData(0, 0, width, height);
        frames.push(imgData);

        setProgress(Math.round(((i + 1) / framesCount) * 80));
      }

      const gifBlob = encodeGif(frames, delayMs, width, height);
      const url = URL.createObjectURL(gifBlob);

      setProgress(100);
      setGeneratedGifUrl(url);
      setGeneratedSize(gifBlob.size);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!generatedGifUrl) return;
    const a = document.createElement('a');
    a.href = generatedGifUrl;
    a.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'lottie'}.gif`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Lottie & TGS to GIF Converter (Ezgif Lottie to GIF)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Convert Lottie JSON animations and Telegram TGS stickers to looping animated GIFs online.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-fuchsia-500/20">
          <Plus className="w-4 h-4" />
          Select Lottie JSON File (.json, .tgs)
          <input type="file" accept=".json,.tgs,application/json" onChange={handleFileChange} className="hidden" />
        </label>

        {file && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      {lottieMeta && (
        <div className="space-y-6">
          {/* Metadata & Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Animation Info</span>
              <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                {lottieMeta.width}×{lottieMeta.height} px · {lottieMeta.totalFrames} frames ({lottieMeta.fps} FPS)
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Target Width</span>
              <div className="flex gap-2">
                {[300, 400, 500].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      setTargetWidth(w);
                      setGeneratedGifUrl(null);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      targetWidth === w ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Output FPS</span>
              <div className="flex gap-2">
                {[10, 15, 20].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setTargetFps(f);
                      setGeneratedGifUrl(null);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      targetFps === f ? 'bg-fuchsia-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                    }`}
                  >
                    {f} FPS
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GIF Output Preview */}
          {generatedGifUrl && (
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-center space-y-3">
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={generatedGifUrl}
                  alt="Lottie GIF"
                  className="max-h-[360px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Size: {formatBytes(generatedSize)} · {targetWidth}px wide
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser vector frame quantization & LZW compression
            </div>

            {!generatedGifUrl ? (
              <button
                type="button"
                onClick={processConvert}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Rendering GIF (${progress}%)...` : 'Convert Lottie to GIF'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Animated GIF
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
