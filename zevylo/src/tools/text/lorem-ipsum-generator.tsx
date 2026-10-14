'use client';

import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, Download, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const WORDS_POOL = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum', 'at', 'vero', 'eos', 'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus',
  'blanditiis', 'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores', 'quas',
  'molestias', 'excepturi', 'sint', 'occaecati', 'cupiditate', 'provident', 'similique', 'mollitia', 'animi',
];

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [wrapHtml, setWrapHtml] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [copied, setCopied] = useState(false);

  let seedCounter = refreshTrigger * 1000;
  const nextRandom = () => {
    seedCounter++;
    const x = Math.sin(seedCounter) * 10000;
    return x - Math.floor(x);
  };

  const generateSentence = (isFirst = false) => {
    const len = Math.floor(nextRandom() * 8) + 8; // 8-15 words
    const words: string[] = [];

    if (isFirst && startWithLorem) {
      words.push('lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit.');
      return words.join(' ');
    }

    for (let i = 0; i < len; i++) {
      const w = WORDS_POOL[Math.floor(nextRandom() * WORDS_POOL.length)];
      words.push(w);
    }
    const cap = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    words[0] = cap;
    return words.join(' ') + '.';
  };

  const output = useMemo(() => {
    // depend on refreshTrigger
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    refreshTrigger;

    if (type === 'words') {
      const words: string[] = [];
      if (startWithLorem && count >= 5) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
        for (let i = 5; i < count; i++) {
          words.push(WORDS_POOL[Math.floor(nextRandom() * WORDS_POOL.length)]);
        }
      } else {
        for (let i = 0; i < count; i++) {
          words.push(WORDS_POOL[Math.floor(nextRandom() * WORDS_POOL.length)]);
        }
        if (words.length > 0) {
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
      }
      const raw = words.join(' ');
      return wrapHtml ? `<p>${raw}</p>` : raw;
    }

    if (type === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(i === 0));
      }
      const raw = sentences.join(' ');
      return wrapHtml ? `<p>${raw}</p>` : raw;
    }

    // Paragraphs
    const paras: string[] = [];
    for (let p = 0; p < count; p++) {
      const numSentences = Math.floor(nextRandom() * 3) + 4; // 4-6 sentences
      const sentences: string[] = [];
      for (let s = 0; s < numSentences; s++) {
        sentences.push(generateSentence(p === 0 && s === 0));
      }
      const pText = sentences.join(' ');
      paras.push(wrapHtml ? `<p>${pText}</p>` : pText);
    }

    return paras.join('\n\n');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, count, startWithLorem, wrapHtml, refreshTrigger]);

  const handleCopy = async () => {
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lorem-ipsum-${count}-${type}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Type Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-full sm:w-auto">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  if (t === 'words' && count < 10) setCount(50);
                  if (t === 'paragraphs' && count > 10) setCount(3);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  type === t
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Quantity: {count}
            </span>
            <input
              type="range"
              min="1"
              max={type === 'words' ? 200 : 15}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10))}
              className="w-36 accent-blue-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 gap-4 text-xs font-medium">
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              Start with &quot;Lorem ipsum dolor sit amet...&quot;
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              Wrap in HTML &lt;p&gt; tags
            </label>
          </div>

          <button
            onClick={() => setRefreshTrigger((p) => p + 1)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
            <FileText className="w-4 h-4 text-blue-600" />
            Generated Placeholder Text ({output.split(/\s+/).filter(Boolean).length} words)
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
            >
              <Download className="w-3.5 h-3.5" />
              Download .txt
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950/60 font-serif text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto">
          {output}
        </div>
      </div>
    </div>
  );
}
