'use client';

import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, Download, FastForward, RotateCcw, Volume2, ShieldCheck, AlertCircle } from 'lucide-react';

function renderWavFromBuffer(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataByteLength = length * blockAlign;
  const wavBuffer = new ArrayBuffer(44 + dataByteLength);
  const view = new DataView(wavBuffer);

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataByteLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataByteLength, true);

  let offset = 44;
  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  for (let i = 0; i < length; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i] || 0));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([wavBuffer], { type: 'audio/wav' });
}

export default function AudioSpeedChanger() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(1.25);
  const [preservePitch, setPreservePitch] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setErrorMessage(null);
    setFile(uploadedFile);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    const newUrl = URL.createObjectURL(uploadedFile);
    setAudioUrl(newUrl);
    setIsPlaying(false);
  };

  const applySpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      audioRef.current.preservesPitch = preservePitch;
    }
  };

  const togglePitch = (newPreserve: boolean) => {
    setPreservePitch(newPreserve);
    if (audioRef.current) {
      audioRef.current.preservesPitch = newPreserve;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = speed;
      audioRef.current.preservesPitch = preservePitch;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = async () => {
    if (!file) return;
    setExporting(true);

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const actx = new AudioContextClass();
      const arrayBuffer = await file.arrayBuffer();
      const originalBuffer = await actx.decodeAudioData(arrayBuffer);

      // Render at new speed via OfflineAudioContext
      const newDuration = originalBuffer.duration / speed;
      const offlineCtx = new OfflineAudioContext(
        originalBuffer.numberOfChannels,
        Math.ceil(newDuration * originalBuffer.sampleRate),
        originalBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = originalBuffer;
      source.playbackRate.value = speed;
      source.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = renderWavFromBuffer(renderedBuffer);

      const downloadUrl = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${speed}x-${file.name.replace(/\.[^/.]+$/, '')}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error(err);
      setErrorMessage('Export failed. Please check audio format.');
    } finally {
      setExporting(false);
    }
  };

  const resetAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!audioUrl ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition text-center shadow-sm">
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
            }}
            id="speed-audio-upload"
            className="sr-only"
          />
          <label htmlFor="speed-audio-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Click or drag & drop audio to change speed
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports MP3, WAV, OGG, M4A • Speed adjustment from 0.25x to 3.0x
              </p>
            </div>
          </label>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FastForward className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-xs">
                  {file?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Target Playback Speed: <strong className="text-indigo-600 dark:text-indigo-400">{speed}x</strong>
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Upload Different Audio
            </button>
          </div>

          {/* HTML5 Audio Player Element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Speed Presets */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Speed Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {[0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5].map((preset) => (
                <button
                  key={preset}
                  onClick={() => applySpeed(preset)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                    speed === preset
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {preset}x
                </button>
              ))}
            </div>
          </div>

          {/* Speed Slider */}
          <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl space-y-2 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span>Fine-Tune Speed</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="3.0"
              step="0.05"
              value={speed}
              onChange={(e) => applySpeed(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Pitch preservation toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
            <div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">
                Preserve Pitch (Natural Voice)
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Keep the original vocal tone without chipmunk or deep distortion
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preservePitch}
                onChange={(e) => togglePitch(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Audio' : `Play at ${speed}x`}
            </button>

            <button
              onClick={handleDownload}
              disabled={exporting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-xs transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Rendering Audio...' : `Download ${speed}x WAV`}
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Privacy guarantee */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <span>
          <strong>100% Client-Side:</strong> Audio playback and WAV offline rendering run directly in your browser. Zero file uploads.
        </span>
      </div>
    </div>
  );
}
