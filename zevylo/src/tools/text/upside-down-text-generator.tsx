'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
  k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
  u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ',
  K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥',
  U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
  '.': '˙', ',': "'", "'": ',', '"': '„', '!': '¡', '?': '¿', '(': ')', ')': '(',
  '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾',
};

const MIRROR_MAP: Record<string, string> = {
  a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'ʇ', g: 'ǫ', h: 'ʜ', i: 'i', j: 'ꞁ',
  k: 'ʞ', l: 'l', m: 'm', n: 'ᴎ', o: 'o', p: 'q', q: 'p', r: 'ɿ', s: 'ƨ', t: 'ƚ',
  u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z',
  A: 'A', B: 'ᙠ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'ꟻ', G: 'Ꭾ', H: 'H', I: 'I', J: 'Ⴑ',
  K: '⋊', L: '⅃', M: 'M', N: 'ᴎ', O: 'O', P: 'ꟼ', Q: 'Ϙ', R: 'Я', S: 'Ƨ', T: 'T',
  U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'Ƹ',
};

function flipUpsideDown(text: string, reverse: boolean): string {
  const chars = Array.from(text).map((ch) => UPSIDE_DOWN_MAP[ch] || ch);
  return reverse ? chars.reverse().join('') : chars.join('');
}

function reverseText(text: string): string {
  return Array.from(text).reverse().join('');
}

function mirrorText(text: string): string {
  return Array.from(text)
    .reverse()
    .map((ch) => MIRROR_MAP[ch] || ch)
    .join('');
}

export default function UpsideDownTextGenerator() {
  const [inputText, setInputText] = useState<string>('Hello World! How are you today?');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const variations = useMemo(() => {
    return [
      {
        id: 'upside-down-backwards',
        name: 'Upside Down & Backwards (Classic)',
        sample: flipUpsideDown(inputText, true),
      },
      {
        id: 'upside-down-only',
        name: 'Upside Down Only (Forward Order)',
        sample: flipUpsideDown(inputText, false),
      },
      {
        id: 'reverse-only',
        name: 'Backwards / Reverse Only',
        sample: reverseText(inputText),
      },
      {
        id: 'mirror',
        name: 'Mirror Reflection',
        sample: mirrorText(inputText),
      },
    ];
  }, [inputText]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Text Card */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Your Text
          </label>
          <button
            onClick={() => setInputText('')}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste text to flip upside down..."
          className="w-full text-base p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Generated Variations List */}
      <div className="space-y-4">
        {variations.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {item.name}
              </span>
              <button
                onClick={() => handleCopy(item.id, item.sample)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 min-h-[46px] flex items-center">
              <p className="text-base text-gray-900 dark:text-gray-100 font-mono break-all select-all">
                {item.sample || <span className="text-gray-400">Type text above...</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
