'use client';

import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Check, X, Eye } from 'lucide-react';

function parseHex(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function normalizeHex(hex: string): string {
  let h = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split('').map((c) => c + c).join('');
  return '#' + h.toLowerCase();
}

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className={`flex items-center justify-between rounded-xl border px-4 py-3 ${pass ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30' : 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20'}`}>
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`inline-flex items-center gap-1 text-xs font-bold ${pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
        {pass ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        {pass ? 'Pass' : 'Fail'}
      </span>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [fg, setFg] = useState('#1f2937');
  const [bg, setBg] = useState('#ffffff');

  const result = useMemo(() => {
    const f = parseHex(fg);
    const b = parseHex(bg);
    if (!f || !b) return null;
    const lf = luminance(f);
    const lb = luminance(b);
    const ratio = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
    return {
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [fg, bg]);

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  const colorField = (label: string, value: string, onChange: (v: string) => void) => {
    const valid = parseHex(value) !== null;
    return (
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={valid ? normalizeHex(value) : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-12 shrink-0 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-xl border bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${valid ? 'border-gray-300 dark:border-gray-700 focus:border-blue-500' : 'border-red-400 dark:border-red-600'}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          {colorField('Text color', fg, setFg)}
          <button
            onClick={swap}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-blue-600 hover:border-blue-500 mx-auto"
            title="Swap colors"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          {colorField('Background color', bg, setBg)}
        </div>
      </div>

      {result ? (
        <>
          {/* Preview + ratio */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-center gap-2 min-h-[140px]"
              style={{ backgroundColor: normalizeHex(bg), color: normalizeHex(fg) }}
            >
              <span className="text-lg font-bold">Large text sample</span>
              <span className="text-sm">The quick brown fox jumps over the lazy dog.</span>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> Contrast ratio
              </span>
              <span className="text-5xl font-black text-gray-900 dark:text-white mt-1 tabular-nums">
                {result.ratio.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400">:1</span>
            </div>
          </div>

          {/* WCAG grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Badge pass={result.aaNormal} label="AA — Normal text (≥ 4.5)" />
            <Badge pass={result.aaLarge} label="AA — Large text (≥ 3)" />
            <Badge pass={result.aaaNormal} label="AAA — Normal text (≥ 7)" />
            <Badge pass={result.aaaLarge} label="AAA — Large text (≥ 4.5)" />
          </div>
          <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
            &ldquo;Large text&rdquo; means ≥ 18.66px bold or ≥ 24px regular. Ratios follow WCAG 2.1 relative-luminance math.
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-8 text-center text-sm text-gray-400">
          Enter two valid hex colors (e.g. #1f2937 and #ffffff).
        </div>
      )}
    </div>
  );
}
