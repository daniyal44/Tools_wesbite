import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  ExternalLink,
  Star,
  Eye,
  CheckCircle2,
  ArrowRight,
  Layers,
  ChevronRight,
  TrendingUp,
  Tag,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { AI_TOOLS_DATABASE, getAIToolsByCategory } from '@/lib/ai-directory/database';
import { AIPricing } from '@/lib/ai-directory/types';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return AI_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = AI_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | Zevylo',
    };
  }

  return {
    title: `Best ${category.name} in 2026 — Verified Tools & Reviews | Zevylo`,
    description: `Explore top-rated ${category.name.toLowerCase()} software, web apps, and utilities. Compare monthly traffic, pricing models, key features, and user ratings.`,
    alternates: {
      canonical: `/ai-tools/${category.slug}`,
    },
    openGraph: {
      title: `Best ${category.name} | Zevylo AI Directory`,
      description: category.description,
      url: `/ai-tools/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function AICategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = AI_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const tools = getAIToolsByCategory(categorySlug);
  const otherCategories = AI_CATEGORIES.filter((c) => c.slug !== categorySlug);

  const pricingBadges: Record<AIPricing, { label: string; color: string }> = {
    free: { label: '100% Free', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200' },
    freemium: { label: 'Freemium', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200' },
    paid: { label: 'Paid', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200' },
    'free-trial': { label: 'Free Trial', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200' },
    'open-source': { label: 'Open Source', color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200' },
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Directory`,
    description: category.description,
    url: `https://zevylo.com/ai-tools/${category.slug}`,
    itemListElement: tools.map((tool, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: tool.name,
      url: `https://zevylo.com/ai-tools/tool/${tool.slug}`,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ai-tools" className="hover:text-blue-600 transition-colors">
          AI Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ai-tools/categories" className="hover:text-blue-600 transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-gray-100 font-bold">{category.name}</span>
      </nav>

      {/* Category Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated AI Category Index</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            {category.description}
          </p>

          {/* Subcategories tags */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-semibold text-blue-200 mr-1">Popular Subcategories:</span>
            {category.popularSubcategories.map((sub, sIdx) => (
              <span
                key={sIdx}
                className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-medium backdrop-blur-sm border border-white/10"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">
              Featured {category.name} ({tools.length})
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Hand-picked and verified artificial intelligence apps with transparent pricing and traffic analytics.
            </p>
          </div>
          <Link
            href="/ai-tools"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>All AI Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {tools.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-3">
            <Layers className="w-8 h-8 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Tools coming soon to this category</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Our team is verifying new entries. Browse our global directory of 100+ tools.
            </p>
            <Link
              href="/ai-tools"
              className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
            >
              Browse All AI Tools
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const pricingBadge = pricingBadges[tool.pricing] || pricingBadges.freemium;

              return (
                <div
                  key={tool.id}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/ai-tools/tool/${tool.slug}`} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border border-blue-200 dark:border-blue-900/60 flex items-center justify-center font-black text-lg text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                          {tool.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                              {tool.name}
                            </h3>
                            {tool.verified && (
                              <span title="Verified AI Tool" className="shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400 block font-medium">
                            Subcategory: {tool.subcategory}
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                      {tool.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Badges */}
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

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                    <Link
                      href={`/ai-tools/tool/${tool.slug}`}
                      className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                    >
                      <span>Full Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

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

      {/* Explore Other Categories */}
      <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Explore Other AI Categories
          </h2>
          <Link
            href="/ai-tools/categories"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All Categories ({AI_CATEGORIES.length})
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {otherCategories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/ai-tools/${cat.slug}`}
              className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <h3 className="font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-400 truncate mt-1">
                {cat.popularSubcategories.slice(0, 2).join(', ')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
