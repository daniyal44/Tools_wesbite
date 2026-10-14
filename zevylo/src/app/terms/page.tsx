import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Zevylo',
  description: 'Terms of Service and acceptable use conditions for the Zevylo utility platform.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Zevylo, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. Permitted Use</h2>
          <p>
            Zevylo provides digital utilities for personal, educational, research, and commercial purposes. You agree to use these tools lawfully and not for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attempting unauthorized disruption, denial-of-service, or automated scraping of the site</li>
            <li>Generating deceptive or harmful payloads designed to exploit vulnerabilities</li>
            <li>Any activity violating regional or international regulations</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Disclaimer of Warranties</h2>
          <p>
            All tools and calculations on Zevylo are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. While we rigorously test all algorithms (such as financial calculators, hash generators, and unit converters), you should verify critical calculations before making major financial, legal, or cryptographic decisions.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Modifications</h2>
          <p>
            We reserve the right to update these Terms of Service as new tools and capabilities are added. Continued use after changes represents acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
