'use client';

import React, { useState, useMemo } from 'react';
import { Video, Copy, Check, Hash, Type, FileText } from 'lucide-react';

export default function YoutubeTagGenerator() {
  const [topic, setTopic] = useState<string>('How to learn Next.js in 2026');
  const [targetAudience, setTargetAudience] = useState<string>('Beginner web developers');
  const [niche, setNiche] = useState<string>('Tech & Coding');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const results = useMemo(() => {
    const cleanTopic = topic.trim() || 'Video Topic';
    const words = cleanTopic.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
    const mainKeyword = words.slice(0, 3).join(' ') || cleanTopic;

    // Generated Titles
    const titles = [
      `I Tested ${cleanTopic} for 30 Days (Here's What Happened)`,
      `${cleanTopic}: The Complete Beginner Guide (2026)`,
      `Stop Making This Mistake With ${cleanTopic}!`,
      `How to Master ${cleanTopic} in Under 20 Minutes`,
      `The Secret to ${cleanTopic} Nobody Talks About`,
    ];

    // Generated Tags
    const baseTags = [
      cleanTopic.toLowerCase(),
      mainKeyword,
      `${mainKeyword} tutorial`,
      `${mainKeyword} guide 2026`,
      `learn ${mainKeyword}`,
      `${mainKeyword} tips`,
      `${niche.toLowerCase()}`,
      `${targetAudience.toLowerCase()}`,
      `best ${mainKeyword}`,
      `${mainKeyword} explained`,
      `${mainKeyword} for beginners`,
      `how to ${mainKeyword}`,
      `free ${mainKeyword} course`,
    ];
    // Deduplicate and filter length
    const uniqueTags = Array.from(new Set(baseTags));
    const commaTags = uniqueTags.join(', ');
    const tagLength = commaTags.length;

    // Generated Hashtags
    const hashtags = [
      `#${words.join('')}`,
      `#${words[0] || 'video'}`,
      `#${niche.replace(/[^a-zA-Z0-9]/g, '')}`,
      `#Tutorial`,
      `#Trending`,
      `#2026`,
    ].filter(h => h.length > 2);

    // Generated Description Template
    const description = `🚀 In this video, we break down everything you need to know about ${cleanTopic}! Whether you are just getting started or looking to level up your skills, this guide will walk you through actionable steps.

⏱️ TIMESTAMPS:
00:00 - Introduction & Overview
01:30 - The Foundation of ${mainKeyword}
04:45 - Step-by-Step Walkthrough
08:20 - Common Pitfalls to Avoid
11:50 - Final Tips & Key Takeaways

📌 RESOURCES & LINKS:
• Official Website / Reference: [Insert Link]
• Recommended Tools: [Insert Link]
• Join our Community: [Insert Link]

💡 If you found this video helpful, make sure to LIKE, COMMENT, and SUBSCRIBE for more weekly updates on ${niche}!

${hashtags.join(' ')}`;

    return {
      titles,
      tags: commaTags,
      tagCount: uniqueTags.length,
      tagLength,
      hashtags: hashtags.join(' '),
      description,
    };
  }, [topic, targetAudience, niche]);

  return (
    <div className="space-y-8">
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Video Topic / Core Keyword
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How to train for a marathon"
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Target Audience
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. Beginners, Freelancers"
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Niche / Category
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Fitness, Tech, Gaming"
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* High-CTR Titles */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">5 High-CTR Title Formulas</h2>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Optimized for YouTube Mobile Feed</span>
        </div>

        <div className="space-y-2.5">
          {results.titles.map((title, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-400/10">
                  #{idx + 1}
                </span>
                <span className="text-sm text-gray-800 dark:text-zinc-200">{title}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">({title.length} chars)</span>
              </div>
              <button
                onClick={() => copyToClipboard(`title-${idx}`, title)}
                className="shrink-0 p-2 rounded-lg bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white transition-colors"
                title="Copy title"
              >
                {copiedKey === `title-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Tags */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Ranking YouTube Tags (Metadata)</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {results.tagCount} tags | {results.tagLength} / 500 chars
            </span>
            <button
              onClick={() => copyToClipboard('tags', results.tags)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-semibold transition-colors"
            >
              {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              Copy All Tags
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 font-mono break-all leading-relaxed">
          {results.tags}
        </div>
      </div>

      {/* Viral Hashtags */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Viral Hashtags (#Shorts & Community)</h2>
          </div>
          <button
            onClick={() => copyToClipboard('hashtags', results.hashtags)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-xs font-semibold transition-colors"
          >
            {copiedKey === 'hashtags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Hashtags
          </button>
        </div>

        <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-sm text-sky-300 font-mono">
          {results.hashtags}
        </div>
      </div>

      {/* Video Description Blueprint */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">SEO Video Description Blueprint</h2>
          </div>
          <button
            onClick={() => copyToClipboard('description', results.description)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold transition-colors"
          >
            {copiedKey === 'description' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Description
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {results.description}
        </pre>
      </div>
    </div>
  );
}
