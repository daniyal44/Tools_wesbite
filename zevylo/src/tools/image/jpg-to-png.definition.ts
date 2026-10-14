import { ToolDefinition } from '@/lib/tools/types';

export const jpgToPngDefinition: ToolDefinition = {
  id: 'jpg-to-png',
  slug: 'jpg-to-png',
  name: 'JPG to PNG Converter',
  shortDescription: 'Convert JPG/JPEG photos to lossless PNG images — batch supported.',
  longDescription:
    'Convert JPG (JPEG) images into lossless PNG files in your browser. Useful when you need a format that supports clean edges and further editing without additional compression artifacts. Convert multiple files at once and download them individually or all together.',
  category: 'image',
  icon: 'file-image',
  keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'image converter', 'lossless png'],
  searchableText: 'jpg jpeg to png converter lossless image convert batch',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'JPG to PNG Converter — Free Batch JPEG → PNG Tool | Zevylo',
    description: 'Convert JPG to PNG online for free. Lossless output, batch conversion, 100% client-side and private. No watermark.',
  },
  faq: [
    { question: 'Will converting JPG to PNG improve quality?', answer: 'No. PNG is lossless, but it cannot restore detail already lost to JPEG compression. It simply prevents further quality loss.' },
    { question: 'Does the PNG have a transparent background?', answer: 'JPG files have no transparency, so the resulting PNG keeps the original solid background.' },
  ],
  relatedTools: ['png-to-jpg', 'jpg-to-webp', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 52,
  component: 'jpg-to-png',
};
