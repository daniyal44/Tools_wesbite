import { ToolDefinition } from '@/lib/tools/types';

export const textRepeaterDefinition: ToolDefinition = {
  id: 'text-repeater',
  slug: 'text-repeater',
  name: 'Text Repeater',
  shortDescription: 'Repeat any text or word multiple times with custom separators and optional numbering.',
  longDescription:
    'Repeat a word, sentence, or block of text as many times as you need. Choose how the copies are separated — new lines, spaces, commas, nothing, or your own custom separator — and optionally number each repeat. Useful for filling test data, creating repeated captions, spamming-safe placeholder content, or bulk list generation. Runs entirely in your browser with live character and word counts.',
  category: 'text',
  icon: 'type',
  keywords: ['text repeater', 'repeat text', 'repeat word', 'duplicate text', 'repeat text generator', 'copy text multiple times', 'repeat string'],
  searchableText: 'text repeater repeat text word multiple times duplicate string separator numbering bulk',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Text Repeater — Repeat Any Text Multiple Times | Zevylo Tools',
    description: 'Free online text repeater. Repeat words or sentences N times with custom separators and optional line numbering. 100% client-side, no limits.',
  },
  faq: [
    { question: 'How many times can I repeat text?', answer: 'Up to 100,000 repeats. The result is generated instantly in your browser, so very large counts with long text may use more memory.' },
    { question: 'Can I choose how repeats are separated?', answer: 'Yes — pick new line, space, comma, none, or type your own custom separator such as a pipe or dashes.' },
    { question: 'Is my text sent anywhere?', answer: 'No. All processing happens locally in your browser; nothing is uploaded or stored.' },
  ],
  relatedTools: ['case-converter', 'remove-duplicate-lines', 'text-sorter', 'word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 71,
  component: 'text-repeater',
};
