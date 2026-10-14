import { ToolDefinition } from '@/lib/tools/types';

export const romanNumeralConverterDefinition: ToolDefinition = {
  id: 'roman-numeral-converter',
  slug: 'roman-numeral-converter',
  name: 'Roman Numeral Converter',
  shortDescription: 'Convert numbers to Roman numerals and Roman numerals back to numbers.',
  longDescription:
    'Convert between Arabic numbers and Roman numerals both ways. Enter any whole number from 1 to 3999 to get its correct Roman numeral form, or type a Roman numeral to decode its value — with strict validation that rejects malformed numerals. Great for dates, clock faces, outlines, book chapters, and tattoos. Runs entirely in your browser.',
  category: 'converters',
  icon: 'type',
  keywords: ['roman numeral converter', 'roman numerals', 'number to roman', 'roman to number', 'convert roman numerals', 'roman numeral date'],
  searchableText: 'roman numeral converter number to roman to number arabic decode date mmxxvi',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Roman Numeral Converter (Number ⇄ Roman) | Zevylo Tools',
    description: 'Free Roman numeral converter — turn numbers into Roman numerals (1–3999) and decode Roman numerals back to numbers, with validation. 100% client-side.',
  },
  faq: [
    { question: 'What range of numbers is supported?', answer: 'Standard Roman numerals cover 1 to 3999. Numbers outside this range are rejected because classical Roman numerals have no standard symbol for larger values without an overline (vinculum).' },
    { question: 'How do I convert a Roman numeral to a number?', answer: 'Switch to "Roman → Number" mode and type the numeral (e.g. MMXXVI). The decoded value appears instantly, and invalid forms are flagged.' },
    { question: 'What is 2026 in Roman numerals?', answer: '2026 is MMXXVI (1000 + 1000 + 10 + 10 + 5 + 1).' },
  ],
  relatedTools: ['number-base-converter', 'unit-converter', 'binary-text-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'roman-numeral-converter',
};
