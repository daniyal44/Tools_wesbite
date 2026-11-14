import { ToolDefinition } from '@/lib/tools/types';

export const bulkImageResizerDefinition: ToolDefinition = {
  id: 'bulk-image-resizer',
  slug: 'bulk-image-resizer',
  name: 'Bulk Image Resizer',
  shortDescription: 'Resize dozens of images at once to exact pixels or a max width, with aspect lock and format choice.',
  longDescription:
    'Batch resize multiple images online for free. Drop in JPG, PNG, WebP, AVIF, GIF or BMP files, set a target width and height (or fit-inside a maximum dimension), keep the aspect ratio locked, pick the output format and quality, then download every resized image with one click. All resizing happens inside your browser, so your photos are never uploaded to a server.',
  category: 'image',
  icon: 'ruler',
  keywords: [
    'bulk image resizer',
    'batch resize images',
    'resize multiple images online',
    'bulk resize photos free',
    'mass image resizer',
    'resize images for web',
  ],
  searchableText:
    'bulk image resizer batch resize multiple images at once mass scale photos pixels max width height aspect ratio format jpeg png webp free private',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Bulk Image Resizer — Batch Resize Multiple Images Free | Zevylo',
    description:
      'Resize multiple images at once online for free. Set width, height and aspect lock, convert to JPG, PNG or WebP, and download all resized files. 100% browser-side.',
    keywords: [
      'bulk image resizer',
      'batch resize images',
      'resize multiple images',
      'free bulk photo resizer',
    ],
  },
  faq: [
    {
      question: 'How many images can I resize at once?',
      answer:
        'There is no hard server limit because everything runs in your browser. Practical limits depend on your device memory — typically 50 to 200 images per batch works smoothly on a modern laptop.',
    },
    {
      question: 'Do my images get uploaded anywhere?',
      answer:
        'No. Images are decoded and resized with the HTML5 Canvas API inside your tab. Nothing is transmitted to Zevylo or any third party.',
    },
    {
      question: 'How do I keep the aspect ratio when resizing in bulk?',
      answer:
        'Leave the aspect-lock option enabled and set either a target width or a maximum dimension. Every image is scaled proportionally instead of being stretched.',
    },
    {
      question: 'Can I resize different sized images together?',
      answer:
        'Yes. With aspect lock on, each image is scaled by the same rule (for example max width 1600px) so mixed-orientation batches keep their own proportions.',
    },
  ],
  relatedTools: ['bulk-image-compressor', 'bulk-image-converter', 'image-resizer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 121,
  component: 'bulk-image-resizer',
};
