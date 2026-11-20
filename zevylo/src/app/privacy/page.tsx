import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zevylo',
  description:
    'How Zevylo handles data: browser-local tool processing, local storage, contact form submissions, hosting logs, and Google AdSense advertising cookies.',
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
          Transparent &amp; Specific
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: 20 November 2026
        </p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">1. Who operates Zevylo</h2>
          <p>
            Zevylo is an independent collection of browser-based utilities operated by Muhammad
            Daniyal, an individual developer. For any privacy question or request, contact{' '}
            <a
              href="mailto:m.daniyalkhan490@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              m.daniyalkhan490@gmail.com
            </a>{' '}
            or use the{' '}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">
              contact form
            </a>
            . Zevylo does not operate as a registered company and does not claim any company
            registration, address, or certification it does not hold.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">2. How tool inputs are processed</h2>
          <p>
            Every utility listed on Zevylo is built to run inside your browser. Text you type,
            files you select, and settings you change are read by JavaScript in the page and
            processed on your device. Tool inputs are not sent to a Zevylo server, because Zevylo
            has no application server that receives tool content.
          </p>
          <p>
            This means uploaded files are not stored by us and cannot be recovered by us. It also
            means processing is limited by your device&apos;s memory, CPU, and browser. Very large
            files may fail on low-memory devices even though no upload occurs.
          </p>
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
            <strong>What this does not mean:</strong> Zevylo is not offline software. Pages,
            scripts, fonts, images, and advertising are requested over the internet, and the site
            is served by a third-party host. Your IP address and request metadata are visible to
            those providers.
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">3. Information we do not collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tool input and output values (text, passwords, tokens, code, hashes, QR payloads)</li>
            <li>Files you open in a tool, including images, PDFs, audio, and video</li>
            <li>Accounts, passwords, payment details, or billing information — there are none</li>
            <li>Precise location, contacts, microphone, or camera data unless a tool explicitly asks your browser for permission (for example, the screen recorder or voice dictation tool)</li>
          </ul>
          <p>
            When a tool such as the screen recorder asks for microphone, camera, or screen access,
            the browser prompts you and you can decline. The recording stays in your browser until
            you download it.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">4. Local storage on your device</h2>
          <p>
            Zevylo uses your browser&apos;s <code>localStorage</code> to remember preferences. It is
            stored only in your browser profile and is not transmitted to us:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><code>zevylo-theme</code> — light or dark theme choice</li>
            <li><code>zevylo_favorite_tools</code> — tools you star</li>
            <li><code>zevylo_recent_tools</code> — tools you recently opened</li>
            <li><code>zevylo_tool_feedback</code> — your local yes/no feedback on tools</li>
            <li><code>zevylo_saved_ai_tools</code> — AI directory entries you bookmark</li>
            <li><code>zevylo_retro_cards</code> — cards in the sprint retrospective tool</li>
          </ul>
          <p>
            You can clear this at any time through your browser&apos;s site-data settings. Clearing
            it removes your preferences and history for this site.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">5. Contact form</h2>
          <p>
            The contact form is handled by Netlify Forms, a service provided by Netlify, Inc. When
            you submit the form, the topic, your message, and any name or email address you choose
            to provide are transmitted to and stored by Netlify on our behalf. Submissions are used
            only to read feedback, respond if you provided an email address, and plan new tools.
          </p>
          <p>
            Name and email are optional. Do not include sensitive personal information in a
            message. Submissions are retained for as long as needed to review feedback and are not
            sold or used for marketing lists.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">6. Hosting and server logs</h2>
          <p>
            Zevylo is hosted on Netlify. Like most hosting providers, Netlify processes technical
            request data such as IP address, user agent, requested URL, and timestamp in order to
            deliver the site, prevent abuse, and produce aggregate traffic statistics. We do not
            combine those logs with tool inputs, which we never receive.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">7. Advertising and cookies</h2>
          <p>
            Zevylo uses Google AdSense (publisher ID <code>ca-pub-5869892726772309</code>) to
            support the site. Google and its advertising partners may use cookies, web beacons, IP
            addresses, and device identifiers to serve ads, limit how often an ad is shown, measure
            ad performance, and — where you have consented — personalize advertising based on your
            visits to this and other websites.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a
              user&apos;s prior visits to this website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to
              you based on your visit to this site and/or other sites on the internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                Google Ads Settings
              </a>
              . You can also opt out of some third-party vendors&apos; use of cookies for
              personalized advertising at{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                aboutads.info/choices
              </a>
              .
            </li>
            <li>
              Google&apos;s explanation of how it uses information from sites that use its services
              is available at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                policies.google.com/technologies/partner-sites
              </a>
              .
            </li>
          </ul>
          <p>
            Where regional law requires consent for advertising cookies (for example in the EEA,
            the UK, and Switzerland), personalized advertising must not be requested until consent
            is obtained through a Google-certified consent message. As of the date above, no ad
            units are displayed on Zevylo; the AdSense script is installed for account review.
            This section describes the practices that apply when advertising is enabled. Blocking
            advertising cookies does not prevent you from using any Zevylo tool.
          </p>
          <p>
            We do not control third-party cookies, and this policy does not describe every data
            practice of Google or its partners. Please review Google&apos;s Privacy Policy for
            details.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">8. Analytics and other third parties</h2>
          <p>
            Zevylo does not currently run a separate analytics product, session recorder, or
            marketing pixel. The third parties that may receive technical data through normal use
            of the site are Netlify (hosting and form processing) and Google (advertising). Fonts
            and icons used by the interface are bundled with the site rather than loaded from a
            third-party font service.
          </p>
          <p>
            The AI directory links to external products. Opening those links takes you to a site
            with its own privacy policy, which we do not control. Zevylo does not currently use
            affiliate links in the AI directory.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">9. Children</h2>
          <p>
            Zevylo is a general-audience utility site and is not directed at children under 13. We
            do not knowingly collect personal information from children. If you believe a child
            submitted personal information through the contact form, contact us and we will delete
            it.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">10. Your choices and rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete, or
            object to processing of personal data, and to lodge a complaint with a supervisory
            authority. Because we hold almost no personal data, most requests will concern contact
            form submissions or advertising cookies. Write to{' '}
            <a
              href="mailto:m.daniyalkhan490@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              m.daniyalkhan490@gmail.com
            </a>{' '}
            and we will respond within a reasonable period.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">11. Changes to this policy</h2>
          <p>
            We update this policy when the implementation changes, for example when a new
            third-party service is added. The date at the top of this page reflects the latest
            revision. Material changes will be described on this page rather than silently applied.
          </p>
        </section>
      </div>
    </div>
  );
}
