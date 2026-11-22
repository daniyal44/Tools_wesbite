import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Zevylo',
  description:
    'Terms of Service for Zevylo: acceptable use, tool limitations, accuracy disclaimers, intellectual property, third-party links, availability, and contact.',
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
          Last updated: 20 November 2026
        </p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Acceptance</h2>
          <p>
            Zevylo is operated by Muhammad Daniyal as an independent project. By using the site,
            you agree to these terms. If you do not agree, do not use the site. These terms apply
            to the website and its browser utilities, not to third-party products linked from the
            AI directory.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. Acceptable use</h2>
          <p>You may use Zevylo for personal, educational, and commercial work. You may not:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Use a tool to break the law, infringe another person&apos;s rights, or process material you have no right to process.</li>
            <li>Attempt to disrupt the site, bypass rate limits, scrape it at volume, or probe it for vulnerabilities without permission.</li>
            <li>Use generated output to impersonate a person, commit fraud, or create deceptive documents such as fake invoices or forged identification.</li>
            <li>Present AI-assisted writing as guaranteed detector-proof, academically acceptable, or factually verified. You remain responsible for reviewing output before you rely on it.</li>
            <li>Remove or misrepresent authorship, copyright notices, or licensing terms in material you process.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Tool behaviour and limits</h2>
          <p>
            Most tools run in your browser. Their speed and capacity depend on your device, browser
            version, available memory, and the size and format of your input. Large files may fail
            even when a smaller file of the same type succeeds. No tool promises unlimited file
            size, unlimited batch size, or a particular processing time.
          </p>
          <p>
            Some tools support a narrower set of formats than others, and browser support for
            codecs and APIs varies. Where a tool states supported inputs, those statements describe
            the intended behaviour, not a guarantee for every file.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Accuracy of calculations and generated content</h2>
          <p>
            Calculators, converters, generators, and AI-assisted writing utilities are provided for
            convenience. Verify important results independently before relying on them for
            financial, legal, medical, security, or academic decisions. Cryptographic tools
            implement standard browser APIs, but no output should be treated as a security audit.
          </p>
          <p>
            AI-assisted tools produce suggestions, not facts. They do not verify claims, citations,
            originality, or plagiarism status.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. Intellectual property</h2>
          <p>
            The Zevylo name, interface, original text, and site code are protected by applicable
            intellectual property law. You keep all rights to content you bring to a tool. We claim
            no ownership of your inputs or outputs. Open-source libraries used by the site remain
            under their own licences.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">6. Third-party links and services</h2>
          <p>
            The AI directory and resource pages link to external websites. We do not control those
            sites, their availability, pricing, or data practices, and a listing is not an
            endorsement. Product prices and features change; always confirm details on the
            official website. The site also relies on third-party infrastructure for hosting and
            advertising, as described in the{' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">7. Availability and changes</h2>
          <p>
            Tools may be added, changed, or removed at any time. The site may be unavailable during
            maintenance or due to hosting failures. We do not guarantee continuous availability or
            that a specific tool will remain online. Where a tool is retired, we aim to redirect
            its URL to a relevant replacement rather than leave a dead link.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">8. Advertising and Affiliate Disclosure</h2>
          <p>
            The site is supported by advertising served through Google AdSense (publisher ID:
            <code>ca-pub-5869892726772309</code>). Ads are labelled as &quot;Sponsored&quot; or &quot;Ad&quot; and are
            not part of a tool&apos;s controls. Do not click ads in order to support the site; doing
            so is prohibited by advertising networks and can harm the site.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Zevylo does not participate in any affiliate marketing programs, sponsored tool
                reviews, or paid placements in the AI directory. Listings are based on public
                information only.
            </li>
            <li>
              Google&apos;s advertising cookies may be used to serve ads based on your visit
                history. You can opt out via Google Ads Settings or the About Ads portal.
            </li>
          </ul>
          <p>
            This disclosure is provided to meet AdSense program requirements and FTC guidelines
            for transparent advertising and affiliate relationships. Google reviews this information
            during the AdSense approval and compliance process.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">9. Disclaimer and limitation of liability</h2>
          <p>
            The site and tools are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
            without warranties of any kind, express or implied, including fitness for a particular
            purpose. To the maximum extent permitted by law, the operator is not liable for
            indirect, incidental, or consequential loss arising from use of the site, including
            lost data, lost profits, or decisions made using a tool&apos;s output. Nothing in these
            terms excludes liability that cannot lawfully be excluded.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">10. Changes to these terms</h2>
          <p>
            These terms may be updated as the site changes. The revision date at the top of the
            page indicates the current version. Continued use after an update means you accept the
            revised terms.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">11. Contact and complaints</h2>
          <p>
            Questions, complaints, and takedown requests can be sent through the{' '}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">
              contact form
            </Link>{' '}
            or by email to{' '}
            <a
              href="mailto:m.daniyalkhan490@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              m.daniyalkhan490@gmail.com
            </a>
            . Include the URL and a clear description of the issue so it can be investigated.
          </p>
        </section>
      </div>
    </div>
  );
}
