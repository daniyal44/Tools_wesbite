import { ToolDefinition } from '@/lib/tools/types';

export const bulkTextCaseConverterDefinition: ToolDefinition = {
  id: 'bulk-text-case-converter',
  slug: 'bulk-text-case-converter',
  name: 'Bulk Text Case Converter',
  shortDescription: 'Convert hundreds of lines to UPPER, lower, Title, Sentence, camelCase or snake_case at once.',
  longDescription:
    'Convert text case in bulk for free. Paste a column of names, headlines, keywords or code identifiers and transform every line simultaneously — uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case or CONSTANT_CASE. Lines can be deduplicated, trimmed and sorted before export, and the result can be copied or downloaded as a .txt file. Everything runs locally in your browser.',
  category: 'text',
  icon: 'type',
  keywords: [
    'bulk text case converter',
    'batch case converter',
    'convert case of multiple lines',
    'uppercase lowercase bulk',
    'camelcase snake_case converter list',
    'change text case online free',
  ],
  searchableText:
    'bulk text case converter batch multiple lines uppercase lowercase title sentence camelcase snake_case kebab constant deduplicate sort copy download free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Bulk Text Case Converter — Change Case of Multiple Lines Free | Zevylo',
    description:
      'Convert the case of multiple lines at once — UPPER, lower, Title, Sentence, camelCase, snake_case and more. Deduplicate, sort, copy or download free.',
    keywords: [
      'bulk case converter',
      'convert multiple lines case',
      'uppercase lowercase converter',
      'camelcase snake_case converter',
    ],
  },
  faq: [
    {
      question: 'Can I convert multiple lines at the same time?',
      answer:
        'Yes. Every line is transformed independently, so pasting a list of 1,000 keywords and choosing Title Case converts all of them in one click.',
    },
    {
      question: 'Which case formats are supported?',
      answer:
        'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE.',
    },
    {
      question: 'Can I remove duplicates while converting?',
      answer:
        'Yes. Enable the deduplicate option to drop repeated lines after conversion, and optionally sort the output alphabetically.',
    },
    {
      question: 'Is my text sent to a server?',
      answer:
        'No. The conversion is a pure local JavaScript string operation. Your text never leaves your browser.',
    },
  ],
  relatedTools: ['case-converter', 'remove-duplicate-lines', 'text-sorter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 210,
  component: 'bulk-text-case-converter',
};
