import { ToolDefinition } from '@/lib/tools/types';

export const rot13EncoderDefinition: ToolDefinition = {
  id: 'rot13-encoder',
  slug: 'rot13-encoder',
  name: 'ROT13 & Caesar Cipher Encoder/Decoder',
  shortDescription: 'Encode and decode text using ROT13 or custom Caesar shift ciphers.',
  longDescription: 'Obfuscate text and solve puzzles using ROT13 and Caesar ciphers. Features customizable rotation shifts (1 through 25, default 13), preserves casing and punctuation, and offers instant reciprocal decoding.',
  category: 'converters',
  icon: 'shield',
  keywords: ['rot13', 'caesar cipher', 'rot13 decoder', 'text obfuscation', 'caesar shift', 'it-tools alternative'],
  searchableText: 'rot13 encoder decode caesar cipher shift text obfuscate letter rotation',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'ROT13 & Caesar Cipher Encoder/Decoder — Online Text Obfuscator | Zevylo',
    description: 'Encode and decode ROT13 and custom Caesar ciphers online. Reciprocal letter substitution tool. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What is ROT13?',
      answer: 'ROT13 ("rotate by 13 places") is a simple substitution cipher that replaces a letter with the 13th letter after it in the Latin alphabet. Because 13 is half of 26, applying ROT13 twice restores the original text.',
    },
    {
      question: 'Can I use custom rotation shifts?',
      answer: 'Yes! While 13 is standard for ROT13, you can drag the slider from 1 to 25 to perform any classic Caesar shift.',
    },
  ],
  relatedTools: ['base64', 'hash-generator', 'binary-text-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 36,
  component: 'rot13-encoder',
};
