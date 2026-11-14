import { ToolDefinition } from '@/lib/tools/types';

export const bulkImageCropperDefinition: ToolDefinition = {
  id: 'bulk-image-cropper',
  slug: 'bulk-image-cropper',
  name: 'Bulk Image Cropper',
  shortDescription: 'Crop many images at once to a square, social aspect ratio or custom size, centred automatically.',
  longDescription:
    'Batch crop images online for free. Add multiple photos, pick a preset aspect ratio (1:1, 4:5, 9:16, 16:9 or 3:2) or enter a custom pixel size, and every image is centre-cropped to that shape without stretching. Choose JPG, PNG or WebP output, tune quality, and download the whole cropped batch in one click. All cropping happens locally in your browser.',
  category: 'image',
  icon: 'image',
  keywords: [
    'bulk image cropper',
    'batch crop images',
    'crop multiple photos online',
    'crop images to square bulk',
    'bulk crop for instagram',
    'mass image cropper free',
  ],
  searchableText:
    'bulk image cropper batch crop multiple images at once square instagram story aspect ratio 1:1 4:5 9:16 16:9 custom size photos free private browser',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk Image Cropper — Batch Crop Multiple Photos Free | Zevylo',
    description:
      'Crop multiple images at once for free. Choose a square, Instagram, story or custom aspect ratio, centre-crop every photo automatically and download the batch. 100% client-side.',
    keywords: [
      'bulk image cropper',
      'batch crop images',
      'crop multiple photos',
      'bulk crop for instagram',
    ],
  },
  faq: [
    {
      question: 'How does bulk cropping work?',
      answer:
        'Each image is cropped from its centre to the aspect ratio you choose, then scaled to the output size. The crop never stretches the image, so proportions stay correct.',
    },
    {
      question: 'Can I crop different sized photos together?',
      answer:
        'Yes. Every file in the batch is processed with the same rule, so mixed portrait and landscape photos all come out at the exact same output dimensions.',
    },
    {
      question: 'Do you upload my images?',
      answer:
        'No. Images are decoded and cropped with the HTML5 Canvas API inside your browser. Nothing is transmitted to a server.',
    },
    {
      question: 'Which sizes are best for social media?',
      answer:
        'Use 1:1 for feed posts, 4:5 for Instagram portraits, 9:16 for Reels, Shorts and Stories, and 16:9 for YouTube thumbnails and widescreen video.',
    },
  ],
  relatedTools: ['bulk-image-resizer', 'image-cropper', 'bulk-image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 124,
  component: 'bulk-image-cropper',
};
