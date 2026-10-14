import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ExternalLink, Globe, BookOpen, Shield, Code, Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Standards & Developer Resources Directory | Zevylo',
  description:
    'Curated directory of authoritative web standards, developer documentation, security guidelines, and open-source utility partnerships. Connect and exchange backlinks with Zevylo.',
  openGraph: {
    title: 'Developer Resources & Backlink Directory | Zevylo',
    description: 'Authoritative web specifications, developer references, and partner link directory.',
    type: 'website',
  },
};

const resourceCategories = [
  {
    category: 'Web Specifications & Standards',
    icon: Globe,
    description: 'Foundational bodies governing the open internet, media codecs, and browser standards.',
    links: [
      { name: 'World Wide Web Consortium (W3C)', url: 'https://www.w3.org', desc: 'International standards for HTML5, CSS3, SVG, and accessibility (WCAG).' },
      { name: 'MDN Web Docs (Mozilla)', url: 'https://developer.mozilla.org', desc: 'Definitive developer documentation for JavaScript, Web APIs, Canvas, and CSS.' },
      { name: 'Internet Engineering Task Force (IETF)', url: 'https://www.ietf.org', desc: 'RFC protocol specifications for HTTP/2, HTTP/3, MIME types, and TLS/SSL.' },
      { name: 'Unicode Consortium', url: 'https://home.unicode.org', desc: 'Official character encodings, UTF-8 standards, emoji mappings, and glyph tables.' },
    ],
  },
  {
    category: 'Browser Compatibility & Performance',
    icon: Code,
    description: 'Tools and matrix databases tracking feature support and Core Web Vitals.',
    links: [
      { name: 'Can I Use...', url: 'https://caniuse.com', desc: 'Up-to-date browser support tables for modern desktop and mobile web technologies.' },
      { name: 'web.dev by Google', url: 'https://web.dev', desc: 'Guidance and benchmarks for Core Web Vitals, progressive web apps, and page speed.' },
      { name: 'Google Search Central', url: 'https://developers.google.com/search', desc: 'Official documentation for Google indexing, structured data schemas, and crawlability.' },
      { name: 'Schema.org', url: 'https://schema.org', desc: 'Universal vocabulary for structured data markup used by Google, Bing, and search engines.' },
    ],
  },
  {
    category: 'Security, Privacy & Open Source Codecs',
    icon: Shield,
    description: 'Cryptographic benchmarks and media processing standards.',
    links: [
      { name: 'OWASP Foundation', url: 'https://owasp.org', desc: 'Open Worldwide Application Security Project standards for web vulnerability prevention.' },
      { name: 'FFmpeg Multimedia Framework', url: 'https://ffmpeg.org', desc: 'The leading multimedia library for transcoding video, audio, and container formats.' },
      { name: 'WebAssembly (Wasm)', url: 'https://webassembly.org', desc: 'Binary code format enabling near-native in-browser execution for file transformations.' },
      { name: 'GitHub Open Source Community', url: 'https://github.com', desc: 'The global home for developers building client-side tools and software libraries.' },
    ],
  },
];

export default function ResourcesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://zevylo.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources Directory',
        item: 'https://zevylo.com/resources',
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">Resources Directory</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50/60 via-white to-gray-50/60 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/60 p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            <BookOpen className="w-3.5 h-3.5" />
            Curated Authority Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Web Standards & Developer Resources
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Zevylo builds all 157+ browser tools strictly adhering to open standards and authoritative specifications. Explore foundational web authorities or partner with us for link directory exchanges.
          </p>
        </div>
      </div>

      {/* Resource Cards by Category */}
      <div className="space-y-10">
        {resourceCategories.map((group) => {
          const IconComponent = group.icon;
          return (
            <div key={group.category} className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {group.category}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-blue-500 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                          {link.name}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 truncate">
                      {link.url}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Backlink Exchange & Partner Submission Card */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-200/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              Partnership & Link Exchange
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Feature Your Tool or Exchange Backlinks with Zevylo
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Are you building an open-source software project, developer utility, or informative technology blog? We actively feature relevant, high-quality resources and welcome reciprocal backlink partnerships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Must be 100% free with genuine user utility
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Zero deceptive ads or malicious scripts
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Contextual editorial backlinks provided
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Reviewed within 48 business hours
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Submit Partnership Request</span>
            </Link>
            <Link
              href="/badges"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-semibold transition-colors"
            >
              <span>Get Embed Badges</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
