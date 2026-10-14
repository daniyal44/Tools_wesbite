import { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  Globe,
  Terminal,
  Clock,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Engineering Knowledge Base | Zevylo',
  description:
    'Deep technical analysis, AI model architecture breakdowns, client-side WebAssembly engineering, and global tech industry insights from the Zevylo engineering team.',
  openGraph: {
    title: 'Zevylo Blog & Engineering Knowledge Base',
    description:
      'Frontier AI analysis, model benchmark breakdowns, browser-based WebAssembly architectures, and release roadmaps.',
    url: '/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

const FEATURED_POSTS = [
  {
    title: 'Claude 3.7 Opus vs. GPT-5 Orion: Frontier Reasoning & Architecture Breakdown',
    slug: 'claude-3-7-opus',
    category: 'Frontier AI Research',
    date: 'October 14, 2026',
    readTime: '12 min read',
    excerpt:
      'An exhaustive architectural comparison of Anthropic’s dynamic test-time compute hybrid model versus OpenAI’s next-generation multimodal agentic architecture. We break down token economics, benchmark projections, and developer implications.',
    tag: 'Deep Dive',
    link: '/ai-tools/article/claude-3-7-opus',
  },
  {
    title: 'OpenClaw: The Local Autonomous Personal AI Assistant Operating via WhatsApp & Desktop',
    slug: 'open-claw',
    category: 'Autonomous Agents',
    date: 'October 13, 2026',
    readTime: '10 min read',
    excerpt:
      'Why OpenClaw is capturing developer mindshare worldwide: running locally with zero cloud telemetry, orchestrating inboxes, calendar bookings, and flights directly through chat apps without recurring subscription fees.',
    tag: 'Open Source',
    link: '/ai-tools/article/open-claw',
  },
  {
    title: 'The Open-Weights Paradigm: DeepSeek R1, Qwen 2.5 & the Democratization of AGI',
    slug: 'deepseek-ai',
    category: 'Open Source LLMs',
    date: 'October 11, 2026',
    readTime: '14 min read',
    excerpt:
      'How Chinese and international open-weights models are matching proprietary frontier systems on MATH and HumanEval, altering the economics of enterprise inference and on-premise deployments.',
    tag: 'Ecosystem Shift',
    link: '/ai-tools/article/deepseek-ai',
  },
  {
    title: '100% In-Browser Privacy: How WebAssembly & Web Workers Power 206+ Online Tools with Zero Server Uploads',
    slug: 'client-side-architecture',
    category: 'Web Engineering',
    date: 'October 8, 2026',
    readTime: '8 min read',
    excerpt:
      'A look under the hood of Zevylo: compile FFmpeg to WebAssembly, execute client-side cryptography, and parse multi-gigabyte media files purely in RAM without transmitting a single byte to an external server.',
    tag: 'Architecture',
    link: '/articles',
  },
  {
    title: 'Sovereign AI in the Middle East: Inside UAE’s Falcon 3 and Jais Arabic LLMs',
    slug: 'falcon-ai',
    category: 'Sovereign AI',
    date: 'October 6, 2026',
    readTime: '11 min read',
    excerpt:
      'How the Technology Innovation Institute (TII) and G42 in Abu Dhabi have engineered bilingual foundational models that excel on Arabic and English reasoning benchmarks with open foundation model weights.',
    tag: 'Global Tech',
    link: '/ai-tools/article/falcon-ai',
  },
  {
    title: 'AI Coding IDEs Compared: Cursor AI vs GitHub Copilot vs OpenAI Canvas',
    slug: 'cursor-ai',
    category: 'Developer Velocity',
    date: 'October 3, 2026',
    readTime: '9 min read',
    excerpt:
      'We benchmark multi-file codebase indexing, shadow workspace speculative edits, and context window efficiency across the leading AI coding assistants of 2026.',
    tag: 'Developer Tools',
    link: '/ai-tools/article/cursor-ai',
  },
];

export default function BlogHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Zevylo Engineering & AI Blog',
    description:
      'Deep architectural analysis, model benchmarks, and client-side web engineering insights.',
    url: 'https://zevylo.netlify.app/blog',
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Blog &amp; Knowledge Base
        </span>
      </nav>

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 p-8 sm:p-14 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Zevylo Engineering &amp; AI Intelligence Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Frontier AI Analysis, Benchmarks &amp; Web Engineering
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Technical perspectives on foundation models, agentic workflows, WebAssembly client-side privacy, token economics, and global AI governance.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/ai-tools/article"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Browse 286 AI Model Reviews</span>
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse 206 Tool Guides</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hub Quick Navigation Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          href="/ai-tools/article"
          className="group rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 dark:from-blue-950/30 dark:via-gray-900 dark:to-indigo-950/20 p-6 sm:p-8 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>286 Dedicated AI Reviews</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              AI Tools &amp; Model Architecture Articles
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
              MMLU/HumanEval benchmarks, context windows, token pricing, and roadmaps for Claude, Codex, Cursor, Grok, Open-Claw &amp; 280+ tools.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1.5 transition-transform shrink-0 ml-4" />
        </Link>

        <Link
          href="/articles"
          className="group rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/40 dark:from-gray-900/40 dark:via-gray-900 dark:to-gray-800/20 p-6 sm:p-8 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>206 Engineering Tutorials</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              In-Browser Utilities &amp; Privacy Guides
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
              Step-by-step guides for video frame extraction, JSON formatting, background removal, and client-side security tools.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400 transform group-hover:translate-x-1.5 transition-transform shrink-0 ml-4" />
        </Link>
      </div>

      {/* Featured Editorial Articles Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
            Featured Engineering &amp; AI Industry Articles
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Carefully researched editorial essays analyzing the technology shaping computing in 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_POSTS.map((post) => (
            <article
              key={post.title}
              className="group rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  <Link href={post.link}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-400">{post.date}</span>
                <Link
                  href={post.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
