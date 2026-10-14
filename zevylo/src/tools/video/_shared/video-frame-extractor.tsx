'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Film,
  Camera,
  Download,
  Trash2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  ShieldCheck,
  CheckSquare,
  Square,
  Copy,
  Check,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FileArchive,
  Clock,
  Settings2,
  RefreshCw,
  Eye,
  Scissors,
  RotateCw,
  FastForward,
  VolumeX,
  FileVideo,
  Music,
  CheckCircle2,
  HelpCircle,
  Crop,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { createZipArchive } from '@/lib/utils/zip';

export interface FrameItem {
  id: string;
  index: number;
  time: number;
  timeFormatted: string;
  dataUrl: string;
  blob: Blob;
  uint8Array: Uint8Array;
  width: number;
  height: number;
  size: number;
  format: 'jpg' | 'png' | 'webp';
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

export type SizePreset =
  | 'original'
  | '600xAUTO'
  | '500xAUTO'
  | '480xAUTO'
  | '320xAUTO'
  | 'AUTOx480'
  | 'AUTOx320';

export interface VideoFrameExtractorProps {
  toolSlug: 'video-to-jpg' | 'video-to-png' | 'video-to-frames';
  toolTitle?: string;
  toolDescription?: string;
  badgeTitle?: string;
  defaultFormat?: 'jpg' | 'png' | 'webp';
  lockFormat?: boolean;
}

export default function VideoFrameExtractor({
  toolSlug = 'video-to-jpg',
  toolTitle = 'Video to JPG Converter',
  toolDescription = 'Extract individual frames from video files as a sequence of JPG images. Split MP4, WebM, AVI, MOV, and MKV into still images at your chosen frame rate (1-30 FPS) and resolution.',
  badgeTitle = 'High-Resolution Frame Extractor',
  defaultFormat = 'jpg',
  lockFormat = false,
}: VideoFrameExtractorProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoName, setVideoName] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Extraction Settings (Ezgif Parity)
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [fpsPreset, setFpsPreset] = useState<string>(() => {
    if (typeof window === 'undefined') return '1';
    try {
      const saved = localStorage.getItem('zevylo_video_frames_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fpsPreset) return parsed.fpsPreset;
      }
    } catch {
      // Ignore
    }
    return '1';
  });
  const [sizePreset, setSizePreset] = useState<SizePreset>(() => {
    if (typeof window === 'undefined') return 'original';
    try {
      const saved = localStorage.getItem('zevylo_video_frames_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sizePreset) return parsed.sizePreset;
      }
    } catch {
      // Ignore
    }
    return 'original';
  });
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png' | 'webp'>(defaultFormat);
  const [quality, setQuality] = useState<number>(() => {
    if (typeof window === 'undefined') return 90;
    try {
      const saved = localStorage.getItem('zevylo_video_frames_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.quality === 'number') return parsed.quality;
      }
    } catch {
      // Ignore
    }
    return 90;
  });
  const [zipOnly, setZipOnly] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('zevylo_video_frames_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.zipOnly === 'boolean') return parsed.zipOnly;
      }
    } catch {
      // Ignore
    }
    return false;
  });
  const [rememberSettings, setRememberSettings] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('zevylo_video_frames_settings') !== null;
    } catch {
      return false;
    }
  });

  // Extraction Execution State
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [frames, setFrames] = useState<FrameItem[]>([]);
  const [selectedFrameIds, setSelectedFrameIds] = useState<Set<string>>(new Set());
  const [zipOnlySuccessMessage, setZipOnlySuccessMessage] = useState<string | null>(null);

  // Lightbox & Feedback
  const [activeModalFrame, setActiveModalFrame] = useState<FrameItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cancelExtractionRef = useRef<boolean>(false);
  const videoUrlRef = useRef<string>('');

  useEffect(() => {
    videoUrlRef.current = videoUrl;
  }, [videoUrl]);

  // Save settings when requested
  useEffect(() => {
    if (rememberSettings) {
      try {
        localStorage.setItem(
          'zevylo_video_frames_settings',
          JSON.stringify({ fpsPreset, sizePreset, quality, zipOnly })
        );
      } catch {
        // Ignore
      }
    }
  }, [rememberSettings, fpsPreset, sizePreset, quality, zipOnly]);

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  const handleVideoUpload = (file: File | undefined) => {
    if (!file || !file.type.startsWith('video/')) return;
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    setVideoName(baseName);
    setFrames([]);
    setSelectedFrameIds(new Set());
    setCurrentTime(0);
    setIsPlaying(false);
    setZipOnlySuccessMessage(null);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 0;
    setDuration(dur);
    setStartTime(0);
    setEndTime(dur);
    setVideoDimensions({
      width: video.videoWidth || 1920,
      height: video.videoHeight || 1080,
    });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.min(Math.max(0, video.currentTime + delta), duration);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Calculate Target Dimensions based on Size Preset
  const computeTargetDimensions = useCallback((): { width: number; height: number } => {
    const origW = videoDimensions.width || 1920;
    const origH = videoDimensions.height || 1080;
    const ratio = origH / origW;

    switch (sizePreset) {
      case '600xAUTO':
        return { width: 600, height: Math.round(600 * ratio) };
      case '500xAUTO':
        return { width: 500, height: Math.round(500 * ratio) };
      case '480xAUTO':
        return { width: 480, height: Math.round(480 * ratio) };
      case '320xAUTO':
        return { width: 320, height: Math.round(320 * ratio) };
      case 'AUTOx480':
        return { width: Math.round(480 / ratio), height: 480 };
      case 'AUTOx320':
        return { width: Math.round(320 / ratio), height: 320 };
      case 'original':
      default:
        return { width: origW, height: origH };
    }
  }, [sizePreset, videoDimensions]);

  // Instant Snapshot Feature
  const captureInstantSnapshot = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 250);

    const { width: w, height: h } = computeTargetDimensions();
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (outputFormat === 'jpg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }
    ctx.drawImage(video, 0, 0, w, h);

    const mime = outputFormat === 'jpg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b || new Blob()), mime, quality / 100);
    });

    const buffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const dataUrl = canvas.toDataURL(mime, quality / 100);
    const timeVal = video.currentTime;

    const newFrame: FrameItem = {
      id: `snap-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      index: frames.length + 1,
      time: timeVal,
      timeFormatted: formatTime(timeVal),
      dataUrl,
      blob,
      uint8Array,
      width: w,
      height: h,
      size: blob.size,
      format: outputFormat,
    };

    setFrames((prev) => [newFrame, ...prev]);
    setSelectedFrameIds((prev) => new Set([...prev, newFrame.id]));
  };

  // Compute Timestamps based on FPS preset
  const calculateTimestamps = useCallback((): number[] => {
    if (duration <= 0) return [];
    const start = Math.max(0, Math.min(startTime, duration));
    const end = Math.max(start + 0.05, Math.min(endTime, duration));

    let fps = 1;
    if (fpsPreset === '0.5') fps = 0.5;
    else if (fpsPreset === '1') fps = 1;
    else if (fpsPreset === '2') fps = 2;
    else if (fpsPreset === '5') fps = 5;
    else if (fpsPreset === '10') fps = 10;
    else if (fpsPreset === '15') fps = 15;
    else if (fpsPreset === '24') fps = 24;
    else if (fpsPreset === '30') fps = 30;

    const step = 1 / fps;
    const list: number[] = [];
    for (let t = start; t <= end + 0.001; t += step) {
      list.push(Math.min(t, end));
    }

    const unique = Array.from(new Set(list.map((t) => parseFloat(t.toFixed(3)))));
    return unique.slice(0, 200); // safety cap
  }, [duration, startTime, endTime, fpsPreset]);

  const estimatedFramesCount = calculateTimestamps().length;

  // Batch Frame Extraction Engine
  const extractBatchFrames = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || duration <= 0) return;

    const timestamps = calculateTimestamps();
    if (timestamps.length === 0) return;

    setIsExtracting(true);
    cancelExtractionRef.current = false;
    setProgress(0);
    setStatusText('Starting video frame extraction...');
    setZipOnlySuccessMessage(null);

    video.pause();
    setIsPlaying(false);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExtracting(false);
      return;
    }

    const { width: w, height: h } = computeTargetDimensions();
    canvas.width = w;
    canvas.height = h;

    const mime = outputFormat === 'jpg' ? 'image/jpeg' : outputFormat === 'png' ? 'image/png' : 'image/webp';
    const captured: FrameItem[] = [];
    const zipFilesList: { name: string; data: Uint8Array }[] = [];

    for (let i = 0; i < timestamps.length; i++) {
      if (cancelExtractionRef.current) break;

      const targetTime = timestamps[i];
      setStatusText(`Extracting frame ${i + 1} of ${timestamps.length} (${formatTime(targetTime)})...`);

      video.currentTime = targetTime;
      await new Promise<void>((resolve) => {
        let isDone = false;
        const timer = setTimeout(() => {
          if (!isDone) {
            isDone = true;
            video.removeEventListener('seeked', onSeeked);
            resolve();
          }
        }, 280);

        const onSeeked = () => {
          if (!isDone) {
            isDone = true;
            clearTimeout(timer);
            video.removeEventListener('seeked', onSeeked);
            resolve();
          }
        };

        video.addEventListener('seeked', onSeeked, { once: true });
      });

      if (outputFormat === 'jpg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(video, 0, 0, w, h);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b || new Blob()), mime, quality / 100);
      });

      const buffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      const padIdx = String(i + 1).padStart(3, '0');
      const filename = `${videoName || 'video'}_frame_${padIdx}.${outputFormat}`;

      if (zipOnly) {
        // Collect for immediate zip packaging without rendering to DOM
        zipFilesList.push({ name: filename, data: uint8Array });
      } else {
        const dataUrl = canvas.toDataURL(mime, quality / 100);
        captured.push({
          id: `frame-${i}-${Date.now()}`,
          index: i + 1,
          time: targetTime,
          timeFormatted: formatTime(targetTime),
          dataUrl,
          blob,
          uint8Array,
          width: w,
          height: h,
          size: blob.size,
          format: outputFormat,
        });
      }

      setProgress(Math.round(((i + 1) / timestamps.length) * 100));
    }

    if (zipOnly && zipFilesList.length > 0 && !cancelExtractionRef.current) {
      // Direct ZIP generation & download
      setStatusText('Assembling ZIP archive in browser memory...');
      const zipBlob = createZipArchive(zipFilesList);
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `${videoName || 'video'}_frames.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(zipUrl), 4000);
      setZipOnlySuccessMessage(
        `Successfully extracted ${zipFilesList.length} ${outputFormat.toUpperCase()} frames directly into ZIP archive (${formatBytes(zipBlob.size)})!`
      );
    } else if (!zipOnly) {
      setFrames((prev) => [...prev, ...captured]);
      const allIds = new Set(captured.map((c) => c.id));
      setSelectedFrameIds((prev) => new Set([...prev, ...allIds]));
    }

    setIsExtracting(false);
    setStatusText('');
  };

  const cancelExtraction = () => {
    cancelExtractionRef.current = true;
    setIsExtracting(false);
    setStatusText('Extraction stopped');
  };

  const downloadSingleFrame = (frame: FrameItem) => {
    const padIndex = String(frame.index).padStart(3, '0');
    const a = document.createElement('a');
    a.href = frame.dataUrl;
    a.download = `${videoName || 'video'}_frame_${padIndex}_${frame.timeFormatted.replace(':', 'm').replace('.', 's')}.${frame.format}`;
    a.click();
  };

  const downloadAllSelectedAsZip = () => {
    const targetFrames = frames.filter((f) => selectedFrameIds.has(f.id));
    if (targetFrames.length === 0) return;

    const zipFiles = targetFrames.map((frame, idx) => {
      const padIdx = String(idx + 1).padStart(3, '0');
      const filename = `${videoName || 'video'}_frame_${padIdx}.${frame.format}`;
      return {
        name: filename,
        data: frame.uint8Array,
      };
    });

    const zipBlob = createZipArchive(zipFiles);
    const zipUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = zipUrl;
    a.download = `${videoName || 'video'}_frames.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(zipUrl), 3000);
  };

  const downloadAllIndividually = () => {
    const targetFrames = frames.filter((f) => selectedFrameIds.has(f.id));
    targetFrames.forEach((frame, idx) => {
      setTimeout(() => downloadSingleFrame(frame), idx * 120);
    });
  };

  const copyFrameToClipboard = async (frame: FrameItem) => {
    try {
      let pngBlob = frame.blob;
      if (frame.format !== 'png') {
        const img = new Image();
        img.src = frame.dataUrl;
        await new Promise((res) => { img.onload = res; });
        const c = document.createElement('canvas');
        c.width = frame.width;
        c.height = frame.height;
        const ctx = c.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          pngBlob = await new Promise<Blob>((res) => c.toBlob((b) => res(b || new Blob()), 'image/png'));
        }
      }

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': pngBlob }),
      ]);
      setCopiedId(frame.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const toggleSelectFrame = (id: string) => {
    setSelectedFrameIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedFrameIds.size === frames.length) {
      setSelectedFrameIds(new Set());
    } else {
      setSelectedFrameIds(new Set(frames.map((f) => f.id)));
    }
  };

  const deleteFrame = (id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id));
    setSelectedFrameIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (activeModalFrame?.id === id) setActiveModalFrame(null);
  };

  const deleteSelected = () => {
    setFrames((prev) => prev.filter((f) => !selectedFrameIds.has(f.id)));
    setSelectedFrameIds(new Set());
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!activeModalFrame) return;
    const currentIndex = frames.findIndex((f) => f.id === activeModalFrame.id);
    if (currentIndex === -1) return;
    if (direction === 'prev' && currentIndex > 0) {
      setActiveModalFrame(frames[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < frames.length - 1) {
      setActiveModalFrame(frames[currentIndex + 1]);
    }
  };

  const targetDims = computeTargetDimensions();

  return (
    <div className="space-y-8">
      {/* Ezgif Cross-Tool Quick Navigation Bar */}
      <div className="rounded-xl bg-gray-100 dark:bg-zinc-900/90 border border-gray-200 dark:border-gray-800 p-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max text-xs">
          <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider px-2">
            Video Suite:
          </span>
          <Link
            href="/tools/video/video-to-gif"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5 text-cyan-400" /> To GIF
          </Link>
          <Link
            href="/tools/video/crop-video"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Crop className="w-3.5 h-3.5 text-cyan-400" /> Crop
          </Link>
          <Link
            href="/tools/video/rotate-video"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Rotate
          </Link>
          <Link
            href="/tools/video/cut-video"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Scissors className="w-3.5 h-3.5 text-cyan-400" /> Cut
          </Link>
          <Link
            href="/tools/video/reverse-video"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400 rotate-180" /> Reverse
          </Link>
          <Link
            href="/tools/video/video-speed-changer"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Speed
          </Link>
          <Link
            href="/tools/video/mute-video"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <VolumeX className="w-3.5 h-3.5 text-cyan-400" /> Mute
          </Link>
          <Link
            href="/tools/video/video-compressor"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <FileArchive className="w-3.5 h-3.5 text-cyan-400" /> Compress
          </Link>
          <Link
            href="/tools/video/video-to-jpg"
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
              toolSlug === 'video-to-jpg'
                ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                : 'bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> To JPG
          </Link>
          <Link
            href="/tools/video/video-to-png"
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
              toolSlug === 'video-to-png'
                ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                : 'bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> To PNG
          </Link>
          <Link
            href="/tools/video/video-to-mp4"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <FileVideo className="w-3.5 h-3.5 text-cyan-400" /> To MP4
          </Link>
          <Link
            href="/tools/video/mp4-to-mp3"
            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-cyan-500/10 hover:text-cyan-400 text-gray-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 text-cyan-400" /> To MP3
          </Link>
        </div>
      </div>

      {/* Top Banner & Heading */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> {badgeTitle}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {toolTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 max-w-2xl">
              {toolDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-medium text-gray-500 dark:text-zinc-400">
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">100% Client-Side</span>
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">0 Quality Loss</span>
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">No Watermarks</span>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      {!videoUrl ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-12 text-center hover:border-cyan-400/50 transition-all duration-300">
          <label className="flex flex-col items-center justify-center cursor-pointer space-y-4">
            <div className="p-5 rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-inner group-hover:scale-110 transition-transform">
              <Film className="w-10 h-10" />
            </div>
            <div>
              <span className="text-base font-semibold text-gray-900 dark:text-white block">
                Choose Video or Drag & Drop Here
              </span>
              <span className="text-xs text-gray-500 dark:text-zinc-400 mt-1 block">
                Supports MP4, WebM, MOV, MKV, AVI • In-Browser GPU Hardware Accelerated
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
              Browse Video File
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoUpload(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        /* Video Studio Workspace */
        <div className="space-y-6">
          {/* Ezgif Exact Video Metadata Line */}
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-gray-600 dark:text-zinc-300 font-mono flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 font-bold">File size: {formatBytes(videoFile?.size || 0)}</span>,
              <span>width: <strong className="text-gray-900 dark:text-white">{videoDimensions.width}px</strong></span>,
              <span>height: <strong className="text-gray-900 dark:text-white">{videoDimensions.height}px</strong></span>,
              <span>type: <strong className="text-gray-900 dark:text-white">{videoFile?.type || 'video/mp4'}</strong></span>,
              <span>length: <strong className="text-cyan-400 font-bold">{formatTime(duration)}</strong></span>
            </div>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-900 dark:text-white cursor-pointer font-medium text-xs transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Change Video
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(e.target.files?.[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Interactive Player & Timeline Scrubber */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center min-h-[280px] max-h-[500px] border border-gray-100 dark:border-gray-800 shadow-2xl">
              <video
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full max-h-[500px] object-contain"
              />

              {/* Shutter Flash Animation */}
              {flashActive && (
                <div className="absolute inset-0 bg-white opacity-80 pointer-events-none transition-opacity duration-200" />
              )}
            </div>

            {/* Custom Scrubber Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">{formatTime(currentTime)}</span>
                <span className="text-gray-500 dark:text-zinc-400">{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 1}
                step="0.01"
                value={currentTime}
                onChange={handleScrubberChange}
                className="w-full accent-cyan-400 bg-gray-100 dark:bg-white/10 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Playback Controls & Quick Snapshot Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => seekRelative(-5)}
                  title="Rewind 5s"
                  className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 text-xs transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => seekRelative(-0.1)}
                  title="Step back 0.1s"
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 text-xs font-mono transition-colors"
                >
                  -0.1s
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-900 dark:text-white font-semibold text-xs transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  onClick={() => seekRelative(0.1)}
                  title="Step forward 0.1s"
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 text-xs font-mono transition-colors"
                >
                  +0.1s
                </button>
                <button
                  type="button"
                  onClick={() => seekRelative(5)}
                  title="Forward 5s"
                  className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 text-xs transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Instant Snapshot Action */}
              <button
                type="button"
                onClick={captureInstantSnapshot}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                Capture Snapshot ({formatTime(currentTime)})
              </button>
            </div>
          </div>

          {/* Ezgif Frame Extraction Settings Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Extraction Options ({outputFormat.toUpperCase()} Converter)</h2>
              </div>
              <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                ~{estimatedFramesCount} Frames
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Range: Start & End Time (Exact Ezgif inputs) */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-600 dark:text-zinc-300 block">
                  Start time & End time (seconds)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400 w-12">Start:</span>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max={duration}
                      value={parseFloat(startTime.toFixed(2))}
                      onChange={(e) => setStartTime(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-20 px-2 py-1 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setStartTime(currentTime)}
                      className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-cyan-400"
                    >
                      Use Cur ({formatTime(currentTime)})
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400 w-12">End:</span>
                    <input
                      type="number"
                      step="0.1"
                      min={startTime}
                      max={duration}
                      value={parseFloat(endTime.toFixed(2))}
                      onChange={(e) => setEndTime(Math.min(duration, parseFloat(e.target.value) || duration))}
                      className="w-20 px-2 py-1 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setEndTime(currentTime)}
                      className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-cyan-400"
                    >
                      Use Cur ({formatTime(currentTime)})
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setStartTime(0); setEndTime(duration); }}
                    className="text-[11px] text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-white underline block pt-1"
                  >
                    Reset to Full Video ({formatTime(duration)})
                  </button>
                </div>
              </div>

              {/* Ezgif Exact Size Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-600 dark:text-zinc-300 block">
                  Size / Dimensions
                </label>
                <div className="space-y-2">
                  <select
                    value={sizePreset}
                    onChange={(e) => setSizePreset(e.target.value as SizePreset)}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                  >
                    <option value="original">Original (up to {videoDimensions.width}px)</option>
                    <option value="600xAUTO">600xAUTO</option>
                    <option value="500xAUTO">500xAUTO (for Tumblr / Social)</option>
                    <option value="480xAUTO">480xAUTO</option>
                    <option value="320xAUTO">320xAUTO</option>
                    <option value="AUTOx480">AUTOx480</option>
                    <option value="AUTOx320">AUTOx320</option>
                  </select>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                    Target: <strong className="text-cyan-400">{targetDims.width} × {targetDims.height} px</strong>
                  </p>
                </div>
              </div>

              {/* Ezgif Frame Rate (FPS) Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-600 dark:text-zinc-300 block">
                  Frame rate (FPS)
                </label>
                <div className="space-y-2">
                  <select
                    value={fpsPreset}
                    onChange={(e) => setFpsPreset(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                  >
                    <option value="1">1 FPS (1 frame per second — standard default)</option>
                    <option value="2">2 FPS (2 frames per second)</option>
                    <option value="5">5 FPS (5 frames per second)</option>
                    <option value="10">10 FPS (Smooth action sequence)</option>
                    <option value="15">15 FPS (High rate)</option>
                    <option value="24">24 FPS (Cinematic 24p)</option>
                    <option value="30">30 FPS (Full motion video)</option>
                    <option value="0.5">0.5 FPS (1 frame every 2 seconds)</option>
                  </select>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                    Interval: <strong>{(1 / parseFloat(fpsPreset)).toFixed(2)}s</strong> per frame
                  </p>
                </div>
              </div>

              {/* Format & Quality */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-600 dark:text-zinc-300 block">
                  Format & Quality
                </label>
                <div className="space-y-2">
                  {!lockFormat ? (
                    <div className="flex gap-2">
                      {(['jpg', 'png', 'webp'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setOutputFormat(fmt)}
                          className={`flex-1 py-1 rounded-lg text-xs font-semibold uppercase border transition-colors ${
                            outputFormat === fmt
                              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase text-center">
                      Format: {outputFormat}
                    </div>
                  )}

                  {outputFormat !== 'png' ? (
                    <div>
                      <div className="flex justify-between text-[11px] text-gray-500 dark:text-zinc-400 mb-1">
                        <span>Quality:</span>
                        <span className="text-gray-900 dark:text-white font-bold">{quality}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="w-full accent-cyan-400 bg-gray-100 dark:bg-white/10 rounded-lg h-1.5 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-500 dark:text-zinc-400 block italic">
                      Lossless PNG (Maximum fidelity & transparency)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Ezgif Exact Checkboxes */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600 dark:text-zinc-300">
                <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={zipOnly}
                    onChange={(e) => setZipOnly(e.target.checked)}
                    className="rounded accent-cyan-400"
                  />
                  <span>
                    <strong>Don&apos;t display the images, I just want a ZIP file</strong> (faster)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={rememberSettings}
                    onChange={(e) => setRememberSettings(e.target.checked)}
                    className="rounded accent-cyan-400"
                  />
                  <span>Remember settings</span>
                </label>
              </div>

              {/* Extraction Trigger Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {isExtracting ? (
                  <button
                    type="button"
                    onClick={cancelExtraction}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs hover:bg-red-500/30 transition-colors"
                  >
                    Cancel Extraction
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={extractBatchFrames}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Film className="w-4 h-4" />
                    Convert to {outputFormat.toUpperCase()}! ({estimatedFramesCount} Frames)
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-gray-400 dark:text-zinc-500 italic">
              (Video conversion may take a while, especially if you selected high frame rate and resolution)
            </p>

            {/* Progress Bar (While Extracting) */}
            {isExtracting && (
              <div className="space-y-2 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex justify-between text-xs text-cyan-300 font-semibold">
                  <span>{statusText}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-zinc-900 rounded-full h-2 overflow-hidden border border-gray-100 dark:border-gray-800">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Direct ZIP Download Success Message */}
            {zipOnlySuccessMessage && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{zipOnlySuccessMessage}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden Working Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Extracted Frames Gallery (When NOT in zipOnly mode) */}
      {!zipOnly && frames.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Output {outputFormat.toUpperCase()} Images ({frames.length})
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-cyan-400 font-mono">
                  {selectedFrameIds.size} Selected
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Download frames individually or package all selected frames into a ZIP archive.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleSelectAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-600 dark:text-zinc-300 text-xs transition-colors"
              >
                {selectedFrameIds.size === frames.length ? (
                  <>
                    <CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> Deselect All
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5" /> Select All
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadAllSelectedAsZip}
                disabled={selectedFrameIds.size === 0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs shadow-md shadow-cyan-500/20 disabled:opacity-40 transition-all"
              >
                <FileArchive className="w-3.5 h-3.5" />
                Download as ZIP ({selectedFrameIds.size})
              </button>

              <button
                type="button"
                onClick={downloadAllIndividually}
                disabled={selectedFrameIds.size === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-900 dark:text-white text-xs font-semibold disabled:opacity-40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Files
              </button>

              <button
                type="button"
                onClick={deleteSelected}
                disabled={selectedFrameIds.size === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium disabled:opacity-40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              <button
                type="button"
                onClick={() => { setFrames([]); setSelectedFrameIds(new Set()); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-red-400 text-xs transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {frames.map((frame, index) => {
              const isSelected = selectedFrameIds.has(frame.id);
              const isCopied = copiedId === frame.id;

              return (
                <div
                  key={frame.id}
                  className={`group relative rounded-xl border overflow-hidden bg-gray-100 dark:bg-zinc-900/60 transition-all duration-200 ${
                    isSelected
                      ? 'border-cyan-400 ring-1 ring-cyan-400/30'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSelectFrame(frame.id)}
                    className="absolute top-2 left-2 z-10 p-1 rounded bg-gray-100 dark:bg-gray-950 backdrop-blur text-gray-900 dark:text-white hover:text-cyan-400 transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    )}
                  </button>

                  <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono font-bold text-gray-600 dark:text-zinc-300">
                    #{String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    onClick={() => setActiveModalFrame(frame)}
                    className="cursor-pointer relative aspect-video bg-gray-50 dark:bg-gray-800 overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frame.dataUrl}
                      alt={`Frame at ${frame.timeFormatted}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white backdrop-blur">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 space-y-2 bg-zinc-950/70 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-cyan-400 font-semibold">{frame.timeFormatted}</span>
                      <span className="text-gray-400 dark:text-zinc-500 uppercase">{frame.format}</span>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-gray-100 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => downloadSingleFrame(frame)}
                        title="Download image"
                        className="p-1 rounded bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => copyFrameToClipboard(frame)}
                        title="Copy image to clipboard"
                        className="p-1 rounded bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-emerald-400 transition-colors"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModalFrame(frame)}
                        title="View Full Preview"
                        className="p-1 rounded bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:text-white transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteFrame(frame.id)}
                        title="Delete frame"
                        className="p-1 rounded bg-white dark:bg-gray-900 hover:bg-red-500/20 text-gray-500 dark:text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {activeModalFrame && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-zinc-950 border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono font-bold">
                  Frame #{activeModalFrame.index}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Timestamp: <strong className="text-cyan-400 font-mono">{activeModalFrame.timeFormatted}</strong>
                </span>
                <span className="text-xs text-gray-400 dark:text-zinc-500">•</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">{activeModalFrame.width} × {activeModalFrame.height} px</span>
                <span className="text-xs text-gray-400 dark:text-zinc-500">•</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">{formatBytes(activeModalFrame.size)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadSingleFrame(activeModalFrame)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
                <button
                  type="button"
                  onClick={() => copyFrameToClipboard(activeModalFrame)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-900 dark:text-white font-medium text-xs transition-colors"
                >
                  {copiedId === activeModalFrame.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === activeModalFrame.id ? 'Copied!' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalFrame(null)}
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/15 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:text-white transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-black flex items-center justify-center p-4 overflow-hidden min-h-[350px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalFrame.dataUrl}
                alt={`Frame ${activeModalFrame.index}`}
                className="max-h-[70vh] max-w-full object-contain rounded"
              />

              <button
                type="button"
                onClick={() => navigateModal('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-100 dark:bg-gray-950 hover:bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white backdrop-blur border border-gray-200 dark:border-gray-800 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => navigateModal('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-100 dark:bg-gray-950 hover:bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white backdrop-blur border border-gray-200 dark:border-gray-800 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-zinc-400 text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Video frames are extracted directly inside your browser via Canvas & GPU. Files are never transmitted or saved to external servers.
        </span>
      </div>

      {/* Ezgif Parity Educational Guide & SEO Breakdown Section */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 space-y-8 text-gray-600 dark:text-zinc-300">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-cyan-400" />
            {toolSlug === 'video-to-png'
              ? 'Video to PNG Sequence Converter (Lossless Frame Splitter)'
              : 'Video to JPG Image Sequence Extractor / Frame Splitter'}
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
            {toolSlug === 'video-to-png'
              ? 'Extract individual frames from video files as a sequence of lossless PNG images. Split any video format — MP4, WebM, AVI, MOV, MKV, and more — into pixel-perfect still images at your chosen frame rate (1-30 FPS) and resolution (up to 4K Ultra HD). Perfect for VFX assets, transparent graphics overlays, high-detail thumbnails, and scientific frame analysis.'
              : 'Extract individual frames from video files as a sequence of JPG (JPEG) images. Split any video format — MP4, WebM, AVI, MOV, MKV, and more — into individual still images at your chosen frame rate (1-30 FPS) and resolution (up to 1920px Full HD). Perfect for creating YouTube thumbnails, analyzing sports footage frame-by-frame, extracting reference photos, or preparing image sequences for machine learning.'}
          </p>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
            Upload your video, select the size and frames-per-second rate, optionally trim to a specific start/end time range, and click <strong>&quot;Convert to {outputFormat.toUpperCase()}!&quot;</strong> The tool displays all extracted frames and lets you download them individually or as a ZIP archive. Use the <strong>&quot;Don&apos;t display the images, I just want a ZIP file&quot;</strong> option to skip DOM rendering and receive the download archive faster.
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            If you prefer to extract frames as alternative formats, switch anytime using our{' '}
            <Link href="/tools/video/video-to-jpg" className="text-cyan-400 underline hover:text-cyan-300">
              Video to JPG Converter
            </Link>
            ,{' '}
            <Link href="/tools/video/video-to-png" className="text-cyan-400 underline hover:text-cyan-300">
              Video to PNG Sequence Converter
            </Link>
            , or{' '}
            <Link href="/tools/video/video-to-frames" className="text-cyan-400 underline hover:text-cyan-300">
              Video to Frames Studio
            </Link>
            .
          </p>
        </div>

        {/* Comparison Matrix: Ezgif vs Zevylo */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Why Zevylo Outperforms Ezgif Video Converter
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3">Ezgif.com</th>
                  <th className="p-3 text-cyan-400">Zevylo (Modern Standard)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-white dark:bg-gray-900">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">Data Privacy & Security</td>
                  <td className="p-3 text-red-400">Uploaded to third-party EU servers</td>
                  <td className="p-3 text-emerald-400 font-bold">100% In-Browser Local (0 Uploads)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">Max Video File Size</td>
                  <td className="p-3 text-red-400">Capped at 100MB</td>
                  <td className="p-3 text-emerald-400 font-bold">Unlimited (Any file size your device supports)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">Advertisements & Popups</td>
                  <td className="p-3 text-red-400">5-8 banners, video ads, sticky popups</td>
                  <td className="p-3 text-emerald-400 font-bold">0 Ads (Clean, uninterrupted workspace)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">ZIP Archive Creation</td>
                  <td className="p-3 text-amber-400">Generated on server with queue delay</td>
                  <td className="p-3 text-emerald-400 font-bold">Instant client-side zero-dep ZIP builder</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">Interactive Frame Inspection</td>
                  <td className="p-3 text-gray-500 dark:text-zinc-400">Basic static list</td>
                  <td className="p-3 text-emerald-400 font-bold">Full Lightbox modal + Clipboard Copy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to use Step-by-Step */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            How to Convert Video to {outputFormat.toUpperCase()} Frames:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-cyan-400 font-bold font-mono text-sm">Step 1</span>
              <h4 className="font-bold text-gray-900 dark:text-white">Upload Your Video</h4>
              <p className="text-gray-500 dark:text-zinc-400">
                Drag and drop any MP4, WebM, MOV, or AVI clip directly into the player.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-cyan-400 font-bold font-mono text-sm">Step 2</span>
              <h4 className="font-bold text-gray-900 dark:text-white">Set Time Range</h4>
              <p className="text-gray-500 dark:text-zinc-400">
                Scrub the video timeline and use &quot;Use Cur&quot; to trim start and end cut points.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-cyan-400 font-bold font-mono text-sm">Step 3</span>
              <h4 className="font-bold text-gray-900 dark:text-white">Choose FPS & Size</h4>
              <p className="text-gray-500 dark:text-zinc-400">
                Select your extraction rate (1 FPS to 30 FPS) and dimension scaling (Original or 600px).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-cyan-400 font-bold font-mono text-sm">Step 4</span>
              <h4 className="font-bold text-gray-900 dark:text-white">Download as ZIP</h4>
              <p className="text-gray-500 dark:text-zinc-400">
                Click &quot;Convert&quot; and download all frames in a clean ZIP bundle with zero lag.
              </p>
            </div>
          </div>
        </div>

        {/* Complete Ezgif Converter Directory Grid */}
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Explore All Free Converters & Multimedia Tools on Zevylo
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            <Link href="/tools/video/video-to-gif" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • MP4 to GIF
            </Link>
            <Link href="/tools/video/gif-to-mp4" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • GIF to MP4
            </Link>
            <Link href="/tools/video/rotate-video" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Rotate Video
            </Link>
            <Link href="/tools/video/cut-video" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Video Cutter
            </Link>
            <Link href="/tools/video/reverse-video" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Video Reverser
            </Link>
            <Link href="/tools/video/crop-video" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Video Crop Tool
            </Link>
            <Link href="/tools/video/video-to-mp4" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Video to MP4
            </Link>
            <Link href="/tools/video/mp4-to-mp3" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • MP4 to MP3 Audio
            </Link>
            <Link href="/tools/images/jpg-to-pdf" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • JPG to PDF
            </Link>
            <Link href="/tools/images/webp-to-jpg" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • WebP to JPG
            </Link>
            <Link href="/tools/images/webp-to-png" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • WebP to PNG
            </Link>
            <Link href="/tools/images/avif-to-jpg" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • AVIF to JPG
            </Link>
            <Link href="/tools/images/png-to-jpg" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • PNG to JPG
            </Link>
            <Link href="/tools/images/heic-to-jpg" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • HEIC to JPG
            </Link>
            <Link href="/tools/images/bmp-to-png" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • BMP to PNG
            </Link>
            <Link href="/tools/images/bulk-image-converter" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Bulk Image Converter
            </Link>
            <Link href="/tools/productivity/bulk-rename" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Bulk File Renamer
            </Link>
            <Link href="/tools/image/image-to-datauri" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Image to Data URI
            </Link>
            <Link href="/tools/pdf/crop-pdf" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Crop PDF
            </Link>
            <Link href="/tools/image/view-metadata" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Metadata Viewer
            </Link>
            <Link href="/tools/image/lottie-to-gif" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Lottie to GIF
            </Link>
            <Link href="/tools/image/exif-remover" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • EXIF Remover
            </Link>
            <Link href="/tools/image/gif-maker" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • GIF Maker
            </Link>
            <Link href="/tools/generators/barcode-generator" className="p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-zinc-300 hover:text-cyan-400 transition-colors">
              • Barcode Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
