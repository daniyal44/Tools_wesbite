import { ToolDefinition } from '@/lib/tools/types';

export const hmacGeneratorDefinition: ToolDefinition = {
  id: 'hmac-generator',
  slug: 'hmac-generator',
  name: 'HMAC Generator (SHA-256, SHA-384, SHA-512)',
  shortDescription: 'Generate keyed-hash message authentication codes (HMAC) using the browser Web Crypto API.',
  longDescription: 'Calculate secure HMAC message signatures using SHA-256, SHA-384, and SHA-512 cryptographic hash functions with client-side Web Crypto API. Supports Hex and Base64 output formatting and signature verification.',
  category: 'security',
  icon: 'shield-alert',
  keywords: ['hmac generator', 'hmac sha256', 'hmac sha512', 'hash message authentication code', 'crypto signature', 'web crypto'],
  searchableText: 'hmac generator sha256 sha384 sha512 secret key signature web crypto hex base64 message verification api security',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Online HMAC Generator — SHA-256, SHA-384, SHA-512 | Zevylo',
    description: 'Calculate HMAC cryptographic message authentication codes in your browser using high-speed Web Crypto. Pure client-side security with zero data transmission.',
    keywords: ['hmac generator', 'hmac online', 'sha256 hmac', 'message authentication code generator'],
  },
  faq: [
    {
      question: 'Is my secret key transmitted across the internet?',
      answer: 'Never. The HMAC computation is executed locally inside your web browser using window.crypto.subtle. Zero data is sent to external servers.',
    },
    {
      question: 'Which HMAC algorithms are supported?',
      answer: 'Standard cryptographic algorithms: HMAC-SHA-256, HMAC-SHA-384, and HMAC-SHA-512 with Hex and Base64 output options.',
    },
  ],
  relatedTools: ['hash-generator', 'password-strength', 'jwt-decoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'hmac-generator',
};
