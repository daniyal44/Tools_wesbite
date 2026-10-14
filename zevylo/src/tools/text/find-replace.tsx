'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Replace, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function FindReplace() {
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copied, setCopied] = useState(false);

  const { output, count, error } = useMemo(() => {
    if (!find) return { output: input, count: 0, error: null as string | null };
    try {
      let pattern = useRegex ? find : escapeRegExp(find);
      if (wholeWord) pattern = `\\b(?:${pattern})\\b`;
      const flags = caseSensitive ? 'g' : 'gi';
      const re = new RegExp(pattern, flags);

      const matches = (input.match(re) || []).length;

      const out = input.replace(re, () => replace);
      return { output: out, count: matches, error: null };
    } catch (e) {
      return { output: input, count: 0, error: e instanceof Error ? e.message : 'Invalid pattern.' };
    }
  }, [input, find, replace, caseSensitive, wholeWord, useRegex]);

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
      {/* Find / Replace controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="fr-find" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Find {useRegex && <span className="text-blue-500 normal-case">(regex)</span>}
            </label>
            <input
              id="fr-find"
              type="text"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder={useRegex ? 'e.g. \\d+' : 'Text to find'}
              className={`w-full rounded-xl border bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                error ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
              }`}
            />
          </div>
          <div>
            <label htmlFor="fr-replace" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Replace with
            </label>
            <input
              id="fr-replace"
              type="text"
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Replacement text (leave empty to delete)"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setCaseSensitive((v) => !v)} className={toggleClass(caseSensitive)}>Case-sensitive</button>
          <button onClick={() => setWholeWord((v) => !v)} className={toggleClass(wholeWord)}>Whole word</button>
          <button onClick={() => setUseRegex((v) => !v)} className={toggleClass(useRegex)}>Regex</button>
          <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-gray-400">
            {error ? (
              <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                <AlertCircle className="h-3.5 w-3.5" /> {error}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Replace className="h-3.5 w-3.5" /> {count.toLocaleString()} {count === 1 ? 'match' : 'matches'} replaced
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            placeholder="Paste your text here..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Result</label>
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
