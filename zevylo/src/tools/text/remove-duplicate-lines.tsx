'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, ArrowDownUp } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [keep, setKeep] = useState<'first' | 'last'>('first');
  const [sortOutput, setSortOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, inputCount, outputCount } = useMemo(() => {
    const rawLines = input.length ? input.split(/\r?\n/) : [];
    const seen = new Map<string, number>(); // key -> index in result
    const result: string[] = [];

    for (let raw of rawLines) {
      const line = trimLines ? raw.trim() : raw;
      if (removeEmpty && line.trim() === '') continue;
      const key = caseInsensitive ? line.toLowerCase() : line;

      if (!seen.has(key)) {
        seen.set(key, result.length);
        result.push(line);
      } else if (keep === 'last') {
        // Replace the earlier occurrence's value and move it to the end.
        const prevIdx = seen.get(key)!;
        result[prevIdx] = '\u0000__ZEVYLO_REMOVED__';
        seen.set(key, result.length);
        result.push(line);
      }
    }

    let cleaned = result.filter((l) => l !== '\u0000__ZEVYLO_REMOVED__');
    if (sortOutput) {
      cleaned = [...cleaned].sort((a, b) =>
        caseInsensitive ? a.toLowerCase().localeCompare(b.toLowerCase()) : a.localeCompare(b)
      );
    }

    return {
      output: cleaned.join('\n'),
      inputCount: rawLines.length,
      outputCount: cleaned.length,
    };
  }, [input, caseInsensitive, trimLines, removeEmpty, keep, sortOutput]);

  const removedCount = Math.max(0, inputCount - outputCount);

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const toggleClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Options */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm flex flex-wrap items-center gap-2">
        <button onClick={() => setCaseInsensitive((v) => !v)} className={toggleClass(caseInsensitive)}>
          Case-insensitive
        </button>
        <button onClick={() => setTrimLines((v) => !v)} className={toggleClass(trimLines)}>
          Trim whitespace
        </button>
        <button onClick={() => setRemoveEmpty((v) => !v)} className={toggleClass(removeEmpty)}>
          Remove empty lines
        </button>
        <button onClick={() => setSortOutput((v) => !v)} className={toggleClass(sortOutput)}>
          <ArrowDownUp className="inline h-3.5 w-3.5 mr-1" />
          Sort A→Z
        </button>
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ml-auto">
          <button
            onClick={() => setKeep('first')}
            className={`px-3 py-1.5 text-xs font-semibold ${keep === 'first' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            Keep first
          </button>
          <button
            onClick={() => setKeep('last')}
            className={`px-3 py-1.5 text-xs font-semibold ${keep === 'last' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            Keep last
          </button>
        </div>
      </div>

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Input ({inputCount.toLocaleString()} lines)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            placeholder="Paste your list here, one item per line..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Output ({outputCount.toLocaleString()} unique)
            </label>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Trash2 className="h-3.5 w-3.5" /> {removedCount.toLocaleString()} removed
              </span>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
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
