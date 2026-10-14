import { ToolDefinition } from '@/lib/tools/types';

export const numberToWordsDefinition: ToolDefinition = {
  id: 'number-to-words',
  slug: 'number-to-words',
  name: 'Number to Words Converter',
  shortDescription: 'Spell out any number in English words, including decimals and US currency.',
  longDescription:
    'Convert numbers into written English words. Supports whole numbers up to the quintillions, negative numbers, and decimals (spoken digit by digit after "point"). A currency mode writes amounts as dollars and cents — ideal for cheques, invoices, and legal documents. Everything is computed locally in your browser with no rounding surprises.',
  category: 'converters',
  icon: 'type',
  keywords: ['number to words', 'spell number', 'number in words', 'amount in words', 'number to text', 'currency to words', 'cheque amount words'],
  searchableText: 'number to words spell out numbers english text currency dollars cents cheque invoice amount in words',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Number to Words Converter — Spell Out Numbers & Currency | Zevylo Tools',
    description: 'Free number-to-words converter. Spell out any number in English, including decimals and USD currency for cheques and invoices. 100% client-side.',
  },
  faq: [
    { question: 'How large a number can it spell out?', answer: 'Up to the quintillions (18+ digits). Decimals are read digit by digit after the word "point".' },
    { question: 'How does currency mode work?', answer: 'It writes the whole part as dollars and the first two decimal places as cents — for example, 1234.50 becomes "One thousand two hundred thirty-four dollars and fifty cents".' },
    { question: 'Does it handle negative numbers?', answer: 'Yes. A leading minus is read as "minus" before the spelled-out value.' },
  ],
  relatedTools: ['roman-numeral-converter', 'unit-converter', 'binary-text-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 72,
  component: 'number-to-words',
};
