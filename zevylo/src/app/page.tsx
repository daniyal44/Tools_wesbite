import Link from 'next/link';
import { Metadata } from 'next';
import '@/tools';
import { categoryList } from '@/lib/tools/categories';
import { getToolsByCategory, getAllTools } from '@/lib/tools/registry';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { UserToolsStrip } from '@/components/tools/user-tools-strip';
import { ShieldCheck, Zap, Sparkles, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { ToolIcon } from '@/components/tools/tool-icon';

export const metadata: Metadata = {
  title: 'Zevylo — Free Online Tools That Run in Your Browser',
  description:
    `${getAllTools().length} free online tools across ${categoryList.length} categories. Convert, calculate, generate, and analyze in your browser, with no account required.`,
  openGraph: {
    title: 'Zevylo — Free Online Tools That Run in Your Browser',
    description: `${getAllTools().length} free browser tools across ${categoryList.length} categories. Most processing happens on your device, with no account and no queue.`,
    url: 'https://zevylo.netlify.app',
    type: 'website',
    siteName: 'Zevylo',
    images: [
      {
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
        width: 1200,
        height: 630,
        alt: `Zevylo — ${getAllTools().length} Free In-Browser Online Tools`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zevylo — Free Online Tools That Run in Your Browser',
    description: `${getAllTools().length} free browser tools across ${categoryList.length} categories. No account required.`,
    images: ['https://zevylo.netlify.app/images/Zevylo_logo.png'],
  },
  verification: {
    google: 'Q-Zq3sa2VtEBVvj8sRF0IafUtF7MqAUbl8JoG_q_H3Q',
  },
  alternates: {
    canonical: 'https://zevylo.netlify.app',
  },
  other: {
    'google-site-verification': 'Q-Zq3sa2VtEBVvj8sRF0IafUtF7MqAUbl8JoG_q_H3Q',
    'image': 'https://zevylo.netlify.app/images/Zevylo_logo.png',
  },
};

const popularTools = [
  { name: 'AI Prompt Crafter & Styler', slug: 'ai-prompt-generator', category: 'ai', badge: 'Trending', description: 'Engineer photorealistic prompts for Midjourney v6, Flux, and DALL-E 3' },
  { name: 'AI Writing Clarity Editor', slug: 'ai-humanizer', category: 'ai', badge: 'Popular', description: 'Revise repetitive AI-assisted drafts for clearer, more varied prose' },
  { name: 'Draft Pattern & Readability Inspector', slug: 'ai-content-detector', category: 'ai', badge: 'New', description: 'Surface repetition, sentence variance, and readability signals in a draft' },
  { name: 'AI Code Explainer & Converter', slug: 'ai-code-assistant', category: 'ai', badge: 'New', description: 'Deconstruct algorithms, audit edge-cases, and translate code' },
  { name: 'AI Plain English to SQL & Regex', slug: 'ai-sql-regex-generator', category: 'ai', badge: 'Popular', description: 'Generate PostgreSQL, MySQL, and SQLite queries from natural language' },
  { name: 'AI Article & Blog Outline Generator', slug: 'ai-article-writer', category: 'ai', badge: 'Trending', description: 'Generate high-ranking article outlines, headlines, and hooks' },
  { name: 'Video to High-Res Frames', slug: 'video-to-frames', category: 'video', badge: 'New', description: 'Extract individual image frames from MP4, WebM, and MOV' },
  { name: 'Free Resume & CV Builder', slug: 'resume-cv-builder', category: 'business', badge: 'Popular', description: 'Build ATS-friendly resumes with 1-click Print to PDF & Word DOC' },
  { name: 'Image Background Remover', slug: 'image-background-remover', category: 'image', badge: 'Popular', description: 'Key out solid backdrops and create transparent PNG photos' },
  { name: 'PDF to Image Converter', slug: 'pdf-to-image', category: 'pdf', badge: 'New', description: 'Convert PDF pages into high-resolution PNG, JPG, or WebP' },
  { name: 'Real-Time Voice to Text', slug: 'voice-to-text', category: 'audio', badge: 'New', description: 'Microphone dictation transcriber with instant TXT export' },
  { name: 'Code 128 Barcode Generator', slug: 'barcode-generator', category: 'generators', badge: 'Popular', description: 'Create retail barcodes with vector SVG and high-res PNG export' },
];

export default function HomePage() {
  const totalTools = getAllTools().length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{totalTools} free tools across {categoryList.length} categories • No signup required</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 max-w-4xl mx-auto leading-tight">
            One place. <span className="text-blue-600 dark:text-blue-500">Every useful tool.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Convert files, calculate finances, extract video frames, revise drafts, and build resumes. Most tools run in your browser, with no account and no queue.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors w-full sm:w-auto"
            >
              Browse All {totalTools} Tools
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-3.5 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Explore {categoryList.length} Categories
            </Link>
          </div>

          {/* Quick Stats Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Browser-local tools</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>No queues</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-sky-500" />
              <span>No signup or card</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Retention & Personalization Strip (Favorites ⭐ & Recently Used 🕒) */}
      <UserToolsStrip />

      {/* Popular & Trending Tools */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                Popular & Trending Utilities
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Frequently used utilities from across the directory
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View all {totalTools} tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.category}/${tool.slug}`}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <ToolIcon
                      slug={tool.slug}
                      category={tool.category}
                      name={tool.name}
                      size="md"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                        {tool.badge}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>Open tool</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Complete 18 Categories Directory */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Browse All {categoryList.length} Categories
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Find exactly what you need in seconds with zero clutter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryList.map((cat) => {
              const count = getToolsByCategory(cat.id).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <ToolIcon category={cat.id} size="sm" className="rounded-xl" />
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {count} tools
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Discovery & Toolify Ecosystem Showcase */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-indigo-950/20 via-blue-950/10 to-transparent border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-8 sm:p-14 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-indigo-200 backdrop-blur-sm border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>The AI Revolution Directory • Powered by Zevylo</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Explore {AI_TOOLS_DATABASE.length}+ Global AI Tools from A to Z
                </h2>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                  Discover AI software across {AI_CATEGORIES.length} categories, filter by pricing, and jump to official product sites. Listings are compiled from public information and can change; verify details with each vendor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/ai-tools"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <span>Explore AI Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-tools/categories"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors border border-white/20"
                >
                  <span>{AI_CATEGORIES.length} AI Categories</span>
                </Link>
              </div>
            </div>

            {/* Quick Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-amber-300 font-bold block mb-1">🤖 AI Frontier Models</span>
                <span className="text-blue-100 text-[11px]">Claude 3.5, ChatGPT, Gemini, Perplexity</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-purple-300 font-bold block mb-1">🎨 Generative Art</span>
                <span className="text-blue-100 text-[11px]">Midjourney, Flux.1, DALL-E 3, Leonardo</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-emerald-300 font-bold block mb-1">💻 Next-Gen Code</span>
                <span className="text-blue-100 text-[11px]">Cursor AI, Bolt.new, Copilot, v0.dev</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-rose-300 font-bold block mb-1">🎬 Video &amp; Voice</span>
                <span className="text-blue-100 text-[11px]">Runway Gen-3, Kling, ElevenLabs, Suno</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Zevylo — Competitive Superiority */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950/40 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              How Zevylo Is Different
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              What the tools do, and what they do not claim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Browser-Local Tools
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Your tool inputs are read and processed in the page. Zevylo has no application server that receives your files or pasted text.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> No tool-input uploads
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                No Queue or Account
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                No upload queue, wait timer, or forced sign-up. Processing time depends on the file and your device, not on a remote server.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Runs on your device
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Free, With Advertising
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                No subscription and no credit card. The site is supported by clearly separated advertising, kept apart from tool controls.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> No paywall
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On-Demand Roadmap & Tool Suggestion CTA */}
      <section className="py-16 sm:py-20 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white p-8 sm:p-14 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Continuous Engineering Roadmap</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                More Tools Added in Future on Demand &amp; User Requirements
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Missing a specific file converter, PDF utility, calculator, or developer generator? Tell us what you need and it will be considered for the roadmap. New tools are published when they work, not to inflate the counter.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-1">
                <span>✓ User-requested features prioritized</span>
                <span>✓ Tool inputs stay in your browser</span>
                <span>✓ No account required</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
              >
                <span>Request a Tool On-Demand</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-semibold text-sm transition-colors border border-white/20"
              >
                <span>Browse All {totalTools} Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
