import { ToolDefinition } from '@/lib/tools/types';

export const bulkImageWatermarkerDefinition: ToolDefinition = {
  id: 'bulk-image-watermarker',
  slug: 'bulk-image-watermarker',
  name: 'Bulk Image Watermarker',
  shortDescription: 'Add a text watermark to dozens of images at once with position, opacity, size and colour controls.',
  longDescription:
    'Watermark multiple images in one pass, for free. Drop in JPG, PNG, WebP, AVIF or GIF files, type your brand name or copyright text, choose one of nine anchor positions (or a repeated tiled pattern), tune the font size, colour and opacity, then export every watermarked image as JPG, PNG or WebP and download the whole batch. Everything is drawn on an HTML5 canvas inside your browser, so your photos never leave your device.',
  category: 'image',
  icon: 'image',
  keywords: [
    'bulk image watermarker',
    'watermark multiple images',
    'batch watermark photos',
    'add watermark to images online free',
    'mass image watermark',
    'copyright watermark batch',
  ],
  searchableText:
    'bulk image watermarker batch watermark multiple images at once add text logo copyright brand photos position opacity tile pattern jpg png webp free private browser',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk Image Watermarker — Watermark Multiple Photos Free | Zevylo',
    description:
      'Add a text watermark to many images at once for free. Choose position, opacity, size, colour or a tiled pattern, then download every watermarked photo. 100% in your browser.',
    keywords: [
      'bulk image watermarker',
      'watermark multiple images',
      'batch watermark photos',
      'free image watermark tool',
    ],
  },
  faq: [
    {
      question: 'How many images can I watermark at once?',
      answer:
        'There is no server limit because everything runs locally. Most laptops handle 50 to 200 images per batch comfortably, depending on image resolution and available memory.',
    },
    {
      question: 'Are my photos uploaded anywhere?',
      answer:
        'No. Each image is decoded, watermarked with the Canvas API and re-encoded inside your browser tab. Nothing is sent to Zevylo or any third party.',
    },
    {
      question: 'Can I tile the watermark across the whole image?',
      answer:
        'Yes. Switch the placement mode to “Tiled” to repeat your watermark diagonally across the image, which makes it much harder to crop out.',
    },
    {
      question: 'Which output formats are supported?',
      answer:
        'You can export the watermarked batch as JPG, PNG or WebP and control the quality for JPG and WebP outputs.',
    },
  ],
  relatedTools: ['bulk-image-resizer', 'bulk-image-compressor', 'image-filters'],
  status: 'active',
  visibility: 'public',
  sortOrder: 123,
  component: 'bulk-image-watermarker',
};
