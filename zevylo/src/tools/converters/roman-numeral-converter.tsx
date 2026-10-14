'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const VALID_ROMAN = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

function toRoman(n: number): string {
  let out = '';
  for (const [v, s] of MAP) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

function fromRoman(raw: string): number {
  const s = raw.trim().toUpperCase();
  const vals: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = vals[s[i]];
    const next = vals[s[i + 1]];
    if (next && cur < next) total -= cur;
    else total += cur;
  }
  return total;
}

type Mode = 'num2rom' | 'rom2num';

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState<Mode>('num2rom');
  const [input, setInput] = useState('2026');
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    const raw = input.trim();
    if (!raw) return { output: '', error: null as string | null };

    if (mode === 'num2rom') {
      const n = Number(raw);
      if (!Number.isInteger(n)) return { output: '', error: 'Enter a whole number.' };
      if (n < 1 || n > 3999) return { output: '', error: 'Standard Roman numerals cover 1 to 3999.' };
      return { output: toRoman(n), error: null };
    } else {
      if (!VALID_ROMAN.test(raw)) return { output: '', error: 'Not a valid Roman numeral (use I, V, X, L, C, D, M in standard form).' };
      return { output: String(fromRoman(raw)), error: null };
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (output && (await copyToClipboard(output))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    if (output && !error) setInput(output);
    else setInput('');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Mode toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => switchMode('num2rom')}
            className={`px-5 py-2 text-sm font-bold transition-colors ${mode === 'num2rom' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            Number → Roman
          </button>
          <button
            onClick={() => switchMode('rom2num')}
            className={`px-5 py-2 text-sm font-bold transition-colors ${mode === 'rom2num' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            Roman → Number
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="rn-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            {mode === 'num2rom' ? 'Number (1–3999)' : 'Roman numeral'}
          </label>
          <input
            id="rn-input"
            type="text"
            inputMode={mode === 'num2rom' ? 'numeric' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'num2rom' ? 'e.g. 2026' : 'e.g. MMXXVI'}
            className={`w-full rounded-xl border bg-gray-50 dark:bg-gray-800 px-4 py-3 text-2xl font-bold text-gray-900 dark:text-white text-center tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              error ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
            }`}
          />
        </div>

        {error ? (
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        ) : (
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-1">
              {mode === 'num2rom' ? 'Roman numeral' : 'Number'}
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-wide break-all select-all min-h-[2.5rem]">
                {output || '—'}
              </span>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0"
                  title="Copy"
                >
                  {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
        I = 1 · V = 5 · X = 10 · L = 50 · C = 100 · D = 500 · M = 1000
      </p>
    </div>
  );
}
