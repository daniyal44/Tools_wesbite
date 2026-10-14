import { ToolDefinition } from '@/lib/tools/types';

export const wordCounterDefinition: ToolDefinition = {
  id: 'text-word-counter',
  slug: 'word-counter',
  name: 'Word Counter',
  shortDescription: 'Count words, characters, sentences, and more.',
  longDescription: 'Real-time word, character, sentence, and paragraph counting with reading and speaking time estimates.',
  category: 'text',
  icon: 'FileText',
  keywords: ['word count', 'character count', 'reading time'],
  searchableText: 'word counter character counter reading time',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Word Counter Tool | Zevylo',
    description: 'Count words, characters, sentences, and paragraphs in real-time.',
  },
  relatedTools: ['case-converter', 'text-diff'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'text/word-counter'
};
