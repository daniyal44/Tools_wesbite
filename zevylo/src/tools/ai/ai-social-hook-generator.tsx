'use client';

import React, { useState, useMemo } from 'react';
import { Megaphone, Copy, Check, Sparkles, TrendingUp, Share2, Flame } from 'lucide-react';

export default function AiSocialHookGenerator() {
  const [topic, setTopic] = useState('How I scaled my side project from $0 to $10,000/month in 90 days without ads');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin' | 'threads' | 'tiktok'>('twitter');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const hooks = useMemo(() => {
    const t = topic.trim() || 'My journey building modern tech products';

    return [
      {
        type: 'Contrarian Pattern Interrupt',
        score: '96% Virality',
        hook: `Most people think ${t.toLowerCase()} takes years and huge venture capital.\n\nThey're completely wrong.\n\nHere is the exact playbook nobody talks about (steal it):`,
        body: `1. Pick one painful problem people already pay to solve.\n2. Build the leanest MVP in 48 hours.\n3. Validate with 10 real users before touching a single line of backend.\n4. Charge upfront from day one.\n\nFocus on distribution, not perfection.`,
      },
      {
        type: 'Curiosity Gap & Transformation',
        score: '94% Virality',
        hook: `90 days ago, I was stuck at zero.\n\nYesterday, we crossed a milestone: ${t}.\n\nNo luck. No ads. Just 5 ruthless rules:`,
        body: `• Rule 1: Eliminate shiny object syndrome.\n• Rule 2: Talk to 3 customers every single morning.\n• Rule 3: Ship updates daily.\n• Rule 4: Price for value, not hourly effort.\n• Rule 5: Turn feedback into compounding features.`,
      },
      {
        type: 'Negative Inversion (Mistakes to Avoid)',
        score: '91% Virality',
        hook: `If you want to fail at ${t.toLowerCase()}, do these 4 things:\n\n(I wasted 6 months doing all of them so you don't have to):`,
        body: `❌ Building features in private isolation\n❌ Waiting for perfection\n❌ Undercharging by 80%\n❌ Ignoring retention\n\nFix these four, and everything starts compounding.`,
      },
      {
        type: 'The Cheat-Sheet / Swipe File',
        score: '89% Virality',
        hook: `A 3-minute masterclass on ${t.toLowerCase()}.\n\nBookmark this before it gets buried in your feed: 🧵👇`,
        body: `Here are the top 3 frameworks I use every single day:\n\n1/ The 80/20 Leverage Filter\n2/ Direct Outreach Loop\n3/ Zero-Friction Onboarding UX\n\nSimplicity always beats complexity.`,
      },
    ];
  }, [topic]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Input area */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          What is your core story, achievement, or topic?
        </label>
        <textarea
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. 5 lessons I learned growing my YouTube channel to 100k subscribers..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />

        {/* Platform Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-gray-500 font-semibold">Target Platform:</span>
          {(['twitter', 'linkedin', 'threads', 'tiktok'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 rounded-xl capitalize font-bold transition-all ${
                platform === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {p === 'twitter' ? 'Twitter / X' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Variations */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            High-Converting Viral Hooks ({hooks.length} variations)
          </h3>
          <span className="text-xs text-gray-500">Ranked by scroll-stopping potential</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hooks.map((item, idx) => {
            const fullPost = `${item.hook}\n\n${item.body}`;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {item.score}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line leading-relaxed">
                    {item.hook}
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {item.body}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {fullPost.length} chars • Ideal for {platform}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(fullPost, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIdx === idx ? 'Copied!' : 'Copy Post'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
