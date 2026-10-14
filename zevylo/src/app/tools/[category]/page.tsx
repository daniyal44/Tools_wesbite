import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/tools';
import { getToolsByCategory } from '@/lib/tools/registry';
import { categories, categoryList } from '@/lib/tools/categories';
import { ToolCategory } from '@/lib/tools/types';
import { ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { ToolIcon } from '@/components/tools/tool-icon';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categoryList.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = categories[category as ToolCategory];

  if (!cat) {
    return {
      title: 'Category Not Found | Zevylo',
    };
  }

  const canonicalUrl = `/tools/${cat.slug}`;

  return {
    title: `${cat.name} — Free Online Utilities | Zevylo`,
    description: cat.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cat.name} — Zevylo`,
      description: cat.description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CategoryPageRoute({ params }: PageProps) {
  const { category } = await params;
  const cat = categories[category as ToolCategory];

  if (!cat) {
    notFound();
  }

  const tools = getToolsByCategory(category as ToolCategory);

  const breadcrumbSchema = {
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
        name: 'All Tools',
        item: 'https://zevylo.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cat.name} Tools`,
        item: `https://zevylo.com/tools/${category}`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.name} Free Online Tools`,
    description: cat.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      description: tool.shortDescription,
      url: `https://zevylo.com/tools/${tool.category}/${tool.slug}`,
    })),
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-10">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/tools" className="hover:text-gray-900 dark:hover:text-gray-100">All Tools</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">{cat.name}</span>
      </nav>

      {/* Category Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/50 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <ToolIcon category={cat.id} size="lg" className="rounded-2xl shrink-0" />
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                Category
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {cat.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-200 dark:border-gray-800">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {tools.length}
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {tools.length === 1 ? 'Available Tool' : 'Available Tools'}
            </span>
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            All {cat.name}
          </h2>
          <span className="text-sm text-gray-500">
            Showing {tools.length} tools
          </span>
        </div>

        {tools.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center text-gray-500">
            No active tools currently registered in this category. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.category}/${tool.slug}`}
                className="group flex flex-col"
              >
                <Card className="h-full border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <ToolIcon
                          slug={tool.slug}
                          category={tool.category}
                          icon={tool.icon}
                          name={tool.name}
                          size="md"
                        />
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {tool.category}
                          </span>
                          {tool.executionMode === 'client' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                              <ShieldCheck className="w-3 h-3" />
                              Client-side
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                        {tool.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Launch tool</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Category Navigation Pills */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Other Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categoryList
            .filter((c) => c.slug !== cat.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/tools/${c.slug}`}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-gray-900"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
