'use client';

import React, { useState, useMemo } from 'react';
import { Search, Globe, AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';

export default function SerpPixelChecker() {
  const [title, setTitle] = useState<string>('Free Online Tools & Converters - 100% Client-Side Privacy | Zevylo');
  const [description, setDescription] = useState<string>('Discover 85+ free web tools for developers, designers, and marketers. Convert images, calculate finances, and edit documents directly in your browser with zero server uploads.');
  const [url, setUrl] = useState<string>('https://zevylo.com/tools');
  const [brandName, setBrandName] = useState<string>('Zevylo Tools');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Measure pixel widths using HTML5 Canvas
  const titlePixelWidth = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    ctx.font = '20px Arial, sans-serif';
    return Math.round(ctx.measureText(title).width);
  }, [title]);

  const descPixelWidth = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    ctx.font = '14px Arial, sans-serif';
    return Math.round(ctx.measureText(description).width);
  }, [description]);

  const maxTitlePixels = 600;
  const isTitleTruncated = titlePixelWidth > maxTitlePixels;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Input Form Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        {/* Title Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              SEO Page Title
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">{title.length} chars</span>
              <span className={`font-bold tabular-nums ${isTitleTruncated ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {titlePixelWidth}px / {maxTitlePixels}px
              </span>
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full text-sm font-medium rounded-xl border p-2.5 outline-none transition-all ${
              isTitleTruncated
                ? 'border-rose-400 dark:border-rose-700 bg-rose-50/20 dark:bg-rose-950/20 text-gray-900 dark:text-white'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            }`}
          />
          {/* Pixel progress bar */}
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
            <div
              style={{ width: `${Math.min(100, (titlePixelWidth / maxTitlePixels) * 100)}%` }}
              className={`h-full transition-all ${
                titlePixelWidth > maxTitlePixels
                  ? 'bg-rose-500'
                  : titlePixelWidth > 540
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Meta Description Snippet
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">{description.length} chars</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300 tabular-nums">
                {descPixelWidth}px / 960px
              </span>
            </div>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none leading-relaxed"
          />
        </div>

        {/* URL & Brand Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Target URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Brand / Site Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Google SERP Live Simulation */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Search className="h-4 w-4 text-blue-500" /> Google Search Result Mockup
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(title, 'title')}
              className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1"
            >
              {copiedKey === 'title' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              Copy Title
            </button>
            <button
              onClick={() => copyToClipboard(description, 'desc')}
              className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1"
            >
              {copiedKey === 'desc' ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              Copy Description
            </button>
          </div>
        </div>

        {/* Google Snippet Container */}
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950 max-w-[650px]">
          {/* Site Attribution Header */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Globe className="h-3 w-3" />
            </div>
            <div className="text-xs leading-none">
              <div className="font-medium text-gray-800 dark:text-gray-200 text-[11px]">{brandName}</div>
              <div className="text-[10px] text-gray-500 truncate">{url}</div>
            </div>
          </div>

          {/* Title Link */}
          <h3 className="text-lg font-normal text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-1 mb-1 font-sans">
            {isTitleTruncated ? `${title.slice(0, 58)}...` : title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2 font-sans">
            {description}
          </p>
        </div>

        {/* Warning / Audit Badge */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {isTitleTruncated ? (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                <strong>Warning:</strong> Title exceeds 600px ({titlePixelWidth}px). Google will truncate the end of your title with ellipses (...).
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                <strong>Optimal Width:</strong> Title fits nicely under the 600px desktop boundary without truncation.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
