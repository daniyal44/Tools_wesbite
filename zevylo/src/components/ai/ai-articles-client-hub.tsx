'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AITool } from '@/lib/ai-directory/types';
import { AIToolLogo } from '@/components/ai/ai-tool-logo';
import {
  Search,
  BookOpen,
  ArrowRight,
  Filter,
  Globe,
  Sparkles,
  Cpu,
  BarChart3,
  Coins,
  Compass
} from 'lucide-react';

interface AIArticlesClientHubProps {
  tools: AITool[];
}

export function AIArticlesClientHub({ tools }: AIArticlesClientHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.categoryName.toLowerCase().includes(q) ||
        (tool.country && tool.country.toLowerCase().includes(q)) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCountry =
        selectedCountry === 'all' ||
        tool.countryCode === selectedCountry ||
        (selectedCountry === 'EU' && ['FR', 'DE', 'GB'].includes(tool.countryCode || ''));

      const matchesStatus =
        selectedStatus === 'all' || tool.status === selectedStatus;

      return matchesSearch && matchesCountry && matchesStatus;
    });
  }, [tools, searchQuery, selectedCountry, selectedStatus]);

  return (
    <div className="space-y-8">
      {/* Search and Quick Filters */}
      <div className="space-y-4 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 286 AI articles by model name, architecture, company, or country..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all"
          />
        </div>

        {/* Country Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1 shrink-0">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>Country:</span>
          </span>
          {[
            { label: 'All', code: 'all', flag: '🌐' },
            { label: 'USA', code: 'US', flag: '🇺🇸' },
            { label: 'China', code: 'CN', flag: '🇨🇳' },
            { label: 'Japan', code: 'JP', flag: '🇯🇵' },
            { label: 'UAE', code: 'AE', flag: '🇦🇪' },
            { label: 'UK', code: 'GB', flag: '🇬🇧' },
            { label: 'Taiwan', code: 'TW', flag: '🇹🇼' },
            { label: 'Germany', code: 'DE', flag: '🇩🇪' },
            { label: 'France', code: 'FR', flag: '🇫🇷' },
            { label: 'Korea', code: 'KR', flag: '🇰🇷' },
            { label: 'India', code: 'IN', flag: '🇮🇳' },
            { label: 'Canada', code: 'CA', flag: '🇨🇦' },
          ].map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelectedCountry(c.code)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCountry === c.code
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Lifecycle Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-bold text-gray-500 dark:text-gray-400 shrink-0">
            Lifecycle:
          </span>
          {[
            { label: 'All Lifecycle', value: 'all' },
            { label: '🟢 Live / Production', value: 'launched' },
            { label: '🟡 Beta / Waitlist', value: 'beta' },
            { label: '🟣 Upcoming / Roadmaps', value: 'upcoming' },
          ].map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedStatus === st.value
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-bold px-1">
        <span>
          Showing {filteredTools.length} of {tools.length} AI Technical Articles &amp; Reviews
        </span>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('all');
              setSelectedStatus('all');
            }}
            className="text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const isUpcoming = tool.status === 'upcoming';
          const isBeta = tool.status === 'beta';

          return (
            <article
              key={tool.slug}
              className="group rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden"
            >
              {/* Top Bar with Country & Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AIToolLogo
                      name={tool.name}
                      slug={tool.slug}
                      url={tool.url}
                      size="sm"
                    />
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <span>{tool.flagEmoji || '🌐'}</span>
                      <span className="text-xs text-gray-500">{tool.country || 'Global'}</span>
                    </span>
                  </div>

                  {isUpcoming ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      <span>🟣</span>
                      <span>Upcoming</span>
                    </span>
                  ) : isBeta ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <span>🟡</span>
                      <span>Beta</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <span>🟢</span>
                      <span>Live</span>
                    </span>
                  )}
                </div>

                {/* Article Title & Synopsis */}
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/ai-tools/article/${tool.slug}`}>
                      {tool.name} In-Depth Review &amp; Architecture
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                    {tool.tagline} — Comprehensive technical breakdown including MMLU benchmarks, token pricing economics, workflow tutorial, and development roadmap.
                  </p>
                </div>

                {/* Quick Architecture Specs */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px]">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    <span className="truncate">{tool.categoryName.split('&')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 justify-end">
                    <Coins className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">{tool.startingPrice}</span>
                  </div>
                </div>

                {tool.roadmapInfo && (
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300 flex items-start gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2"><strong>Roadmap:</strong> {tool.roadmapInfo}</span>
                  </div>
                )}
              </div>

              {/* Bottom CTAs */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <Link
                  href={`/ai-tools/tool/${tool.slug}`}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  View Profile
                </Link>

                <Link
                  href={`/ai-tools/article/${tool.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
