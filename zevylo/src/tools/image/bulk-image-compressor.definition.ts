import { ToolDefinition } from '@/lib/tools/types';

export const bulkImageCompressorDefinition: ToolDefinition = {
  id: 'bulk-image-compressor',
  slug: 'bulk-image-compressor',
  name: 'Bulk Image Compressor',
  shortDescription: 'Compress hundreds of photos at once and see exactly how many MB you saved.',
  longDescription:
    'Batch compress images online for free without losing visible quality. Select multiple JPG, PNG or WebP files, choose a compression quality or a maximum dimension, optionally convert to WebP for the smallest file size, then download every compressed image with a per-file size comparison and total savings summary. Compression is performed entirely in your browser — no uploads, no accounts, no watermarks.',
  category: 'image',
  icon: 'minimize',
  keywords: [
    'bulk image compressor',
    'compress multiple images',
    'batch compress photos online',
    'bulk image optimizer',
    'reduce image size in bulk',
    'compress jpg png webp',
  ],
  searchableText:
    'bulk image compressor batch compress multiple photos at once reduce file size optimize jpeg png webp quality free browser private',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk Image Compressor — Compress Multiple Images Free | Zevylo',
    description:
      'Compress multiple images at once online for free. Reduce JPG, PNG and WebP file sizes with quality control, see savings per file, and download the whole batch privately.',
    keywords: [
      'bulk image compressor',
      'compress multiple images',
      'batch image optimizer',
      'reduce image size online',
    ],
  },
  faq: [
    {
      question: 'How much smaller will my images get?',
      answer:
        'Photo-heavy JPGs usually drop 50–80% at quality 75–80. PNG screenshots often shrink more when converted to WebP. The tool shows exact before and after sizes for every file.',
    },
    {
      question: 'Can I compress images without quality loss?',
      answer:
        'Lossless compression depends on the source format. For photos, keeping quality at 80% or above is visually indistinguishable for most web use, while still saving a large amount of space.',
    },
    {
      question: 'Are my photos uploaded to a server?',
      answer:
        'No. Every image is decoded and re-encoded by the Canvas API inside your browser. Your files never leave your device.',
    },
    {
      question: 'Can I compress images in bulk on mobile?',
      answer:
        'Yes. Small to medium batches work on modern phones, though very large batches are faster on a desktop browser.',
    },
  ],
  relatedTools: ['bulk-image-resizer', 'bulk-image-converter', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 122,
  component: 'bulk-image-compressor',
};
