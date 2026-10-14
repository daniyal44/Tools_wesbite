import { ToolDefinition } from '@/lib/tools/types';

export const imageCombinerDefinition: ToolDefinition = {
  id: 'image-combiner',
  slug: 'image-combiner',
  name: 'Image Combiner',
  shortDescription: 'Merge multiple images side-by-side, stacked, or in a grid into one image.',
  longDescription:
    'Combine several images into a single picture — place them horizontally, stack them vertically, or arrange them in a grid. Control the spacing, background color (or transparency), output format and quality, with a live preview. Everything is composited locally in your browser.',
  category: 'image',
  icon: 'layers',
  keywords: ['image combiner', 'merge images', 'combine photos', 'image collage', 'stitch images', 'join images'],
  searchableText: 'image combiner merge combine photos collage stitch join horizontal vertical grid',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Combiner — Merge Photos Side by Side or Grid | Zevylo',
    description: 'Combine multiple images into one — horizontal, vertical or grid layouts with custom spacing and background. Free and 100% private.',
  },
  faq: [
    { question: 'Can I control spacing between images?', answer: 'Yes. Use the gap slider to add even spacing, and pick a background color or transparency.' },
    { question: 'How does the grid layout size images?', answer: 'Each image is centered inside a uniform cell so rows and columns line up neatly.' },
  ],
  relatedTools: ['image-to-pdf', 'image-resizer', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 62,
  component: 'image-combiner',
};
