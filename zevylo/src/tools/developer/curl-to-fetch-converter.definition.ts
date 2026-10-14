import { ToolDefinition } from '@/lib/tools/types';

export const curlToFetchConverterDefinition: ToolDefinition = {
  id: 'curl-to-fetch-converter',
  slug: 'curl-to-fetch-converter',
  name: 'cURL to Fetch & Axios Converter',
  shortDescription: 'Convert raw cURL commands instantly into JavaScript Fetch, Axios, Python Requests, and Go HTTP client code.',
  longDescription: 'A fast, client-side cURL command converter. Paste cURL requests from browser DevTools, Postman, or API documentation and instantly generate production-ready JavaScript Fetch, Axios, Python Requests, and Go net/http code with full header and payload parsing.',
  category: 'developer',
  icon: 'terminal',
  keywords: ['curl to fetch', 'curl to axios', 'curl to python', 'convert curl', 'curl parser', 'fetch generator', 'api client code'],
  searchableText: 'curl to fetch converter axios python requests go net http parse headers bearer token json payload devtools api',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'cURL to Fetch & Axios Converter Online — Free Code Generator | Zevylo',
    description: 'Convert cURL commands to JavaScript Fetch, Axios, Python Requests, and Go code in real-time. Zero server uploads, instant syntax formatting.',
    keywords: ['curl to fetch', 'curl to axios', 'curl converter online', 'convert curl command to javascript'],
  },
  faq: [
    {
      question: 'Does this converter send my cURL requests to any server?',
      answer: 'No. All command parsing and code generation occur entirely in your browser using client-side JavaScript. Your headers, tokens, and data payloads remain strictly private.',
    },
    {
      question: 'Which languages and libraries are supported?',
      answer: 'Currently supports modern JavaScript Fetch, Axios, Python Requests, and Go (net/http).',
    },
  ],
  relatedTools: ['url-encoder', 'jwt-decoder', 'base64', 'json-formatter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 25,
  component: 'curl-to-fetch-converter',
};
