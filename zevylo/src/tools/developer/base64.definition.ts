import { ToolDefinition } from '@/lib/tools/types';

export const base64Definition: ToolDefinition = {
  id: 'developer-base64',
  slug: 'base64',
  name: 'Base64 Encoder/Decoder',
  shortDescription: 'Encode and decode Base64 strings.',
  longDescription: 'Easily convert text to Base64 format and vice versa. Supports URL-safe Base64 encoding.',
  category: 'developer',
  icon: 'Hash',
  keywords: ['base64', 'encoder', 'decoder', 'url safe'],
  searchableText: 'base64 encoder decoder encode decode text url safe',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Base64 Encoder & Decoder | Zevylo',
    description: 'Encode text to Base64 or decode Base64 to text instantly.',
  },
  relatedTools: ['hash-generator', 'jwt-decoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'developer/base64'
};
