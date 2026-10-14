import { Metadata } from 'next';
import Link from 'next/link';
import '@/tools';
import { categoryList } from '@/lib/tools/categories';
import { getToolsByCategory } from '@/lib/tools/registry';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Tool Categories — Browse Utilities by Category | Zevylo',
  description:
    'Explore online tool categories on Zevylo including text utilities, developer formats, SEO generators, calculators, and converters.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Tool Categories — Browse Utilities by Category | Zevylo',
    description: 'Explore 18 free online tool categories on Zevylo.',
    url: '/categories',
    type: 'website',
  },
};

export default function CategoriesPage() {
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
        name: 'Categories',
        item: 'https://zevylo.com/categories',
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          Browse
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Categories
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Find the right tools for your specific workflow. Every category is loaded with browser-based utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map((cat) => {
          const tools = getToolsByCategory(cat.id);
          const count = tools.length;

          return (
            <Link key={cat.slug} href={`/tools/${cat.slug}`} className="group flex flex-col">
              <Card className="h-full border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 hover:shadow-md transition-all">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{cat.icon === 'Type' ? '📝' : cat.icon === 'Code' ? '💻' : cat.icon === 'Calculator' ? '🧮' : cat.icon === 'ArrowLeftRight' ? '🔄' : cat.icon === 'Sparkles' ? '✨' : cat.icon === 'Shield' ? '🛡️' : cat.icon === 'Search' ? '🔍' : '🛠️'}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                        {count} {count === 1 ? 'tool' : 'tools'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Browse category</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
