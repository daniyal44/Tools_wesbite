import { ToolDefinition } from '@/lib/tools/types';

export const imageResizerDefinition: ToolDefinition = {
  id: 'image-resizer',
  slug: 'image-resizer',
  name: 'Image Resizer',
  shortDescription: 'Resize images by pixels or percentage — scale up or down with aspect lock.',
  longDescription:
    'Resize any image precisely by width/height in pixels or by percentage, with an optional aspect-ratio lock so proportions stay correct. Scale down for the web or up for printing, choose the output format (PNG, JPG, WebP) and quality, then download. Everything runs locally in your browser.',
  category: 'image',
  icon: 'ruler',
  keywords: ['image resizer', 'resize image', 'scale image', 'enlarge image', 'shrink image', 'change image size'],
  searchableText: 'image resizer resize scale enlarge shrink dimensions pixels percent aspect ratio',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Resizer — Free Resize Images by Pixel or Percent | Zevylo',
    description: 'Resize images online for free. Scale up or down by pixels or percentage with aspect-ratio lock. PNG, JPG, WebP. 100% private.',
  },
  faq: [
    { question: 'Can I enlarge a small image?', answer: 'Yes. Set a larger size or a percentage above 100%. Note that upscaling cannot add detail that was not in the original.' },
    { question: 'Will the aspect ratio stay correct?', answer: 'Keep the lock enabled and changing width auto-adjusts height (and vice versa) to preserve proportions.' },
  ],
  relatedTools: ['image-compressor', 'image-size-checker', 'image-cropper'],
  status: 'active',
  visibility: 'public',
  sortOrder: 60,
  component: 'image-resizer',
};
