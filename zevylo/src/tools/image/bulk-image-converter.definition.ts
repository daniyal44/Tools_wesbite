import { ToolDefinition } from '@/lib/tools/types';

export const bulkImageConverterDefinition: ToolDefinition = {
  id: 'bulk-image-converter',
  slug: 'bulk-image-converter',
  name: 'Bulk Image Converter (Ezgif Bulk Converters)',
  shortDescription: 'Batch convert hundreds of images between WebP, AVIF, PNG, JPG, and BMP simultaneously.',
  longDescription: 'Convert hundreds of images in batch online for free. Select source files (PNG, JPG, WebP, AVIF, BMP), choose target format and quality compression, and download all converted files individually or as a batch ZIP.',
  category: 'image',
  icon: 'layers',
  keywords: ['bulk image converter', 'ezgif bulk converter', 'batch convert images', 'webp to jpg bulk', 'avif to png bulk', 'mass image converter'],
  searchableText: 'bulk image converter batch convert webp avif png jpg bmp multiple images zip free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk Image Converter — Batch Convert WebP AVIF JPG PNG Free | Zevylo',
    description: 'Convert hundreds of images simultaneously online for free. High-speed batch image converter supporting WebP, AVIF, PNG, and JPG with zero server uploads.',
    keywords: ['bulk image converter online', 'batch convert images', 'ezgif bulk converter', 'free batch image converter'],
  },
  faq: [
    {
      question: 'How many images can I convert at once?',
      answer: 'You can convert dozens or hundreds of images simultaneously depending on your device RAM.',
    },
    {
      question: 'Can I choose the output format and quality?',
      answer: 'Yes! Select from JPG, PNG, WebP, or AVIF and tune quality compression with real-time file size estimates.',
    },
    {
      question: 'Are my images uploaded to any server?',
      answer: 'No. Conversions execute 100% locally in your browser memory for maximum speed and complete privacy.',
    },
  ],
  relatedTools: ['webp-to-jpg', 'png-to-jpg', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 32,
  component: 'bulk-image-converter',
};
