'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { 
  Film, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers,
  Plus
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { encodeGif } from '@/lib/utils/gif-encoder';

interface FrameItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function GifMaker() {
  const [frames, setFrames] = useState<FrameItem[]>([]);
  const [delayMs, setDelayMs] = useState<number>(200);
  const [targetWidth, setTargetWidth] = useState<number>(480);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedGifUrl, setGeneratedGifUrl] = useState<string | null>(null);
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);
    const validImages = filesArray.filter((f) => f.type.startsWith('image/'));
    if (validImages.length === 0) return;

    setGeneratedGifUrl(null);
    const newItems: FrameItem[] = validImages.map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setFrames((prev) => [...prev, ...newItems]);
  };

  const removeFrame = (id: string) => {
    setFrames((prev) => prev.filter((item) => item.id !== id));
    setGeneratedGifUrl(null);
  };

  const moveFrame = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= frames.length) return;
    setFrames((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setGeneratedGifUrl(null);
  };

  const generateGif = async () => {
    if (frames.length < 2) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < frames.length; i++) {
        const img = new Image();
        img.src = frames[i].previewUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load frame'));
        });
        loadedImages.push(img);
      }

      const firstImg = loadedImages[0];
      const aspect = (firstImg.naturalHeight || 300) / (firstImg.naturalWidth || 400);
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

      const imageDataFrames: ImageData[] = [];
      for (let i = 0; i < loadedImages.length; i++) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(loadedImages[i], 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        imageDataFrames.push(imgData);
        setProgress(Math.round(((i + 1) / loadedImages.length) * 50));
      }

      const gifBlob = encodeGif(imageDataFrames, delayMs, width, height);
      const gifUrl = URL.createObjectURL(gifBlob);

      setProgress(100);
      setGeneratedBlob(gifBlob);
      setGeneratedGifUrl(gifUrl);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!generatedGifUrl) return;
    const a = document.createElement('a');
    a.href = generatedGifUrl;
    a.download = `animated-${Date.now()}.gif`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-pink-500/10 text-pink-400">
            <Film className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Animated GIF Maker (Images to GIF)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Combine multiple PNG, JPG, or WebP images into a smooth animated GIF directly in your browser.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-gray-900 dark:text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-pink-500/20">
          <Plus className="w-4 h-4" />
          Upload Image Frames
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {frames.length > 0 && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-pink-400" /> Frame Delay
                </span>
                <span className="font-bold text-gray-900 dark:text-white">{delayMs} ms</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={delayMs}
                onChange={(e) => {
                  setDelayMs(parseInt(e.target.value));
                  setGeneratedGifUrl(null);
                }}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">GIF Width</span>
                <span className="font-bold text-gray-900 dark:text-white">{targetWidth}px</span>
              </div>
              <div className="flex items-center gap-2">
                {[320, 480, 640].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      setTargetWidth(w);
                      setGeneratedGifUrl(null);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      targetWidth === w ? 'bg-pink-500 text-gray-900 dark:text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-pink-400" />
                <span>{frames.length} frames</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFrames([]);
                  setGeneratedGifUrl(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Frames Strip */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Frame Sequence ({frames.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {frames.map((item, index) => (
                <div
                  key={item.id}
                  className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2 flex flex-col items-center"
                >
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <img
                      src={item.previewUrl}
                      alt={`Frame ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute top-1 left-1 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full px-1">
                    <button
                      type="button"
                      onClick={() => moveFrame(index, 'left')}
                      disabled={index === 0}
                      className="p-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white disabled:opacity-20"
                      title="Move left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFrame(item.id)}
                      className="p-1 rounded text-red-400 hover:text-red-300"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFrame(index, 'right')}
                      disabled={index === frames.length - 1}
                      className="p-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white disabled:opacity-20"
                      title="Move right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GIF Output Preview */}
          {generatedGifUrl && (
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-center space-y-3">
              <div className="flex justify-center">
                <img
                  src={generatedGifUrl}
                  alt="Generated GIF"
                  className="max-h-[360px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Size: {generatedBlob ? formatBytes(generatedBlob.size) : ''} · {targetWidth}px width
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser GIF89a quantization & encoding
            </div>

            {!generatedGifUrl ? (
              <button
                type="button"
                onClick={generateGif}
                disabled={isProcessing || frames.length < 2}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 disabled:opacity-50 text-gray-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Encoding GIF (${progress}%)...` : 'Create Animated GIF'}
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
