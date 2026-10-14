'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Type } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function CssClampGenerator() {
  const [minVp, setMinVp] = useState(320);
  const [maxVp, setMaxVp] = useState(1280);
  const [minF, setMinF] = useState(16);
  const [maxF, setMaxF] = useState(32);
  const [root, setRoot] = useState(16);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!(maxVp > minVp) || minF <= 0 || maxF <= 0 || root <= 0) return null;
    const slope = (maxF - minF) / (maxVp - minVp); // px per px
    const interceptPx = minF - slope * minVp;
    const slopeVw = slope * 100;
    const minRem = Math.min(minF, maxF) / root;
    const maxRem = Math.max(minF, maxF) / root;
    const interceptRem = interceptPx / root;

    const preferred = `${interceptRem.toFixed(3)}rem + ${slopeVw.toFixed(3)}vw`;
    const clamp = `clamp(${minRem.toFixed(3)}rem, ${preferred}, ${maxRem.toFixed(3)}rem)`;
    return { clamp, css: `font-size: ${clamp};` };
  }, [minVp, maxVp, minF, maxF, root]);

  const handleCopy = async () => {
    if (result && (await copyToClipboard(result.css))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const field = (label: string, value: number, onChange: (n: number) => void, suffix = 'px') => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-4 pr-10 py-2.5 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <Type className="h-5 w-5 text-blue-600" /> Fluid Typography (CSS clamp)
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('Min viewport', minVp, setMinVp)}
          {field('Max viewport', maxVp, setMaxVp)}
          {field('Min font size', minF, setMinF)}
          {field('Max font size', maxF, setMaxF)}
        </div>
        <div className="sm:w-1/2">{field('Root font size', root, setRoot)}</div>
      </div>

      {result ? (
        <>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-950 dark:bg-black p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Generated CSS</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code className="block font-mono text-sm text-emerald-300 break-all select-all">{result.css}</code>
          </div>

          {/* Live preview — scales with YOUR current browser width */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
              Live preview (resize your window)
            </span>
            <p style={{ fontSize: result.clamp }} className="font-bold text-gray-900 dark:text-white leading-tight break-words">
              The quick brown fox
            </p>
            <div className="mt-3 flex gap-4 text-[11px] text-gray-400">
              <span>At {minVp}px → {Math.min(minF, maxF)}px</span>
              <span>At {maxVp}px → {Math.max(minF, maxF)}px</span>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-8 text-center text-sm text-gray-400">
          Max viewport must be greater than min viewport, and sizes must be positive.
        </div>
      )}
    </div>
  );
}
