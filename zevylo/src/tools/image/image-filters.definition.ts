import { ToolDefinition } from '@/lib/tools/types';

export const imageFiltersDefinition: ToolDefinition = {
  id: 'image-filters',
  slug: 'image-filters',
  name: 'Image Filters & Photo Studio Online',
  shortDescription: 'Apply brightness, contrast, grayscale, sepia, invert, and blur filters with live preview.',
  longDescription: 'Turn regular photos into dramatic visuals with client-side Canvas image effects. Adjust Brightness, Contrast, Grayscale, Sepia, Hue Rotation, Invert Colors, and Blur. Compare before-and-after in real time and download full-resolution filtered PNGs.',
  category: 'image',
  icon: 'sliders',
  keywords: ['image filters', 'photo filter online', 'invert colors', 'grayscale image', 'sepia filter', 'photo studio', 'photopea alternative', 'vspic alternative'],
  searchableText: 'image filters photo effects brightness contrast grayscale sepia invert blur hue canvas download',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Filters & Photo Effects Online — Free Canvas Photo Studio | Zevylo',
    description: 'Apply image filters online. Adjust brightness, contrast, grayscale, sepia, invert, and blur. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Are my photos uploaded to a cloud server?',
      answer: 'No! All filter effects and Canvas pixel rendering happen 100% in your browser. Zero photos are sent to external servers.',
    },
    {
      question: 'Can I export the image at its original resolution?',
      answer: 'Yes! Zevylo applies filters directly to the native pixel resolution of your image when exporting to PNG.',
    },
  ],
  relatedTools: ['image-compressor', 'image-cropper', 'meme-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 43,
  component: 'image-filters',
};
