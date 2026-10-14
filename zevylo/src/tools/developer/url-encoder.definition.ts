import { ToolDefinition } from '@/lib/tools/types';

export const urlEncoderDefinition: ToolDefinition = {
  id: 'developer-url-encoder',
  slug: 'url-encoder',
  name: 'URL Encoder / Decoder & Query Parser',
  shortDescription: 'Encode, decode URLs and query parameters with real-time parameter breakdown.',
  longDescription: 'Safely encode and decode strings, URIs, and query components adhering to RFC 3986 specifications. Includes an interactive URL query string inspector that parses parameters into clean key-value pairs.',
  category: 'developer',
  icon: 'link-2',
  keywords: ['url encoder', 'url decoder', 'percent encoding', 'query parser', 'it tools alternative', 'url component encoder'],
  searchableText: 'url encoder decode encodeuri url component query string params parser rfc 3986',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'URL Encoder & Decoder — Parse Query Parameters Online | Zevylo',
    description: 'Encode, decode URLs, and parse query parameters into structured tables online. Free, instant, and private in your browser.',
  },
  faq: [
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer: 'encodeURI preserves special URL characters like "/", "?", and "&" for full web addresses, while encodeURIComponent escapes all characters to safely embed values inside query strings.',
    },
    {
      question: 'Can this tool parse query strings into JSON?',
      answer: 'Yes! The built-in query parameter inspector breaks down every URL parameter into key-value pairs and allows one-click export to JSON.',
    },
  ],
  relatedTools: ['base64', 'utm-builder', 'cron-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 9,
  component: 'url-encoder',
};
