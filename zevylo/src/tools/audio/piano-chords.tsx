'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, Play, Copy, Check } from 'lucide-react';

// Frequencies for 2 octaves (C4 to B5)
const NOTE_FREQS: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25,
  'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00,
  'A#5': 932.33, 'B5': 987.77,
};

const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface ChordType {
  name: string;
  suffix: string;
  intervals: number[]; // semitones from root
  formula: string;
}

const CHORD_TYPES: ChordType[] = [
  { name: 'Major', suffix: 'maj', intervals: [0, 4, 7], formula: '1 - 3 - 5' },
  { name: 'Minor', suffix: 'm', intervals: [0, 3, 7], formula: '1 - ♭3 - 5' },
  { name: 'Dominant 7th', suffix: '7', intervals: [0, 4, 7, 10], formula: '1 - 3 - 5 - ♭7' },
  { name: 'Major 7th', suffix: 'maj7', intervals: [0, 4, 7, 11], formula: '1 - 3 - 5 - 7' },
  { name: 'Minor 7th', suffix: 'm7', intervals: [0, 3, 7, 10], formula: '1 - ♭3 - 5 - ♭7' },
  { name: 'Diminished', suffix: 'dim', intervals: [0, 3, 6], formula: '1 - ♭3 - ♭5' },
  { name: 'Augmented', suffix: 'aug', intervals: [0, 4, 8], formula: '1 - 3 - ♯5' },
  { name: 'Suspended 2nd', suffix: 'sus2', intervals: [0, 2, 7], formula: '1 - 2 - 5' },
  { name: 'Suspended 4th', suffix: 'sus4', intervals: [0, 5, 7], formula: '1 - 4 - 5' },
];

const WHITE_KEYS = [
  { note: 'C4', label: 'C', keyBind: 'a' },
  { note: 'D4', label: 'D', keyBind: 's' },
  { note: 'E4', label: 'E', keyBind: 'd' },
  { note: 'F4', label: 'F', keyBind: 'f' },
  { note: 'G4', label: 'G', keyBind: 'g' },
  { note: 'A4', label: 'A', keyBind: 'h' },
  { note: 'B4', label: 'B', keyBind: 'j' },
  { note: 'C5', label: 'C', keyBind: 'k' },
  { note: 'D5', label: 'D', keyBind: 'l' },
  { note: 'E5', label: 'E', keyBind: ';' },
  { note: 'F5', label: 'F', keyBind: '\'' },
  { note: 'G5', label: 'G', keyBind: '' },
  { note: 'A5', label: 'A', keyBind: '' },
  { note: 'B5', label: 'B', keyBind: '' },
];

const BLACK_KEYS = [
  { note: 'C#4', label: 'C#', leftOffset: '4.8%', keyBind: 'w' },
  { note: 'D#4', label: 'D#', leftOffset: '12%', keyBind: 'e' },
  { note: 'F#4', label: 'F#', leftOffset: '26.2%', keyBind: 't' },
  { note: 'G#4', label: 'G#', leftOffset: '33.3%', keyBind: 'y' },
  { note: 'A#4', label: 'A#', leftOffset: '40.4%', keyBind: 'u' },
  { note: 'C#5', label: 'C#', leftOffset: '54.7%', keyBind: 'o' },
  { note: 'D#5', label: 'D#', leftOffset: '61.8%', keyBind: 'p' },
  { note: 'F#5', label: 'F#', leftOffset: '76.1%', keyBind: '' },
  { note: 'G#5', label: 'G#', leftOffset: '83.2%', keyBind: '' },
  { note: 'A#5', label: 'A#', leftOffset: '90.3%', keyBind: '' },
];

