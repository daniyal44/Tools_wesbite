'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Brain, Coffee, Settings } from 'lucide-react';

type Phase = 'focus' | 'short' | 'long';

const DEFAULTS = { focus: 25, short: 5, long: 15, rounds: 4 };

export default function PomodoroTimer() {
  const [durations, setDurations] = useState(DEFAULTS);
  const [phase, setPhase] = useState<Phase>('focus');
  const [remaining, setRemaining] = useState(DEFAULTS.focus * 60); // seconds
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0); // focus sessions done
  const [showSettings, setShowSettings] = useState(false);

  const endRef = useRef<number>(0);
  const audioRef = useRef<AudioContext | null>(null);

  const phaseSeconds = useCallback(
    (p: Phase) => (p === 'focus' ? durations.focus : p === 'short' ? durations.short : durations.long) * 60,
    [durations]
  );

  const chime = useCallback(() => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioRef.current || new Ctx();
      audioRef.current = ctx;
      const now = ctx.currentTime;
      [880, 1174, 1568].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = now + i * 0.18;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch {
      /* audio not available */
    }
  }, []);

  const advance = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'focus') {
        const done = completed + 1;
        setCompleted(done);
        const next: Phase = done % durations.rounds === 0 ? 'long' : 'short';
        setRemaining(phaseSeconds(next));
        return next;
      }
      setRemaining(phaseSeconds('focus'));
      return 'focus';
    });
  }, [completed, durations.rounds, phaseSeconds]);

  // Drift-free ticking based on a target end timestamp.
  useEffect(() => {
    if (!running) return;
    endRef.current = Date.now() + remaining * 1000;
    const id = setInterval(() => {
      const secs = Math.max(0, Math.round((endRef.current - Date.now()) / 1000));
      setRemaining(secs);
      if (secs <= 0) {
        chime();
        setRunning(false);
        advance();
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Reflect the countdown in the tab title while running.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const original = document.title;
    if (running) {
      const m = Math.floor(remaining / 60).toString().padStart(2, '0');
      const s = (remaining % 60).toString().padStart(2, '0');
      document.title = `${m}:${s} · ${phase === 'focus' ? 'Focus' : 'Break'} — Pomodoro`;
    }
    return () => {
      document.title = original;
    };
  }, [running, remaining, phase]);

  const reset = () => {
    setRunning(false);
    setPhase('focus');
    setCompleted(0);
    setRemaining(durations.focus * 60);
  };

  const skip = () => {
    setRunning(false);
    chime();
    advance();
  };

  const applyDuration = (key: keyof typeof durations, value: number) => {
    const v = Math.max(1, Math.min(key === 'rounds' ? 12 : 180, Math.floor(value) || 1));
    setDurations((d) => {
      const nd = { ...d, [key]: v };
      if (!running && key === phase) setRemaining(v * 60);
      if (!running && phase === 'focus' && key === 'focus') setRemaining(v * 60);
      return nd;
    });
  };

  const total = phaseSeconds(phase);
  const progress = total > 0 ? 1 - remaining / total : 0;
  const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
  const ss = (remaining % 60).toString().padStart(2, '0');

  const phaseMeta: Record<Phase, { label: string; color: string; ring: string; Icon: typeof Brain }> = {
    focus: { label: 'Focus', color: 'text-rose-600 dark:text-rose-400', ring: 'stroke-rose-500', Icon: Brain },
    short: { label: 'Short Break', color: 'text-emerald-600 dark:text-emerald-400', ring: 'stroke-emerald-500', Icon: Coffee },
    long: { label: 'Long Break', color: 'text-blue-600 dark:text-blue-400', ring: 'stroke-blue-500', Icon: Coffee },
  };
  const meta = phaseMeta[phase];
  const R = 130;
  const C = 2 * Math.PI * R;

  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Phase tabs */}
      <div className="flex justify-center gap-2">
        {(['focus', 'short', 'long'] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => { setRunning(false); setPhase(p); setRemaining(phaseSeconds(p)); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
              phase === p ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {phaseMeta[p].label}
          </button>
        ))}
      </div>

      {/* Timer dial */}
      <div className="relative mx-auto w-72 h-72">
        <svg viewBox="0 0 300 300" className="w-full h-full -rotate-90">
          <circle cx="150" cy="150" r={R} className="fill-none stroke-gray-200 dark:stroke-gray-800" strokeWidth="12" />
          <circle
            cx="150" cy="150" r={R}
            className={`fill-none ${meta.ring} transition-[stroke-dashoffset] duration-300`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${meta.color}`}>
            <meta.Icon className="h-4 w-4" /> {meta.label}
          </div>
          <div className="text-6xl font-black font-mono text-gray-900 dark:text-white tabular-nums mt-1">
            {mm}:{ss}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {completed} focus {completed === 1 ? 'session' : 'sessions'} done
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={skip} className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
          Skip
        </button>
        <button onClick={reset} className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" title="Reset">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className={`p-3 rounded-xl border text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${showSettings ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700'}`}
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm grid grid-cols-2 gap-4">
          {([
            ['focus', 'Focus (min)'],
            ['short', 'Short break (min)'],
            ['long', 'Long break (min)'],
            ['rounds', 'Rounds → long break'],
          ] as [keyof typeof durations, string][]).map(([key, label]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</label>
              <input
                type="number"
                min={1}
                value={durations[key]}
                onChange={(e) => applyDuration(key, parseInt(e.target.value, 10))}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
