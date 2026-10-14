import { ToolDefinition } from '@/lib/tools/types';

export const avifToJpgDefinition: ToolDefinition = {
  id: 'avif-to-jpg',
  slug: 'avif-to-jpg',
  name: 'AVIF to JPG Converter (Ezgif AVIF to JPG)',
  shortDescription: 'Convert next-generation AVIF images into universally compatible JPG / JPEG format.',
  longDescription: 'Convert AVIF files to high-quality JPG images online. Ensure full compatibility across older image viewers, browsers, and software with fast client-side conversion and zero server uploads.',
  category: 'image',
  icon: 'image',
  keywords: ['avif to jpg', 'ezgif avif to jpg', 'convert avif to jpg', 'avif to jpeg', 'free avif converter'],
  searchableText: 'avif to jpg convert avif to jpeg images offline fast client side free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'AVIF to JPG Converter — Convert AVIF to JPEG Online Free | Zevylo',
    description: 'Convert AVIF images to JPG online for free. Batch conversion supported with zero quality loss and 100% private in-browser processing.',
    keywords: ['avif to jpg online', 'convert avif to jpg', 'ezgif avif to jpg', 'free avif to jpeg'],
  },
  faq: [
    {
      question: 'What is AVIF and why should I convert it to JPG?',
      answer: 'AVIF is a high-compression image format based on the AV1 video codec. While it produces small file sizes, many older devices and image editing apps cannot open AVIF files. Converting to JPG ensures 100% compatibility.',
    },
    {
      question: 'Can I convert multiple AVIF files at once?',
      answer: 'Yes! Batch conversion is supported with single-click download of all converted JPGs.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, your images never leave your computer. Conversions happen 100% locally in your web browser.',
    },
  ],
  relatedTools: ['webp-to-jpg', 'png-to-jpg', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 29,
  component: 'avif-to-jpg',
};
