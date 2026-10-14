'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, Sparkles, Mic, Sliders } from 'lucide-react';

const SAMPLES = [
  'Welcome to Zevylo! The modern, private, client-side web utility platform designed for creators, developers, and makers.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts. Keep building and innovating every day.',
  'Attention all passengers, flight 404 to Silicon Valley is now boarding at Gate 12. Please have your boarding pass and identification ready.',
];

export default function TextToSpeech() {
  const [text, setText] = useState<string>(SAMPLES[0]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setTimeout(() => {
        setIsSupported(false);
      }, 0);
      return;
    }

    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!synthRef.current || !text.trim()) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (!synthRef.current || !isPlaying) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return (
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-8 text-center text-amber-800 dark:text-amber-200">
        Your browser does not support the Web Speech Synthesis API. Please use a modern browser such as Chrome, Edge, Safari, or Firefox.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Input Text Box */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="tts-text-input" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Mic className="h-4 w-4 text-blue-600" /> Enter Text to Read Aloud
          </label>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400">Samples:</span>
            {SAMPLES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  handleStop();
                  setText(SAMPLES[i]);
                }}
                className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300 hover:border-blue-500"
              >
                Sample {i + 1}
              </button>
            ))}
          </div>
        </div>

        <textarea
          id="tts-text-input"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste any text here..."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        {/* Playback Controls & Voice Selector */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={handleSpeak}
                disabled={!text.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                {isPaused ? 'Resume' : 'Play Speech'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700 shadow-sm transition-all"
              >
                <Pause className="h-4 w-4 fill-white" />
                Pause
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isPlaying && !isPaused}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 transition-all"
            >
              <Square className="h-4 w-4" />
              Stop
            </button>

            {isPlaying && (
              <div className="flex items-center gap-1.5 pl-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Speaking...
                </span>
              </div>
            )}
          </div>

          {/* Voice Dropdown */}
          <div className="w-full md:w-72">
            <label htmlFor="voice-actor-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Select Voice ({voices.length} available)
            </label>
            <select
              id="voice-actor-select"
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value, 10))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
            >
              {voices.map((v, i) => (
                <option key={i} value={i}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Audio Sliders & Tuning */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-blue-600" /> Voice Modulation Controls
        </h3>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <span>Speed / Rate</span>
              <span>{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0.5x (Slow)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Fast)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <span>Pitch</span>
              <span>{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Low</span>
              <span>Default</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <span className="flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5" /> Volume
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          Zero server upload: Speech is synthesized entirely on your device via the browser speech engine.
        </div>
      </div>
    </div>
  );
}
