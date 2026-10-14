import { ToolDefinition } from '@/lib/tools/types';

export const imageComparatorDefinition: ToolDefinition = {
  id: 'image-comparator',
  slug: 'image-comparator',
  name: 'Image Comparator (Before & After Slider)',
  shortDescription: 'Compare two images side-by-side or with an interactive draggable split slider.',
  longDescription: 'Rival to VsPic. Compare edits, color grading, image compressions, and AI enhancements with an interactive before/after split slider divider, side-by-side comparison, or pixel difference blend mode. 100% private in-browser comparison.',
  category: 'image',
  icon: 'layers',
  keywords: ['image comparator', 'before after slider', 'compare images', 'image comparison tool', 'vspic alternative', 'side by side image viewer'],
  searchableText: 'image comparator before after slider compare images vspic split slider side by side difference pixel comparison',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Image Comparator — Before & After Slider Online | Zevylo',
    description: 'Compare two images with an interactive draggable before-after slider or side-by-side view. 100% private, no image uploads to server.',
    keywords: ['image comparator', 'before after image slider', 'compare two photos online', 'vspic alternative online'],
  },
  faq: [
    {
      question: 'Are my images uploaded to any server?',
      answer: 'No. Both images are loaded entirely into your local browser memory using HTML5 canvas/blob URLs. Nothing is transferred over the network.',
    },
    {
      question: 'Which comparison modes are available?',
      answer: 'Three modes: Interactive Draggable Split Slider, Classic Side-by-Side View, and Difference Blend (highlights differing pixels in bright contrast).',
    },
  ],
  relatedTools: ['image-cropper', 'image-compressor', 'image-filters'],
  status: 'active',
  visibility: 'public',
  sortOrder: 23,
  component: 'image-comparator',
};
