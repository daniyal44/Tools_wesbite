import { ToolDefinition } from '@/lib/tools/types';

export const urlCleanerDefinition: ToolDefinition = {
  id: 'url-cleaner',
  slug: 'url-cleaner',
  name: 'URL Cleaner & Tracking Stripper',
  shortDescription: 'Remove UTM tags, tracking parameters, fbclid, and click IDs from web links.',
  longDescription: 'Clean and sanitize messy, cluttered web URLs. Instantly strips tracking queries and spy parameters including utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, gclid, mc_eid, igshid, msclkid, ref, and affiliate tokens. Supports batch cleaning of multiple links simultaneously, canonical URL normalization, and privacy protection.',
  category: 'seo',
  icon: 'link-2',
  keywords: ['url cleaner', 'remove utm parameters', 'clean url online', 'strip tracking tokens', 'fbclid remover', 'gclid cleaner', 'privacy url normalizer'],
  searchableText: 'url cleaner remove utm tracking fbclid gclid parameters affiliate strip clean sanitize link privacy batch',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'URL Cleaner - Strip UTM Parameters & Tracking Query Tokens Online',
    description: 'Clean ugly URLs by stripping UTM parameters, fbclid, gclid, and referral trackers. Fast, secure, and supports single or batch URL sanitization.',
    keywords: ['url cleaner', 'remove utm', 'strip tracking parameters', 'clean link online', 'fbclid remover'],
  },
  faq: [
    {
      question: 'Which tracking parameters are stripped?',
      answer: 'All common marketing trackers: utm_*, fbclid, gclid, msclkid, dclid, mc_eid, igshid, ref, source, and affiliate tracking IDs.',
    },
    {
      question: 'Does this modify important functional query parameters?',
      answer: 'No! It preserves essential parameters like search queries (?q=...), page pagination (?p=2), or video timestamps (?t=45s).',
    },
  ],
  relatedTools: ['slug-generator', 'sitemap-generator', 'meta-tag-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 9,
  component: 'src/tools/seo/url-cleaner',
};
