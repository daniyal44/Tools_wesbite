import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, FolderTree, ExternalLink, Code2, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main 5-Column Mega Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand & Privacy Statement */}
          <div className="space-y-4 lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Zevylo_logo.png"
                alt="Zevylo Logo"
                width={130}
                height={34}
                className="h-8 w-auto object-contain rounded"
                unoptimized
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              One place. Every useful tool. 157+ fast, private, browser-based utilities. More tools are added regularly on-demand based on community requirements.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="text-[11px] text-gray-400 leading-normal">
              Zero cloud uploads • Zero wait queues • Zero hidden watermarks
            </div>
          </div>

          {/* Categories Part 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3.5 text-xs uppercase tracking-wider">
              Tool Categories (A–I)
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/text" className="hover:text-blue-600 dark:hover:text-blue-400">Text & Content Tools</Link></li>
              <li><Link href="/tools/developer" className="hover:text-blue-600 dark:hover:text-blue-400">Developer & Code Tools</Link></li>
              <li><Link href="/tools/image" className="hover:text-blue-600 dark:hover:text-blue-400">Image Editors & Converters</Link></li>
              <li><Link href="/tools/video" className="hover:text-blue-600 dark:hover:text-blue-400">Video & Frame Tools</Link></li>
              <li><Link href="/tools/audio" className="hover:text-blue-600 dark:hover:text-blue-400">Audio & Voice Utilities</Link></li>
              <li><Link href="/tools/pdf" className="hover:text-blue-600 dark:hover:text-blue-400">PDF Document Suite</Link></li>
              <li><Link href="/tools/calculators" className="hover:text-blue-600 dark:hover:text-blue-400">Financial & Math Calculators</Link></li>
              <li><Link href="/tools/converters" className="hover:text-blue-600 dark:hover:text-blue-400">Unit & File Converters</Link></li>
              <li><Link href="/tools/generators" className="hover:text-blue-600 dark:hover:text-blue-400">Generators & QR Barcodes</Link></li>
            </ul>
          </div>

          {/* Categories Part 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3.5 text-xs uppercase tracking-wider">
              Tool Categories (M–Z)
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/seo" className="hover:text-blue-600 dark:hover:text-blue-400">SEO & Web Auditing</Link></li>
              <li><Link href="/tools/security" className="hover:text-blue-600 dark:hover:text-blue-400">Security & Hash Utilities</Link></li>
              <li><Link href="/tools/business" className="hover:text-blue-600 dark:hover:text-blue-400">Business & Resume Builder</Link></li>
              <li><Link href="/tools/marketing" className="hover:text-blue-600 dark:hover:text-blue-400">Marketing & Outreach</Link></li>
              <li><Link href="/ai-tools" className="font-bold text-indigo-600 hover:underline dark:text-indigo-400 flex items-center gap-1"><span>✨ AI Directory (A to Z)</span></Link></li>
              <li><Link href="/tools/ai" className="hover:text-blue-600 dark:hover:text-blue-400">Built-in AI Utilities (11 Tools)</Link></li>
              <li><Link href="/ai-tools/categories" className="hover:text-blue-600 dark:hover:text-blue-400">18 AI Categories Taxonomy</Link></li>
              <li><Link href="/tools/color" className="hover:text-blue-600 dark:hover:text-blue-400">Color Palette & Pickers</Link></li>
              <li><Link href="/tools/date-time" className="hover:text-blue-600 dark:hover:text-blue-400">Date, Time & Alarms</Link></li>
              <li><Link href="/tools/education" className="hover:text-blue-600 dark:hover:text-blue-400">Education & Science</Link></li>
              <li><Link href="/categories" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Browse All Categories &rarr;</Link></li>
            </ul>
          </div>

          {/* Trending Tools Directory */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3.5 text-xs uppercase tracking-wider">
              Trending Utilities
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/text/word-counter" className="hover:text-blue-600 dark:hover:text-blue-400">Word & Character Counter</Link></li>
              <li><Link href="/tools/developer/json-formatter" className="hover:text-blue-600 dark:hover:text-blue-400">JSON Formatter & Validator</Link></li>
              <li><Link href="/tools/video/video-to-frames" className="hover:text-blue-600 dark:hover:text-blue-400">Video to Image Frames</Link></li>
              <li><Link href="/tools/video/video-to-jpg" className="hover:text-blue-600 dark:hover:text-blue-400">Video to JPG Converter</Link></li>
              <li><Link href="/tools/video/video-to-png" className="hover:text-blue-600 dark:hover:text-blue-400">Video to PNG Converter</Link></li>
              <li><Link href="/tools/image/image-background-remover" className="hover:text-blue-600 dark:hover:text-blue-400">Background Remover</Link></li>
              <li><Link href="/tools/pdf/pdf-to-image" className="hover:text-blue-600 dark:hover:text-blue-400">PDF to Image Converter</Link></li>
              <li><Link href="/tools/business/resume-cv-builder" className="hover:text-blue-600 dark:hover:text-blue-400">Free Resume & CV Builder</Link></li>
              <li><Link href="/tools/generators/barcode-generator" className="hover:text-blue-600 dark:hover:text-blue-400">Barcode Generator (Code 128)</Link></li>
              <li><Link href="/tools" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">View All 157+ Tools &rarr;</Link></li>
            </ul>
          </div>

          {/* Crawl & Backlink Hub */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3.5 text-xs uppercase tracking-wider">
              Crawl & Backlinks Hub
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sitemap" className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <FolderTree className="w-3.5 h-3.5 text-blue-500" />
                  <span>HTML Tools Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/articles" className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                  <span>Articles & Tool Guides (157+)</span>
                </Link>
              </li>
              <li>
                <Link href="/badges" className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Badges & Embed Widgets</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                  <span>Web Standards & Directory</span>
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400">
                  XML Sitemap (sitemap.xml)
                </a>
              </li>
              <li>
                <a href="/feed.xml" target="_blank" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400">
                  <Rss className="w-3 h-3 text-amber-500" />
                  <span>RSS 2.0 Syndication Feed</span>
                </a>
              </li>
              <li className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium text-blue-600 dark:text-blue-400">Request a Tool On-Demand</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About Zevylo</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact & Partnerships</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zevylo. All rights reserved. Built for builders, creators, and professionals worldwide.</p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap" className="hover:underline">HTML Sitemap</Link>
            <Link href="/badges" className="hover:underline">Badges</Link>
            <Link href="/resources" className="hover:underline">Resources</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
