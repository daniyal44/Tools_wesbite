import { Metadata } from 'next';
import Link from 'next/link';
import '@/tools';
import { getAllTools, getToolsByCategory } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { ChevronRight, FolderTree } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Complete Tools Directory & HTML Sitemap | Zevylo',
  description:
    'Complete index and directory of all 157+ free online utilities across 18 categories on Zevylo. Fast crawl directory for users and search engines.',
  openGraph: {
    title: 'Complete Tools Directory & HTML Sitemap | Zevylo',
    description: 'Browse all 157+ free browser tools across 18 categories with one-click access.',
    type: 'website',
  },
};

export default function HtmlSitemapPage() {
  const allTools = getAllTools();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://zevylo.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'HTML Sitemap & Directory',
        item: 'https://zevylo.com/sitemap',
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">HTML Sitemap & Directory</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/60 via-white to-gray-50/60 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/60 p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            <FolderTree className="w-3.5 h-3.5" />
            Complete Crawl Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            All Free Tools & Pages Directory
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Direct HTML index linking every single one of Zevylo&apos;s {allTools.length} free online utilities across all 18 categories. Designed for quick user navigation and search engine crawlability.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-500">
            <span>• Articles & Guides: <Link href="/articles" className="text-blue-600 dark:text-blue-400 underline font-medium">157+ Tool Guides</Link></span>
            <span>• XML Sitemap: <a href="/sitemap.xml" className="text-blue-600 dark:text-blue-400 underline">sitemap.xml</a></span>
            <span>• RSS Feed: <a href="/feed.xml" className="text-blue-600 dark:text-blue-400 underline">feed.xml</a></span>
            <span>• Robots: <a href="/robots.txt" className="text-blue-600 dark:text-blue-400 underline">robots.txt</a></span>
          </div>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
          Jump to category:
        </span>
        <div className="flex flex-wrap gap-2">
          {categoryList.map((cat) => (
            <a
              key={cat.slug}
              href={`#cat-${cat.slug}`}
              className="text-xs px-2.5 py-1 rounded-md bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Category-by-Category Comprehensive Tool Links */}
      <div className="space-y-12">
        {categoryList.map((cat) => {
          const catTools = getToolsByCategory(cat.id);
          return (
            <section
              key={cat.slug}
              id={`cat-${cat.slug}`}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <Link href={`/tools/${cat.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {cat.name}
                      </Link>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                      {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {cat.description}
                  </p>
                </div>
                <Link
                  href={`/tools/${cat.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  <span>Category Overview</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {catTools.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No tools currently in this category.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.category}/${tool.slug}`}
                      className="group p-3.5 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-blue-500 bg-gray-50/50 hover:bg-white dark:bg-gray-950/30 dark:hover:bg-gray-800/50 transition-all flex flex-col justify-between space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </span>
                        {tool.executionMode === 'client' && (
                          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded shrink-0">
                            Browser
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {tool.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
