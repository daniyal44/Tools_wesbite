import { ToolDefinition } from '@/lib/tools/types';

export const findReplaceDefinition: ToolDefinition = {
  id: 'find-replace',
  slug: 'find-replace',
  name: 'Find and Replace Text',
  shortDescription: 'Find and replace text online with case, whole-word, and regex options.',
  longDescription:
    'A fast online find-and-replace tool for any block of text. Replace every occurrence at once with live match counts, toggle case-sensitive matching, limit to whole words, or switch on full regular-expression mode for advanced patterns and capture-group replacements. Invalid regex is handled gracefully, and everything runs locally in your browser — your text is never uploaded.',
  category: 'text',
  icon: 'replace',
  keywords: ['find and replace', 'replace text', 'search and replace', 'bulk replace', 'regex replace', 'text replacer', 'find replace online'],
  searchableText: 'find and replace text search replace regex bulk case sensitive whole word online',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Find and Replace Text Online (Regex Supported) | Zevylo Tools',
    description: 'Free online find and replace tool with case-sensitive, whole-word, and regex modes plus live match counts. 100% client-side and private.',
  },
  faq: [
    { question: 'Does it replace all occurrences at once?', answer: 'Yes. Every match is replaced in one pass and the live counter shows exactly how many replacements were made.' },
    { question: 'Can I use regular expressions?', answer: 'Yes. Enable Regex mode to use full JavaScript regular-expression patterns, including capture groups like $1 in the replacement field. Invalid patterns are flagged instead of breaking.' },
    { question: 'Is my text sent to a server?', answer: 'No. All find-and-replace processing happens entirely in your browser; nothing is uploaded.' },
  ],
  relatedTools: ['remove-duplicate-lines', 'case-converter', 'regex-tester'],
  status: 'active',
  visibility: 'public',
  sortOrder: 11,
  component: 'find-replace',
};
