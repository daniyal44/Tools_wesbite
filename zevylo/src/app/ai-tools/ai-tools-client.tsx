'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Star,
  Eye,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Share2,
  PlusCircle,
  X,
  Filter,
  Flame,
  ArrowRight,
  Layers,
  Wand2,
  BookOpen,
  Globe,
} from 'lucide-react';
import { AITool, AICategory, AIPricing } from '@/lib/ai-directory/types';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { AIToolLogo } from '@/components/ai/ai-tool-logo';

interface AIToolsClientProps {
  initialTools: AITool[];
  categories: AICategory[];
}

export function AIToolsClient({ initialTools, categories }: AIToolsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'traffic' | 'rating' | 'trending' | 'name'>('traffic');
  const [viewTab, setViewTab] = useState<'directory' | 'built-in'>('directory');
  const [savedTools, setSavedTools] = useState<string[]>([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [previewTool, setPreviewTool] = useState<AITool | null>(null);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('zevylo_saved_ai_tools');
      if (stored) setSavedTools(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let next: string[];
    if (savedTools.includes(id)) {
      next = savedTools.filter((t) => t !== id);
    } else {
      next = [...savedTools, id];
    }
    setSavedTools(next);
    try {
      localStorage.setItem('zevylo_saved_ai_tools', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const parseTraffic = (str: string): number => {
    const clean = str.trim().toUpperCase();
    if (clean.endsWith('B')) return parseFloat(clean) * 1_000_000_000;
    if (clean.endsWith('M')) return parseFloat(clean) * 1_000_000;
    if (clean.endsWith('K')) return parseFloat(clean) * 1_000;
    return parseFloat(clean) || 0;
  };

  const alphabetLetters = [
    'all',
    '#',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ];

  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialTools.length, '#': 0 };
    for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      counts[letter] = 0;
    }

    initialTools.forEach((tool) => {
      const firstChar = tool.name.trim().charAt(0).toUpperCase();
      if (/^[A-Z]$/.test(firstChar)) {
        counts[firstChar] = (counts[firstChar] || 0) + 1;
      } else {
        counts['#'] = (counts['#'] || 0) + 1;
      }
    });

    return counts;
  }, [initialTools]);

  const filteredTools = useMemo(() => {
    let list = [...initialTools];

    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }

    if (selectedPricing !== 'all') {
      list = list.filter((t) => t.pricing === selectedPricing);
    }

    if (selectedCountry !== 'all') {
      list = list.filter((t) => t.countryCode === selectedCountry || t.country === selectedCountry);
    }

    if (selectedStatus !== 'all') {
      list = list.filter((t) => t.status === selectedStatus);
    }

    if (selectedLetter !== 'all') {
      if (selectedLetter === '#') {
        list = list.filter((t) => !/^[A-Z]/i.test(t.name.trim()));
      } else {
        list = list.filter((t) => t.name.trim().toUpperCase().startsWith(selectedLetter));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.country && t.country.toLowerCase().includes(q)) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'traffic':
        list.sort((a, b) => parseTraffic(b.monthlyVisits) - parseTraffic(a.monthlyVisits));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'trending':
        list.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [initialTools, selectedCategory, selectedPricing, selectedCountry, selectedStatus, selectedLetter, searchQuery, sortBy]);

  const pricingBadges: Record<AIPricing, { label: string; color: string }> = {
    free: { label: '100% Free', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200' },
    freemium: { label: 'Freemium', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200' },
    paid: { label: 'Paid', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200' },
    'free-trial': { label: 'Free Trial', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200' },
    'open-source': { label: 'Open Source', color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200' },
  };

  const builtInUtilities = [
    { name: 'AI Prompt Crafter & Styler', slug: 'ai-prompt-generator', category: 'ai', icon: '✨', desc: 'Engineer Midjourney v6, Flux, and DALL-E 3 prompts with camera, lighting, and aspect parameters' },
    { name: 'AI Text Humanizer & Rewriter', slug: 'ai-humanizer', category: 'ai', icon: '👤', desc: 'Eliminate robotic AI jargon, clichés, and uniform syntax to create authentic, conversational human text' },
    { name: 'AI Content & Perplexity Detector', slug: 'ai-content-detector', category: 'ai', icon: '🛡️', desc: 'Statistical perplexity, sentence burstiness, and sentence-level AI probability heatmap' },
    { name: 'AI Code Explainer & Converter', slug: 'ai-code-assistant', category: 'ai', icon: '💻', desc: 'Deconstruct algorithms, audit edge-case vulnerabilities, and translate code between 6 languages' },
    { name: 'AI Plain English to SQL & Regex', slug: 'ai-sql-regex-generator', category: 'ai', icon: '🗄️', desc: 'Generate PostgreSQL, MySQL, and SQLite queries or regex expressions from natural language' },
    { name: 'AI Viral Hook & Social Post Crafter', slug: 'ai-social-hook-generator', category: 'ai', icon: '📢', desc: 'Generate high-CTR hooks, Twitter threads, LinkedIn thought-leadership, and virality scores' },
    { name: 'AI Story & Narrative Blueprint Studio', slug: 'ai-story-generator', category: 'ai', icon: '📖', desc: 'Build 3-act story outlines, high-stakes plot twists, protagonist flaws, and opening prose' },
    { name: 'AI Startup & Brand Name Generator', slug: 'ai-business-name-generator', category: 'ai', icon: '🚀', desc: 'Brandable names, available domain patterns, catchy taglines, and value proposition hooks' },
    { name: 'AI Article & Blog Outline Generator', slug: 'ai-article-writer', category: 'ai', icon: '📝', desc: 'Generate comprehensive blog post outlines, high-CTR headlines, and structured draft frameworks' },
    { name: 'YouTube Video AI Summarizer', slug: 'youtube-summarizer', category: 'ai', icon: '🎥', desc: 'Client-side transcript extractive summarizer with executive takeaways and topic keywords' },
    { name: 'GEO & AEO Search Engine Optimizer', slug: 'geo-aeo-optimizer', category: 'ai', icon: '🔍', desc: 'Audit content for Generative Engine Optimization (Perplexity, ChatGPT Search, Claude citations)' },
    { name: 'AI Presentation & Pitch Deck Outliner', slug: 'ai-presentation-generator', category: 'ai', icon: '📊', desc: 'Craft professional multi-slide deck outlines, key takeaways, slide cards, and speaker notes' },
    { name: 'AI Email Subject Line & Open Rate Scorer', slug: 'ai-email-subject-line-generator', category: 'ai', icon: '✉️', desc: 'High-CTR email subject lines with spam rating and open-rate propensity score' },
    { name: 'AI Profile Bio Generator (LinkedIn & X)', slug: 'ai-bio-generator', category: 'ai', icon: '💼', desc: 'Generate high-impact personal bios for LinkedIn, Twitter/X, GitHub, and Instagram' },
    { name: 'AI Plain English to Excel & Sheets Formula', slug: 'ai-excel-formula-generator', category: 'ai', icon: '📈', desc: 'Convert natural language descriptions into Excel and Google Sheets formulas with explanations' },
    { name: 'AI FAQ & Schema Markup Builder', slug: 'ai-faq-schema-generator', category: 'ai', icon: '❓', desc: 'Generate FAQs with Google-compliant JSON-LD FAQPage structured data schema' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-14 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>World-Class AI Tools Discovery Directory • Inspired by Toolify</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Discover Global AI Tools &amp; Utilities from A to Z
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            Explore 280+ curated AI powerhouses across 23 specialized categories from USA, China, Japan, UAE, Taiwan, UK, and Europe, or run our 11 built-in browser AI tools with 100% client-side privacy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-blue-900 text-xs font-bold hover:bg-blue-50 transition-colors shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Submit an AI Tool</span>
            </button>
            <div className="flex items-center gap-4 text-xs text-blue-200 pl-2 flex-wrap">
              <span>✓ 280+ Global Tools</span>
              <span>✓ 12+ Nations</span>
              <span>✓ 23 AI Categories</span>
              <span>✓ Technical Guides &amp; Reviews</span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-2xl relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI tools by name, keyword (e.g. video, voice, coding, Claude, Midjourney)..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 text-sm font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Switcher: Curated Directory vs Built-in In-Browser Utilities */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setViewTab('directory')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              viewTab === 'directory'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>AI Tools Directory ({filteredTools.length})</span>
          </button>
          <button
            onClick={() => setViewTab('built-in')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              viewTab === 'built-in'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Wand2 className="w-4 h-4 text-amber-500" />
            <span>Built-in Browser AI Tools ({builtInUtilities.length})</span>
          </button>
          <Link
            href="/ai-tools/article"
            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200/60 dark:border-indigo-800"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>AI Technical Articles &amp; Benchmarks (286) &rarr;</span>
          </Link>
        </div>

        {viewTab === 'directory' && (
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-500 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 font-bold text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <option value="traffic">Monthly Traffic (Visits)</option>
              <option value="rating">Highest User Rating</option>
              <option value="trending">Trending Now</option>
              <option value="name">Alphabetical (A to Z)</option>
            </select>
          </div>
        )}
      </div>

      {viewTab === 'built-in' ? (
        /* Built-in Browser Tools Grid */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                11 Free Built-In AI Utilities (100% In-Browser Privacy)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Zero cloud uploads, no API keys needed, zero subscriptions. Run right in your browser.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builtInUtilities.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.category}/${tool.slug}`}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                      Browser Native
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Global Country & Nation Origin Filter */}
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Filter by Country of Origin (USA, China, Japan, UAE, UK, Taiwan, EU):</span>
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
              {[
                { label: 'All Countries', code: 'all', flag: '🌐' },
                { label: 'USA', code: 'US', flag: '🇺🇸' },
                { label: 'China', code: 'CN', flag: '🇨🇳' },
                { label: 'Japan', code: 'JP', flag: '🇯🇵' },
                { label: 'UAE', code: 'AE', flag: '🇦🇪' },
                { label: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
                { label: 'Taiwan', code: 'TW', flag: '🇹🇼' },
                { label: 'Germany', code: 'DE', flag: '🇩🇪' },
                { label: 'France', code: 'FR', flag: '🇫🇷' },
                { label: 'South Korea', code: 'KR', flag: '🇰🇷' },
                { label: 'India', code: 'IN', flag: '🇮🇳' },
                { label: 'Canada', code: 'CA', flag: '🇨🇦' },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedCountry(c.code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCountry === c.code
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/20'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Release Lifecycle Status Filter */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              Release Lifecycle &amp; Roadmaps:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { label: 'All Statuses', value: 'all' },
                { label: '🟢 Live / Launched', value: 'launched' },
                { label: '🟡 Beta / Waitlist', value: 'beta' },
                { label: '🟣 Upcoming / In Development', value: 'upcoming' },
              ].map((st) => (
                <button
                  key={st.value}
                  type="button"
                  onClick={() => setSelectedStatus(st.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

          {/* Category Filter Pills */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Filter by AI Category ({categories.length} Categories):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                All AI Tools ({AI_TOOLS_DATABASE.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">
                Pricing Model:
              </span>
              {(['all', 'free', 'freemium', 'open-source', 'paid', 'free-trial'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPricing(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedPricing === p
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {p === 'all' ? 'All Pricing' : p === 'open-source' ? 'Open Source' : p}
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-500 font-medium">
              Showing <strong>{filteredTools.length}</strong> AI tools
            </span>
          </div>

          {/* Toolify A-to-Z Alphabetical Quick Jump Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 text-[11px]">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span>A to Z Quick-Jump Index</span>
              </span>
              {selectedLetter !== 'all' && (
                <button
                  onClick={() => setSelectedLetter('all')}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs"
                >
                  Show All Letters (Reset)
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              {alphabetLetters.map((letter) => {
                const isSelected = selectedLetter === letter;
                const count = letterCounts[letter] || 0;
                const isDisabled = count === 0 && letter !== 'all';
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedLetter(isSelected && letter !== 'all' ? 'all' : letter)}
                    disabled={isDisabled}
                    title={`${letter === 'all' ? 'All tools' : `Tools starting with ${letter}`}: ${count}`}
                    className={`min-w-7 sm:min-w-8 h-7 sm:h-8 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/20'
                        : isDisabled
                        ? 'bg-transparent text-gray-300 dark:text-gray-700 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300'
                    }`}
                  >
                    <span>{letter.toUpperCase()}</span>
                    {count > 0 && letter !== 'all' && (
                      <span className="text-[9px] opacity-70">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Directory Cards Grid */}
          {filteredTools.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-3">
              <Search className="w-8 h-8 text-gray-400 mx-auto" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">No matching AI tools found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try clearing your search query, switching to another category, or selecting another letter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPricing('all');
                  setSelectedLetter('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const pricingBadge = pricingBadges[tool.pricing] || pricingBadges.freemium;
                const isBookmarked = savedTools.includes(tool.id);

                return (
                  <div
                    key={tool.id}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="space-y-3">
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <Link href={`/ai-tools/tool/${tool.slug}`} className="flex items-center gap-3">
                          <AIToolLogo
                            name={tool.name}
                            slug={tool.slug}
                            url={tool.url}
                            logoUrl={tool.logoUrl}
                            size="md"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                                {tool.name}
                              </h3>
                              {tool.country && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                  <span>{tool.flagEmoji || '🌐'}</span>
                                  <span>{tool.countryCode || tool.country}</span>
                                </span>
                              )}
                              {tool.status && (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    tool.status === 'upcoming'
                                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200'
                                      : tool.status === 'beta'
                                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200'
                                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200'
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                  <span className="capitalize">{tool.status}</span>
                                </span>
                              )}
                              {tool.verified && (
                                <span title="Verified AI Tool" className="shrink-0">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400 block font-medium">
                              {tool.categoryName}
                            </span>
                          </div>
                        </Link>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => toggleBookmark(tool.id)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isBookmarked
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                              : 'border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-600'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Save AI Tool'}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                        {tool.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Badges strip: Pricing + Monthly Traffic + Rating */}
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className={`px-2 py-0.5 rounded-full font-bold border ${pricingBadge.color}`}>
                          {pricingBadge.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3 text-blue-500" />
                          <span>{tool.monthlyVisits}/mo</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1 border border-amber-200 dark:border-amber-900">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{tool.rating}</span>
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {tool.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-gray-50 dark:bg-gray-950 text-[10px] font-mono text-gray-500 border border-gray-100 dark:border-gray-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setPreviewTool(tool)}
                          className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Quick View
                        </button>
                        <Link
                          href={`/ai-tools/article/${tool.slug}`}
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Article</span>
                        </Link>
                        <Link
                          href={`/ai-tools/tool/${tool.slug}`}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-sm"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Preview Tool Modal */}
      {previewTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setPreviewTool(null)}
              className="absolute right-5 top-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <AIToolLogo
                name={previewTool.name}
                slug={previewTool.slug}
                url={previewTool.url}
                logoUrl={previewTool.logoUrl}
                size="lg"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                    {previewTool.name}
                  </h3>
                  {previewTool.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                  {previewTool.categoryName} • Subcategory: {previewTool.subcategory}
                </p>
                <p className="text-xs text-gray-500">Launched in {previewTool.launchYear}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {previewTool.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-center">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Monthly Traffic</span>
                <p className="text-lg font-black text-gray-900 dark:text-gray-100">{previewTool.monthlyVisits}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Pricing Tier</span>
                <p className="text-lg font-black text-emerald-600 capitalize">{previewTool.pricing}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Community Rating</span>
                <p className="text-lg font-black text-amber-500 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {previewTool.rating}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Core Features</h4>
              <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                {previewTool.keyFeatures.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Pros</span>
                <ul className="space-y-1 text-[11px] text-emerald-900 dark:text-emerald-200">
                  {previewTool.pros.map((p, pIdx) => (
                    <li key={pIdx}>+ {p}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 space-y-1.5">
                <span className="text-xs font-bold text-red-800 dark:text-red-300">Cons</span>
                <ul className="space-y-1 text-[11px] text-red-900 dark:text-red-200">
                  {previewTool.cons.map((c, cIdx) => (
                    <li key={cIdx}>- {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Launch Outbound */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 flex-wrap gap-3">
              <span className="text-xs text-gray-400">Starting at: {previewTool.startingPrice}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/ai-tools/tool/${previewTool.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-bold text-xs hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={previewTool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-md"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Tool Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => {
                setIsSubmitOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute right-5 top-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Tool Submitted Successfully!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Thank you for submitting your AI tool. Our editorial team will review the indexing metadata and publish it within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitOpen(false);
                    setSubmitSuccess(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Submit an AI Tool
                  </h3>
                  <p className="text-xs text-gray-500">
                    Get discovered by thousands of creators and developers on Zevylo.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Tool Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. DreamAI"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Official Website URL *</label>
                    <input
                      required
                      type="url"
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category *</label>
                    <select
                      required
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Short Tagline (under 80 chars) *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Generate hyper-realistic videos from text in seconds"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Pricing Model *</label>
                    <select
                      required
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="free">100% Free</option>
                      <option value="freemium">Freemium</option>
                      <option value="open-source">Open Source</option>
                      <option value="free-trial">Free Trial</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors shadow-md"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
