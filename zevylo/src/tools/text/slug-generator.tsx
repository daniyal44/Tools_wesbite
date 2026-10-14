'use client';

import React, { useState, useMemo } from 'react';
import { Link2, Copy, Check, RotateCcw, Globe } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const STOPWORDS = new Set([
  'a', 'an', 'and', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'or', 'is', 'it', 'as'
]);

export default function SlugGenerator() {
  const [title, setTitle] = useState('10 Best Free Developer Tools in 2026 for High Productivity & Speed!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [removeStopwords, setRemoveStopwords] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://example.com/blog/');
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    if (!title.trim()) return '';

    let clean = title
      .normalize('NFD') // decompose accented letters
      .replace(/[\u0300-\u036f]/g, '') // remove accent diacritics
      .toLowerCase();

    // Remove stopwords if selected
    if (removeStopwords) {
      clean = clean
        .split(/\s+/)
        .filter((w) => !STOPWORDS.has(w.replace(/[^a-z0-9]/g, '')))
        .join(' ');
    }

    // Replace non-alphanumeric with separator
    return clean
      .replace(/[^a-z0-9]+/g, separator)
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
  }, [title, separator, removeStopwords]);

  const fullUrl = `${baseUrl.replace(/\/+$/, '')}/${slug}`;

  const handleCopy = async () => {
    await copyToClipboard(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Live SERP URL Preview Card */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 p-5 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          Live URL Preview
        </span>
        <div className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100 break-all">
          <span className="text-gray-400">{baseUrl.replace(/\/+$/, '')}/</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{slug || 'your-slug-here'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Title / Headline</span>
            <button
              onClick={() => setTitle('')}
              className="flex items-center gap-1 hover:text-gray-700 text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm font-medium"
            placeholder="Type your title or headline here..."
          />

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Separator:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeparator('-')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${separator === '-' ? 'bg-blue-50 text-blue-600 border-blue-400' : 'text-gray-600'}`}
                >
                  Hyphen (-)
                </button>
                <button
                  onClick={() => setSeparator('_')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${separator === '_' ? 'bg-blue-50 text-blue-600 border-blue-400' : 'text-gray-600'}`}
                >
                  Underscore (_)
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={removeStopwords}
                onChange={(e) => setRemoveStopwords(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              Remove English Stopwords (a, the, in, to, and...)
            </label>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Custom Domain Prefix
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Generated Slug</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Slug'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-base font-bold text-blue-600 dark:text-blue-400 break-all select-all">
            {slug || 'empty'}
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Slug Length:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{slug.length} characters</span>
            </div>
            <div className="flex justify-between">
              <span>Word Count:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                {slug ? slug.split(separator).length : 0} words
              </span>
            </div>
          </div>

          <button
            onClick={async () => {
              await copyToClipboard(fullUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1.5"
          >
            <Link2 className="w-3.5 h-3.5 text-gray-400" />
            Copy Full Permalink URL
          </button>
        </div>
      </div>
    </div>
  );
}
