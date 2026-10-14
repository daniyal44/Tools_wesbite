import { ToolDefinition } from '@/lib/tools/types';

export const jsonToTypeScriptDefinition: ToolDefinition = {
  id: 'developer-json-to-typescript',
  slug: 'json-to-typescript',
  name: 'JSON to TypeScript Converter',
  shortDescription: 'Convert JSON objects into strongly-typed TypeScript interfaces and types automatically.',
  longDescription: 'Instantly convert any JSON payload into clean, recursive TypeScript interfaces or type aliases. Automatically detects nested models, primitive types, array shapes, and optional fields. The ultimate transform.tools alternative.',
  category: 'developer',
  icon: 'file-code',
  keywords: ['json to typescript', 'json to ts', 'transform tools alternative', 'convert json to type', 'generate typescript interface'],
  searchableText: 'json to typescript converter ts interfaces types models transform.tools quicktype alternative',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'JSON to TypeScript Converter — Generate TS Interfaces Online | Zevylo',
    description: 'Convert JSON payloads into clean, strongly typed TypeScript interfaces and type definitions instantly. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Does this handle deeply nested JSON objects?',
      answer: 'Yes! The generator recursively extracts child objects into clean, reusable separate TypeScript interfaces.',
    },
    {
      question: 'Can I choose between interfaces and type aliases?',
      answer: 'Yes, you can toggle between "export interface" and "export type" syntax with a single checkbox.',
    },
    {
      question: 'Is my confidential JSON data uploaded to a server?',
      answer: 'No. All parsing and TypeScript code synthesis happens entirely in your local browser.',
    },
  ],
  relatedTools: ['json-formatter', 'code-to-image', 'jwt-decoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'json-to-typescript',
};
