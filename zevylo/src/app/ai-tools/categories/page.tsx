import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { getAIToolsByCategory } from '@/lib/ai-directory/database';

export const metadata: Metadata = {
  title: 'AI Tool Categories (A to Z) — Explore All 23 AI Niches | Zevylo',
  description:
    'Browse all 23 AI categories from writing, image generation, video production, coding, SEO to spreadsheets and presentations. Discover the best tools in each niche.',
  alternates: {
    canonical: '/ai-tools/categories',
  },
};

export default function AICategoriesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete AI Taxonomy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          All 23 AI Categories (A to Z)
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Every niche of the artificial intelligence revolution, organized with verified software listings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_CATEGORIES.map((cat) => {
          const tools = getAIToolsByCategory(cat.id);
          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    {tools.length} indexed tools
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories list */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">
                    Popular Niches:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularSubcategories.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px] text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href={`/ai-tools?category=${cat.id}`}
                  className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
