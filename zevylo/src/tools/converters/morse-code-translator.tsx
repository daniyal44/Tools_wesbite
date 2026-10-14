'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Square, Copy, Check, ArrowRightLeft, Radio, Lightbulb } from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
};

// Reverse map for decoding
const REVERSE_MORSE: Record<string, string> = {};
Object.entries(MORSE_MAP).forEach(([char, morse]) => {
  REVERSE_MORSE[morse] = char;
});

export default function MorseCodeTranslator() {
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const [inputText, setInputText] = useState<string>('SOS MAYDAY');
  const [wpm, setWpm] = useState<number>(18);
  const [tonePitch, setTonePitch] = useState<number>(650);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBeaconOn, setIsBeaconOn] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Encode Text to Morse
  const textToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(ch => MORSE_MAP[ch] || '')
      .filter(Boolean)
      .join(' ');
  };

  // Decode Morse to Text
  const morseToText = (morse: string): string => {
    return morse
      .trim()
      .split(/\s+/)
      .map(code => {
        if (code === '/') return ' ';
        return REVERSE_MORSE[code] || '?';
      })
      .join('');
  };

  const outputResult = mode === 'text-to-morse' ? textToMorse(inputText) : morseToText(inputText);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    stopAudio();
    if (mode === 'text-to-morse') {
      setInputText(outputResult);
      setMode('morse-to-text');
    } else {
      setInputText(outputResult);
      setMode('text-to-morse');
    }
  };

  const stopAudio = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsBeaconOn(false);
  }, []);

  const playMorseAudio = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    const morseCode = mode === 'text-to-morse' ? outputResult : inputText;
    if (!morseCode.trim()) return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);

      const dotDuration = 1.2 / wpm; // in seconds
      const dashDuration = dotDuration * 3;
      const elementGap = dotDuration;
      const letterGap = dotDuration * 3;
      const wordGap = dotDuration * 7;

      const playTone = (duration: number): Promise<void> => {
        return new Promise(resolve => {
          if (!isPlayingRef.current) {
            resolve();
            return;
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(tonePitch, ctx.currentTime);

          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + duration - 0.005);
          gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          setIsBeaconOn(true);

          setTimeout(() => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
            setIsBeaconOn(false);
            setTimeout(resolve, elementGap * 1000);
          }, duration * 1000);
        });
      };

      const delay = (ms: number): Promise<void> => {
        return new Promise(res => setTimeout(res, ms));
      };

      // Play through symbols
      const words = morseCode.split(/\s*\/\s*/);
      for (let wIdx = 0; wIdx < words.length; wIdx++) {
        if (!isPlayingRef.current) break;
        const letters = words[wIdx].trim().split(/\s+/);

        for (let lIdx = 0; lIdx < letters.length; lIdx++) {
          if (!isPlayingRef.current) break;
          const letter = letters[lIdx];

          for (let sIdx = 0; sIdx < letter.length; sIdx++) {
            if (!isPlayingRef.current) break;
            const sym = letter[sIdx];
            if (sym === '.') {
              await playTone(dotDuration);
            } else if (sym === '-') {
              await playTone(dashDuration);
            }
          }

          if (lIdx < letters.length - 1) {
            await delay(letterGap * 1000);
          }
        }

        if (wIdx < words.length - 1) {
          await delay(wordGap * 1000);
        }
      }
    } catch {
      // Audio error
    } finally {
      stopAudio();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {mode === 'text-to-morse' ? 'Text ➔ Morse Code Mode' : 'Morse Code ➔ Text Mode'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              International Morse Alphabet with real-time audio playback
            </p>
          </div>
        </div>

        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
        >
          <ArrowRightLeft className="h-4 w-4" /> Switch Direction
        </button>
      </div>

      {/* Main Input & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {mode === 'text-to-morse' ? 'Plain English Input' : 'Morse Code Input (. and -)'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'text-to-morse' ? 'Enter text here...' : '... --- ... (use space between letters, / between words)'}
            rows={7}
            className="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none font-mono"
          />
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{inputText.length} characters</span>
            <button
              onClick={() => setInputText('')}
              className="text-xs text-rose-500 hover:underline font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {mode === 'text-to-morse' ? 'Morse Code Output' : 'Plain Text Translation'}
              </label>
              {/* Flashing Beacon */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Lightbulb className={`h-4 w-4 transition-colors ${isBeaconOn ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-gray-400'}`} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Beacon</span>
              </div>
            </div>

            <div className="w-full h-44 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-white font-mono overflow-y-auto whitespace-pre-wrap select-all">
              {outputResult || <span className="text-gray-400 italic">Translation will appear here...</span>}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={playMorseAudio}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-md transition-all active:scale-95 ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isPlaying ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              {isPlaying ? 'Stop Audio' : 'Play Morse Audio'}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Audio Speed and Pitch Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            <span>Transmission Speed (WPM)</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{wpm} WPM</span>
          </div>
          <input
            type="range"
            min="5"
            max="35"
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            <span>Tone Frequency (Pitch)</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{tonePitch} Hz</span>
          </div>
          <input
            type="range"
            min="400"
            max="1000"
            step="25"
            value={tonePitch}
            onChange={(e) => setTonePitch(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
