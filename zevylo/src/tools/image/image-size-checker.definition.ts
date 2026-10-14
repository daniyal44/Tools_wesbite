import { ToolDefinition } from '@/lib/tools/types';

export const imageSizeCheckerDefinition: ToolDefinition = {
  id: 'image-size-checker',
  slug: 'image-size-checker',
  name: 'Image Size Checker',
  shortDescription: 'Check image dimensions, total pixels, megapixels, aspect ratio and print size.',
  longDescription:
    'Instantly inspect any image to see its exact width and height, total pixel count, megapixels, simplified aspect ratio, file size and print dimensions at 72/150/300 DPI. Drop several images to compare them side by side. Read-only and 100% private — nothing is uploaded.',
  category: 'image',
  icon: 'ruler',
  keywords: ['image size checker', 'image dimensions', 'pixel counter', 'megapixel', 'aspect ratio', 'resolution checker'],
  searchableText: 'image size checker dimensions pixel count megapixel aspect ratio resolution print dpi',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Size Checker — Dimensions, Pixels & Megapixels | Zevylo',
    description: 'Check image size, dimensions, total pixels, megapixels, aspect ratio and print size instantly. Free, 100% private, no upload.',
  },
  faq: [
    { question: 'How are megapixels calculated?', answer: 'Megapixels = (width × height) ÷ 1,000,000. A 4000×3000 image is 12 MP.' },
    { question: 'What does print size mean?', answer: 'It is the physical size the image would print at a given DPI, e.g. 3000px ÷ 300 DPI = 10 inches.' },
  ],
  relatedTools: ['image-resizer', 'aspect-ratio-calculator', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 61,
  component: 'image-size-checker',
};
