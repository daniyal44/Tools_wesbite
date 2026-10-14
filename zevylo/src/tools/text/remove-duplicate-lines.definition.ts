import { ToolDefinition } from '@/lib/tools/types';

export const removeDuplicateLinesDefinition: ToolDefinition = {
  id: 'remove-duplicate-lines',
  slug: 'remove-duplicate-lines',
  name: 'Remove Duplicate Lines',
  shortDescription: 'Remove duplicate lines from a list, with case, trim, sort, and keep-first/last options.',
  longDescription:
    'Clean any list by removing duplicate lines instantly. Toggle case-insensitive matching, trim surrounding whitespace, drop empty lines, choose whether to keep the first or last occurrence of each duplicate, and optionally sort the result A→Z. Live counts show how many lines went in, how many unique remain, and how many were removed — all processed privately in your browser.',
  category: 'text',
  icon: 'filter',
  keywords: ['remove duplicate lines', 'deduplicate', 'dedupe', 'unique lines', 'delete duplicates', 'list cleaner', 'remove repeated lines'],
  searchableText: 'remove duplicate lines deduplicate dedupe unique list cleaner repeated lines sort trim',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Remove Duplicate Lines Online (Free Dedupe Tool) | Zevylo Tools',
    description: 'Free online tool to remove duplicate lines from a list — case-insensitive, trim, sort, and keep first/last options. 100% client-side and private.',
  },
  faq: [
    { question: 'How do I remove duplicate lines?', answer: 'Paste your list (one item per line) into the input box. Duplicates are removed instantly and the unique result appears on the right, ready to copy.' },
    { question: 'Can it ignore case and extra spaces?', answer: 'Yes. Enable "Case-insensitive" to treat Apple and apple as the same, and "Trim whitespace" to ignore leading/trailing spaces when comparing.' },
    { question: 'Does it keep the original order?', answer: 'By default it keeps the first occurrence of each line in original order. You can switch to keep the last occurrence, or enable "Sort A→Z" to alphabetize the output.' },
  ],
  relatedTools: ['word-counter', 'case-converter', 'text-diff'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'remove-duplicate-lines',
};
