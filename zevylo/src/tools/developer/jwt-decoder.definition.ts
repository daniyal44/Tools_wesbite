import { ToolDefinition } from '@/lib/tools/types';

export const jwtDecoderDefinition: ToolDefinition = {
  id: 'developer-jwt-decoder',
  slug: 'jwt-decoder',
  name: 'JWT Decoder',
  shortDescription: 'Decode JSON Web Tokens and view claims.',
  longDescription: 'Securely decode JWTs in your browser. View header, payload, and signature components along with human-readable timestamps.',
  category: 'developer',
  icon: 'Shield',
  keywords: ['jwt', 'decoder', 'json web token', 'claims'],
  searchableText: 'jwt decoder json web token claims parse',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'JWT Decoder | Zevylo',
    description: 'Decode and inspect JSON Web Tokens locally in your browser.',
  },
  relatedTools: ['json-formatter', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'developer/jwt-decoder'
};
