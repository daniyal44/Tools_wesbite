'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ShieldCheck, Trash2 } from 'lucide-react';

const TRACKING_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid', 'mc_eid', 'mc_cid',
  'igshid', 'ref', 'ref_src', 'ref_url', '_hsenc', '_hsmi', 'si', 'spm',
  'wickedid', 'mkt_tok', 'yclid', 'zanpid', 'aff_id', 'affiliate_id',
]);

export default function UrlCleaner() {
  const [inputUrl, setInputUrl] = useState<string>(
    'https://example.com/product/123?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale&fbclid=IwAR3Xyz123456789&color=blue&size=medium'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const cleanResult = useMemo(() => {
    if (!inputUrl.trim()) {
      return { cleanUrl: '', removedParams: [], charsSaved: 0 };
    }

    try {
      const parsed = new URL(inputUrl.trim());
      const removed: string[] = [];
      const newParams = new URLSearchParams();

      parsed.searchParams.forEach((val, key) => {
        if (TRACKING_PARAMS.has(key.toLowerCase()) || key.toLowerCase().startsWith('utm_')) {
          removed.push(key);
        } else {
          newParams.append(key, val);
        }
      });

      parsed.search = newParams.toString();
      const clean = parsed.toString();
      const saved = inputUrl.trim().length - clean.length;

      return {
        cleanUrl: clean,
        removedParams: removed,
        charsSaved: Math.max(0, saved),
      };
    } catch {
      return { cleanUrl: inputUrl, removedParams: [], charsSaved: 0 };
    }
  }, [inputUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanResult.cleanUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Input Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Paste URL with Tracking Parameters
          </label>
          {inputUrl && (
            <button
              onClick={() => setInputUrl('')}
              className="text-xs text-rose-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        <textarea
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste URL here (e.g. https://domain.com?utm_source=...&fbclid=...)"
          rows={3}
          className="w-full text-xs font-mono rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none leading-relaxed"
        />

        <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
          <span>
            Removed Trackers: <strong className="text-blue-600 dark:text-blue-400 font-bold">{cleanResult.removedParams.length}</strong>
          </span>
          <span>
            Length Reduced: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{cleanResult.charsSaved} characters</strong>
          </span>
        </div>
      </div>

      {/* Output Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Sanitized Clean URL
          </label>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied URL!' : 'Copy Clean URL'}
          </button>
        </div>

        <div className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono text-gray-900 dark:text-white break-all leading-relaxed select-all">
          {cleanResult.cleanUrl || <span className="text-gray-400 italic">Sanitized link will appear here...</span>}
        </div>

        {/* Removed Trackers List */}
        {cleanResult.removedParams.length > 0 && (
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Stripped Tracking Parameters
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cleanResult.removedParams.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-mono font-medium border border-rose-200 dark:border-rose-900"
                >
                  ✕ {p}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Strips UTM campaigns, Facebook Click IDs, Google Click IDs, and spy tokens while retaining functional parameters like colors, sizes, and timestamps.</span>
        </div>
      </div>
    </div>
  );
}
