import { ToolDefinition } from '@/lib/tools/types';

export const imageToDataUriDefinition: ToolDefinition = {
  id: 'image-to-datauri',
  slug: 'image-to-datauri',
  name: 'Image to Data URI & Base64 Converter',
  shortDescription: 'Convert images to Base64 Data URI strings for inline embedding in HTML and CSS.',
  longDescription: 'Convert images into Base64 Data URI strings for inline embedding in HTML and CSS documents. Generates ready-to-use HTML img tags, CSS background snippets, and raw base64 data.',
  category: 'image',
  icon: 'code',
  keywords: ['image to data uri', 'ezgif data uri', 'image to base64', 'png to base64', 'css background data uri', 'html data uri'],
  searchableText: 'image to data uri base64 inline img src html css background embed ezgif convert',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Image to Data URI Converter — Base64 HTML & CSS Generator | Zevylo',
    description: 'Convert PNG, JPG, SVG, and WebP images to Base64 Data URI online. Generate instant HTML img tags and CSS background code.',
    keywords: ['image to data uri', 'image to base64 online', 'ezgif image to data uri', 'convert png to base64'],
  },
  faq: [
    {
      question: 'What is a Data URI?',
      answer: 'A Data URI allows image binary data to be encoded directly into text (Base64) and embedded inside HTML or CSS files, eliminating separate HTTP image requests.',
    },
    {
      question: 'When should I use Data URIs?',
      answer: 'Data URIs are ideal for small icons, logos, email signatures, single-file HTML landing pages, and reducing server network requests.',
    },
    {
      question: 'Are my images secure?',
      answer: 'Yes! The FileReader API converts your image strictly inside your local browser memory. No data is transmitted across the internet.',
    },
  ],
  relatedTools: ['svg-to-png', 'image-compressor', 'favicon-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 27,
  component: 'image-to-datauri',
};
