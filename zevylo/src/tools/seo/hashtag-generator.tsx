'use client';

import React, { useState, useMemo } from 'react';
import { Hash, Copy, Check, Sparkles, Plus, Trash2 } from 'lucide-react';

interface NicheTagGroup {
  category: string;
  tags: string[];
}

const NICHE_TAGS: NicheTagGroup[] = [
  {
    category: 'Technology & AI',
    tags: [
      '#tech', '#artificialintelligence', '#ai', '#machinelearning', '#coding',
      '#softwaredevelopment', '#futuretech', '#innovation', '#developer', '#webdevelopment',
      '#programming', '#chatgpt', '#automation', '#data', '#cloud',
    ],
  },
  {
    category: 'Digital Marketing & SEO',
    tags: [
      '#digitalmarketing', '#seo', '#searchengineoptimization', '#contentcreator',
      '#socialmediamarketing', '#marketingstrategy', '#growthhacking', '#branding',
      '#digitalstrategy', '#onlinebusiness', '#ecommerce', '#copywriting',
    ],
  },
  {
    category: 'Web Design & Creative',
    tags: [
      '#webdesign', '#uiux', '#graphicdesign', '#designer', '#uxdesign', '#creatives',
      '#figma', '#minimalism', '#visualidentity', '#typography', '#designinspiration',
    ],
  },
  {
    category: 'Fitness & Health',
    tags: [
      '#fitness', '#gym', '#workout', '#fitnessmotivation', '#healthyfood', '#wellness',
      '#fitlife', '#bodybuilding', '#cardio', '#strengthtraining', '#personaltrainer',
    ],
  },
  {
    category: 'Travel & Photography',
    tags: [
      '#travelphotography', '#wanderlust', '#travelgram', '#naturelovers', '#adventure',
      '#exploretheworld', '#landscapephotography', '#photographer', '#beautifuldestinations',
    ],
  },
  {
    category: 'Startup & Business',
    tags: [
      '#startuplife', '#entrepreneur', '#businessowner', '#smallbusiness', '#hustle',
      '#successmindset', '#leadership', '#founder', '#productivity', '#saas',
    ],
  },
];

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '#tech', '#developer', '#innovation', '#ai', '#digitalmarketing', '#seo',
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const [separator, setSeparator] = useState<'space' | 'comma' | 'newline'>('space');

  const generatedFromKeyword = useMemo(() => {
    if (!keyword.trim()) return [];
    const clean = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!clean) return [];
    return [
      `#${clean}`,
      `#${clean}tips`,
      `#${clean}life`,
      `#${clean}daily`,
      `#${clean}community`,
      `#${clean}trends`,
      `#${clean}expert`,
      `#${clean}love`,
      `#best${clean}`,
      `#learn${clean}`,
    ];
  }, [keyword]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 30) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        alert('Instagram limit of 30 hashtags reached!');
      }
    }
  };

  const handleCopy = () => {
    if (selectedTags.length === 0) return;
    let formatted = '';
    if (separator === 'space') formatted = selectedTags.join(' ');
    else if (separator === 'comma') formatted = selectedTags.join(', ');
    else formatted = selectedTags.join('\n');

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <div className="space-y-8">
      {/* Search / Keyword Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <label htmlFor="topic-keyword-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Target Niche or Keyword
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
            <input
              id="topic-keyword-input"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. coding, marketing, crypto, coffee..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Dynamic variations generated from keyword */}
        {generatedFromKeyword.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" /> Variations for &quot;#{keyword}&quot;:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {generatedFromKeyword.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <Plus className="h-3 w-3" /> {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Hashtags Tray */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Selected Hashtags ({selectedTags.length}/30 Instagram limit)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as 'space' | 'comma' | 'newline')}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              <option value="space">Space Separated</option>
              <option value="comma">Comma Separated</option>
              <option value="newline">New Line</option>
            </select>

            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500"
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={handleCopy}
              disabled={selectedTags.length === 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm disabled:opacity-50"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy All'}
            </button>
          </div>
        </div>

        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                onClick={() => toggleTag(tag)}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-semibold cursor-pointer hover:bg-red-600 transition-colors"
                title="Click to remove"
              >
                {tag} <span className="text-[10px] opacity-75">×</span>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-gray-400">
            Click on any tags below to build your curated hashtag collection.
          </div>
        )}
      </div>

      {/* Curated Niche Categories */}
      <div className="space-y-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Trending Niche Collections
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {NICHE_TAGS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
            >
              <div className="font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
