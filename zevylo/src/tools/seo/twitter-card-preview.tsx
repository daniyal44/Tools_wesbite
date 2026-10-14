'use client';

import React, { useState } from 'react';
import { Copy, Check, Code, Sun, Moon } from 'lucide-react';

export default function TwitterCardPreview() {
  const [cardType, setCardType] = useState<'summary_large_image' | 'summary'>('summary_large_image');
  const [title, setTitle] = useState<string>('Zevylo - 85+ Free Privacy-First Browser Tools');
  const [description, setDescription] = useState<string>('Supercharge your productivity with client-side calculators, converters, image optimizers, and developer utilities.');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [siteHandle, setSiteHandle] = useState<string>('@zevylo');
  const [domain, setDomain] = useState<string>('zevylo.com');
  const [mockTheme, setMockTheme] = useState<'dark' | 'light'>('dark');
  const [copied, setCopied] = useState<boolean>(false);

  const generateMetaTags = (): string => {
    return `<!-- Twitter / X Card Meta Tags -->
<meta name="twitter:card" content="${cardType}" />
<meta name="twitter:site" content="${siteHandle}" />
<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
<meta name="twitter:image" content="${imageUrl}" />`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Twitter / X Card Details
            </h3>
            <p className="text-xs text-gray-400">
              Configure parameters to simulate social sharing
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCardType('summary_large_image')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                cardType === 'summary_large_image'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Large Image Card
            </button>
            <button
              onClick={() => setCardType('summary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                cardType === 'summary'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Summary Card
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
            Card Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
            Card Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Website Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Twitter Handle
            </label>
            <input
              type="text"
              value={siteHandle}
              onChange={(e) => setSiteHandle(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Twitter Feed Simulation Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Twitter / X Feed Simulation
          </span>
          <button
            onClick={() => setMockTheme(mockTheme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300"
          >
            {mockTheme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            {mockTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>

        {/* The Tweet Card */}
        <div
          className={`max-w-lg mx-auto rounded-2xl border p-4 shadow-md transition-colors ${
            mockTheme === 'dark'
              ? 'bg-black text-white border-zinc-800'
              : 'bg-white text-black border-zinc-200'
          }`}
        >
          {/* Post Author */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
              Z
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">Zevylo Platform</div>
              <div className="text-xs text-zinc-500">{siteHandle} · Just now</div>
            </div>
          </div>

          <p className="text-xs mb-3 leading-relaxed">
            Check out the latest suite of free privacy-focused web tools and utilities! 🚀
          </p>

          {/* Card Box Preview */}
          <div
            className={`rounded-2xl overflow-hidden border cursor-pointer ${
              mockTheme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'
            }`}
          >
            {cardType === 'summary_large_image' ? (
              <div>
                <div className="h-52 w-full overflow-hidden bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Card Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[11px] text-zinc-500 block">{domain}</span>
                  <div className="font-bold text-xs truncate mt-0.5">{title}</div>
                  <div className="text-[11px] text-zinc-500 line-clamp-2 mt-0.5">{description}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-32 h-32 shrink-0 bg-zinc-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Card Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 min-w-0">
                  <span className="text-[10px] text-zinc-500 block">{domain}</span>
                  <div className="font-bold text-xs truncate mt-0.5">{title}</div>
                  <div className="text-[11px] text-zinc-500 line-clamp-2 mt-0.5">{description}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta Tag Code Output */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Code className="h-4 w-4 text-blue-500" /> HTML Header Meta Tags
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Tags' : 'Copy HTML Tags'}
          </button>
        </div>

        <pre className="w-full p-3.5 rounded-xl bg-gray-950 text-blue-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
          {generateMetaTags()}
        </pre>
      </div>
    </div>
  );
}
