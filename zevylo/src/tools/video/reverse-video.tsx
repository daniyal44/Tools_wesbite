'use client';

import React, { useState, useRef } from 'react';
import { 
  History, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ReverseVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [speed, setSpeed] = useState<number>(1);
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

  const processReverseVideo = async () => {
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
      const fps = 25;
      const step = (1 / fps) * speed;
      let currTime = duration;

      const renderStep = async () => {
        if (currTime <= 0) {
          recorder.stop();
          return;
        }

        video.currentTime = currTime;
        await new Promise((r) => {
          video.onseeked = () => r(null);
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const pct = Math.min(100, Math.round(((duration - currTime) / duration) * 100));
        setProgress(pct);

        currTime -= step;
        setTimeout(renderStep, 15);
      };

      renderStep();
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    const ext = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4') ? 'mp4' : 'webm';
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-reversed.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
            <History className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reverse Video Online (Rewind Video)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Play and save your video clips backwards in reverse motion directly in your browser.
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
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Reverse Speed:</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSpeed(s);
                    setOutputUrl(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    speed === s ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {s}x
                </button>
              ))}
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
                {isPlaying ? 'Pause Original' : 'Play Original Preview'}
              </button>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-side reverse rendering · Zero watermark
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processReverseVideo}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Rendering Reverse (${progress}%)...` : 'Reverse Video Now'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Reversed Video ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
