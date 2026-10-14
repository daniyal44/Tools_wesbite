'use client';

import React, { useState, useRef } from 'react';
import { Film, Download, ShieldCheck, Play, Sparkles } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function GifToMp4() {
  const [gifFile, setGifFile] = useState<File | null>(null);
  const [gifUrl, setGifUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mp4Url, setMp4Url] = useState<string | null>(null);
  const [mp4Size, setMp4Size] = useState<number>(0);
  const [loopCount, setLoopCount] = useState<number>(2);
  const [actualMimeType, setActualMimeType] = useState<string>('video/mp4');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGifFile(file);
    setMp4Url(null);
    setMp4Size(0);
    const url = URL.createObjectURL(file);
    setGifUrl(url);
  };

  const handleConvert = async () => {
    if (!gifUrl || !canvasRef.current) return;
    setIsProcessing(true);
    setMp4Url(null);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.width = img.naturalWidth || 400;
      canvas.height = img.naturalHeight || 400;

      const stream = canvas.captureStream(30);
      let mimeType = 'video/mp4';
      if (!MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/webm';
      }
      setActualMimeType(mimeType);

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 2500000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: mimeType });
        setMp4Url(URL.createObjectURL(videoBlob));
        setMp4Size(videoBlob.size);
        setIsProcessing(false);
      };

      recorder.start();

      // Draw frames over duration (e.g. 3 seconds per loop)
      const durationMs = loopCount * 3000;
      const startTime = performance.now();

      const drawLoop = (now: number) => {
        const elapsed = now - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (elapsed < durationMs) {
          requestAnimationFrame(drawLoop);
        } else {
          recorder.stop();
        }
      };

      requestAnimationFrame(drawLoop);
    };

    img.src = gifUrl;
  };

  const handleDownload = () => {
    if (!mp4Url) return;
    const a = document.createElement('a');
    a.href = mp4Url;
    const ext = actualMimeType.includes('mp4') ? 'mp4' : 'webm';
    a.download = `${gifFile?.name.replace(/\.[^/.]+$/, '') || 'animation'}.${ext}`;
    a.click();
  };

  const formatName = actualMimeType.includes('mp4') ? 'MP4' : 'WebM';

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
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Convert Animated GIF to MP4 & WebM Video</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Transform heavy GIF files into fast, lightweight, and hardware-accelerated videos.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-amber-500/20">
          <Play className="w-4 h-4" />
          Select GIF File
          <input type="file" accept="image/gif,image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {gifFile && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {gifFile.name} ({formatBytes(gifFile.size)})
          </div>
        )}
      </div>

      {gifUrl && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                Video Loops
              </label>
              <select
                value={loopCount}
                onChange={(e) => setLoopCount(parseInt(e.target.value))}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
              >
                <option value="1">1 Loop (~3 seconds)</option>
                <option value="2">2 Loops (~6 seconds)</option>
                <option value="3">3 Loops (~9 seconds)</option>
              </select>
            </div>

            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-black font-bold text-sm transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Encoding Video...' : 'Convert to Video'}
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Result Output Card */}
          {mp4Url && (
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Converted {formatName} Preview</h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                    Original GIF: {formatBytes(gifFile?.size || 0)} → Video: {formatBytes(mp4Size)}
                    {gifFile && gifFile.size > mp4Size && (
                      <span className="text-emerald-500 dark:text-emerald-300 font-bold ml-1.5">
                        ({Math.round(((gifFile.size - mp4Size) / gifFile.size) * 100)}% smaller!)
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-black text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  Download {formatName}
                </button>
              </div>

              <div className="flex justify-center p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                <video src={mp4Url} controls autoPlay loop className="rounded-lg max-h-[400px] shadow-2xl" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
        <span>100% Client-Side Video Encoding: Canvas capture and MediaRecorder encode directly on your hardware GPU without uploading anything.</span>
      </div>
    </div>
  );
}
