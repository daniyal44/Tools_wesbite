'use client';

import React, { useState } from 'react';
import { Dices, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

// Unbiased integer in [min, max] using crypto rejection sampling.
function cryptoRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) return min;
  const maxUint = 0xffffffff;
  const limit = maxUint - (maxUint % range);
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return min + (x % range);
}

function cryptoRandomFloat(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / 0x100000000; // [0, 1)
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [decimals, setDecimals] = useState(0);
  const [unique, setUnique] = useState(false);
  const [sortResults, setSortResults] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = () => {
    setError(null);
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const n = Math.max(1, Math.min(10000, Math.floor(count) || 1));

    if (decimals === 0 && unique) {
      const rangeSize = hi - lo + 1;
      if (n > rangeSize) {
        setError(`Can't pick ${n} unique integers from a range of only ${rangeSize}. Widen the range or reduce the count.`);
        setResults([]);
        return;
      }
    }

    const out: number[] = [];
    const seen = new Set<number>();
    let guard = 0;
    while (out.length < n && guard < n * 50 + 100000) {
      guard++;
      let value: number;
      if (decimals > 0) {
        const raw = lo + cryptoRandomFloat() * (hi - lo);
        value = parseFloat(raw.toFixed(decimals));
      } else {
        value = cryptoRandomInt(lo, hi);
      }
      if (unique) {
        if (seen.has(value)) continue;
        seen.add(value);
      }
      out.push(value);
    }

    if (sortResults) out.sort((a, b) => a - b);
    setResults(out);
  };

  const handleCopy = async () => {
    if (await copyToClipboard(results.join(', '))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const numField = (label: string, value: number, onChange: (n: number) => void, props: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        {...props}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );

  const toggleClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-4">
          {numField('Minimum', min, (n) => setMin(Number.isNaN(n) ? 0 : n))}
          {numField('Maximum', max, (n) => setMax(Number.isNaN(n) ? 0 : n))}
          {numField('How many', count, (n) => setCount(Number.isNaN(n) ? 1 : n), { min: 1, max: 10000 })}
          {numField('Decimal places', decimals, (n) => setDecimals(Math.max(0, Math.min(8, Number.isNaN(n) ? 0 : Math.floor(n)))), { min: 0, max: 8 })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setUnique((v) => !v)} className={toggleClass(unique)}>No duplicates</button>
          <button onClick={() => setSortResults((v) => !v)} className={toggleClass(sortResults)}>Sort ascending</button>
          <button
            onClick={generate}
            className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Generate
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <Dices className="h-5 w-5 text-blue-600" /> Results {results.length > 0 && <span className="text-gray-400 font-normal">({results.length})</span>}
          </div>
          <button
            onClick={handleCopy}
            disabled={results.length === 0}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {results.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
            Set your range and press Generate.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {results.map((n, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center min-w-[3rem] px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-sm select-all"
              >
                {n.toLocaleString(undefined, { maximumFractionDigits: 8 })}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
        Uses your browser&apos;s cryptographically secure random generator (crypto.getRandomValues) with bias-free sampling.
      </p>
    </div>
  );
}
