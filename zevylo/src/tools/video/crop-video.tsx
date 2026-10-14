'use client';

import React, { useState, useRef } from 'react';
import { 
  Crop, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function CropVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setOutputUrl(null);
    setOutputSize(0);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const processCropVideo = async () => {
    if (!videoRef.current || !videoUrl) return;
    setIsProcessing(true);
    setProgress(0);
    setOutputUrl(null);

    const video = videoRef.current;
    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 360;

    let targetRatio = 1;
    if (aspectRatio === '16:9') targetRatio = 16 / 9;
    if (aspectRatio === '9:16') targetRatio = 9 / 16;
    if (aspectRatio === '4:3') targetRatio = 4 / 3;

    let cropW = vWidth;
    let cropH = vHeight;

    if (vWidth / vHeight > targetRatio) {
      cropW = Math.round(vHeight * targetRatio);
      cropH = vHeight;
    } else {
      cropW = vWidth;
      cropH = Math.round(vWidth / targetRatio);
    }

    const startX = Math.round((vWidth - cropW) / 2);
    const startY = Math.round((vHeight - cropH) / 2);

    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    try {
      const stream = canvas.captureStream(30);
      let mimeType = 'video/mp4';
      if (!MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm';
      }

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2500000 });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const outputBlob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(outputBlob);
        setOutputUrl(url);
        setOutputSize(outputBlob.size);
        setIsProcessing(false);
      };

      recorder.start();

      const originalTime = video.currentTime;
      video.currentTime = 0;
      await new Promise((r) => {
        video.onseeked = () => r(null);
      });

      const duration = video.duration || 5;
      const step = 1 / 30;
      let currTime = 0;

      const renderNext = async () => {
        if (currTime >= duration) {
          recorder.stop();
          video.currentTime = originalTime;
          return;
        }

        video.currentTime = currTime;
        await new Promise((r) => {
          video.onseeked = () => r(null);
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw cropped portion
        ctx.drawImage(video, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

        const pct = Math.min(100, Math.round((currTime / duration) * 100));
        setProgress(pct);

        currTime += step;
        setTimeout(renderNext, 10);
      };

      renderNext();
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    const ext = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4') ? 'mp4' : 'webm';
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-cropped.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
            <Crop className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Crop Video Online (Ezgif Video Cropper)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Crop video dimensions to 1:1 Square, 9:16 TikTok/Reels, 16:9 Landscape, or 4:3.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-blue-500/20">
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
          {/* Ratio Selector */}
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Aspect Ratio:</span>
              {(['1:1', '9:16', '16:9', '4:3'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setAspectRatio(r);
                    setOutputUrl(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    aspectRatio === r ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {r === '1:1' ? '1:1 (Square)' : r === '9:16' ? '9:16 (TikTok)' : r === '16:9' ? '16:9 (YouTube)' : '4:3'}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Crop mode: <strong className="text-gray-900 dark:text-white">Centered {aspectRatio}</strong>
            </div>
          </div>

          {/* Video Preview */}
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[320px] overflow-hidden">
            <video
              ref={videoRef}
              src={outputUrl || videoUrl}
              className="max-h-[420px] max-w-full rounded-xl"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls={!!outputUrl}
              playsInline
              loop
            />
          </div>

          {!outputUrl && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Preview' : 'Play Original Preview'}
              </button>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-side crop rendering · Zero server upload
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processCropVideo}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Rendering Crop (${progress}%)...` : `Export Cropped Video (${aspectRatio})`}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Cropped Video ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
