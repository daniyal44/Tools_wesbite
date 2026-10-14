'use client';

import React, { useState, useMemo } from 'react';
import { Binary, Copy, Check, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

function parseBig(raw: string, base: number): bigint | null {
  let str = raw.trim().toLowerCase().replace(/[\s_,]/g, '');
  if (!str) return null;
  let neg = false;
  if (str[0] === '-') {
    neg = true;
    str = str.slice(1);
  }
  // Allow conventional prefixes (0x, 0b, 0o) when they match the base.
  if (base === 16 && str.startsWith('0x')) str = str.slice(2);
  else if (base === 2 && str.startsWith('0b')) str = str.slice(2);
  else if (base === 8 && str.startsWith('0o')) str = str.slice(2);
  if (!str) return null;

  const b = BigInt(base);
  let val = BigInt(0);
  for (const ch of str) {
    const d = DIGITS.indexOf(ch);
    if (d < 0 || d >= base) return null;
    val = val * b + BigInt(d);
  }
  return neg ? -val : val;
}

function toBase(value: bigint, base: number): string {
  if (value === BigInt(0)) return '0';
  let neg = false;
  let v = value;
  if (v < BigInt(0)) {
    neg = true;
    v = -v;
  }
  const b = BigInt(base);
  let out = '';
  while (v > BigInt(0)) {
    out = DIGITS[Number(v % b)] + out;
    v = v / b;
  }
  return (neg ? '-' : '') + out;
}

const BASES: { base: number; name: string; prefix: string }[] = [
  { base: 2, name: 'Binary', prefix: '0b' },
  { base: 8, name: 'Octal', prefix: '0o' },
  { base: 10, name: 'Decimal', prefix: '' },
  { base: 16, name: 'Hexadecimal', prefix: '0x' },
];

export default function NumberBaseConverter() {
  const [input, setInput] = useState<string>('255');
  const [fromBase, setFromBase] = useState<number>(10);
  const [copiedBase, setCopiedBase] = useState<number | null>(null);
  const [customBase, setCustomBase] = useState<number>(36);

  const parsed = useMemo(() => parseBig(input, fromBase), [input, fromBase]);
  const isValid = parsed !== null;

  const handleCopy = async (text: string, base: number) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedBase(base);
      setTimeout(() => setCopiedBase(null), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Input Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <Binary className="h-5 w-5 text-blue-600" /> Number Base Converter
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="nbc-input" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Value
            </label>
            <input
              id="nbc-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a number"
              className={`w-full rounded-xl border bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                isValid ? 'border-gray-300 dark:border-gray-700 focus:border-blue-500' : 'border-red-400 dark:border-red-600'
              }`}
            />
          </div>
          <div>
            <label htmlFor="nbc-frombase" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Input Base
            </label>
            <select
              id="nbc-frombase"
              value={fromBase}
              onChange={(e) => setFromBase(parseInt(e.target.value, 10))}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              {BASES.map((b) => (
                <option key={b.base} value={b.base}>
                  Base {b.base} — {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isValid && input.trim() !== '' && (
          <div className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            Invalid digits for base {fromBase}. Allowed: {DIGITS.slice(0, fromBase)}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-3 sm:grid-cols-2">
        {BASES.map((b) => {
          const out = isValid ? toBase(parsed!, b.base) : '—';
          return (
            <div
              key={b.base}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {b.name} <span className="text-gray-400 dark:text-gray-600">(base {b.base})</span>
                </span>
                <button
                  onClick={() => handleCopy(out, b.base)}
                  disabled={!isValid}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
                  title="Copy"
                >
                  {copiedBase === b.base ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <div className="font-mono text-lg font-bold text-gray-900 dark:text-white break-all select-all">
                {out}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom base */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 p-4 flex flex-wrap items-center gap-3">
        <label htmlFor="nbc-custom" className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Custom base
        </label>
        <input
          id="nbc-custom"
          type="number"
          min={2}
          max={36}
          value={customBase}
          onChange={(e) => setCustomBase(Math.max(2, Math.min(36, parseInt(e.target.value, 10) || 2)))}
          className="w-20 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
        />
        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 break-all select-all">
          {isValid ? toBase(parsed!, customBase) : '—'}
        </span>
        {isValid && (
          <button
            onClick={() => handleCopy(toBase(parsed!, customBase), customBase)}
            className="ml-auto text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Copy"
          >
            {copiedBase === customBase ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
