import { ToolDefinition } from '@/lib/tools/types';

export const hashGeneratorDefinition: ToolDefinition = {
  id: 'developer-hash-generator',
  slug: 'hash-generator',
  name: 'Hash Generator',
  shortDescription: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.',
  longDescription: 'Quickly compute cryptographic hashes for your text strings using standard algorithms. Operations run fully in the browser.',
  category: 'developer',
  icon: 'Lock',
  keywords: ['hash generator', 'md5', 'sha256', 'sha512', 'checksum'],
  searchableText: 'hash generator md5 sha1 sha256 sha384 sha512 checksum crypto',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'MD5 & SHA Hash Generator | Zevylo',
    description: 'Generate MD5, SHA-256, and other common hashes instantly in your browser.',
  },
  relatedTools: ['base64', 'jwt-decoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'developer/hash-generator'
};
