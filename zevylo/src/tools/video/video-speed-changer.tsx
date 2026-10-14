'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Gauge, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function VideoSpeedChanger() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [speed, setSpeed] = useState<number>(1.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const presets = [
    { label: '0.25x (Super Slow)', value: 0.25 },
    { label: '0.5x (Slow-Mo)', value: 0.5 },
    { label: '0.75x', value: 0.75 },
    { label: '1.0x (Normal)', value: 1.0 },
    { label: '1.25x', value: 1.25 },
    { label: '1.5x (Fast)', value: 1.5 },
    { label: '2.0x (2x Speed)', value: 2.0 },
    { label: '4.0x (Timelapse)', value: 4.0 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setOutputUrl(null);
    setOutputSize(0);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

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

  const processSpeedChange = async () => {
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

      const duration = video.duration || 5;
      const fps = 30;
      const step = (1 / fps) * speed;
      let currTime = 0;

      const renderNext = async () => {
        if (currTime >= duration) {
          recorder.stop();
          return;
        }

        video.currentTime = currTime;
        await new Promise((r) => {
          video.onseeked = () => r(null);
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const pct = Math.min(100, Math.round((currTime / duration) * 100));
        setProgress(pct);

        currTime += step;
        setTimeout(renderNext, 12);
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
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-${speed}x.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <Gauge className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Video Speed Changer (Fast & Slow Motion)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Accelerate or decelerate video playback from 0.25x to 4x speed with client-side export.
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
          <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold uppercase tracking-wider">Select Playback Speed</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{speed}x Speed</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    setSpeed(p.value);
                    setOutputUrl(null);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    speed === p.value
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
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
                {isPlaying ? 'Pause Preview' : `Test Play at ${speed}x`}
              </button>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-side video encoding · Zero server latency
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processSpeedChange}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Rendering (${progress}%)...` : `Export at ${speed}x Speed`}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Speed Video ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
