import { ToolDefinition } from '@/lib/tools/types';

export const imageCropperDefinition: ToolDefinition = {
  id: 'image-cropper',
  slug: 'image-cropper',
  name: 'Image Cropper Online',
  shortDescription: 'Crop images online using HTML5 canvas with square, 16:9, and custom aspect ratios.',
  longDescription: 'Crop JPG, PNG, and WebP images directly inside your browser. Select preset aspect ratios like 1:1 Square (Instagram / Profile avatar), 16:9 Landscape, 4:3, or Freeform crop with pixel dimensions and download the cropped image without uploading files to remote servers.',
  category: 'image',
  icon: 'crop',
  keywords: ['image cropper', 'crop image online', 'photo cropper', 'square crop', 'avatar cropper', 'squoosh alternative', 'tinywow alternative'],
  searchableText: 'image cropper crop photo canvas aspect ratio square 16:9 4:3 avatar cut image',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Cropper Online — Free Canvas Photo Cropping Tool | Zevylo',
    description: 'Crop images online for free. Custom aspect ratios (1:1, 16:9, 4:3) with instant canvas export. 100% private and client-side.',
  },
  faq: [
    {
      question: 'Is my cropped image uploaded to a server?',
      answer: 'No! All cropping and image rendering occurs 100% locally on your computer inside an HTML5 Canvas element. Zero data is uploaded.',
    },
    {
      question: 'Does this cropper maintain image quality?',
      answer: 'Yes! Zevylo crops directly from the original full-resolution image pixels to preserve maximum sharpness.',
    },
  ],
  relatedTools: ['image-compressor', 'aspect-ratio-calculator', 'image-filters'],
  status: 'active',
  visibility: 'public',
  sortOrder: 39,
  component: 'image-cropper',
};
