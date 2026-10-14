'use client';

import React, { useState, useRef } from 'react';
import { Film, Download, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { encodeGif } from '@/lib/utils/gif-encoder';

export default function VideoToGif() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [targetWidth, setTargetWidth] = useState<number>(400);
  const [fps, setFps] = useState<number>(10);
  const [durationLimit, setDurationLimit] = useState<number>(5);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifSize, setGifSize] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setGifUrl(null);
    setGifSize(0);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleConvert = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessing(true);
    setProgress(0);
    setGifUrl(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    const videoDuration = Math.min(video.duration || 5, durationLimit);
    const totalFrames = Math.floor(videoDuration * fps);
    const frameInterval = 1 / fps;
    const aspect = (video.videoHeight || 300) / (video.videoWidth || 400);
    const targetHeight = Math.round(targetWidth * aspect);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const frames: ImageData[] = [];

    const captureFrameAt = (time: number): Promise<ImageData> => {
      return new Promise((resolve) => {
        video.currentTime = time;
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
          const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
          resolve(imgData);
        };
        video.addEventListener('seeked', onSeeked);
      });
    };

    try {
      for (let i = 0; i < totalFrames; i++) {
        const time = i * frameInterval;
        const frameData = await captureFrameAt(time);
        frames.push(frameData);
        setProgress(Math.round(((i + 1) / totalFrames) * 80));
      }

      // Encode captured frames to GIF
      const delayMs = Math.round(1000 / fps);
      const gifBlob = encodeGif(frames, delayMs, targetWidth, targetHeight);
      const url = URL.createObjectURL(gifBlob);

      setGifUrl(url);
      setGifSize(gifBlob.size);
      setProgress(100);
    } catch {
      // Handling error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!gifUrl) return;
    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'animation'}.gif`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <Film className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Convert MP4 & WebM Video to Animated GIF</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Create lightweight, looping animated GIFs from video files with custom resolution and frame rate.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-md">
          <Play className="w-4 h-4" />
          Select Video File
          <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
        </label>

        {videoFile && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {videoFile.name} ({formatBytes(videoFile.size)})
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                GIF Width (Resolution)
              </label>
              <select
                value={targetWidth}
                onChange={(e) => setTargetWidth(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="320">320px (Compact / Discord)</option>
                <option value="400">400px (Standard Web)</option>
                <option value="480">480px (High Quality)</option>
                <option value="600">600px (HD Width)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                Frame Rate (FPS)
              </label>
              <select
                value={fps}
                onChange={(e) => setFps(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="5">5 FPS (Smallest File Size)</option>
                <option value="10">10 FPS (Smooth / Recommended)</option>
                <option value="15">15 FPS (High Smoothness)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                Max Duration ({durationLimit}s)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={durationLimit}
                onChange={(e) => setDurationLimit(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors shadow-md disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? `Generating GIF (${progress}%)...` : 'Convert to Animated GIF'}
            </button>
          </div>

          {/* Hidden helper video and canvas */}
          <video ref={videoRef} src={videoUrl} muted playsInline className="hidden" />
          <canvas ref={canvasRef} className="hidden" />

          {/* Progress Bar */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Rendering frames and quantizing palette...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Output Card */}
          {gifUrl && (
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Generated Animated GIF Preview</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    Size: {formatBytes(gifSize)} • {targetWidth}px wide • {fps} FPS
                  </span>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Download .GIF
                </button>
              </div>

              <div className="flex justify-center p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gifUrl} alt="Generated GIF animation" className="rounded-lg max-h-[400px] object-contain shadow-2xl" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>100% In-Browser GIF Encoding: Frame capture, color quantization, and LZW compression run locally on your device with zero cloud uploads.</span>
      </div>
    </div>
  );
}
