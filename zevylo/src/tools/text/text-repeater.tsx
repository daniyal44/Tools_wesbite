'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function TextRepeater() {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState<'newline' | 'space' | 'comma' | 'none' | 'custom'>('newline');
  const [customSep, setCustomSep] = useState('');
  const [addNumbers, setAddNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const sepValue = useMemo(() => {
    switch (separator) {
      case 'newline': return '\n';
      case 'space': return ' ';
      case 'comma': return ', ';
      case 'none': return '';
      case 'custom': return customSep;
    }
  }, [separator, customSep]);

  const output = useMemo(() => {
    const n = Math.max(0, Math.min(100000, Math.floor(count) || 0));
    if (!input || n === 0) return '';
    const parts: string[] = [];
    for (let i = 0; i < n; i++) {
      parts.push(addNumbers ? `${i + 1}. ${input}` : input);
    }
    return parts.join(sepValue);
  }, [input, count, sepValue, addNumbers]);

  const stats = useMemo(() => ({
    chars: output.length,
    words: output.trim() ? output.trim().split(/\s+/).length : 0,
  }), [output]);

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const sepBtn = (val: typeof separator, label: string) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      separator === val
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Number of repeats
            </label>
            <input
              type="number"
              min={1}
              max={100000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setAddNumbers((v) => !v)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                addNumbers
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Number each line (1. 2. 3.)
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Separator between repeats
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setSeparator('newline')} className={sepBtn('newline', 'New line')}>New line</button>
            <button onClick={() => setSeparator('space')} className={sepBtn('space', 'Space')}>Space</button>
            <button onClick={() => setSeparator('comma')} className={sepBtn('comma', 'Comma')}>Comma</button>
            <button onClick={() => setSeparator('none')} className={sepBtn('none', 'None')}>None</button>
            <button onClick={() => setSeparator('custom')} className={sepBtn('custom', 'Custom')}>Custom</button>
            {separator === 'custom' && (
              <input
                type="text"
                value={customSep}
                onChange={(e) => setCustomSep(e.target.value)}
                placeholder="e.g. | or ---"
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Text to repeat</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            placeholder="Type or paste the text you want to repeat..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Result ({stats.chars.toLocaleString()} chars, {stats.words.toLocaleString()} words)
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
            rows={14}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-950 p-4 text-sm text-gray-900 dark:text-white focus:outline-none resize-y select-all"
          />
        </div>
      </div>
    </div>
  );
}
