'use client';

import React, { useState, useRef } from 'react';
import { 
  Video, 
  Download, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function VideoToMp4() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [bitrate, setBitrate] = useState<number>(2500000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [actualMimeType, setActualMimeType] = useState<string>('video/mp4');

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

  const processConvertMp4 = async () => {
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
      setActualMimeType(mimeType);

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitrate });
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
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

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
    const ext = actualMimeType.includes('mp4') ? 'mp4' : 'webm';
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'video'}-converted.${ext}`;
    a.click();
  };

  const formatName = actualMimeType.includes('mp4') ? 'MP4' : 'WebM';

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Video className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Convert to Video (MP4 or WebM)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Convert WebM, MOV, MKV, AVI, and other video files into browser-supported video formats.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-indigo-500/20">
          <Play className="w-4 h-4" />
          Select Video to Convert
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
          {/* Quality Options */}
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Output Quality:</span>
              {[
                { label: 'Standard (1.5 Mbps)', val: 1500000 },
                { label: 'High (2.5 Mbps)', val: 2500000 },
                { label: 'Ultra (4.0 Mbps)', val: 4000000 },
              ].map((q) => (
                <button
                  key={q.val}
                  type="button"
                  onClick={() => {
                    setBitrate(q.val);
                    setOutputUrl(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    bitrate === q.val ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Preview */}
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[320px] overflow-hidden">
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
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Preview' : 'Play Original Preview'}
              </button>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser re-encoding · No server bandwidth upload
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processConvertMp4}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Transcoding (${progress}%)...` : 'Convert Video'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {formatName} ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
