'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

type SortMode = 'az' | 'za' | 'num-asc' | 'num-desc' | 'len-asc' | 'len-desc' | 'reverse' | 'shuffle';

const MODES: { value: SortMode; label: string }[] = [
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
  { value: 'num-asc', label: 'Numeric ↑' },
  { value: 'num-desc', label: 'Numeric ↓' },
  { value: 'len-asc', label: 'Length ↑' },
  { value: 'len-desc', label: 'Length ↓' },
  { value: 'reverse', label: 'Reverse' },
  { value: 'shuffle', label: 'Shuffle' },
];

export default function TextSorter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<SortMode>('az');
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [removeDupes, setRemoveDupes] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = input.length ? input.split(/\r?\n/) : [];
    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== '');
    if (removeDupes) {
      const seen = new Set<string>();
      lines = lines.filter((l) => {
        const k = caseInsensitive ? l.toLowerCase() : l;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }

    const cmpStr = (a: string, b: string) =>
      caseInsensitive ? a.toLowerCase().localeCompare(b.toLowerCase()) : a.localeCompare(b);
    const num = (s: string) => {
      const m = s.match(/-?\d+(\.\d+)?/);
      return m ? parseFloat(m[0]) : NaN;
    };

    const arr = [...lines];
    switch (mode) {
      case 'az': arr.sort(cmpStr); break;
      case 'za': arr.sort((a, b) => cmpStr(b, a)); break;
      case 'num-asc': arr.sort((a, b) => (num(a) || 0) - (num(b) || 0)); break;
      case 'num-desc': arr.sort((a, b) => (num(b) || 0) - (num(a) || 0)); break;
      case 'len-asc': arr.sort((a, b) => a.length - b.length || cmpStr(a, b)); break;
      case 'len-desc': arr.sort((a, b) => b.length - a.length || cmpStr(a, b)); break;
      case 'reverse': arr.reverse(); break;
      case 'shuffle': {
        // Seeded Fisher–Yates so re-renders are stable until "Shuffle" is pressed again.
        let s = shuffleSeed || 1;
        const rand = () => {
          s = (s * 1103515245 + 12345) & 0x7fffffff;
          return s / 0x7fffffff;
        };
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        break;
      }
    }
    return arr.join('\n');
  }, [input, mode, caseInsensitive, trimLines, removeEmpty, removeDupes, shuffleSeed]);

  const lineCount = output ? output.split('\n').length : 0;

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const setModeMaybeShuffle = (m: SortMode) => {
    setMode(m);
    if (m === 'shuffle') setShuffleSeed(Date.now() & 0x7fffffff);
  };

  const toggleClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setModeMaybeShuffle(m.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                mode === m.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {m.label}
            </button>
          ))}
          {mode === 'shuffle' && (
            <button
              onClick={() => setShuffleSeed(Date.now() & 0x7fffffff)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900"
            >
              Re-shuffle
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-gray-100 dark:border-gray-800 pt-3">
          <button onClick={() => setCaseInsensitive((v) => !v)} className={toggleClass(caseInsensitive)}>Case-insensitive</button>
          <button onClick={() => setTrimLines((v) => !v)} className={toggleClass(trimLines)}>Trim</button>
          <button onClick={() => setRemoveEmpty((v) => !v)} className={toggleClass(removeEmpty)}>Remove empty</button>
          <button onClick={() => setRemoveDupes((v) => !v)} className={toggleClass(removeDupes)}>Remove duplicates</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            placeholder="Paste lines to sort..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Sorted ({lineCount.toLocaleString()} lines)
            </label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={16}
            spellCheck={false}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none resize-y select-all"
          />
        </div>
      </div>
    </div>
  );
}
