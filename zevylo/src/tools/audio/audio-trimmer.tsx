'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Download, Scissors, RotateCcw, Volume2, ShieldCheck, AlertCircle } from 'lucide-react';

function bufferToWave(abuffer: AudioBuffer, startSec: number, endSec: number): Blob {
  const sampleRate = abuffer.sampleRate;
  const numChannels = abuffer.numberOfChannels;
  const startOffset = Math.floor(startSec * sampleRate);
  const endOffset = Math.min(abuffer.length, Math.floor(endSec * sampleRate));
  const length = Math.max(0, endOffset - startOffset);

  // 16-bit PCM WAV container
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataByteLength = length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataByteLength);
  const view = new DataView(buffer);

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + dataByteLength, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw PCM = 1) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate */
  view.setUint32(28, byteRate, true);
  /* block align */
  view.setUint16(32, blockAlign, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, dataByteLength, true);

  // Interleave and write 16-bit signed PCM
  let offset = 44;
  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(abuffer.getChannelData(c));
  }

  for (let i = 0; i < length; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][startOffset + i] || 0));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(1);
  return `${m}:${s.padStart(4, '0')}`;
}

export default function AudioTrimmer() {
  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleFileUpload = async (uploadedFile: File) => {
    setLoading(true);
    setErrorMessage(null);
    setFile(uploadedFile);

    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const decoded = await audioContextRef.current.decodeAudioData(arrayBuffer);
      setAudioBuffer(decoded);
      setDuration(decoded.duration);
      setStartTime(0);
      setEndTime(decoded.duration);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not decode audio file. Please try a standard MP3, WAV, or OGG file.');
    } finally {
      setLoading(false);
    }
  };

  // Draw waveform
  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const rawData = audioBuffer.getChannelData(0);
    const step = Math.ceil(rawData.length / width);
    const amp = height / 2;

    ctx.fillStyle = '#6366f1'; // indigo
    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = rawData[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      // Selection overlay check
      const secAtX = (i / width) * duration;
      const isSelected = secAtX >= startTime && secAtX <= endTime;
      ctx.fillStyle = isSelected ? '#4f46e5' : '#cbd5e1';

      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
  }, [audioBuffer, duration, startTime, endTime]);

  const togglePlay = () => {
    if (!audioBuffer) return;

    if (isPlaying) {
      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsPlaying(false);
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);

    const playDuration = Math.max(0.1, endTime - startTime);
    source.start(0, startTime, playDuration);
    activeSourceRef.current = source;
    setIsPlaying(true);

    source.onended = () => {
      setIsPlaying(false);
    };
  };

  const handleDownload = () => {
    if (!audioBuffer) return;
    const blob = bufferToWave(audioBuffer, startTime, endTime);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trimmed-${file?.name?.replace(/\.[^/.]+$/, '') || 'audio'}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAudio = () => {
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
      } catch {
        // ignore
      }
    }
    setFile(null);
    setAudioBuffer(null);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Upload Zone if no file */}
      {!audioBuffer ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition text-center shadow-sm">
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.m4a,.flac"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
            }}
            id="audio-upload"
            className="sr-only"
          />
          <label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Click or drag & drop audio file to trim
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports MP3, WAV, OGG, M4A, FLAC • 100% Private Client-Side
              </p>
            </div>
          </label>

          {loading && (
            <p className="mt-4 text-xs font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">
              Decoding waveform in browser...
            </p>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* Trimming Studio */
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-xs">
                  {file?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Duration: {formatTime(duration)}
                </p>
              </div>
            </div>

            <button
              onClick={resetAudio}
              className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Upload Different Audio
            </button>
          </div>

          {/* Interactive Waveform Canvas */}
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <canvas
              ref={canvasRef}
              width={800}
              height={140}
              className="w-full h-36 rounded-lg cursor-pointer block"
            />
          </div>

          {/* Time Marker Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl space-y-2 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>Start Cut Marker</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{formatTime(startTime)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={endTime - 0.1}
                step="0.1"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-xl space-y-2 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>End Cut Marker</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{formatTime(endTime)}</span>
              </div>
              <input
                type="range"
                min={startTime + 0.1}
                max={duration}
                step="0.1"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Actions & Download */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Selection' : 'Play Trimmed Selection'}
              </button>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                Trimmed Length: <strong className="text-gray-800 dark:text-gray-200">{formatTime(endTime - startTime)}</strong>
              </span>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Trimmed WAV
            </button>
          </div>
        </div>
      )}

      {/* Privacy Guarantee */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <span>
          <strong>100% Privacy:</strong> All audio decoding, cutting, and WAV encoding occurs strictly inside your web browser using HTML5 Web Audio API. Your files are never uploaded to any server.
        </span>
      </div>
    </div>
  );
}
