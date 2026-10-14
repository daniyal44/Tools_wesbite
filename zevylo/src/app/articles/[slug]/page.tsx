import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import '@/tools';
import { getAllTools, getToolBySlug } from '@/lib/tools/registry';
import { getArticleBySlug } from '@/lib/articles/article-generator';
import { 
  ChevronRight, 
  Zap, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Lock, 
  Sparkles, 
  Tag, 
  HelpCircle, 
  Layers, 
  FileText,
  Clock,
  Compass,
  Lightbulb
} from 'lucide-react';
import { ToolIcon } from '@/components/tools/tool-icon';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Zevylo',
    };
  }

  const canonicalUrl = `/articles/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Zevylo',
      publishedTime: '2026-10-07T12:00:00Z',
      modifiedTime: '2026-10-07T12:00:00Z',
      authors: ['https://zevylo.netlify.app/about'],
      tags: article.tags,
      images: [
        {
          url: '/images/Zevylo_logo.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: ['/images/Zevylo_logo.png'],
    },
    other: {
      'article:published_time': '2026-10-07T12:00:00Z',
      'article:author': 'Zevylo Editorial Team',
      'ai-citation': `Zevylo Guide to ${article.toolName} (https://zevylo.netlify.app/articles/${article.slug})`,
      'topic': article.categoryName,
    },
  };
}

