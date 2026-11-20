import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Wrench, Bug, Mail, FileText, Code2 } from 'lucide-react';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';

const TOOL_COUNT = getAllTools().length;

export const metadata: Metadata = {
  title: 'About Zevylo — Browser Tools, Who Runs It, and How They Are Built',
  description:
    'What Zevylo is, who operates it, how the browser tools are built and tested, what they do not claim, and how to report a problem.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          <Wrench className="w-3.5 h-3.5" />
          About the project
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          About Zevylo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          One place. Every useful tool.
        </p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">What Zevylo is</h2>
          <p>
            Zevylo is a collection of {TOOL_COUNT} browser-based utilities across{' '}
            {categoryList.length} categories: text and developer helpers, image and PDF tools,
            calculators, converters, generators, and audio/video utilities. Most pages open a
            working tool directly rather than a sign-up wall.
          </p>
          <p>
            The project is operated by <strong>Muhammad Daniyal</strong>, an independent developer.
            It is not a registered company and does not claim company registration, offices, staff,
            certifications, or user numbers it does not have. The site is funded by advertising.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Browser-local tools</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tool inputs are processed in the page. The site has no application server that
              receives your files or pasted text.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">No account required</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No sign-up, no credit card, and no queue. Speed depends on your device and the size
              of the input, not on a server queue.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Stated limits</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tools describe what they support. Large files can fail on low-memory devices, and no
              tool promises unlimited size or a fixed processing time.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How the tools are built and tested</h2>
          <p>
            The interface is built with Next.js and React. Individual tools use standard browser
            APIs — Canvas, Web Crypto, File and Blob APIs, MediaRecorder, Web Audio — together with
            open-source libraries such as pdf-lib, pdfjs-dist, heic2any, and qrcode. A tool&apos;s
            page states its actual processing model; nothing is uploaded to a server to make a tool
            appear to work.
          </p>
          <p>
            Tools are tested manually with real sample files and edge-case inputs before release.
            That testing is not exhaustive and cannot cover every browser, codec, or malformed
            file. If a tool does not do what its description says, report it and the description or
            the tool will be corrected — a broken tool is not kept online to inflate a tool count.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">What Zevylo does not claim</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>That every result is accurate. Calculators and converters are aids; verify important figures independently.</li>
            <li>That AI-assisted writing is undetectable, plagiarism-free, or accepted by any institution.</li>
            <li>That the site has no third-party requests. Advertising and hosting providers receive technical request data; see the <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link>.</li>
            <li>That a listed third-party AI product is endorsed by Zevylo. Directory entries link to official sites and can change without notice.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Report a problem or request a tool</h2>
          <p>
            Bug reports, incorrect descriptions, and tool requests go to the same place. Include
            the tool name, your browser, the input type, and what happened. Reports about a broken
            or misleading tool are treated as priority work.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-colors"
            >
              <Bug className="w-4 h-4" />
              Report an issue
            </Link>
            <a
              href="mailto:m.daniyalkhan490@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-2.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email directly
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Site information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Code2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <span className="block font-semibold text-gray-900 dark:text-gray-100">Operator</span>
                <span className="text-gray-500 dark:text-gray-400">Muhammad Daniyal, independent developer</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <span className="block font-semibold text-gray-900 dark:text-gray-100">Policies</span>
                <span className="text-gray-500 dark:text-gray-400">
                  <Link href="/privacy" className="underline">Privacy</Link> and{' '}
                  <Link href="/terms" className="underline">Terms</Link>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
