'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Film, Scissors, Download, ShieldCheck, Play, Pause } from 'lucide-react';

export default function VideoTrimmer() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoName, setVideoName] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [trimmedUrl, setTrimmedUrl] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlRefs = useRef<{ original: string; trimmed: string }>({ original: '', trimmed: '' });

  useEffect(() => {
    urlRefs.current = { original: videoUrl, trimmed: trimmedUrl };
  }, [videoUrl, trimmedUrl]);

  useEffect(() => {
    return () => {
      if (urlRefs.current.original) URL.revokeObjectURL(urlRefs.current.original);
      if (urlRefs.current.trimmed) URL.revokeObjectURL(urlRefs.current.trimmed);
    };
  }, []);

  const handleUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith('video/')) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (trimmedUrl) URL.revokeObjectURL(trimmedUrl);

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setVideoName(file.name.replace(/\.[^/.]+$/, ''));
    setTrimmedUrl('');
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 0;
    setDuration(dur);
    setStartTime(0);
    setEndTime(Math.min(15, dur));
  };

  const playTrimmedRegion = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = startTime;
    video.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.currentTime >= endTime && isPlaying) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const exportTrimmedClip = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || endTime <= startTime) return;

    setIsExporting(true);
    if (trimmedUrl) URL.revokeObjectURL(trimmedUrl);

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm',
    });

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setTrimmedUrl(url);
      setIsExporting(false);
    };

    mediaRecorder.start();
    video.currentTime = startTime;
    await video.play();

    const drawLoop = () => {
      if (video.currentTime >= endTime || video.paused || video.ended) {
        video.pause();
        mediaRecorder.stop();
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawLoop);
    };

    requestAnimationFrame(drawLoop);
  };

  const clipDuration = Math.max(0, endTime - startTime);

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        {!videoUrl ? (
          <label className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-blue-500 transition-colors">
            <Film className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select Video to Trim & Cut Online
            </span>
            <span className="text-xs text-gray-400 mt-1">MP4, WebM, MOV • Private Client-Side Trimming</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleUpload(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate max-w-md">
                Loaded: {videoName} ({duration.toFixed(1)}s total)
              </span>
              <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                Replace
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[380px]">
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                className="w-full max-h-[380px] object-contain"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Trimming Scrubber Controls */}
      {videoUrl && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Scissors className="h-4 w-4 text-blue-600" /> Set Start and End Points
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Current Time: {currentTime.toFixed(1)}s • Selected Clip Duration: {clipDuration.toFixed(1)}s
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={isPlaying ? pauseVideo : playTrimmedRegion}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlaying ? 'Pause' : 'Preview Selection'}
              </button>

              <button
                onClick={exportTrimmedClip}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm disabled:opacity-50"
              >
                <Scissors className="h-3.5 w-3.5" />
                {isExporting ? 'Trimming Clip...' : 'Trim & Export Clip'}
              </button>
            </div>
          </div>

          {/* Time Sliders */}
          <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <span>Start Time</span>
                <span>{startTime.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(0, endTime - 0.5)}
                step="0.1"
                value={startTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setStartTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <span>End Time</span>
                <span>{endTime.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min={startTime + 0.5}
                max={duration || 10}
                step="0.1"
                value={endTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setEndTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Exported Result */}
      {trimmedUrl && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                Trimmed Video Clip Ready ({clipDuration.toFixed(1)}s)
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Saved from {startTime.toFixed(1)}s to {endTime.toFixed(1)}s
              </div>
            </div>

            <a
              href={trimmedUrl}
              download={`${videoName}-trimmed.webm`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              <Download className="h-4 w-4" /> Download Trimmed Clip
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        Zero upload: Video clips are cut directly in your browser.
      </div>
    </div>
  );
}
