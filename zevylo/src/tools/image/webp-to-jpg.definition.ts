import { ToolDefinition } from '@/lib/tools/types';

export const webpToJpgDefinition: ToolDefinition = {
  id: 'webp-to-jpg',
  slug: 'webp-to-jpg',
  name: 'WebP to JPG Converter',
  shortDescription: 'Convert WebP images to universally-compatible JPG/JPEG files.',
  longDescription:
    'Convert WebP images into standard JPG (JPEG) files that work everywhere. Transparent areas are flattened onto white, and a quality slider controls the output size. Batch conversion is supported, and your images stay private in your browser.',
  category: 'image',
  icon: 'file-image',
  keywords: ['webp to jpg', 'webp to jpeg', 'convert webp to jpg', 'image converter', 'batch webp to jpg'],
  searchableText: 'webp to jpg jpeg converter image convert batch quality compatibility',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'WebP to JPG Converter — Free Batch WebP → JPEG Tool | Zevylo',
    description: 'Convert WebP to JPG online for free. Batch conversion, adjustable quality, 100% private in-browser processing. No sign-up.',
  },
  faq: [
    { question: 'What happens to transparent areas?', answer: 'JPG has no transparency, so transparent pixels are filled with white during conversion.' },
    { question: 'Can I convert many WebP files together?', answer: 'Yes — add multiple files and download them individually or all at once.' },
  ],
  relatedTools: ['jpg-to-webp', 'webp-to-png', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 55,
  component: 'webp-to-jpg',
};
