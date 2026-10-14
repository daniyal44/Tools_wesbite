'use client';

import React, { useState } from 'react';
import { 
  Music, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  AudioWaveform,
  Play
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function Mp4ToMp3() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setOutputUrl(null);
    setOutputSize(0);
    setDuration(0);
  };

  const processExtractWav = async () => {
    if (!videoFile) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      const arrayBuffer = await videoFile.arrayBuffer();
      setProgress(50);

      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      setProgress(75);

      setDuration(decodedBuffer.duration);

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
      view.setUint16(20, 1, true); // PCM
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true); // 16-bit
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
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `${videoFile?.name.replace(/\.[^/.]+$/, '') || 'audio'}.wav`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Music className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">MP4 to Audio Extractor (WAV)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rip audio from MP4, WebM, and MOV videos into uncompressed, lossless WAV audio directly in your browser.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-violet-500/20">
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

      {videoFile && (
        <div className="space-y-6">
          {outputUrl && (
            <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-900 dark:text-white font-medium">
                <AudioWaveform className="w-5 h-5 text-violet-400" />
                <span>Extracted Audio: {Math.round(duration)} seconds</span>
              </div>
              <audio src={outputUrl} controls className="w-full max-w-md h-10" />
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-memory audio stream decoding · Zero server latency
            </div>

            {!outputUrl ? (
              <button
                type="button"
                onClick={processExtractWav}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {isProcessing ? `Extracting Audio (${progress}%)...` : 'Extract Audio Now'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Audio Track ({formatBytes(outputSize)})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
