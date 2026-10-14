'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Type,
  Layers,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

const MINOR_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
  'as', 'at', 'by', 'for', 'in', 'of', 'on', 'per', 'to', 'with', 'from',
]);

const ACRONYMS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  apis: 'APIs',
  ui: 'UI',
  ux: 'UX',
  css: 'CSS',
  html: 'HTML',
  js: 'JS',
  ts: 'TS',
  seo: 'SEO',
  url: 'URL',
  urls: 'URLs',
  id: 'ID',
  ids: 'IDs',
  crm: 'CRM',
  sdk: 'SDK',
  sdks: 'SDKs',
  saas: 'SaaS',
  sql: 'SQL',
  llm: 'LLM',
  llms: 'LLMs',
  faq: 'FAQ',
  faqs: 'FAQs',
  roi: 'ROI',
  kpi: 'KPI',
  kpis: 'KPIs',
  cta: 'CTA',
  ctas: 'CTAs',
  pr: 'PR',
  prs: 'PRs',
};

// Normalize slug into clean array of words
function splitSlug(input: string): string[] {
  if (!input) return [];

  // Remove file extension if present (e.g. .tsx, .html, .md)
  let clean = input.replace(/\.[a-zA-Z0-9]+$/, '');

  // Handle camelCase separation (e.g. "gettingStarted" -> "getting Started")
  clean = clean.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Replace hyphens, underscores, dots, and slashes with spaces
  clean = clean.replace(/[-_./]+/g, ' ');

  return clean
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toApTitleCase(words: string[]): string {
  if (words.length === 0) return '';

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();

      // Check known acronyms
      if (ACRONYMS[lower]) return ACRONYMS[lower];

      // Always capitalize first and last word
      if (idx === 0 || idx === words.length - 1) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      // Check if word has 4+ letters (AP rules capitalize prepositions of 4+ letters like "with", "from", "into")
      if (lower.length >= 4) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      // Minor words remain lowercase
      if (MINOR_WORDS.has(lower)) {
        return lower;
      }

      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function toChicagoTitleCase(words: string[]): string {
  if (words.length === 0) return '';

  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];

      if (idx === 0 || idx === words.length - 1) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }

      if (MINOR_WORDS.has(lower)) {
        return lower;
      }

      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function toSentenceCase(words: string[]): string {
  if (words.length === 0) return '';
  const text = words
    .map((w) => {
      const lower = w.toLowerCase();
      return ACRONYMS[lower] || lower;
    })
    .join(' ');

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toStartCase(words: string[]): string {
  if (words.length === 0) return '';
  return words
    .map((w) => {
      const lower = w.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

export default function SlugToTitleConverter() {
  const [inputSlug, setInputSlug] = useState('how-to-build-ai-agents-with-nextjs');
  const [isBatch, setIsBatch] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const presets = [
    'how-to-build-ai-agents-with-nextjs',
    'user_profile_settings_controller',
    '10-best-open-source-llm-models-in-2026',
    'gettingStartedWithReactAndTailwindCss',
  ];

  const words = splitSlug(inputSlug);

  const formats = [
    {
      key: 'ap',
      label: 'AP Title Case (Associated Press)',
      description: 'Standard journalistic style; prepositions under 4 letters are lowercase.',
      value: toApTitleCase(words),
    },
    {
      key: 'chicago',
      label: 'Chicago Manual of Style',
      description: 'Book and academic standard style for headlines and titles.',
      value: toChicagoTitleCase(words),
    },
    {
      key: 'sentence',
      label: 'Sentence Case',
      description: 'Only the first word and recognized acronyms are capitalized.',
      value: toSentenceCase(words),
    },
    {
      key: 'start',
      label: 'Start Case (Capitalize Every Word)',
      description: 'Every single word begins with a capital letter.',
      value: toStartCase(words),
    },
    {
      key: 'upper',
      label: 'ALL UPPERCASE',
      description: 'High-impact full capital letters.',
      value: words.map((w) => w.toUpperCase()).join(' '),
    },
  ];

  // Batch calculations
  const batchLines = inputSlug.split('\n').filter((l) => l.trim().length > 0);
  const batchOutputs = batchLines.map((line) => {
    const lineWords = splitSlug(line);
    return {
      original: line,
      title: toApTitleCase(lineWords),
    };
  });

  const copyValue = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllBatch = () => {
    const all = batchOutputs.map((b) => b.title).join('\n');
    navigator.clipboard.writeText(all);
    setCopiedKey('batch');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Preset Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Sample Slug Formats:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputSlug(p);
                setIsBatch(false);
              }}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-mono text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {isBatch ? 'Enter multiple slugs (one per line):' : 'Enter URL slug, snake_case, or camelCase string:'}
          </label>

          <button
            type="button"
            onClick={() => setIsBatch(!isBatch)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isBatch ? 'Switch to Single Mode' : 'Switch to Bulk Batch Mode'}
          </button>
        </div>

        {isBatch ? (
          <textarea
            value={inputSlug}
            onChange={(e) => setInputSlug(e.target.value)}
            placeholder="slug-one-example&#10;another_snake_case_example&#10;thirdCamelCaseExample"
            rows={5}
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />
        ) : (
          <input
            type="text"
            value={inputSlug}
            onChange={(e) => setInputSlug(e.target.value)}
            placeholder="e.g. how-to-build-ai-agents-with-nextjs"
            className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Results View */}
      {isBatch ? (
        /* Batch Output List */
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-gray-900 dark:text-gray-100">
              Bulk Converted Titles ({batchOutputs.length})
            </h3>

            <button
              onClick={copyAllBatch}
              disabled={batchOutputs.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50"
            >
              {copiedKey === 'batch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'batch' ? 'All Copied' : 'Copy All Titles'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {batchOutputs.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100 block">
                    {item.title}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.original}
                  </span>
                </div>

                <button
                  onClick={() => copyValue(`b-${idx}`, item.title)}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 text-gray-500 transition-colors shrink-0"
                  title="Copy Title"
                >
                  {copiedKey === `b-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Single Mode Formats Grid */
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-gray-900 dark:text-gray-100">
              Generated Title Variations
            </h3>
            <span className="text-xs text-gray-400 font-mono">
              {words.length} words detected
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {formats.map((fmt) => (
              <div
                key={fmt.key}
                className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:border-blue-400 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-blue-600 dark:text-blue-400 block">
                      {fmt.label}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {fmt.description}
                    </span>
                  </div>

                  <button
                    onClick={() => copyValue(fmt.key, fmt.value)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors shadow-xs"
                  >
                    {copiedKey === fmt.key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === fmt.key ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 font-medium text-base text-gray-900 dark:text-gray-100 select-all">
                  {fmt.value || <span className="text-gray-400 italic">Enter a slug to preview title</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
