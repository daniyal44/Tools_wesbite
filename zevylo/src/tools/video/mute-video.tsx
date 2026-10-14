'use client';

import React, { useState, useRef } from 'react';
import { 
  VolumeX, 
  Music, 
  Download, 
  Play, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function MuteVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [mode, setMode] = useState<'mute' | 'extract'>('mute');
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

  const processMuteVideo = async () => {
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
      const step = 1 / 30;
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
        setTimeout(renderNext, 10);
      };

      renderNext();
    } catch {
      setIsProcessing(false);
    }
  };

  const processExtractAudio = async () => {
    if (!videoFile) return;
    setIsProcessing(true);
    setProgress(30);

    try {
      const arrayBuffer = await videoFile.arrayBuffer();
      setProgress(60);

      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      setProgress(80);

      const numChannels = decodedBuffer.numberOfChannels;
      const sampleRate = decodedBuffer.sampleRate;
      const length = decodedBuffer.length * numChannels * 2 + 44;
      const buffer = new ArrayBuffer(length);
      const view = new DataView(buffer);

      const writeString = (v: DataView, offset: number, str: string) => {
        for (let i = 0; i < str.length; i++) {
          v.setUint8(offset + i, str.charCodeAt(i));
        }
      };

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + decodedBuffer.length * numChannels * 2, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(view, 36, 'data');
      view.setUint32(40, decodedBuffer.length * numChannels * 2, true);

      let offset = 44;
      for (let i = 0; i < decodedBuffer.length; i++) {
        for (let channel = 0; channel < numChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, decodedBuffer.getChannelData(channel)[i]));
          const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
          view.setInt16(offset, intSample, true);
          offset += 2;
        }
      }

      const audioBlob = new Blob([view], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setOutputUrl(url);
      setOutputSize(audioBlob.size);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    const ext = mode === 'mute' ? 'webm' : 'wav';
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'media'}-${mode}.${ext}`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            <VolumeX className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Mute Video & Extract Audio Online</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Strip audio tracks to make silent clips, or rip high-fidelity audio tracks as WAV files.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-md">
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
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => {
                setMode('mute');
                setOutputUrl(null);
              }}
              className={`p-4 rounded-xl text-left transition-all ${
                mode === 'mute'
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <VolumeX className="w-4 h-4" /> Strip Audio (Mute Video)
              </div>
              <p className="text-xs opacity-80 mt-1">Export silent video with zero audio track</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('extract');
                setOutputUrl(null);
              }}
              className={`p-4 rounded-xl text-left transition-all ${
                mode === 'extract'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <Music className="w-4 h-4" /> Extract Audio Only
              </div>
              <p className="text-xs opacity-80 mt-1">Extract soundtrack as uncompressed WAV file</p>
            </button>
          </div>

          {/* Video Player */}
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[320px] overflow-hidden">
            <video
              ref={videoRef}
              src={mode === 'mute' && outputUrl ? outputUrl : videoUrl}
              className="max-h-[420px] max-w-full rounded-xl"
              controls={mode === 'mute' && !!outputUrl}
              playsInline
              loop
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-side processing · No cloud data transfer
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={mode === 'mute' ? processMuteVideo : processExtractAudio}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing
                  ? `Processing (${progress}%)...`
                  : mode === 'mute'
                  ? 'Export Muted Video'
                  : 'Extract Audio Track'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {mode === 'mute' ? 'Muted Video' : 'Audio Track'} ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
