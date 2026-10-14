'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Film, CheckCircle, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function VideoQualityChecker() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoName, setVideoName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const urlRef = useRef<string>('');

  useEffect(() => {
    urlRef.current = videoUrl;
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const handleUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith('video/')) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setVideoName(file.name);
    setFileSize(file.size);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setWidth(video.videoWidth || 0);
    setHeight(video.videoHeight || 0);
    setDuration(video.duration || 0);
  };

  // Metrics
  const estimatedBitrateMbps =
    duration > 0 && fileSize > 0
      ? ((fileSize * 8) / (duration * 1000000)).toFixed(2)
      : '0.00';

  const resolutionLabel =
    height >= 2160
      ? '4K Ultra HD (2160p)'
      : height >= 1440
      ? '2K Quad HD (1440p)'
      : height >= 1080
      ? 'Full HD (1080p)'
      : height >= 720
      ? 'HD (720p)'
      : 'Standard Definition (SD)';

  const aspectRatio =
    width > 0 && height > 0
      ? Math.abs(width / height - 16 / 9) < 0.05
        ? '16:9 (Landscape Widescreen)'
        : Math.abs(width / height - 9 / 16) < 0.05
        ? '9:16 (Vertical Shorts/TikTok)'
        : Math.abs(width / height - 1) < 0.05
        ? '1:1 (Square)'
        : Math.abs(width / height - 4 / 3) < 0.05
        ? '4:3 (Classic)'
        : `${(width / height).toFixed(2)}:1`
      : 'Unknown';

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        {!videoUrl ? (
          <label className="flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-blue-500 transition-colors">
            <Film className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select Video to Inspect Quality & Metadata
            </span>
            <span className="text-xs text-gray-400 mt-1">MP4, WebM, MOV, MKV • 100% Private Client-Side Inspection</span>
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
                Loaded: {videoName}
              </span>
              <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                Inspect Another Video
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
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full max-h-[360px] object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Metadata Dashboard */}
      {width > 0 && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Resolution</span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {width} × {height}
              </div>
              <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold mt-1 block">
                {resolutionLabel}
              </span>
            </div>

            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Aspect Ratio</span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {aspectRatio.split(' ')[0]}
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold mt-1 block">
                {aspectRatio}
              </span>
            </div>

            <div className="rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/40 dark:bg-purple-950/20 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Bitrate (Est.)</span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {estimatedBitrateMbps} <span className="text-sm font-semibold text-purple-500">Mbps</span>
              </div>
              <span className="text-xs text-purple-700 dark:text-purple-300 font-semibold mt-1 block">
                {parseFloat(estimatedBitrateMbps) > 5 ? 'High Bitrate' : 'Standard Web Bitrate'}
              </span>
            </div>

            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">File Size & Duration</span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatBytes(fileSize)}
              </div>
              <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1 block">
                {Math.floor(duration / 60)}m {Math.round(duration % 60)}s duration
              </span>
            </div>
          </div>

          {/* Social Media Platform Readiness */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" /> Platform Optimization Readiness
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">YouTube (Landscape)</div>
                <div className="flex items-center gap-1.5 text-xs">
                  {width >= 1920 && height >= 1080 ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> 1080p FHD Ready
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" /> Below 1080p recommendation
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">TikTok & Reels (Vertical)</div>
                <div className="flex items-center gap-1.5 text-xs">
                  {height > width ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> 9:16 Vertical Format
                    </span>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" /> Horizontal (Use 9:16 for Reels)
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">Discord & Email (Size)</div>
                <div className="flex items-center gap-1.5 text-xs">
                  {fileSize < 25 * 1024 * 1024 ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" /> Under 25MB (Discord Free)
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" /> Over 25MB (Compress with Zevylo)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        Inspection is 100% private. Video headers are parsed in-browser without sending bytes to any server.
      </div>
    </div>
  );
}
