import { Metadata } from 'next';
import Link from 'next/link';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { ToolsDirectoryClient } from './tools-client';
import { Sparkles, Lightbulb, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Tools Directory — Free Online Utilities | Zevylo',
  description:
    'Browse the full catalog of free online tools on Zevylo. Fast, private, browser-based utilities for text, development, SEO, calculation, conversion, and generation.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'All Tools Directory — Free Online Utilities | Zevylo',
    description: 'Browse the full catalog of 157+ free browser tools on Zevylo.',
    url: '/tools',
    type: 'website',
  },
};

export default function ToolsDirectoryPage() {
  const tools = getAllTools();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        name: 'All Tools',
        item: 'https://zevylo.netlify.app/tools',
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Tools Directory
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Discover all free, private, and browser-powered utilities on Zevylo. Find exactly what you need in seconds.
        </p>
      </div>

      {/* Interactive Filter & Search Client Component */}
      <ToolsDirectoryClient initialTools={tools} categories={categoryList} />

      {/* On-Demand Expansion & Tool Requests Banner */}
      <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/20 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Continuous Expansion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            More Tools Added in Future on Demand &amp; Requirements
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Need a tool that isn&apos;t in our catalog yet? We build and release new 100% private, client-side tools based directly on user feedback and workflow requirements. Submit your idea, and our team will build it for you for free.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shrink-0"
        >
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span>Request a Tool On-Demand</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
