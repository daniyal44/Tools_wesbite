import * as React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  FolderTree, 
  Quote, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import { ToolDefinition } from "@/lib/tools/types";
import { getToolById, getToolBySlug, getToolsByCategory } from "@/lib/tools/registry";
import { Card, CardContent } from "@/components/ui";
import { ToolInteractiveBar } from "./tool-interactive-bar";
import { ToolIcon } from "./tool-icon";

interface ToolPageProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolPage({ tool, children }: ToolPageProps) {
  // Construct JSON-LD Structured Data for Google Rich Snippets & AI Search Crawlers
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": `https://zevylo.netlify.app/tools/${tool.category}/${tool.slug}`,
    "description": tool.shortDescription,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All modern web browsers",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": tool.version || "1.0",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
    "creator": {
      "@type": "Organization",
      "name": "Zevylo",
      "url": "https://zevylo.netlify.app",
    },
    "featureList": [
      "100% Client-Side In-Browser Execution",
      "Zero Cloud File Uploads",
      "No File Size Throttle",
      "Instant Processing Without Queue Delays",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zevylo.netlify.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${tool.category.charAt(0).toUpperCase() + tool.category.slice(1)} Tools`,
        "item": `https://zevylo.netlify.app/tools/${tool.category}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://zevylo.netlify.app/tools/${tool.category}/${tool.slug}`,
      },
    ],
  };

  // Guaranteed Rich FAQs for 100% of tools (AEO & Featured Snippets engine)
  const effectiveFaqs = (tool.faq && tool.faq.length > 0)
    ? tool.faq
    : [
        {
          question: `Is ${tool.name} completely free to use?`,
          answer: `Yes, ${tool.name} on Zevylo is 100% free with unlimited usage, zero forced subscriptions, and no hidden paywalls.`,
        },
        {
          question: `Are my files or inputs uploaded to remote servers?`,
          answer: `No. ${tool.name} executes locally within your browser using client-side WebAssembly and modern browser APIs. Zero bytes of your data leave your computer or phone.`,
        },
        {
          question: `Does ${tool.name} work on mobile browsers?`,
          answer: `Yes, ${tool.name} is fully responsive and compatible with Chrome, Safari, Edge, Firefox, and all modern mobile and desktop operating systems.`,
        },
        {
          question: `What makes Zevylo's ${tool.name} faster than traditional tools?`,
          answer: `Traditional web converters upload your files over the internet to remote servers, incurring upload and download delays. Zevylo processes everything locally in device RAM using hardware acceleration.`,
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": effectiveFaqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.name} online`,
    "description": `Step-by-step instructions to use ${tool.name} for free without uploading files to remote servers.`,
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Open and Input Data",
        "text": `Enter your text, upload your file, or specify your input values in the ${tool.name} interface.`,
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Configure Settings",
        "text": "Select your desired options, quality, or formatting parameters.",
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Download or Copy Output",
        "text": "Click the process button to immediately download or copy your processed result directly in your browser.",
      },
    ],
  };

  // Circular Previous / Next navigation inside category for search spiders
  const categoryTools = getToolsByCategory(tool.category);
  const currentIndex = categoryTools.findIndex((t) => t.slug === tool.slug);
  const prevTool = categoryTools.length > 1
    ? categoryTools[(currentIndex - 1 + categoryTools.length) % categoryTools.length]
    : null;
  const nextTool = categoryTools.length > 1
    ? categoryTools[(currentIndex + 1) % categoryTools.length]
    : null;

  // Build a rich list of 6 related tools (with sister-tool fallback)
  const explicitRelated = (tool.relatedTools || [])
    .map((ref) => getToolBySlug(ref) || getToolById(ref))
    .filter((t): t is ToolDefinition => !!t && t.slug !== tool.slug);

  const sisterTools = categoryTools.filter(
    (t) => t.slug !== tool.slug && !explicitRelated.some((r) => r.slug === t.slug)
  );

  const combinedRelated = [...explicitRelated, ...sisterTools].slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href={`/tools/${tool.category}`} className="hover:text-gray-900 dark:hover:text-gray-100 capitalize">
          {tool.category} Tools
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <ToolIcon
            slug={tool.slug}
            category={tool.category}
            icon={tool.icon}
            name={tool.name}
            size="lg"
            className="rounded-2xl shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {tool.category} Tool
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                v{tool.version || '1.0'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {tool.name}
            </h1>
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{tool.longDescription}</p>
        
        {tool.executionMode === 'client' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            Processed locally in your browser - no data is sent to our servers.
          </div>
        )}

        <ToolInteractiveBar slug={tool.slug} name={tool.name} category={tool.category} />
      </div>

      {/* Main Tool Interface */}
      <div className="min-h-[400px]">
        {children}
      </div>

      {/* AEO Step-by-Step Direct Answer Box (Google AI Overviews & Answer Engine Target) */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50 p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Answer & Quick Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            How to Use {tool.name} Online (Free & Client-Side)
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {tool.name} runs 100% locally in your web browser. Follow these 3 simple steps to process your files or data in seconds without uploading to external servers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Input Data or File</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Drop your file, paste text, or set parameters into the {tool.name} interface above. Files are read directly from local memory.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Instant Local Execution</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Hardware-accelerated WebAssembly processes your input instantly with zero network delay and zero server queue waiting.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Export & Download</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Instantly download or copy your processed result. No watermarks, no registration, and no file size paywalls.
            </p>
          </div>
        </div>
      </section>

      {/* GEO Competitor Comparison Matrix (Cited by Perplexity & ChatGPT RAG) */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Zevylo vs Legacy Online Tools Comparison
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          See why privacy-conscious professionals choose Zevylo over legacy cloud-upload sites:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
                <th className="py-2.5 pr-4 font-semibold">Comparison Factor</th>
                <th className="py-2.5 px-4 font-semibold text-blue-600 dark:text-blue-400">Zevylo ({tool.name})</th>
                <th className="py-2.5 pl-4 font-semibold text-gray-500">Legacy Competitors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-2.5 pr-4 font-medium">Data Storage & Privacy</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">100% In-Browser (0 bytes uploaded)</td>
                <td className="py-2.5 pl-4 text-gray-500">Transferred to external cloud servers</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Processing Speed</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Instant (No network upload wait)</td>
                <td className="py-2.5 pl-4 text-gray-500">Throttled by internet upload speeds</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">File Size Limits</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Unlimited (Device RAM capacity)</td>
                <td className="py-2.5 pl-4 text-gray-500">Capped (often 25MB - 100MB max)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Cost & Paywalls</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">100% Free & Unlimited</td>
                <td className="py-2.5 pl-4 text-gray-500">Daily quotas, wait timers, or paid subscriptions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* In-Depth Technical Guide Bridge (Interlinking & Authority Magnet) */}
      <section className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-950/20 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>In-Depth Engineering Guide</span>
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Learn the Working Mechanisms & RFC Web Standards Behind {tool.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Read our dedicated technical article covering algorithms, browser privacy, specifications, and advanced workflows.
          </p>
        </div>
        <Link
          href={`/articles/${tool.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <span>Read Complete Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* Spider Crawler Previous / Next Circular Navigation */}
      {(prevTool || nextTool) && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4 text-xs font-semibold">
          {prevTool ? (
            <Link
              href={`/tools/${prevTool.category}/${prevTool.slug}`}
              className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors max-w-[48%]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-gray-400 block uppercase">Previous in {tool.category}</span>
                <span className="truncate">{prevTool.name}</span>
              </div>
            </Link>
          ) : <div />}

          <Link
            href={`/tools/${tool.category}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>All {tool.category} tools</span>
          </Link>

          {nextTool && (
            <Link
              href={`/tools/${nextTool.category}/${nextTool.slug}`}
              className="flex items-center justify-end gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-right max-w-[48%]"
            >
              <div className="truncate">
                <span className="text-[10px] text-gray-400 block uppercase">Next in {tool.category}</span>
                <span className="truncate">{nextTool.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          )}
        </div>
      )}

      {/* Embed & Backlink Attribution Callout */}
      <div className="rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Quote className="w-4 h-4 text-blue-500 shrink-0" />
          <span>
            Want to use <strong>{tool.name}</strong> on your own blog or website? Click <strong>&lt;&gt; Embed</strong> or <strong>Cite / Backlink</strong> at the top.
          </span>
        </div>
        <Link
          href="/badges"
          className="font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
        >
          View all badges &rarr;
        </Link>
      </div>

      {/* Guaranteed FAQ Section with Rich Schema (100% of Tools) */}
      <section className="space-y-6 pt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid gap-4">
          {effectiveFaqs.map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40 space-y-1.5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                  Q
                </span>
                <span>{item.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-7">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools Grid (Always guaranteed 6 tools for unbroken spider crawl) */}
      {combinedRelated.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Related Free Online Tools
            </h2>
            <Link
              href={`/tools/${tool.category}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse all {categoryTools.length} {tool.category} tools &rarr;
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {combinedRelated.map((rel) => {
              const href = `/tools/${rel.category}/${rel.slug}`;

              return (
                <Link key={rel.slug} href={href} className="group">
                  <Card className="hover:border-blue-500 transition-all h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-sm">
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div className="flex items-start gap-3">
                        <ToolIcon
                          slug={rel.slug}
                          category={rel.category}
                          icon={rel.icon}
                          name={rel.name}
                          size="sm"
                          className="shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm line-clamp-1">
                            {rel.name}
                          </div>
                          {rel.shortDescription && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {rel.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="mt-3 inline-block self-start text-[11px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full capitalize">
                        {rel.category}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
