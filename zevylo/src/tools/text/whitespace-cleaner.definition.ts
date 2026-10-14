import { ToolDefinition } from '@/lib/tools/types';

export const whitespaceCleanerDefinition: ToolDefinition = {
  id: 'whitespace-cleaner',
  slug: 'whitespace-cleaner',
  name: 'Whitespace & Line Cleaner',
  shortDescription: 'Remove extra spaces, blank lines, tabs, and line breaks from messy text.',
  longDescription:
    'Clean up messy text in one place: trim each line, collapse runs of spaces into one, convert tabs to spaces, collapse or remove blank lines, and optionally join everything into a single line. Live character counts show exactly how much whitespace you stripped. Perfect for tidying copied-and-pasted content, logs, and documents — processed entirely in your browser.',
  category: 'text',
  icon: 'eraser',
  keywords: ['whitespace cleaner', 'remove extra spaces', 'remove blank lines', 'remove line breaks', 'trim text', 'clean text', 'tabs to spaces', 'collapse spaces'],
  searchableText: 'whitespace cleaner remove extra spaces blank lines line breaks trim clean text tabs collapse',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Whitespace & Line Cleaner (Remove Extra Spaces/Blank Lines) | Zevylo Tools',
    description: 'Free online text cleaner — remove extra spaces, blank lines, tabs, and line breaks, or join text into one line. 100% client-side and private.',
  },
  faq: [
    { question: 'How do I remove extra spaces between words?', answer: 'Enable "Collapse spaces" and every run of two or more spaces (or tabs) is reduced to a single space, while line breaks are preserved.' },
    { question: 'Can it remove empty lines?', answer: 'Yes. "Collapse blank lines" reduces multiple consecutive blank lines to one, and "Remove all blank lines" deletes every empty line.' },
    { question: 'Can it join wrapped text into one paragraph?', answer: 'Yes. Turn on "Join into one line" to replace all line breaks with single spaces — handy for un-wrapping copied PDF or email text.' },
  ],
  relatedTools: ['remove-duplicate-lines', 'text-sorter', 'case-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 13,
  component: 'whitespace-cleaner',
};
