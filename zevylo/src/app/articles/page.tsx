import { Metadata } from 'next';
import Link from 'next/link';
import '@/tools';
import { getAllArticles } from '@/lib/articles/article-generator';
import { ArticlesClientHub } from '@/components/articles/articles-client-hub';
import { ChevronRight, BookOpen, ShieldCheck, Zap, Layers, Sparkles, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comprehensive Tool Guides & Technical Documentation | Zevylo',
  description:
    'Explore complete guides, step-by-step workflows, technical architectures, working tags, and backlink networks for all 157+ free online utilities on Zevylo.',
  openGraph: {
    title: 'Tool Guides & Technical Documentation Directory | Zevylo',
    description:
      'In-depth guides for every tool: step-by-step instructions, in-browser privacy architecture, tags, and direct tool access.',
    type: 'website',
    url: '/articles',
  },
  alternates: {
    canonical: '/articles',
  },
};

export default function ArticlesHubPage() {
  const articles = getAllArticles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zevylo Tool Guides & Technical Documentation',
    description: 'Complete technical guides and step-by-step documentation for all browser utilities.',
    url: 'https://zevylo.netlify.app/articles',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://zevylo.netlify.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Articles & Guides',
          item: 'https://zevylo.netlify.app/articles',
        },
      ],
    },
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Articles & Tool Guides
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 p-8 sm:p-12 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Knowledge Base & Tool Specs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Comprehensive Tool Guides & Working Tutorials
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            In-depth documentation for all <strong className="text-gray-900 dark:text-white">157+ utilities</strong> on Zevylo.
            Learn step-by-step how each tool works, the browser-side privacy mechanisms behind it, discover working tags, and jump straight into the live interactive tools.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Client-Side Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Hardware-Accelerated In-Browser</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Cross-Linked Backlink Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Searchable Client Hub */}
      <ArticlesClientHub initialArticles={articles} />

      {/* AI Frontier Models & Tools Technical Articles Hub */}
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Global AI Tools &amp; Frontier Model Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Explore 280+ Dedicated AI Technical Articles &amp; Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Looking for architectural breakdowns, real-world HumanEval/MMLU benchmarks, token economics, and roadmaps for <strong>Claude 3.5/3.7, OpenAI Codex, Cursor AI, xAI Grok, Open-Claw, DeepSeek, Falcon, Qwen</strong>, and 280+ global AI software?
          </p>
        </div>
        <Link
          href="/ai-tools"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shrink-0"
        >
          <span>Explore AI Directory &amp; Articles</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* On-Demand Tool Roadmap & Community Requests Banner */}
      <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-indigo-950/40 dark:via-gray-900 dark:to-purple-950/30 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Active Engineering Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            More Tools & Guides Added Continuously On-Demand
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Can&apos;t find the exact converter, calculator, or developer utility you need? Zevylo adds new tools and technical guides regularly, prioritized directly by community demand and user requirements. Tell us what you need!
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
        >
          <span>Request a New Tool On-Demand</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Educational Callout Banner */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Need Direct Access to Live Interactive Utilities?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Every article links directly to its live tool. You can also explore our full directory or categories to filter utilities by specific functional domains.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            Browse All Tools &rarr;
          </Link>
          <Link
            href="/categories"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium transition-colors"
          >
            Explore 18 Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
