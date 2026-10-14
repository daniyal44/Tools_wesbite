import { ToolDefinition } from '@/lib/tools/types';

export const heicToJpgDefinition: ToolDefinition = {
  id: 'heic-to-jpg',
  slug: 'heic-to-jpg',
  name: 'HEIC to JPG Converter (Ezgif HEIC Converter)',
  shortDescription: 'Convert Apple iPhone HEIC and HEIF photos into universally compatible JPG format.',
  longDescription: 'Convert iPhone HEIC photos into standard JPG / JPEG format online for free. Open and view iOS camera photos on any Windows, Android, or Mac device with 100% private in-browser processing.',
  category: 'image',
  icon: 'smartphone',
  keywords: ['heic to jpg', 'ezgif heic to jpg', 'convert heic to jpg', 'heic to jpeg', 'iphone photo to jpg', 'heif to jpg'],
  searchableText: 'heic to jpg convert heic to jpeg iphone photos apple ios heif offline free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'HEIC to JPG Converter — Convert iPhone Photos to JPEG Free | Zevylo',
    description: 'Convert iPhone HEIC photos to JPG online for free. Batch convert multiple HEIF photos with zero server uploads and no watermark.',
    keywords: ['heic to jpg online', 'convert heic to jpg', 'ezgif heic to jpg', 'iphone heic converter free'],
  },
  faq: [
    {
      question: 'Why does my iPhone take HEIC photos?',
      answer: 'Apple uses HEIC (High Efficiency Image Container) by default because it saves storage space. However, Windows PCs and many websites cannot open HEIC files without conversion.',
    },
    {
      question: 'Can I batch convert multiple HEIC photos?',
      answer: 'Yes! Select multiple photos to convert them all to high-quality JPGs at once.',
    },
    {
      question: 'Is my personal photo private?',
      answer: 'Yes! The conversion happens strictly in your browser. No photos are sent to any remote server.',
    },
  ],
  relatedTools: ['png-to-jpg', 'webp-to-jpg', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 30,
  component: 'heic-to-jpg',
};
