'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface BadgeItem {
  id: string;
  title: string;
  description: string;
  previewType: 'svg' | 'shield' | 'button' | 'html';
  markdownSnippet: string;
  htmlSnippet: string;
}

const badges: BadgeItem[] = [
  {
    id: 'svg-featured',
    title: 'Official "Featured on Zevylo" Vector Badge',
    description: 'Crisp SVG badge ideal for GitHub READMEs, project landing pages, and documentation headers.',
    previewType: 'svg',
    markdownSnippet: '[![Featured on Zevylo](https://zevylo.netlify.app/badge.svg)](https://zevylo.netlify.app)',
    htmlSnippet: '<a href="https://zevylo.netlify.app" target="_blank" rel="noopener"><img src="https://zevylo.netlify.app/badge.svg" alt="Featured on Zevylo" width="180" height="34" /></a>',
  },
  {
    id: 'shield-tools',
    title: 'Shields.io "Free Tools: Zevylo" Badge',
    description: 'Standard flat badge compatible with all open-source developer repositories.',
    previewType: 'shield',
    markdownSnippet: '[![Zevylo Tools](https://img.shields.io/badge/Tools-Zevylo%20(206%2B)-blue?style=flat-square&logo=speedtest)](https://zevylo.netlify.app)',
    htmlSnippet: '<a href="https://zevylo.netlify.app" target="_blank" rel="noopener"><img src="https://img.shields.io/badge/Tools-Zevylo%20(206%2B)-blue?style=flat-square&logo=speedtest" alt="Zevylo Tools" /></a>',
  },
  {
    id: 'shield-ai',
    title: 'Shields.io "Zevylo Global AI Directory" Badge',
    description: 'Badges linking directly to verified global AI directory and architecture benchmarks.',
    previewType: 'shield',
    markdownSnippet: '[![Zevylo AI](https://img.shields.io/badge/AI_Directory-Zevylo%20(286%20Tools)-indigo?style=flat-square&logo=sparkles)](https://zevylo.netlify.app/ai-tools)',
    htmlSnippet: '<a href="https://zevylo.netlify.app/ai-tools" target="_blank" rel="noopener"><img src="https://img.shields.io/badge/AI_Directory-Zevylo%20(286%20Tools)-indigo?style=flat-square&logo=sparkles" alt="Zevylo AI Directory" /></a>',
  },
  {
    id: 'shield-privacy',
    title: 'Shields.io "100% Client-Side Privacy" Badge',
    description: 'Signals zero-server logging and browser-side client execution for sensitive file tools.',
    previewType: 'shield',
    markdownSnippet: '[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Browser--Based-emerald?style=flat-square&logo=shield)](https://zevylo.netlify.app)',
    htmlSnippet: '<a href="https://zevylo.netlify.app" target="_blank" rel="noopener"><img src="https://img.shields.io/badge/Privacy-100%25%20Browser--Based-emerald?style=flat-square&logo=shield" alt="Zevylo Privacy" /></a>',
  },
  {
    id: 'text-citation',
    title: 'Standard Editorial & Blog Backlink',
    description: 'Clean HTML anchor with optimized anchor text for articles, tutorials, and partner resources.',
    previewType: 'html',
    markdownSnippet: '[Zevylo — 206+ Online Utilities & 286 Global AI Tools](https://zevylo.netlify.app)',
    htmlSnippet: '<a href="https://zevylo.netlify.app" title="Zevylo — 206+ Free Online Tools & 286 AI Tools">Zevylo Free Online Tools &amp; AI Directory</a>',
  },
];

export function BadgeCopySection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyMode, setCopyMode] = useState<Record<string, 'md' | 'html'>>({});

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {badges.map((badge) => {
          const mode = copyMode[badge.id] || 'md';
          const currentCode = mode === 'md' ? badge.markdownSnippet : badge.htmlSnippet;

          return (
            <div
              key={badge.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                    {badge.title}
                  </h3>
                  <div className="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 text-[11px] font-semibold">
                    <button
                      onClick={() => setCopyMode((prev) => ({ ...prev, [badge.id]: 'md' }))}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        mode === 'md'
                          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      Markdown
                    </button>
                    <button
                      onClick={() => setCopyMode((prev) => ({ ...prev, [badge.id]: 'html' }))}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        mode === 'html'
                          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      HTML
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {badge.description}
                </p>

                {/* Badge Visual Preview */}
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[64px]">
                  {badge.id === 'svg-featured' ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A] border border-[#334155] text-white text-xs font-semibold shadow-sm">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-[#94A3B8] text-[10px] tracking-wider uppercase">FEATURED ON</span>
                      <span className="text-[#38BDF8] font-extrabold text-[11px]">ZEVYLO</span>
                    </div>
                  ) : badge.id === 'shield-tools' ? (
                    <div className="inline-flex text-[11px] font-semibold rounded overflow-hidden shadow-sm">
                      <span className="bg-gray-700 text-white px-2.5 py-1">Tools</span>
                      <span className="bg-blue-600 text-white px-2.5 py-1">Zevylo (157+)</span>
                    </div>
                  ) : badge.id === 'shield-privacy' ? (
                    <div className="inline-flex text-[11px] font-semibold rounded overflow-hidden shadow-sm">
                      <span className="bg-gray-700 text-white px-2.5 py-1">Privacy</span>
                      <span className="bg-emerald-600 text-white px-2.5 py-1">100% Browser-Based</span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 underline underline-offset-4">
                      Zevylo Free Online Tools
                    </span>
                  )}
                </div>

                {/* Code Block */}
                <div className="relative">
                  <pre className="text-[11px] font-mono p-3 rounded-lg bg-gray-900 text-gray-200 overflow-x-auto whitespace-pre-wrap break-all border border-gray-800 leading-tight">
                    {currentCode}
                  </pre>
                </div>
              </div>

              {/* Copy Action Button */}
              <button
                onClick={() => handleCopy(badge.id, currentCode)}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  copiedId === badge.id
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                }`}
              >
                {copiedId === badge.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy {mode === 'md' ? 'Markdown' : 'HTML'} Snippet</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
