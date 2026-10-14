import { Metadata } from 'next';
import Link from 'next/link';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { AIArticlesClientHub } from '@/components/ai/ai-articles-client-hub';
import {
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '286 Dedicated AI Technical Articles, Benchmarks & Reviews | Zevylo AI',
  description:
    'Read exhaustive 2,000+ word technical breakdowns, model architecture specifications, MMLU/HumanEval benchmarks, token pricing economics, and release roadmaps for 286 global AI tools and models.',
  openGraph: {
    title: '286 Dedicated AI Technical Articles & Architecture Reviews | Zevylo AI',
    description:
      'In-depth engineering reviews of ChatGPT, Gemini, Claude 3.7, Codex, Cursor, Grok 3, Open-Claw, DeepSeek, Falcon, and 286 global AI technologies.',
    url: '/ai-tools/article',
    type: 'website',
  },
  alternates: {
    canonical: '/ai-tools/article',
  },
};

export default function AIArticlesIndexPage() {
  const tools = [...AI_TOOLS_DATABASE].sort((a, b) => a.name.localeCompare(b.name));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zevylo AI Technical Articles & Architecture Guides',
    description:
      'Comprehensive library of 286 technical reviews, benchmark evaluations, and roadmaps for global AI software and models.',
    url: 'https://zevylo.netlify.app/ai-tools/article',
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
          name: 'AI Tools',
          item: 'https://zevylo.netlify.app/ai-tools',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Articles & Reviews',
          item: 'https://zevylo.netlify.app/ai-tools/article',
        },
      ],
    },
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-10">
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
        <Link href="/ai-tools" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          AI Tools
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Articles &amp; Architecture Guides
        </span>
      </nav>

      {/* Hero Banner */}
      <div className="relative rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-800 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>286 Verified Technical Articles &amp; Benchmarks</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AI Tools Technical Articles &amp; Model Architecture Guides
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Exhaustive, engineering-first technical reviews for all <strong>286 global AI tools and models</strong>. Each guide analyzes model architecture, context window limits, quantitative HumanEval/MMLU benchmarks, token pricing economics, step-by-step implementation tutorials, and official release roadmaps.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-blue-200">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>Worldwide Coverage (USA, China, Japan, UAE, UK, Taiwan, EU)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Full Lifecycle (Launched, Betas, Upcoming Roadmaps)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client-Side Searchable & Filterable Hub */}
      <AIArticlesClientHub tools={tools} />
    </div>
  );
}
