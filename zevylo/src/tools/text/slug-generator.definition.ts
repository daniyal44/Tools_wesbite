import { ToolDefinition } from '@/lib/tools/types';

export const slugGeneratorDefinition: ToolDefinition = {
  id: 'slug-generator',
  slug: 'slug-generator',
  name: 'URL Slug Generator',
  shortDescription: 'Convert article titles and headlines into clean, SEO-friendly kebab-case URL slugs.',
  longDescription: 'Create clean, readable, and search-optimized URL slugs for blogs, CMSs, and eCommerce stores. Automatically converts to lowercase, replaces spaces with hyphens, strips emojis and punctuation, and removes common English stopwords.',
  category: 'text',
  icon: 'link',
  keywords: ['slug generator', 'url slugify', 'seo url generator', 'kebab case generator', 'clean url maker', 'it-tools alternative'],
  searchableText: 'slug generator convert url slugify kebab case lowercase clean seo link permalink',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'URL Slug Generator — Create Clean SEO Permalinks Online | Zevylo',
    description: 'Convert headings into clean SEO-friendly URL slugs. Remove stopwords and special characters instantly. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Why are clean URL slugs important for SEO?',
      answer: 'Clean, descriptive URL slugs (like /blog/how-to-bake-sourdough) improve click-through rates (CTR) in search results and provide clear relevance signals to Google and web spiders.',
    },
    {
      question: 'Should I remove stopwords like "a", "the", and "of" from slugs?',
      answer: 'Removing unnecessary stopwords keeps URLs short and punchy, making them easier to read and share on social media without hurting keyword relevance.',
    },
  ],
  relatedTools: ['case-converter', 'word-counter', 'url-encoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 32,
  component: 'slug-generator',
};
