import { ToolDefinition } from '@/lib/tools/types';

export const jsonFormatterDefinition: ToolDefinition = {
  id: 'developer-json-formatter',
  slug: 'json-formatter',
  name: 'JSON Formatter',
  shortDescription: 'Format, minify, and validate JSON data.',
  longDescription: 'A versatile JSON formatter and validator with syntax highlighting, minification, and line error detection.',
  category: 'developer',
  icon: 'Code',
  keywords: ['json', 'json formatter', 'json validator', 'json minifier'],
  searchableText: 'json formatter validator minifier beautifier',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'JSON Formatter & Validator | Zevylo',
    description: 'Format, beautify, minify, and validate your JSON data instantly.',
  },
  relatedTools: ['base64', 'jwt-decoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'developer/json-formatter'
};
