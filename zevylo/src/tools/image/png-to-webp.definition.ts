import { ToolDefinition } from '@/lib/tools/types';

export const pngToWebpDefinition: ToolDefinition = {
  id: 'png-to-webp',
  slug: 'png-to-webp',
  name: 'PNG to WebP Converter',
  shortDescription: 'Convert PNG images to modern WebP for much smaller files — transparency preserved.',
  longDescription:
    'Convert PNG images into next-generation WebP format to dramatically reduce file size while keeping full alpha transparency. Great for faster-loading websites. Batch conversion and a quality slider are included, and everything runs locally in your browser.',
  category: 'image',
  icon: 'file-image',
  keywords: ['png to webp', 'convert png to webp', 'webp converter', 'optimize images', 'batch png to webp'],
  searchableText: 'png to webp converter optimize image transparency batch quality web performance',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'PNG to WebP Converter — Free Batch PNG → WebP Tool | Zevylo',
    description: 'Convert PNG to WebP online for free with transparency support. Batch mode, adjustable quality, 100% private in-browser conversion.',
  },
  faq: [
    { question: 'Does WebP keep transparency?', answer: 'Yes. WebP supports an alpha channel, so transparent PNG areas stay transparent after conversion.' },
    { question: 'How much smaller is WebP?', answer: 'WebP is typically 25–35% smaller than PNG at comparable quality, which speeds up page loads.' },
  ],
  relatedTools: ['webp-to-png', 'png-to-jpg', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 51,
  component: 'png-to-webp',
};
