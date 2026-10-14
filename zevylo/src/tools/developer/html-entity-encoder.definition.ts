import { ToolDefinition } from '@/lib/tools/types';

export const htmlEntityEncoderDefinition: ToolDefinition = {
  id: 'html-entity-encoder',
  slug: 'html-entity-encoder',
  name: 'HTML Entity Encoder & Decoder',
  shortDescription: 'Encode special characters into HTML entities or decode entities back into raw text.',
  longDescription: 'Safely escape characters for web development and XSS prevention. Convert reserved HTML characters (<, >, &, ", \') into named or numeric HTML entities, or decode entity-escaped strings back to plain text.',
  category: 'developer',
  icon: 'code',
  keywords: ['html entity encoder', 'html decoder', 'escape html', 'html special chars', 'xss escape', 'it-tools alternative'],
  searchableText: 'html entity encoder decode escape special characters ampersand lt gt quotes',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'HTML Entity Encoder & Decoder — Escape HTML Entities Online | Zevylo',
    description: 'Encode and decode HTML entities and special characters instantly in your browser. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Why do characters need to be HTML entity encoded?',
      answer: 'Characters like <, >, &, and " have special syntactic meaning in HTML. Encoding them prevents them from being parsed as HTML tags, mitigating cross-site scripting (XSS) risks.',
    },
    {
      question: 'What is the difference between named and numeric entities?',
      answer: 'Named entities use recognizable codes like &amp; while numeric entities use character codes like &#38; (decimal) or &#x26; (hexadecimal).',
    },
  ],
  relatedTools: ['url-encoder', 'base64', 'json-formatter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 22,
  component: 'html-entity-encoder',
};