export default function PianoChords() {
  const [selectedRoot, setSelectedRoot] = useState<string>('C');
  const [selectedChordIndex, setSelectedChordIndex] = useState<number>(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playFrequency = useCallback((freq: number, duration = 1.2) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio error
    }
  }, []);

  const playNote = useCallback((noteKey: string) => {
    const freq = NOTE_FREQS[noteKey];
    if (freq) {
      setActiveNote(noteKey);
      playFrequency(freq);
      setTimeout(() => setActiveNote(null), 300);
    }
  }, [playFrequency]);

  // Compute notes of selected chord
  const currentChord = CHORD_TYPES[selectedChordIndex];
  const rootIndex = ROOT_NOTES.indexOf(selectedRoot);
  const chordNotes = currentChord.intervals.map(semitones => {
    const noteIdx = (rootIndex + semitones) % 12;
    return ROOT_NOTES[noteIdx];
  });

  const playFullChord = () => {
    chordNotes.forEach((noteName, idx) => {
      // Check octave 4 first, then 5 if lower
      let targetKey = `${noteName}4`;
      if (!NOTE_FREQS[targetKey]) {
        targetKey = `${noteName}5`;
      }
      const freq = NOTE_FREQS[targetKey] || 440;
      setTimeout(() => {
        playFrequency(freq, 1.8);
      }, idx * 25);
    });
  };

  const isNoteInChord = (noteWithOctave: string) => {
    const pureName = noteWithOctave.replace(/[0-9]/g, '');
    return chordNotes.includes(pureName);
  };

  const handleCopy = () => {
    const text = `${selectedRoot}${currentChord.suffix} (${chordNotes.join(' - ')}): Formula [${currentChord.formula}]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      const white = WHITE_KEYS.find(k => k.keyBind === key);
      if (white) {
        playNote(white.note);
        return;
      }
      const black = BLACK_KEYS.find(k => k.keyBind === key);
      if (black) {
        playNote(black.note);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Chord Selector Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              <span>{selectedRoot}{currentChord.suffix}</span>
              <span className="text-sm px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium">
                {currentChord.name}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-4">
              <span>Notes: <strong className="text-gray-800 dark:text-gray-200">{chordNotes.join(' - ')}</strong></span>
              <span>Formula: <strong className="text-gray-800 dark:text-gray-200">{currentChord.formula}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={playFullChord}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" /> Play Chord
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              title="Copy Chord Info"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Root Note Selector */}
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            Root Note
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ROOT_NOTES.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRoot(r)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  selectedRoot === r
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Chord Type Selector */}
        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            Chord Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CHORD_TYPES.map((type, idx) => (
              <button
                key={type.name}
                onClick={() => setSelectedChordIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedChordIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Piano Keyboard */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Volume2 className="h-4 w-4" /> Interactive 2-Octave Keyboard
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Click keys or use physical keyboard (A to L)
          </span>
        </div>

        <div className="relative w-full h-56 select-none overflow-x-auto pb-2">
          {/* White Keys */}
          <div className="flex h-full w-full">
            {WHITE_KEYS.map((k) => {
              const inChord = isNoteInChord(k.note);
              const isActive = activeNote === k.note;
              return (
                <button
                  key={k.note}
                  type="button"
                  onClick={() => playNote(k.note)}
                  className={`flex-1 h-full rounded-b-lg border border-gray-300 dark:border-gray-700 flex flex-col justify-end items-center pb-2 transition-all ${
                    isActive
                      ? 'bg-blue-300 dark:bg-blue-600'
                      : inChord
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700'
                      : 'bg-white dark:bg-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-xs font-bold ${inChord ? 'text-blue-700 dark:text-blue-400 font-extrabold' : 'text-gray-700'}`}>
                    {k.label}
                  </span>
                  {k.keyBind && (
                    <span className="text-[10px] text-gray-400 uppercase mt-0.5">
                      {k.keyBind}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Black Keys */}
          {BLACK_KEYS.map((k) => {
            const inChord = isNoteInChord(k.note);
            const isActive = activeNote === k.note;
            return (
              <button
                key={k.note}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playNote(k.note);
                }}
                style={{ left: k.leftOffset }}
                className={`absolute top-0 w-[4.5%] h-32 rounded-b-md z-10 flex flex-col justify-end items-center pb-2 shadow-md transition-all ${
                  isActive
                    ? 'bg-indigo-500'
                    : inChord
                    ? 'bg-indigo-800 border-2 border-blue-400'
                    : 'bg-gray-900 dark:bg-black hover:bg-gray-800'
                }`}
              >
                <span className="text-[10px] font-bold text-white">
                  {k.label}
                </span>
                {k.keyBind && (
                  <span className="text-[9px] text-gray-400 uppercase">
                    {k.keyBind}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
