'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
// Short scale (US/modern UK): 10^3 groups
const SCALES = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];

function threeDigitsToWords(n: number): string {
  const parts: string[] = [];
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (hundreds) parts.push(`${ONES[hundreds]} hundred`);
  if (rest) {
    if (rest < 20) parts.push(ONES[rest]);
    else {
      const t = Math.floor(rest / 10);
      const o = rest % 10;
      parts.push(o ? `${TENS[t]}-${ONES[o]}` : TENS[t]);
    }
  }
  return parts.join(' ');
}

function integerToWords(digits: string): string {
  // digits: string of 0-9 only, no sign
  let s = digits.replace(/^0+(?=\d)/, ''); // strip leading zeros but keep one
  if (s === '0' || s === '') return 'zero';
  // Guard against absurd length (beyond our scale table)
  if (s.length > SCALES.length * 3) return 'number too large to spell out';
  const groups: number[] = [];
  while (s.length > 0) {
    groups.unshift(parseInt(s.slice(-3), 10));
    s = s.slice(0, -3);
  }
  const words: string[] = [];
  const n = groups.length;
  groups.forEach((g, i) => {
    if (g === 0) return;
    const scale = SCALES[n - 1 - i];
    words.push(scale ? `${threeDigitsToWords(g)} ${scale}` : threeDigitsToWords(g));
  });
  return words.join(' ');
}

function toWords(raw: string, mode: 'cardinal' | 'currency'): string {
  const trimmed = raw.trim().replace(/,/g, '');
  if (!trimmed) return '';
  const m = trimmed.match(/^(-)?(\d+)(?:\.(\d+))?$/);
  if (!m) return 'Enter a valid number (digits, optional minus and decimal).';
  const neg = !!m[1];
  const intPart = m[2];
  const fracPart = m[3] || '';

  if (mode === 'currency') {
    const dollars = integerToWords(intPart);
    const cents = fracPart ? parseInt((fracPart + '00').slice(0, 2), 10) : 0;
    const dUnit = intPart === '1' && dollars === 'one' ? 'dollar' : 'dollars';
    let out = `${dollars} ${dUnit}`;
    if (cents > 0) {
      const centWords = integerToWords(String(cents));
      out += ` and ${centWords} ${cents === 1 ? 'cent' : 'cents'}`;
    }
    return capitalize((neg ? 'minus ' : '') + out);
  }

  let out = integerToWords(intPart);
  if (fracPart) {
    const digitWords = fracPart.split('').map((d) => ONES[parseInt(d, 10)] || 'zero').join(' ');
    out += ` point ${digitWords}`;
  }
  return capitalize((neg ? 'minus ' : '') + out);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function NumberToWords() {
  const [input, setInput] = useState('12345.67');
  const [mode, setMode] = useState<'cardinal' | 'currency'>('cardinal');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => toWords(input, mode), [input, mode]);

  const handleCopy = async () => {
    if (output && (await copyToClipboard(output))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const modeBtn = (val: typeof mode, label: string) =>
    `px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
      mode === val
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode('cardinal')} className={modeBtn('cardinal', 'Number')}>Number in words</button>
          <button onClick={() => setMode('currency')} className={modeBtn('currency', 'Currency')}>Currency (USD)</button>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Enter a number
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 1234567.89"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-lg font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">In words</span>
          <button
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed break-words select-all min-h-[2rem]">
          {output}
        </p>
      </div>
    </div>
  );
}
