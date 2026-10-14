import { ToolDefinition } from '@/lib/tools/types';

export const gifMakerDefinition: ToolDefinition = {
  id: 'gif-maker',
  slug: 'gif-maker',
  name: 'Animated GIF Maker (Images to GIF)',
  shortDescription: 'Combine multiple images or photos into an animated GIF with customizable frame rates and resolution.',
  longDescription: 'Combine multiple images, photos, or frames into an animated GIF. Customize frame delay, animation speed, resolution, and loop settings directly in your browser with zero server uploads.',
  category: 'image',
  icon: 'film',
  keywords: ['gif maker', 'ezgif gif maker', 'images to gif', 'png to gif', 'jpg to gif', 'make animated gif', 'create gif online'],
  searchableText: 'gif maker images to gif animated gif png jpg webp delay frames create gif ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Animated GIF Maker — Convert Images to GIF Online Free | Zevylo',
    description: 'Create animated GIFs from multiple PNG, JPG, or WebP images online for free. Set custom frame delays and dimensions in your browser.',
    keywords: ['gif maker online', 'images to gif', 'ezgif gif maker', 'create animated gif free'],
  },
  faq: [
    {
      question: 'How do I create a GIF from photos?',
      answer: 'Select 2 or more images, adjust the frame delay (e.g. 200ms per frame), and click "Generate Animated GIF". The GIF will be created right in your browser.',
    },
    {
      question: 'Can I reorder or remove individual frames?',
      answer: 'Yes! You can preview all uploaded frames, delete individual frames, or change delay times before encoding.',
    },
    {
      question: 'Are my images uploaded to a server?',
      answer: 'No. The GIF encoding happens 100% locally on your computer with our lightweight client-side GIF89a engine.',
    },
  ],
  relatedTools: ['video-to-gif', 'image-compressor', 'image-resizer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 25,
  component: 'gif-maker',
};
