import { ToolDefinition } from '@/lib/tools/types';

export const serpPixelCheckerDefinition: ToolDefinition = {
  id: 'serp-pixel-checker',
  slug: 'serp-pixel-checker',
  name: 'SERP Title & Snippet Pixel Width Simulator',
  shortDescription: 'Calculate exact Google SERP pixel lengths to prevent title and description truncation.',
  longDescription: 'Google truncates search result titles based on pixel width (approx. 600px desktop, 580px mobile) rather than character counts. Calculate exact Arial 20px typography pixel widths for your SEO titles and Arial 14px widths for meta descriptions. Features live Google desktop & mobile snippet mockups, CTR score rating, truncation warning indicators, and power words recommendation.',
  category: 'seo',
  icon: 'monitor',
  keywords: ['serp pixel checker', 'serp simulator', 'google title pixel width', 'seo title length checker', 'google snippet pixel counter', 'screaming frog alternative', 'ahrefs free alternative'],
  searchableText: 'serp pixel checker simulator google search title snippet width 600px truncation mobile desktop ctr screaming frog ahrefs',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'SERP Title & Snippet Pixel Width Checker - Google Search Simulator',
    description: 'Check exact Google title pixel width (600px desktop limit) and meta description snippet limits. Prevent ugly truncation in search results.',
    keywords: ['serp pixel checker', 'google title pixel width', 'serp length simulator', 'google snippet preview'],
  },
  faq: [
    {
      question: 'Why does pixel width matter more than character count?',
      answer: 'Google allocates a fixed visual pixel container (approx. 600px on desktop) for titles. Wider characters like "W" and "M" occupy more pixel width than narrow characters like "i" or "l", meaning character count alone is unreliable.',
    },
    {
      question: 'What is the recommended pixel width for SEO titles?',
      answer: 'Keep your SEO title between 400px and 580px (typically 50-60 characters) to ensure it does not truncate on either mobile or desktop search displays.',
    },
  ],
  relatedTools: ['serp-preview', 'meta-tag-generator', 'keyword-density-analyzer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'src/tools/seo/serp-pixel-checker',
};
