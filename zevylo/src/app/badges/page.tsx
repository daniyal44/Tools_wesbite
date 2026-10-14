import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Code2 } from 'lucide-react';
import { BadgeCopySection } from './badge-copy-section';

export const metadata: Metadata = {
  title: 'Zevylo Badges & Backlink Widgets — Embed on Your Site',
  description:
    'Add official Zevylo badges, markdown shields, and embeddable widgets to your website, blog, or GitHub repository. High-authority vector badges.',
  openGraph: {
    title: 'Zevylo Badges & Backlink Widgets',
    description: 'Add official Zevylo badges, markdown shields, and widgets to your website or GitHub repo.',
    type: 'website',
  },
};

export default function BadgesPage() {
  const jsonLd = {
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
        name: 'Badges & Embed Widgets',
        item: 'https://zevylo.netlify.app/badges',
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">Badges & Backlinks</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/60 via-white to-gray-50/60 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/60 p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            <Code2 className="w-3.5 h-3.5" />
            Webmaster & Developer Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Zevylo Badges & Embed Widgets
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Showcase your favorite tools on your blog, GitHub repository, documentation, or website. Copy official markdown badges, vector SVG shields, or embed codes with single-click ease.
          </p>
        </div>
      </div>

      {/* Client Interactive Copy Section */}
      <BadgeCopySection />

      {/* Why Link to Zevylo Section */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Why add a Zevylo badge or link on your site?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              100% Free & Private for Your Readers
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              When your users click through to calculate, convert, or generate files, their data never touches a remote server. Zero risk, zero privacy leaks.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              Zero Ads or Paywalls
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Unlike legacy tool websites with deceptive download ads and captcha walls, Zevylo offers a clean, instantaneous experience for your audience.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              Mutual Web Authority
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Adding verified citations and resource badges boosts topical authority and user trust across modern search engines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
