import { ToolDefinition } from '@/lib/tools/types';

export const hreflangGeneratorDefinition: ToolDefinition = {
  id: 'hreflang-generator',
  slug: 'hreflang-generator',
  name: 'Hreflang Tags & International SEO Generator',
  shortDescription: 'Generate valid multi-language and regional hreflang tags for global SEO.',
  longDescription: 'Master international SEO with error-free hreflang tag generation. Create Google-compliant multi-regional and multi-lingual alternate links with ISO 639-1 language codes (en, es, fr, de, it, ja, zh, etc.) and ISO 3166-1 Alpha 2 country targeting (US, GB, CA, AU, etc.). Includes automatic x-default fallback generation, bidirectional reciprocal link guidelines, HTML `<head>` snippet export, and XML sitemap hreflang node output.',
  category: 'seo',
  icon: 'globe',
  keywords: ['hreflang generator', 'international seo tags', 'hreflang validator', 'alternate language link tags', 'x-default hreflang', 'multilingual seo generator'],
  searchableText: 'hreflang generator international seo multi language country alternate link tags x default google search xml sitemap iso codes',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Hreflang Tags Generator - Create International SEO Links Online',
    description: 'Generate Google-compliant hreflang tags for multi-language and multi-regional websites. Features ISO code selectors, x-default, and HTML/XML formats.',
    keywords: ['hreflang generator', 'international seo generator', 'hreflang tags online', 'multilingual seo tags'],
  },
  faq: [
    {
      question: 'What is the purpose of hreflang tags?',
      answer: 'Hreflang tags inform Google and other search engines which language or regional version of a webpage to serve users based on their physical location and language settings.',
    },
    {
      question: 'What is the "x-default" hreflang tag?',
      answer: 'The x-default tag serves as the fallback page for international visitors whose language or country does not match any of your specific localized versions.',
    },
  ],
  relatedTools: ['sitemap-generator', 'meta-tag-generator', 'robots-txt-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'src/tools/seo/hreflang-generator',
};
