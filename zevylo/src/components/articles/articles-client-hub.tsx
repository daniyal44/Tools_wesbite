'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Filter, 
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { ArticleData } from '@/lib/articles/types';
import { categoryList } from '@/lib/tools/categories';
import { ToolIcon } from '@/components/tools/tool-icon';

interface ArticlesClientHubProps {
  initialArticles: ArticleData[];
}

export function ArticlesClientHub({ initialArticles }: ArticlesClientHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter articles based on query, category, and active tag
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      // Category check
      if (selectedCategory !== 'all' && article.toolCategory !== selectedCategory) {
        return false;
      }

      // Tag check
      if (selectedTag && !article.tags.includes(selectedTag)) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesTool = article.toolName.toLowerCase().includes(query);
        const matchesSummary = article.summary.toLowerCase().includes(query);
        const matchesCategory = article.categoryName.toLowerCase().includes(query);
        const matchesTag = article.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesTool && !matchesSummary && !matchesCategory && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [initialArticles, searchQuery, selectedCategory, selectedTag]);

  // Aggregate popular tags
  const topTags = useMemo(() => {
    const counts: Record<string, number> = {};
    initialArticles.forEach((a) => {
      a.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(([tag]) => tag);
  }, [initialArticles]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tools, features, tags (e.g. PDF, HEIC, JSON, convert)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-medium text-gray-500 dark:text-gray-400">
            <Filter className="w-4 h-4 text-blue-500" />
            <span>Showing <strong className="text-gray-900 dark:text-white">{filteredArticles.length}</strong> of {initialArticles.length} Guides</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Filter By Category:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Categories ({initialArticles.length})
            </button>
            {categoryList.map((cat) => {
              const count = initialArticles.filter((a) => a.toolCategory === cat.slug).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Working Tags Filter */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-500" />
              Popular Topic Tags:
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset active tag ({selectedTag})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topTags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${
                  selectedTag === t
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-300'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 group"
            >
              <div className="space-y-4">
                {/* Header with Tool Icon & Category */}
                <div className="flex items-start justify-between gap-3">
                  <ToolIcon
                    slug={article.toolSlug}
                    category={article.toolCategory}
                    name={article.toolName}
                    size="md"
                  />
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium text-[11px] border border-blue-100 dark:border-blue-900/40">
                      {article.categoryName}
                    </span>
                    <span className="text-gray-400 text-[10px]">
                      {article.readingTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Features & Working Step Chips */}
                <div className="pt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    4 Working Steps
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    100% In-Browser
                  </span>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="cursor-pointer text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Backlinks */}
              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Direct High-Value Tool Backlink */}
                <Link
                  href={article.backlinks.toolUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white text-xs font-medium transition-colors shadow-sm"
                  title={`Open interactive ${article.toolName} online`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Tool</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            No matching guides found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Try adjusting your search keywords or reset the category and tag filters to view all 157+ available guides.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTag(null);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
