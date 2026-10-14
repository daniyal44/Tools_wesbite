'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Plus, Minus, Volume2 } from 'lucide-react';

export default function Metronome() {
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerBar, setBeatsPerBar] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const bpmRef = useRef<number>(120);
  const beatsRef = useRef<number>(4);
  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);

  // Sync refs
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    beatsRef.current = beatsPerBar;
  }, [beatsPerBar]);

  const scheduleNote = useCallback((beatNumber: number, time: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const isAccent = beatNumber === 0;
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, time);
    gain.gain.setValueAtTime(volume * (isAccent ? 1.0 : 0.6), time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  }, [volume]);

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / bpmRef.current;
    nextNoteTimeRef.current += secondsPerBeat;
    currentBeatRef.current = (currentBeatRef.current + 1) % beatsRef.current;
  }, []);

  const schedulerRef = useRef<() => void>(() => {});

  const scheduler = useCallback(() => {
    if (!audioCtxRef.current) return;
    const scheduleAheadTime = 0.1; // 100ms
    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + scheduleAheadTime) {
      scheduleNote(currentBeatRef.current, nextNoteTimeRef.current);
      const beatForUi = currentBeatRef.current;
      // Visual update timed roughly
      setTimeout(() => {
        if (isPlayingRef.current) {
          setCurrentBeat(beatForUi);
        }
      }, Math.max(0, (nextNoteTimeRef.current - audioCtxRef.current.currentTime) * 1000));
      nextNote();
    }
    if (isPlayingRef.current) {
      timerIdRef.current = window.setTimeout(() => {
        schedulerRef.current();
      }, 25);
    }
  }, [nextNote, scheduleNote]);

  useEffect(() => {
    schedulerRef.current = scheduler;
  }, [scheduler]);

  const startStop = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      setCurrentBeat(0);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        isPlayingRef.current = true;
        setIsPlaying(true);
        currentBeatRef.current = 0;
        nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
        scheduler();
      } catch {
        // Audio init error
      }
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
    };
  }, []);

  const changeBpm = (delta: number) => {
    setBpm(prev => Math.min(300, Math.max(30, prev + delta)));
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm text-center">
        {/* Beat Indicator Dots */}
        <div className="flex justify-center items-center gap-3 mb-8">
          {Array.from({ length: beatsPerBar }).map((_, i) => {
            const isActive = isPlaying && currentBeat === i;
            const isAccent = i === 0;
            return (
              <div
                key={i}
                className={`h-5 rounded-full transition-all duration-100 ${
                  isAccent ? 'w-8' : 'w-5'
                } ${
                  isActive
                    ? isAccent
                      ? 'bg-amber-500 scale-125 shadow-lg shadow-amber-500/50'
                      : 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              />
            );
          })}
        </div>

        {/* BPM Counter */}
        <div className="py-2">
          <div className="text-8xl font-black text-gray-900 dark:text-white tabular-nums tracking-tight">
            {bpm}
          </div>
          <div className="text-sm font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-1">
            BPM
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => changeBpm(-5)}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            -5
          </button>
          <button
            onClick={() => changeBpm(-1)}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Minus className="h-5 w-5" />
          </button>

          {/* Start/Stop Button */}
          <button
            onClick={startStop}
            className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg transition-transform active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="h-5 w-5 fill-current" /> Stop
              </>
            ) : (
              <>
                <Play className="h-5 w-5 fill-current" /> Start
              </>
            )}
          </button>

          <button
            onClick={() => changeBpm(1)}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => changeBpm(5)}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            +5
          </button>
        </div>

        {/* BPM Slider */}
        <div className="mt-8 px-4">
          <input
            type="range"
            min="30"
            max="280"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Beats per bar & Volume Controls */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Time Signature (Beats)
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {[2, 3, 4, 5, 6, 7].map((b) => (
                <button
                  key={b}
                  onClick={() => setBeatsPerBar(b)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    beatsPerBar === b
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {b}/4
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5" /> Volume ({Math.round(volume * 100)}%)
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer mt-2"
            />
          </div>
        </div>

        {/* Tempo Presets */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            Tempo Presets
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Adagio', val: 66 },
              { name: 'Andante', val: 92 },
              { name: 'Moderato', val: 108 },
              { name: 'Allegro', val: 128 },
              { name: 'Presto', val: 168 },
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => setBpm(p.val)}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {p.name} ({p.val})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
