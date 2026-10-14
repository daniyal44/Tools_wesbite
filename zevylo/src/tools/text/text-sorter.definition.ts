import { ToolDefinition } from '@/lib/tools/types';

export const textSorterDefinition: ToolDefinition = {
  id: 'text-sorter',
  slug: 'text-sorter',
  name: 'Sort Text Lines',
  shortDescription: 'Sort lines alphabetically, numerically, by length, reverse, or shuffle them.',
  longDescription:
    'Sort any list of lines instantly — alphabetically (A→Z or Z→A), numerically, by line length, in reverse, or shuffled into a random order. Combine with case-insensitive matching, whitespace trimming, empty-line removal, and optional duplicate removal to clean and order lists in one step. Everything runs locally in your browser and the result is one click from your clipboard.',
  category: 'text',
  icon: 'arrow-down-az',
  keywords: ['sort text', 'sort lines', 'alphabetical order', 'sort list', 'line sorter', 'shuffle lines', 'sort numbers', 'order lines'],
  searchableText: 'sort text lines alphabetical numerical length reverse shuffle list order randomize',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Sort Text Lines Online (Alphabetical, Numeric, Shuffle) | Zevylo Tools',
    description: 'Free online tool to sort lines alphabetically, numerically, by length, in reverse, or shuffle them — with trim, dedupe, and case options. 100% private.',
  },
  faq: [
    { question: 'Can I sort a list alphabetically?', answer: 'Yes. Choose A→Z or Z→A. Enable "Case-insensitive" so capitalization does not affect the order.' },
    { question: 'Does it sort numbers correctly?', answer: 'Yes. The Numeric modes read the first number in each line and sort by value, so 2 comes before 10 (unlike plain text sorting).' },
    { question: 'Can I randomize the order?', answer: 'Yes. Pick Shuffle to randomly reorder the lines, and press Re-shuffle for a new random arrangement.' },
  ],
  relatedTools: ['remove-duplicate-lines', 'find-replace', 'word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 12,
  component: 'text-sorter',
};
