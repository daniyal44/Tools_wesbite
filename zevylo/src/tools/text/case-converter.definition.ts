import { ToolDefinition } from '@/lib/tools/types';

export const caseConverterDefinition: ToolDefinition = {
  id: 'text-case-converter',
  slug: 'case-converter',
  name: 'Case Converter',
  shortDescription: 'Convert text between different letter cases.',
  longDescription: 'Easily convert text to uppercase, lowercase, title case, camelCase, snake_case, and more.',
  category: 'text',
  icon: 'Type',
  keywords: ['case converter', 'uppercase', 'lowercase', 'camelcase'],
  searchableText: 'case converter uppercase lowercase titlecase camelcase snakecase',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Case Converter Tool | Zevylo',
    description: 'Convert your text to UPPERCASE, lowercase, camelCase, snake_case, and more.',
  },
  relatedTools: ['word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'text/case-converter'
};
