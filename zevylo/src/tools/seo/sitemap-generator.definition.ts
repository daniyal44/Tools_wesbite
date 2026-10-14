import { ToolDefinition } from '@/lib/tools/types';

export const sitemapGeneratorDefinition: ToolDefinition = {
  id: 'sitemap-generator',
  slug: 'sitemap-generator',
  name: 'XML Sitemap Generator & Validator',
  shortDescription: 'Build Google-compliant XML sitemaps with priorities, change frequencies, and lastmod tags.',
  longDescription: 'Generate valid, standard-compliant XML sitemaps ready for submission to Google Search Console and Bing Webmaster Tools. Add individual or batch URLs, configure priority levels (0.1 to 1.0), set change frequencies (always, hourly, daily, weekly, monthly, yearly, never), and include ISO 8601 last modified timestamps. Includes live syntax validation, one-click copy, and instant sitemap.xml file download.',
  category: 'seo',
  icon: 'network',
  keywords: ['xml sitemap generator', 'sitemap creator', 'google search console sitemap', 'sitemap validator', 'generate sitemap xml', 'website sitemap builder'],
  searchableText: 'xml sitemap generator create sitemap google search console bing webmaster urlset changefreq priority lastmod download xml validator',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'XML Sitemap Generator - Create Google-Friendly Sitemaps Online',
    description: 'Create valid XML sitemaps for Google Search Console. Set custom priority, change frequency, and lastmod dates with free download.',
    keywords: ['xml sitemap generator', 'create sitemap online', 'sitemap builder', 'google sitemap generator'],
  },
  faq: [
    {
      question: 'Where should I upload the generated sitemap.xml?',
      answer: 'Place the generated sitemap.xml file in the root directory of your website (e.g., https://example.com/sitemap.xml) and submit the URL in Google Search Console.',
    },
    {
      question: 'What is the maximum number of URLs allowed in a single sitemap?',
      answer: 'According to the official sitemaps.org protocol, a single sitemap file can contain up to 50,000 URLs and must not exceed 50MB uncompressed.',
    },
  ],
  relatedTools: ['robots-txt-generator', 'meta-tag-generator', 'serp-preview'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'src/tools/seo/sitemap-generator',
};
