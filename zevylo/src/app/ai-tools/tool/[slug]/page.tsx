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
  ChevronRight,
  TrendingUp,
  Tag,
  ShieldCheck,
  Zap,
  Layers,
  Wand2,
  Calendar,
  DollarSign,
  ThumbsUp,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { AI_TOOLS_DATABASE, getAIToolBySlug, getRelatedAITools } from '@/lib/ai-directory/database';
import { AIPricing } from '@/lib/ai-directory/types';
import { AIToolLogo } from '@/components/ai/ai-tool-logo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AI_TOOLS_DATABASE.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getAIToolBySlug(slug);

  if (!tool) {
    return {
      title: 'AI Tool Not Found | Zevylo',
    };
  }

  return {
    title: `${tool.name} Review, Pricing & Alternatives (2026) | Zevylo`,
    description: `${tool.tagline}. Read ${tool.name} verified features, pricing (${tool.startingPrice}), user rating (${tool.rating}/5), monthly traffic (${tool.monthlyVisits}), pros & cons, and top alternatives.`,
    alternates: {
      canonical: `/ai-tools/tool/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} Review & Pricing — Zevylo AI Directory`,
      description: tool.description,
      url: `/ai-tools/tool/${tool.slug}`,
      type: 'article',
      siteName: 'Zevylo',
      images: [
        {
          url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} Review & Pricing on Zevylo AI Directory`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} Review & Pricing | Zevylo`,
      description: tool.tagline,
      images: ['https://zevylo.netlify.app/images/Zevylo_logo.png'],
      creator: '@zevylo',
    },
    other: {
      'image': 'https://zevylo.netlify.app/images/Zevylo_logo.png',
    },
  };
}

export default async function AIToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getAIToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedAITools(tool, 3);

  const pricingBadges: Record<AIPricing, { label: string; color: string }> = {
    free: { label: '100% Free', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200' },
    freemium: { label: 'Freemium', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200' },
    paid: { label: 'Paid', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200' },
    'free-trial': { label: 'Free Trial', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200' },
    'open-source': { label: 'Open Source', color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200' },
  };

  const pricingBadge = pricingBadges[tool.pricing] || pricingBadges.freemium;

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.categoryName,
    operatingSystem: 'Web, Cloud',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: tool.startingPrice,
      priceCurrency: 'USD',
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
      caption: `${tool.name} AI Application`,
      width: 1200,
      height: 630,
    },
    url: tool.url,
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-12 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ai-tools" className="hover:text-blue-600 transition-colors">
          AI Tools
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/ai-tools/${tool.category}`} className="hover:text-blue-600 transition-colors">
          {tool.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-gray-100 font-bold">{tool.name}</span>
      </nav>

      {/* Tool Hero Header */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="flex items-start justify-between gap-6 flex-wrap sm:flex-nowrap">
          <div className="flex items-start gap-4 sm:gap-6">
            <AIToolLogo
              name={tool.name}
              slug={tool.slug}
              url={tool.url}
              logoUrl={tool.logoUrl}
              size="xl"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-gray-100">
                  {tool.name}
                </h1>
                {tool.country && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    <span>{tool.flagEmoji || '🌐'}</span>
                    <span>{tool.country}</span>
                  </span>
                )}
                {tool.status && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
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
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
                {tool.trending && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Trending</span>
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                {tool.tagline}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                <Link
                  href={`/ai-tools/${tool.category}`}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {tool.categoryName}
                </Link>
                <span>•</span>
                <span>Subcategory: {tool.subcategory}</span>
                <span>•</span>
                <span>Launched {tool.launchYear}</span>
                {tool.roadmapInfo && (
                  <>
                    <span>•</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">{tool.roadmapInfo}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
            <Link
              href={`/ai-tools/article/${tool.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-xs sm:text-sm border border-indigo-200 dark:border-indigo-800 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Full Article</span>
            </Link>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Pricing Model
            </span>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${pricingBadge.color}`}>
              {pricingBadge.label}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Starting Price
            </span>
            <span className="text-sm sm:text-base font-black text-gray-900 dark:text-gray-100">
              {tool.startingPrice}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Monthly Traffic
            </span>
            <span className="text-sm sm:text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{tool.monthlyVisits} visits</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              User Rating
            </span>
            <span className="text-sm sm:text-base font-black text-amber-500 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{tool.rating} ({tool.reviewCount.toLocaleString()} reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Overview */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
              About {tool.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {tool.description}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {tool.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* In-Depth Technical Review & Editorial Guide Banner */}
          <div className="rounded-3xl border border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50/60 to-blue-50/60 dark:from-indigo-950/20 dark:to-blue-950/20 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-black text-lg">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>In-Depth Technical Review &amp; Architecture Guide</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">
                2,000+ Words • Verified 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Dive into our comprehensive engineering deep dive covering {tool.name}&apos;s underlying neural architecture in {tool.country || 'global ecosystem'}, independent MMLU and HumanEval benchmark evaluations, full token economics breakdown, step-by-step implementation workflows, and upcoming 2026 version roadmaps.
            </p>
            <div className="pt-2">
              <Link
                href={`/ai-tools/article/${tool.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-md shadow-indigo-600/20"
              >
                <span>Read Full Technical Article &amp; Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Key Features */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
              Core Capabilities &amp; Features
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {tool.keyFeatures.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <ThumbsUp className="w-4 h-4" />
                <span>Pros</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                {tool.pros.map((pro, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-red-200 dark:border-red-800/80 bg-red-50/50 dark:bg-red-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-base">
                <AlertTriangle className="w-4 h-4" />
                <span>Cons &amp; Limitations</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-red-950 dark:text-red-200">
                {tool.cons.map((con, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Official Website CTA Card */}
          <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 space-y-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Ready to try {tool.name}?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Visit the official website to explore documentation, trial tiers, and community features.
              </p>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-md"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Built-in Browser Tools Cross-Sell */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Try Our Free Browser AI Tools
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Prefer instant privacy without logins or API keys? Run our built-in tools directly inside your web browser.
            </p>
            <div className="space-y-2">
              <Link
                href="/tools/ai/ai-prompt-generator"
                className="block p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors"
              >
                ✨ AI Prompt Crafter &amp; Styler
              </Link>
              <Link
                href="/tools/ai/ai-humanizer"
                className="block p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors"
              >
                👤 AI Text Humanizer &amp; Bypass Rewriter
              </Link>
              <Link
                href="/tools/ai/ai-presentation-generator"
                className="block p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors"
              >
                📊 AI Presentation Deck Outliner
              </Link>
            </div>
          </div>

          {/* Similar & Alternative Tools */}
          {relatedTools.length > 0 && (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Similar AI Tools in {tool.categoryName}
              </h3>
              <div className="space-y-3">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/ai-tools/tool/${rel.slug}`}
                    className="p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/50 hover:border-blue-500 hover:shadow-xs transition-all block group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AIToolLogo
                          name={rel.name}
                          slug={rel.slug}
                          url={rel.url}
                          logoUrl={rel.logoUrl}
                          size="sm"
                        />
                        <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                          {rel.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {rel.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-1">
                      {rel.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
