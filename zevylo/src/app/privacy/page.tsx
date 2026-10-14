import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zevylo',
  description:
    'Read Zevylo’s transparent Privacy Policy. Understand how client-side processing keeps your passwords, tokens, and data strictly in your browser.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          Local-First & Transparent
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Core Privacy Pledge</h2>
          <p>
            At Zevylo, privacy is not an afterthought or marketing disclaimer—it is fundamental to our software design.
            The vast majority of utilities on Zevylo run <strong>entirely within your web browser</strong> using client-side JavaScript, Web APIs, and Web Crypto.
          </p>
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
            <strong>Key Guarantee:</strong> Your passwords, tokens, JSON structures, hashes, and text snippets are processed directly on your device. We do not transmit, log, record, or store them on any server.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. Information We Do Not Collect</h2>
          <p>We do not collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
            <li>Any tool input values (passwords, JWT tokens, source code, text diff inputs)</li>
            <li>Any tool output values (generated hashes, QR code payloads, UUIDs)</li>
            <li>Personal identifying information unless you explicitly submit our contact form</li>
            <li>Biometric or payment data</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Local Storage and Preferences</h2>
          <p>
            Zevylo uses your browser&apos;s <code>localStorage</code> purely to remember your theme preference (Light or Dark mode) and optional tool presets (such as recent UTM templates). This information remains stored strictly on your local browser and is never uploaded.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Third-Party Requests</h2>
          <p>
            Zevylo does not sell, lease, or distribute your information to data brokers, ad networks, or external parties. Assets (such as fonts and icons) are bundled locally wherever possible to eliminate unnecessary third-party telemetry.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. Contact Information</h2>
          <p>
            If you have questions regarding our privacy practices or wish to suggest security enhancements, please reach out via our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
