'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Film, Download, ShieldCheck, Play, ArrowDownRight } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function VideoCompressor() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [videoName, setVideoName] = useState<string>('');
  const [resolution, setResolution] = useState<number>(720); // target height
  const [bitrateKbps, setBitrateKbps] = useState<number>(1200); // 1.2 Mbps
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlRefs = useRef<{ original: string; compressed: string }>({ original: '', compressed: '' });

  useEffect(() => {
    urlRefs.current = { original: videoUrl, compressed: compressedUrl };
  }, [videoUrl, compressedUrl]);

  useEffect(() => {
    return () => {
      if (urlRefs.current.original) URL.revokeObjectURL(urlRefs.current.original);
      if (urlRefs.current.compressed) URL.revokeObjectURL(urlRefs.current.compressed);
    };
  }, []);

  const handleUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith('video/')) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setOriginalSize(file.size);
    setVideoName(file.name.replace(/\.[^/.]+$/, ''));
    setCompressedUrl('');
    setCompressedSize(0);
    setProgress(0);
  };

  const startCompression = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.duration <= 0) return;

    setIsCompressing(true);
    setProgress(0);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    // Calculate dimensions
    const aspect = video.videoWidth / video.videoHeight || 16 / 9;
    const targetHeight = Math.min(resolution, video.videoHeight || resolution);
    const targetWidth = Math.round(targetHeight * aspect);

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsCompressing(false);
      return;
    }

    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm',
      videoBitsPerSecond: bitrateKbps * 1000,
    });

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setCompressedSize(blob.size);
      setIsCompressing(false);
      setProgress(100);
    };

    mediaRecorder.start();
    video.currentTime = 0;
    await video.play();

    const drawFrame = () => {
      if (video.paused || video.ended) {
        if (video.ended) {
          mediaRecorder.stop();
        }
        return;
      }
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
      const pct = Math.min(99, Math.round((video.currentTime / video.duration) * 100));
      setProgress(pct);
      requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(drawFrame);
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `${videoName}-compressed.webm`;
    a.click();
  };

  const savingsPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        {!videoUrl ? (
          <label className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-blue-500 transition-colors">
            <Film className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select Video to Compress Client-Side
            </span>
            <span className="text-xs text-gray-400 mt-1">MP4, WebM • 100% In-Browser Compression</span>
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
                Loaded: {videoName} ({formatBytes(originalSize)})
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

            <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[360px]">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full max-h-[360px] object-contain"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Compression Settings */}
      {videoUrl && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Target Compression Quality & Resolution
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="target-resolution-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Target Max Resolution
              </label>
              <select
                id="target-resolution-select"
                value={resolution}
                onChange={(e) => setResolution(parseInt(e.target.value, 10))}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              >
                <option value={1080}>1080p FHD (Keep High Definition)</option>
                <option value={720}>720p HD (Recommended for Web)</option>
                <option value={480}>480p SD (High Compression)</option>
                <option value={360}>360p (Maximum Data Savings)</option>
              </select>
            </div>

            <div>
              <label htmlFor="video-bitrate-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Video Bitrate Preset
              </label>
              <select
                id="video-bitrate-select"
                value={bitrateKbps}
                onChange={(e) => setBitrateKbps(parseInt(e.target.value, 10))}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
              >
                <option value={2500}>High Quality (2.5 Mbps)</option>
                <option value={1200}>Balanced (1.2 Mbps - Recommended)</option>
                <option value={600}>Compact (600 Kbps - Smallest File Size)</option>
              </select>
            </div>
          </div>

          {/* Compress Action & Progress */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={startCompression}
              disabled={isCompressing}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all"
            >
              <Play className="h-4 w-4 fill-white" />
              {isCompressing ? `Compressing (${progress}%)...` : 'Compress Video Now'}
            </button>

            {isCompressing && (
              <div className="flex-1 max-w-xs">
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compressed Result Card */}
      {compressedUrl && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <ArrowDownRight className="h-5 w-5 text-emerald-600" /> Compression Complete!
              </div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                Original: <span className="line-through">{formatBytes(originalSize)}</span> → Compressed:{' '}
                <strong className="text-emerald-600 font-bold">{formatBytes(compressedSize)}</strong>{' '}
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 font-bold text-emerald-700 dark:text-emerald-300">
                  {savingsPercent}% smaller
                </span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              <Download className="h-4 w-4" /> Download Compressed Video
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        Zero upload: Video is re-encoded 100% locally on your computer with your browser hardware decoder.
      </div>
    </div>
  );
}
