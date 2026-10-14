'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Filter, FileText, Trash2, Sparkles } from 'lucide-react';

type ExtractionMode = 'emails' | 'urls' | 'phones' | 'ips' | 'hashtags' | 'mentions' | 'hex' | 'numbers';

const PATTERNS: Record<ExtractionMode, { regex: RegExp; label: string }> = {
  emails: {
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    label: 'Email Addresses',
  },
  urls: {
    regex: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi,
    label: 'URLs / Web Links',
  },
  phones: {
    regex: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    label: 'Phone Numbers',
  },
  ips: {
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    label: 'IPv4 Addresses',
  },
  hashtags: {
    regex: /#\w+/g,
    label: 'Hashtags (#tag)',
  },
  mentions: {
    regex: /@\w+/g,
    label: 'Mentions (@user)',
  },
  hex: {
    regex: /#(?:[0-9a-fA-F]{3}){1,2}\b/g,
    label: 'HEX Color Codes',
  },
  numbers: {
    regex: /\b\d+(?:\.\d+)?\b/g,
    label: 'Numbers & Digits',
  },
};

const SAMPLE_TEXT = `Hello team, please send reports to dev@zevylo.com and copy support@zevylo.tech.
Refer to https://zevylo.com/tools and docs at https://github.com/zevylo for guides.
Contact urgent helpline at +1 (555) 234-5678 or office line 555-876-5432.
Server nodes: Primary IP 192.168.1.1 and gateway 10.0.0.254 are online.
Theme palette updated to primary #3b82f6, background #0f172a, and accent #10b981.
Trending topics: #opensource #productivity #webtools on @zevylo_app!`;

export default function TextExtractor() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [mode, setMode] = useState<ExtractionMode>('emails');
  const [deduplicate, setDeduplicate] = useState<boolean>(true);
  const [sortAlphabetical, setSortAlphabetical] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const extractedList = useMemo(() => {
    if (!text.trim()) return [];
    const config = PATTERNS[mode];
    const matches = text.match(config.regex) || [];

    let result = matches.map((m) => m.trim());
    if (deduplicate) {
      result = Array.from(new Set(result));
    }
    if (sortAlphabetical) {
      result.sort((a, b) => a.localeCompare(b));
    }
    return result;
  }, [text, mode, deduplicate, sortAlphabetical]);

  const handleCopy = () => {
    if (extractedList.length === 0) return;
    navigator.clipboard.writeText(extractedList.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (extractedList.length === 0) return;
    const csvContent = `${PATTERNS[mode].label}\n${extractedList.map((item) => `"${item}"`).join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-${mode}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (extractedList.length === 0) return;
    const jsonStr = JSON.stringify({ type: mode, count: extractedList.length, items: extractedList }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-${mode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Target Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PATTERNS) as ExtractionMode[]).map((key) => {
          const isSelected = mode === key;
          return (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-blue-400'
              }`}
            >
              {PATTERNS[key].label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Input and Extracted Result */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Textarea */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="raw-text-input" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" /> Raw Input Text
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setText(SAMPLE_TEXT)}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Sparkles className="h-3 w-3" /> Load Sample
                </button>
                {text && (
                  <button
                    onClick={() => setText('')}
                    className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline"
                  >
                    <Trash2 className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>
            </div>

            <textarea
              id="raw-text-input"
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste raw text, HTML source, logs, or messy document here..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={deduplicate}
                onChange={(e) => setDeduplicate(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remove Duplicates
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sortAlphabetical}
                onChange={(e) => setSortAlphabetical(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Sort Alphabetically
            </label>
          </div>
        </div>

        {/* Output Results */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Extracted {PATTERNS[mode].label} ({extractedList.length})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  disabled={extractedList.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-50"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={extractedList.length === 0}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-50"
                >
                  <Download className="h-3 w-3" /> CSV
                </button>
                <button
                  onClick={handleExportJSON}
                  disabled={extractedList.length === 0}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-50"
                >
                  <Download className="h-3 w-3" /> JSON
                </button>
              </div>
            </div>

            {extractedList.length > 0 ? (
              <div className="h-80 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 p-3 space-y-1.5">
                {extractedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-900 px-3 py-2 text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 shadow-2xs"
                  >
                    <span className="truncate pr-2">{item}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">#{idx + 1}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-800 text-xs text-gray-400">
                No matching {PATTERNS[mode].label.toLowerCase()} found in the provided text.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-xs text-gray-500">
            <span>Total found: {extractedList.length} items</span>
            <span>100% Client-side privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
