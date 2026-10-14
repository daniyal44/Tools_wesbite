import { ToolDefinition } from '@/lib/tools/types';

export const numberBaseConverterDefinition: ToolDefinition = {
  id: 'number-base-converter',
  slug: 'number-base-converter',
  name: 'Number Base Converter',
  shortDescription: 'Convert numbers between binary, octal, decimal, hexadecimal, and any base (2–36).',
  longDescription:
    'Instantly convert integers between binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and any custom base from 2 to 36. Handles arbitrarily large whole numbers with exact BigInt precision, accepts 0x / 0b / 0o prefixes, and lets you copy any result with one click — all processed privately in your browser.',
  category: 'developer',
  icon: 'binary',
  keywords: ['number base converter', 'binary', 'octal', 'decimal', 'hexadecimal', 'hex', 'radix', 'base 2', 'base 16', 'bin to hex', 'dec to bin'],
  searchableText: 'number base converter binary octal decimal hexadecimal hex radix base conversion bigint',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Number Base Converter (Binary, Octal, Decimal, Hex) | Zevylo Tools',
    description: 'Free online number base converter — convert between binary, octal, decimal, hexadecimal, and any base from 2 to 36 with exact precision.',
  },
  faq: [
    { question: 'How do I convert decimal to binary?', answer: 'Enter your decimal number, set the input base to 10, and read the Binary (base 2) result card — you can copy it with one click.' },
    { question: 'Does it handle very large numbers?', answer: 'Yes. Conversions use JavaScript BigInt, so even numbers far beyond 64 bits convert exactly without rounding errors.' },
    { question: 'Can I use 0x or 0b prefixes?', answer: 'Yes. When the input base matches, prefixes like 0x (hex), 0b (binary), and 0o (octal) are accepted and ignored during parsing.' },
  ],
  relatedTools: ['base64', 'binary-text-converter', 'data-size-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 20,
  component: 'number-base-converter',
};
