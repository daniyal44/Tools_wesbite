'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Activity } from 'lucide-react';

export default function TapBpm() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [tempoMarking, setTempoMarking] = useState<string>('Ready');
  const [history, setHistory] = useState<number[]>([]);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  const tapsRef = useRef<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio error ignored
    }
  }, [soundEnabled]);

  const getTempoName = (val: number): string => {
    if (val < 40) return 'Grave (< 40)';
    if (val < 60) return 'Largo (40 - 60)';
    if (val < 66) return 'Larghetto (60 - 66)';
    if (val < 76) return 'Adagio (66 - 76)';
    if (val < 108) return 'Andante (76 - 108)';
    if (val < 120) return 'Moderato (108 - 120)';
    if (val < 168) return 'Allegro (120 - 168)';
    if (val < 200) return 'Presto (168 - 200)';
    return 'Prestissimo (> 200)';
  };

  const handleTap = useCallback(() => {
    const now = Date.now();
    playClick();

    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    const prevTaps = tapsRef.current;
    // If last tap was more than 3 seconds ago, reset sequence
    if (prevTaps.length > 0 && now - prevTaps[prevTaps.length - 1] > 3000) {
      tapsRef.current = [now];
      setTapCount(1);
      setBpm(null);
      setTempoMarking('Tap again to calculate...');
      return;
    }

    const updated = [...prevTaps, now];
    tapsRef.current = updated;
    setTapCount(updated.length);

    if (updated.length >= 2) {
      // Calculate intervals
      const intervals: number[] = [];
      for (let i = 1; i < updated.length; i++) {
        intervals.push(updated[i] - updated[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
      setTempoMarking(getTempoName(calculatedBpm));
      setHistory(prev => [calculatedBpm, ...prev.slice(0, 4)]);
    } else {
      setTempoMarking('Tap again to calculate...');
    }
  }, [playClick]);

  const handleReset = () => {
    tapsRef.current = [];
    setBpm(null);
    setTapCount(0);
    setTempoMarking('Ready');
    setHistory([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Tap Display Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Activity className="h-4 w-4 text-blue-500" />
            <span>Taps: <strong className="text-gray-800 dark:text-gray-200">{tapCount}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              title="Toggle Click Sound"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-blue-500" /> : <VolumeX className="h-3.5 w-3.5 text-gray-400" />}
              {soundEnabled ? 'Click On' : 'Muted'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* BPM Hero Display */}
        <div className="py-6">
          <div className="text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white tabular-nums">
            {bpm !== null ? bpm : '--'}
          </div>
          <div className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mt-1">
            Beats Per Minute
          </div>
          <div className="mt-3 inline-block rounded-full bg-blue-50 dark:bg-blue-950/60 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            {tempoMarking}
          </div>
        </div>

        {/* Big Tap Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleTap}
            className={`w-full py-16 px-6 rounded-2xl border-2 font-bold text-2xl transition-all duration-75 shadow-md select-none ${
              isPressing
                ? 'scale-95 bg-blue-600 text-white border-blue-700 shadow-inner'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-transparent hover:shadow-lg'
            }`}
          >
            TAP HERE OR PRESS SPACEBAR
          </button>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Tip: Tap continuously to a rhythm. The counter resets automatically if inactive for 3 seconds.
          </p>
        </div>
      </div>

      {/* History and Stats */}
      {history.length > 0 && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Recent BPM Calculations
          </h4>
          <div className="flex flex-wrap gap-2">
            {history.map((val, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                {val} BPM
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
