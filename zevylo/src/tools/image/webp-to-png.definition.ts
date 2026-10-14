import { ToolDefinition } from '@/lib/tools/types';

export const webpToPngDefinition: ToolDefinition = {
  id: 'webp-to-png',
  slug: 'webp-to-png',
  name: 'WebP to PNG Converter',
  shortDescription: 'Convert WebP images to widely-compatible PNG — transparency preserved.',
  longDescription:
    'Convert WebP images into universally supported PNG files while preserving transparency. Perfect when an app or platform does not accept WebP. Batch conversion is supported and everything runs locally in your browser.',
  category: 'image',
  icon: 'file-image',
  keywords: ['webp to png', 'convert webp to png', 'image converter', 'webp decoder', 'batch webp to png'],
  searchableText: 'webp to png converter image convert transparency batch compatibility',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'WebP to PNG Converter — Free Batch WebP → PNG Tool | Zevylo',
    description: 'Convert WebP to PNG online for free with transparency support. Batch mode, 100% client-side and private. No watermark.',
  },
  faq: [
    { question: 'Does transparency survive the conversion?', answer: 'Yes. PNG supports alpha transparency, so transparent WebP areas remain transparent.' },
    { question: 'Why convert WebP to PNG?', answer: 'Some older software and platforms do not accept WebP, so PNG is a safe, lossless fallback.' },
  ],
  relatedTools: ['png-to-webp', 'webp-to-jpg', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 54,
  component: 'webp-to-png',
};
