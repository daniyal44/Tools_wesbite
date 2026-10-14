import { ToolDefinition } from '@/lib/tools/types';

export const pngToJpgDefinition: ToolDefinition = {
  id: 'png-to-jpg',
  slug: 'png-to-jpg',
  name: 'PNG to JPG Converter',
  shortDescription: 'Convert PNG images to JPG/JPEG with adjustable quality — batch supported.',
  longDescription:
    'Convert one or many PNG images into optimized JPG (JPEG) files directly in your browser. Transparent areas are flattened onto a white background, and an adjustable quality slider lets you balance file size against visual fidelity. No uploads, no watermarks, no limits.',
  category: 'image',
  icon: 'file-image',
  keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'image converter', 'batch png to jpg'],
  searchableText: 'png to jpg jpeg converter image convert batch quality compress transparent',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'PNG to JPG Converter — Free Batch PNG → JPEG Tool | Zevylo',
    description: 'Convert PNG to JPG online for free. Batch conversion, adjustable quality, 100% client-side and private. No watermark, no sign-up.',
  },
  faq: [
    { question: 'Why did my transparent background turn white?', answer: 'JPG does not support transparency, so transparent pixels are filled with white when converting from PNG.' },
    { question: 'Can I convert multiple PNG files at once?', answer: 'Yes. Drop or select several PNG files and each one is converted; use “Download all” to save them in one click.' },
  ],
  relatedTools: ['jpg-to-png', 'png-to-webp', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 50,
  component: 'png-to-jpg',
};