export default async function ToolArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Schema.org Structured Data
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.metaDescription,
    url: `https://zevylo.netlify.app/articles/${article.slug}`,
    datePublished: '2026-01-01T08:00:00Z',
    dateModified: '2026-10-07T12:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Zevylo Editorial & Engineering Team',
      url: 'https://zevylo.netlify.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zevylo',
      url: 'https://zevylo.netlify.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
      },
    },
    about: {
      '@type': 'SoftwareApplication',
      name: article.toolName,
      applicationCategory: article.categoryName,
      operatingSystem: 'All modern web browsers',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
    },
    keywords: article.tags.join(', '),
  };

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
        name: 'Articles',
        item: 'https://zevylo.netlify.app/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categoryName,
        item: `https://zevylo.netlify.app/tools/${article.toolCategory}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.toolName,
        item: `https://zevylo.netlify.app/articles/${article.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <article className="container mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-12">
      {/* Structured Data Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/articles" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Articles & Guides
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={article.backlinks.categoryUrl} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          {article.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px] sm:max-w-none">
          {article.toolName} Guide
        </span>
      </nav>

      {/* Article Hero Header */}
      <header className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href={article.backlinks.categoryUrl}
              className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold border border-blue-100 dark:border-blue-900/40 hover:bg-blue-100 transition-colors"
            >
              {article.categoryName}
            </Link>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 font-mono text-[11px]">
              {article.lastUpdated}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Client-Side Privacy</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <ToolIcon
            slug={article.toolSlug}
            category={article.toolCategory}
            name={article.toolName}
            size="lg"
            className="rounded-2xl shrink-0"
          />
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {article.summary}
            </p>
          </div>
        </div>

        {/* Primary Interactive Backlink CTA Button */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Free online tool • Unlimited usage • Zero file size limits</span>
          </div>

          <Link
            href={article.backlinks.toolUrl}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/20 hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Open {article.toolName} Live</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Table of Contents & Quick Navigation */}
      <nav aria-label="Table of Contents" className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          <Compass className="w-4 h-4 text-blue-500" />
          Quick Guide Jump Navigation
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
          <a href="#overview" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            1. Overview
          </a>
          <a href="#how-it-works" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            2. How It Works
          </a>
          <a href="#architecture" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            3. Architecture
          </a>
          <a href="#features" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            4. Features
          </a>
          <a href="#use-cases" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            5. Use Cases
          </a>
          <a href="#best-practices" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            6. Best Practices
          </a>
          <a href="#standards" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            7. Standards
          </a>
          <a href="#faqs" className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            8. FAQs
          </a>
        </div>
      </nav>

      {/* Main Content Sections */}
      <div className="space-y-12">
        {/* Section 1: Overview */}
        <section id="overview" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              1. Overview: What is {article.toolName}?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {article.overview}
          </p>
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 space-y-1">
            <strong>Key Benefit:</strong> Unlike traditional web utilities that upload your files to third-party cloud servers (introducing latency and privacy concerns), {article.toolName} executes directly in your browser. No files or personal data are ever transmitted or saved remotely.
          </div>
        </section>

        {/* Section 2: How It Works (Step-by-Step) */}
        <section id="how-it-works" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              2. Step-by-Step: How to Use {article.toolName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.workingSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Step {step.stepNumber}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
                {step.tip && (
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-1">
                    💡 Pro Tip: {step.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Technical Architecture & Working Mechanism */}
        <section id="architecture" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              3. Under the Hood: Working Mechanism & Privacy
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {article.workingMechanism.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {article.workingMechanism.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                  Technology Stack:
                </span>
                <ul className="space-y-1.5 text-xs text-purple-900 dark:text-purple-200 font-mono">
                  {article.workingMechanism.technologyStack.map((tech, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                  Zero-Knowledge Privacy:
                </span>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {article.workingMechanism.privacyBenefit}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Key Features */}
        <section id="features" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              4. Key Features & Core Advantages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.features.map((feat, idx) => (
              <div key={idx} className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Real-World Use Cases */}
        <section id="use-cases" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              5. Real-World Use Cases & Applications
            </h2>
          </div>

          <div className="space-y-4">
            {article.useCases.map((uc, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {uc.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Scenario:</strong> {uc.scenario}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Benefit: {uc.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Best Practices & Tips */}
        <section id="best-practices" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              6. Best Practices & Pro Tips
            </h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            {article.bestPractices.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 7: Working Tags & Topic Keywords */}
        <section id="tags" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              7. Working Tags & Topic Keywords
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            These keywords and tags are utilized for indexing, semantic search, and related utility recommendations:
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles`}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Section 8: Interactive Tool Launch Banner (High-Authority Internal Backlink) */}
        <section className="rounded-3xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-12 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct Online Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to use {article.toolName}?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Launch the interactive utility right now in your web browser. Free forever, no registration required, and 100% private.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={article.backlinks.toolUrl}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-950 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Launch {article.toolName} Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={article.backlinks.categoryUrl}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-sm transition-colors border border-white/20"
            >
              <span>Explore All {article.categoryName}</span>
            </Link>
          </div>
        </section>

        {/* Section 9: Authoritative Web Standards & External Backlinks */}
        <section id="standards" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              8. Authoritative Web Standards & References
            </h2>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {article.toolName} adheres strictly to published international open web and software standards:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {article.backlinks.webStandards.map((std, idx) => (
              <a
                key={idx}
                href={std.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 hover:border-blue-500/40 hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    {std.organization}
                  </span>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{std.name}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-1" />
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                    {std.description}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 pt-3 block font-mono">
                  Read official specification &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Section 10: Frequently Asked Questions (FAQ) */}
        <section id="faqs" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              9. Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {article.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 space-y-2"
              >
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10: On-Demand Tool Roadmap & Community Requests */}
        <section className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-indigo-950/30 dark:via-gray-900 dark:to-purple-950/20 p-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Continuously Expanding Platform</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                More Tools & Guides Added Regularly On-Demand
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Need a specific converter, calculator, or media tool that isn&apos;t listed yet? Zevylo is actively expanding. We build and deploy new browser-powered, privacy-first utilities directly based on user demand, community suggestions, and custom workflow requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Suggest a Tool On-Demand</span>
            </Link>
          </div>
        </section>

        {/* Section 11: Related Tools & Internal Backlinks Interlinking Network */}
        <section id="related-tools" className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              10. Related Tools & Interlinking Guides Network
            </h2>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Explore complementary utilities in the {article.categoryName} suite. Each tool includes full in-browser processing and dedicated guide documentation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {article.backlinks.relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50 flex flex-col justify-between hover:border-blue-500/40 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <ToolIcon
                    slug={rel.slug}
                    category={rel.category}
                    name={rel.toolName}
                    size="sm"
                    className="shrink-0"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {rel.toolName}
                    </h3>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                  <Link
                    href={rel.articleUrl}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Read Guide &rarr;
                  </Link>

                  <Link
                    href={rel.toolUrl}
                    className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                  >
                    <span>Use Tool</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
