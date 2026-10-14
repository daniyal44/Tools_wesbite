'use client';

import React, { useState, useRef } from 'react';
import { 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function RotateVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
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
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleRotateClockwise = () => {
    setRotation((prev) => ((prev + 90) % 360) as 0 | 90 | 180 | 270);
    setOutputUrl(null);
  };

  const handleRotateCounterClockwise = () => {
    setRotation((prev) => ((prev + 270) % 360) as 0 | 90 | 180 | 270);
    setOutputUrl(null);
  };

  const toggleFlipH = () => {
    setFlipH((prev) => !prev);
    setOutputUrl(null);
  };

  const toggleFlipV = () => {
    setFlipV((prev) => !prev);
    setOutputUrl(null);
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

  const processRotatedVideo = async () => {
    if (!videoRef.current || !videoUrl) return;
    setIsProcessing(true);
    setProgress(0);
    setOutputUrl(null);

    const video = videoRef.current;
    const isSwapped = rotation === 90 || rotation === 270;
    const canvas = document.createElement('canvas');
    const width = isSwapped ? video.videoHeight : video.videoWidth;
    const height = isSwapped ? video.videoWidth : video.videoHeight;

    canvas.width = width || 640;
    canvas.height = height || 360;
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
      const step = 1 / 30; // 30 FPS

      const renderFrame = async (currTime: number) => {
        if (currTime >= duration) {
          recorder.stop();
          video.currentTime = originalTime;
          return;
        }

        video.currentTime = currTime;
        await new Promise((r) => {
          video.onseeked = () => r(null);
        });

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(video, -video.videoWidth / 2, -video.videoHeight / 2);
        ctx.restore();

        setProgress(Math.round((currTime / duration) * 100));
        setTimeout(() => renderFrame(currTime + step), 10);
      };

      renderFrame(0);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    const ext = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4') ? 'mp4' : 'webm';
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-rotated.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400">
            <RotateCw className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Rotate & Flip Video Online</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Turn videos 90°, 180°, 270° or mirror flip horizontally/vertically without server uploads.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-purple-500/20">
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
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRotateCounterClockwise}
                disabled={isProcessing}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> 90° Left
              </button>
              <button
                type="button"
                onClick={handleRotateClockwise}
                disabled={isProcessing}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCw className="w-4 h-4" /> 90° Right
              </button>
              <button
                type="button"
                onClick={toggleFlipH}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  flipH ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FlipHorizontal className="w-4 h-4" /> Flip Horizontal
              </button>
              <button
                type="button"
                onClick={toggleFlipV}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  flipV ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FlipVertical className="w-4 h-4" /> Flip Vertical
              </button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Rotation: <strong className="text-gray-900 dark:text-white">{rotation}°</strong> | Flip: {flipH ? 'H' : ''}{flipV ? 'V' : ''}{!flipH && !flipV ? 'None' : ''}
            </div>
          </div>

          {/* Video Preview */}
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[320px] overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="max-h-[420px] max-w-full rounded-xl transition-transform duration-300"
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
              loop
              muted
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Preview' : 'Play Preview'}
            </button>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-side re-encoding · Zero server uploads
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processRotatedVideo}
                disabled={isProcessing || (rotation === 0 && !flipH && !flipV)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Rendering (${progress}%)...` : 'Export Rotated Video'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Rotated Video ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
