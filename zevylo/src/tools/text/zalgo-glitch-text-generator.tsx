'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Flame, Sparkles } from 'lucide-react';

const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
  '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
  '\u0344', '\u034a', '\u034b', '\u034c', '\u0350', '\u0300', '\u0301', '\u0302',
  '\u0303', '\u030b', '\u030c', '\u033e', '\u0340', '\u0341', '\u0315', '\u0312',
  '\u0313', '\u0314', '\u033d', '\u0309',
];

const ZALGO_MID = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
  '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e',
  '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361',
];

const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
  '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
  '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
  '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d',
  '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323',
];

function getRandomChar(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateZalgo(
  text: string,
  intensity: number,
  includeUp: boolean,
  includeMid: boolean,
  includeDown: boolean
): string {
  if (!text) return '';

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ' || char === '\n') {
      result += char;
      continue;
    }

    result += char;

    if (includeUp) {
      const count = Math.floor(Math.random() * intensity) + 1;
      for (let j = 0; j < count; j++) {
        result += getRandomChar(ZALGO_UP);
      }
    }

    if (includeMid) {
      const count = Math.floor(Math.random() * (intensity / 2)) + 1;
      for (let j = 0; j < count; j++) {
        result += getRandomChar(ZALGO_MID);
      }
    }

    if (includeDown) {
      const count = Math.floor(Math.random() * intensity) + 1;
      for (let j = 0; j < count; j++) {
        result += getRandomChar(ZALGO_DOWN);
      }
    }
  }

  return result;
}

export default function ZalgoGlitchTextGenerator() {
  const [inputText, setInputText] = useState<string>('HE COMES... ZALGO IS AWAKENED');
  const [intensity, setIntensity] = useState<number>(3); // 1 (mild) to 8 (chaos)
  const [goUp, setGoUp] = useState<boolean>(true);
  const [goMid, setGoMid] = useState<boolean>(true);
  const [goDown, setGoDown] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const zalgoOutput = useMemo(() => {
    return generateZalgo(inputText, intensity, goUp, goMid, goDown);
  }, [inputText, intensity, goUp, goMid, goDown, seed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(zalgoOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Controls Card */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Corruption Controls
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Re-Glitch
            </button>
            <button
              onClick={() => setInputText('')}
              className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Intensity slider */}
        <div>
          <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span>Chaos Intensity: {intensity <= 2 ? 'Mild' : intensity <= 5 ? 'Corrupted' : 'Total Void Chaos'}</span>
            <span className="font-mono">{intensity} / 8</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
          />
        </div>

        {/* Direction toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={goUp}
              onChange={(e) => setGoUp(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            Glitch Top / Above
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={goMid}
              onChange={(e) => setGoMid(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            Glitch Middle / Strikethrough
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={goDown}
              onChange={(e) => setGoDown(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
            />
            Glitch Bottom / Below
          </label>
        </div>
      </div>

      {/* Input Text Box */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Input Text
        </label>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to infect with Zalgo..."
          className="w-full text-base p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none font-mono"
        />
      </div>

      {/* Zalgo Output Box */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4" /> Corrupted Output
          </span>
          <button
            onClick={handleCopy}
            disabled={!zalgoOutput}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white transition shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Glitch Text
              </>
            )}
          </button>
        </div>

        <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 min-h-[160px] flex items-center justify-center overflow-x-auto">
          <p className="text-xl sm:text-2xl font-serif text-gray-950 dark:text-white break-all leading-loose text-center select-all">
            {zalgoOutput || <span className="text-gray-400 text-sm font-sans">Type text above...</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
