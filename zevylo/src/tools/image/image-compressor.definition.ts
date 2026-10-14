import { ToolDefinition } from '@/lib/tools/types';

export const imageCompressorDefinition: ToolDefinition = {
  id: 'image-compressor',
  slug: 'image-compressor',
  name: 'Image Compressor & WebP Converter',
  shortDescription: 'Compress PNG, JPEG, and WebP images client-side without quality loss.',
  longDescription: 'Reduce image file size directly in your browser using modern WebP and Canvas compression algorithms. Features custom quality sliders, max width/height resizing, live byte savings calculator, and instant zero-upload downloads. The ultimate private Squoosh alternative.',
  category: 'image',
  icon: 'image',
  keywords: ['image compressor', 'compress image', 'squoosh alternative', 'tinywow alternative', 'convert png to webp', 'reduce image size online'],
  searchableText: 'image compressor squoosh tinywow reduce png jpg webp convert resize client-side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Compressor & WebP Converter — Fast & Private | Zevylo',
    description: 'Compress PNG, JPEG, and WebP images online without quality loss. 100% client-side privacy, instant downloads. Squoosh alternative.',
  },
  faq: [
    {
      question: 'Are my photos uploaded to any external server?',
      answer: 'No! All compression and resizing runs directly in your browser memory using HTML5 Canvas. Your photos never leave your device.',
    },
    {
      question: 'Which image formats are supported?',
      answer: 'You can upload PNG, JPEG, and WebP images, and export compressed files in WebP, JPEG, or PNG format.',
    },
    {
      question: 'How much file size can I expect to save?',
      answer: 'Converting standard PNGs or high-res JPEGs to optimized WebP often achieves 60% to 85% file size reduction with virtually no noticeable visual loss.',
    },
  ],
  relatedTools: ['sketch-canvas', 'code-to-image', 'qr-code-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'image-compressor',
};
