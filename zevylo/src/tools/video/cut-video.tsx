'use client';

import React, { useState, useRef } from 'react';
import { 
  Scissors, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function CutVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(5);
  const [duration, setDuration] = useState<number>(5);
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

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      const d = videoRef.current.duration || 5;
      setDuration(d);
      setStartTime(0);
      setEndTime(Math.min(d, 10));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const processCutVideo = async () => {
    if (!videoRef.current || !videoUrl) return;
    setIsProcessing(true);
    setProgress(0);
    setOutputUrl(null);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
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
      video.currentTime = startTime;
      await new Promise((r) => {
        video.onseeked = () => r(null);
      });

      const totalCutDuration = Math.max(0.1, endTime - startTime);
      const step = 1 / 30;
      let currTime = startTime;

      const renderNext = async () => {
        if (currTime >= endTime) {
          recorder.stop();
          video.currentTime = originalTime;
          return;
        }

        video.currentTime = currTime;
        await new Promise((r) => {
          video.onseeked = () => r(null);
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const pct = Math.min(100, Math.round(((currTime - startTime) / totalCutDuration) * 100));
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
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-cut.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-teal-500/10 text-teal-400">
            <Scissors className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Online Video Cutter (Ezgif Cut Video)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Cut and trim video clips to exact start and end seconds with 100% private in-browser export.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-teal-500/20">
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
          {/* Timeline Cut Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Start Time (seconds): {startTime.toFixed(1)}s
              </label>
              <input
                type="range"
                min="0"
                max={Math.max(0, endTime - 0.5)}
                step="0.1"
                value={startTime}
                onChange={(e) => {
                  setStartTime(parseFloat(e.target.value));
                  setOutputUrl(null);
                }}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                End Time (seconds): {endTime.toFixed(1)}s / {duration.toFixed(1)}s
              </label>
              <input
                type="range"
                min={startTime + 0.5}
                max={duration}
                step="0.1"
                value={endTime}
                onChange={(e) => {
                  setEndTime(parseFloat(e.target.value));
                  setOutputUrl(null);
                }}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Video Preview */}
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[320px] overflow-hidden">
            <video
              ref={videoRef}
              src={outputUrl || videoUrl}
              onLoadedMetadata={onLoadedMetadata}
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
                {isPlaying ? 'Pause' : 'Test Cut Range'}
              </button>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Duration: {(endTime - startTime).toFixed(1)} seconds · Zero watermark
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processCutVideo}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Trimming (${progress}%)...` : 'Cut & Export Video'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Cut Video ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
