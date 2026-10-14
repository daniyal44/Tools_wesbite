'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface Stats {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: string;
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
}

function computeStats(nums: number[]): Stats | null {
  if (nums.length === 0) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const count = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const mid = Math.floor(count / 2);
  const median = count % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  // Mode: value(s) with the highest frequency; if all unique, report "none".
  const freq = new Map<number, number>();
  let maxFreq = 0;
  for (const n of nums) {
    const f = (freq.get(n) || 0) + 1;
    freq.set(n, f);
    if (f > maxFreq) maxFreq = f;
  }
  let mode = 'none';
  if (maxFreq > 1) {
    const modes = [...freq.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v).sort((a, b) => a - b);
    mode = modes.join(', ');
  }

  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;
  // Population variance (divide by N).
  const variance = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0) / count;
  const stdDev = Math.sqrt(variance);

  return { count, sum, mean, median, mode, min, max, range, variance, stdDev };
}

const fmt = (n: number) => {
  if (!isFinite(n)) return '—';
  const r = Math.round(n * 1e6) / 1e6;
  return r.toLocaleString(undefined, { maximumFractionDigits: 6 });
};

export default function AverageCalculator() {
  const [input, setInput] = useState('12, 7, 19, 7, 23, 4, 15');
  const [copied, setCopied] = useState(false);

  const { stats, parsedCount } = useMemo(() => {
    const nums = input
      .split(/[\s,;\n\t]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map(Number)
      .filter((n) => !Number.isNaN(n));
    return { stats: computeStats(nums), parsedCount: nums.length };
  }, [input]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = [
      `Count: ${fmt(stats.count)}`,
      `Sum: ${fmt(stats.sum)}`,
      `Mean (average): ${fmt(stats.mean)}`,
      `Median: ${fmt(stats.median)}`,
      `Mode: ${stats.mode}`,
      `Min: ${fmt(stats.min)}`,
      `Max: ${fmt(stats.max)}`,
      `Range: ${fmt(stats.range)}`,
      `Population variance: ${fmt(stats.variance)}`,
      `Population std dev: ${fmt(stats.stdDev)}`,
    ].join('\n');
    if (await copyToClipboard(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const rows: { label: string; value: string; hero?: boolean }[] = stats
    ? [
        { label: 'Mean (average)', value: fmt(stats.mean), hero: true },
        { label: 'Median', value: fmt(stats.median), hero: true },
        { label: 'Mode', value: stats.mode, hero: true },
        { label: 'Count', value: fmt(stats.count) },
        { label: 'Sum', value: fmt(stats.sum) },
        { label: 'Minimum', value: fmt(stats.min) },
        { label: 'Maximum', value: fmt(stats.max) },
        { label: 'Range', value: fmt(stats.range) },
        { label: 'Variance (population)', value: fmt(stats.variance) },
        { label: 'Std deviation (population)', value: fmt(stats.stdDev) },
      ]
    : [];

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Enter numbers (separated by commas, spaces, or new lines)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="e.g. 12, 7, 19, 7, 23"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">{parsedCount} valid number{parsedCount === 1 ? '' : 's'} detected</p>
      </div>

      {stats ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Results</h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy all'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {rows.filter((r) => r.hero).map((r) => (
              <div key={r.label} className="rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/50 p-4 text-center">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">{r.label}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white break-words">{r.value}</div>
              </div>
            ))}
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {rows.filter((r) => !r.hero).map((r) => (
              <div key={r.label} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1.5">
                <dt className="text-xs text-gray-500 dark:text-gray-400">{r.label}</dt>
                <dd className="text-xs font-semibold text-gray-900 dark:text-white">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Enter at least one number to see the average and statistics.
        </div>
      )}
    </div>
  );
}
