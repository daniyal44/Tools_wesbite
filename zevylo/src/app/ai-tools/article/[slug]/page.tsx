import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  ArrowRight,
  Clock,
  Calendar,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  HelpCircle,
  Wand2,
} from 'lucide-react';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { getAIArticleBySlug } from '@/lib/ai-articles/article-generator';
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
  const article = getAIArticleBySlug(slug);

  if (!article) {
    return {
      title: 'AI Article Not Found | Zevylo',
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `/ai-tools/article/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `/ai-tools/article/${article.slug}`,
      type: 'article',
      siteName: 'Zevylo',
      images: [
        {
          url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
          width: 1200,
          height: 630,
          alt: `${article.toolName} Comprehensive Review & Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.tagline,
      images: ['https://zevylo.netlify.app/images/Zevylo_logo.png'],
      creator: '@zevylo',
    },
  };
}

export default async function AIArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getAIArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Zevylo Editorial & Engineering Team',
      url: 'https://zevylo.netlify.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zevylo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
      },
    },
    datePublished: '2026-10-15',
    dateModified: '2026-10-15',
    mainEntityOfPage: `https://zevylo.netlify.app/ai-tools/article/${article.slug}`,
  };

  const statusColors = {
    launched: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    beta: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    upcoming: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ai-tools" className="hover:text-blue-600 transition-colors">
          AI Tools Directory
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/ai-tools/tool/${article.toolSlug}`} className="hover:text-blue-600 transition-colors">
          {article.toolName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px] sm:max-w-none">
          Technical Review &amp; Guide
        </span>
      </nav>

      {/* Article Hero Header */}
      <header className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <AIToolLogo
              name={article.toolName}
              slug={article.toolSlug}
              url={article.officialUrl}
              size="xl"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                  <span>{article.flagEmoji}</span>
                  <span>{article.country}</span>
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusColors[article.status]}`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span className="capitalize">{article.status}</span>
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  {article.roadmapInfo}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {article.toolName}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                {article.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href={article.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-md shadow-blue-600/20"
            >
              <span>Visit Official Platform</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href={`/ai-tools/tool/${article.toolSlug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm transition-colors"
            >
              <span>Tool Profile</span>
            </Link>
          </div>
        </div>

        {/* Metadata Badges Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 flex-wrap gap-4 pt-1">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{article.readingTime}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Updated October 2026</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Editorial Review</span>
            </span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            Category: {article.categoryName}
          </span>
        </div>
      </header>

      {/* Main Article Content */}
      <article className="space-y-10">
        {/* Section 1: Executive Summary */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              1. Executive Analysis &amp; Strategic Overview
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {article.executiveSummary}
          </p>
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
            <strong>Global Ecosystem Origin:</strong> {article.originAndCreators}
          </div>
        </section>

        {/* Section 2: Architectural Specs Grid */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              2. Architectural Specs &amp; Compute Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Context Window
              </span>
              <span className="text-base font-black text-gray-900 dark:text-gray-100">
                {article.architecturalSpecs.contextWindow}
              </span>
              <p className="text-[11px] text-gray-500">
                Active token capacity for documents and conversations
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Parameter Scale
              </span>
              <span className="text-base font-black text-gray-900 dark:text-gray-100">
                {article.architecturalSpecs.parameterScale}
              </span>
              <p className="text-[11px] text-gray-500">
                Dense or Mixture of Experts (MoE) neural weights
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                Licensing &amp; Delivery
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {article.architecturalSpecs.licensing}
              </span>
              <p className="text-[11px] text-gray-500">
                Deployment rights and API availability
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Verified Benchmark Matrix */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              3. Verified Performance &amp; Benchmark Matrix
            </h2>
          </div>

          <div className="space-y-4">
            {article.benchmarkMatrix.map((bm, bIdx) => (
              <div
                key={bIdx}
                className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {bm.benchmarkName}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-xs">
                      {article.toolName}: {bm.toolScore}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs">
                      {bm.competitorName}: {bm.competitorScore}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {bm.significance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Hands-on Workflow Steps */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              4. Step-by-Step Hands-On Workflow Guide
            </h2>
          </div>

          <div className="space-y-4">
            {article.stepByStepGuide.map((step) => (
              <div
                key={step.stepNumber}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.tip && (
                    <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                      <strong>Pro Tip:</strong> {step.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Pricing Breakdown & Token Economics */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              5. Pricing Breakdown &amp; Token Economics
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                Free &amp; Community Tier
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
                {article.pricingAndEconomics.freeTierDetails}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-300">
                Commercial &amp; Enterprise Tiers
              </h3>
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                {article.pricingAndEconomics.commercialTiers}
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Upcoming 2026 Roadmap */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              6. Upcoming Releases &amp; 2026 Roadmap Milestones
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Current status: <strong>{article.status.toUpperCase()}</strong> ({article.roadmapInfo}). The engineering roadmap targets the following key advancements:
          </p>
          <ul className="space-y-2.5 pt-2">
            {article.upcomingRoadmap.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 7: Pros & Cons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-lg">
              <ThumbsUp className="w-5 h-5" />
              <span>Key Strengths &amp; Pros</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
              {article.pros.map((pro, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">+</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-red-200 dark:border-red-800/80 bg-red-50/50 dark:bg-red-950/20 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-lg">
              <AlertTriangle className="w-5 h-5" />
              <span>Real-World Limitations</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-red-950 dark:text-red-200">
              {article.cons.map((con, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 8: Competitor Comparisons */}
        {article.competitorComparisons.length > 0 && (
          <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                8. Head-to-Head Competitor Comparison
              </h2>
            </div>
            <div className="space-y-3 pt-2">
              {article.competitorComparisons.map((comp, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                      {article.toolName} vs {comp.name}
                    </h3>
                    <Link
                      href={`/ai-tools/tool/${comp.slug}`}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View {comp.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {comp.verdict}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 9: Verified FAQs */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
              9. Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {article.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2"
              >
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Footer */}
        <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-10 text-white space-y-6 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Explore {article.toolName}?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Experience the latest release directly on the official platform or browse 280+ curated tools across 23 categories in the Zevylo AI Directory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={article.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/ai-tools"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20"
            >
              <span>Explore All 280+ AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
