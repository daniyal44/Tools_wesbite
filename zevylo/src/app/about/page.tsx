import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Zevylo — One Place. Every Useful Tool.',
  description:
    'Learn about Zevylo, our mission to build a fast, private, and bloat-free global utility platform with client-side processing.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          Our Mission
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          About Zevylo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          One place. Every useful tool.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Why Zevylo Exists</h2>
          <p>
            The modern internet is flooded with online tools buried beneath aggressive ads, paywalls, mandatory accounts, and suspicious server tracking. Formatting a JSON payload, generating a secure password, or calculating a profit margin shouldn&apos;t require surrendering your data or clicking through endless popups.
          </p>
          <p>
            <strong>Zevylo</strong> was built with a clear philosophy: <em>Utility &gt; Quality &gt; Speed &gt; Discoverability &gt; Trust</em>. We build tools that launch immediately, do their job without fuss, and respect your privacy.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Privacy by Design</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browser-local execution ensures your passwords, tokens, code, and documents never touch a remote server.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Sub-second Speed</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Zero network latency on client operations. Instant calculations and live reactive previews as you type.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Zero Bloat</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No subscription traps, no sign-up barriers, no intrusive trackers. Clean, focused interfaces for every task.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Continuous Growth</h2>
          <p>
            Zevylo is powered by an extensible tool registry architecture. From developer formatters to financial calculators, cryptographic generators to SEO diagnostics, new tools are designed and tested to rigorous quality gates.
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Full keyboard shortcut support (press <strong>⌘K</strong> / <strong>Ctrl+K</strong> anytime to search)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Fluid light and dark mode with persistent user preference</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Mobile-first responsive design tested on phones, tablets, and desktops</span>
            </li>
          </ul>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Explore Tools
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Suggest a Tool
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
