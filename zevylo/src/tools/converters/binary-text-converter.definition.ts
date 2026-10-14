import { ToolDefinition } from '@/lib/tools/types';

export const binaryTextConverterDefinition: ToolDefinition = {
  id: 'binary-text-converter',
  slug: 'binary-text-converter',
  name: 'Binary to Text & Text to Binary Converter',
  shortDescription: 'Convert plain text to 8-bit binary code (0s and 1s) and decode binary back to English text.',
  longDescription: 'Seamless bi-directional conversion between human-readable UTF-8/ASCII text and 8-bit binary computer code. Toggle space separation between bytes, inspect individual character bytes, and copy converted code instantly.',
  category: 'converters',
  icon: 'binary',
  keywords: ['binary to text', 'text to binary', 'binary translator', 'binary decoder', 'binary code generator', 'it-tools alternative'],
  searchableText: 'binary to text converter text to binary 8 bit ascii code translate decode 010101',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Binary to Text & Text to Binary Converter — Online Code Translator | Zevylo',
    description: 'Convert text to binary and decode binary to text in real time. 8-bit ASCII translator. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How does text to binary conversion work?',
      answer: 'Each character has an ASCII/Unicode code number (e.g. "A" is 65). This number is converted to base-2 binary format (65 in binary is 01000001).',
    },
    {
      question: 'Can this tool decode binary strings with or without spaces?',
      answer: 'Yes! Zevylo automatically detects and decodes both space-separated binary ("01001000 01101001") and continuous binary streams.',
    },
  ],
  relatedTools: ['base64', 'url-encoder', 'hash-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 35,
  component: 'binary-text-converter',
};
