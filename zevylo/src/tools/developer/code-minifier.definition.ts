import { ToolDefinition } from '@/lib/tools/types';

export const codeMinifierDefinition: ToolDefinition = {
  id: 'code-minifier',
  slug: 'code-minifier',
  name: 'Code Minifier (HTML, CSS, JS, JSON)',
  shortDescription: 'Minify HTML, CSS, JavaScript, and JSON code by stripping unnecessary whitespace and comments.',
  longDescription: 'Compress your code assets for faster web page load times. Strips comments, redundant indentation, and blank lines from HTML, CSS, JavaScript, and JSON payloads. Compare original vs. compressed byte sizes and calculate exact bandwidth savings.',
  category: 'developer',
  icon: 'file-text',
  keywords: ['code minifier', 'css minifier', 'html minifier', 'js minifier', 'json minifier', 'it-tools alternative'],
  searchableText: 'code minifier minify compress html css javascript json strip whitespace comments size savings',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Code Minifier — Minify HTML, CSS, JavaScript & JSON Online | Zevylo',
    description: 'Compress and minify HTML, CSS, JavaScript, and JSON code online. Calculate bandwidth savings instantly. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How does minification improve website performance?',
      answer: 'Minification removes comments, newlines, and whitespace from web code, reducing the payload size that browsers must download over the network and speeding up Time To First Byte (TTFB) and First Contentful Paint (FCP).',
    },
    {
      question: 'Does this minifier break valid code syntax?',
      answer: 'No. Safe standard whitespace trimming and quote-preserving tokenization ensure the underlying program logic remains identical.',
    },
  ],
  relatedTools: ['sql-formatter', 'json-formatter', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 30,
  component: 'code-minifier',
};
