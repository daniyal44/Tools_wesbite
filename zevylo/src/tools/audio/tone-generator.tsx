'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';

type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export default function ToneGenerator() {
  const [frequency, setFrequency] = useState<number>(440);
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const drawOscilloscopeRef = useRef<() => void>(() => {});

  const drawOscilloscope = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(() => {
        drawOscilloscopeRef.current();
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    drawOscilloscopeRef.current = drawOscilloscope;
  }, [drawOscilloscope]);

  const startTone = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop existing if any
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;

      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      analyserRef.current = analyser;

      setIsPlaying(true);
    } catch {
      // Audio init error
    }
  };

  const stopTone = () => {
    if (oscRef.current && audioCtxRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Disconnect error
      }
      oscRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsPlaying(false);

    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, canvasRef.current.height / 2);
        ctx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(drawOscilloscope);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, drawOscilloscope]);

  // Handle frequency changes on the fly
  useEffect(() => {
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [frequency]);

  // Handle wave type changes on the fly
  useEffect(() => {
    if (oscRef.current) {
      oscRef.current.type = waveType;
    }
  }, [waveType]);

  // Handle volume changes on the fly
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        {/* Live Oscilloscope Screen */}
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-inner bg-slate-900">
          <canvas
            ref={canvasRef}
            width={600}
            height={160}
            className="w-full h-40 block"
          />
        </div>

        {/* Big Frequency Display */}
        <div className="py-6 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl font-black text-gray-900 dark:text-white tabular-nums tracking-tight">
              {frequency}
            </span>
            <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
              Hz
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider font-semibold">
            {waveType} Waveform
          </p>
        </div>

        {/* Play/Stop and Frequency Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="20"
              max="20000"
              step="1"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Stepper buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: '-100', val: -100 },
              { label: '-10', val: -10 },
              { label: '-1', val: -1 },
              { label: '+1', val: 1 },
              { label: '+10', val: 10 },
              { label: '+100', val: 100 },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => setFrequency(prev => Math.min(20000, Math.max(20, prev + btn.val)))}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {btn.label} Hz
              </button>
            ))}
          </div>
        </div>

        {/* Waveform Selector */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Waveform Shape
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['sine', 'square', 'triangle', 'sawtooth'] as WaveType[]).map((type) => (
              <button
                key={type}
                onClick={() => setWaveType(type)}
                className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                  waveType === type
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Volume & Play Controls */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-xs text-gray-500 tabular-nums w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <button
            onClick={isPlaying ? stopTone : startTone}
            className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="h-4 w-4 fill-current" /> Stop Tone
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" /> Play Tone
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            Audio Calibration Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '440 Hz (Concert A4)', freq: 440 },
              { name: '432 Hz (Verdi Tuning)', freq: 432 },
              { name: '1000 Hz (Reference)', freq: 1000 },
              { name: '60 Hz (AC Hum)', freq: 60 },
              { name: '100 Hz (Sub Bass)', freq: 100 },
              { name: '3000 Hz (Human Ear Peak)', freq: 3000 },
              { name: '10 kHz (High Treble)', freq: 10000 },
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => setFrequency(p.freq)}
                className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
