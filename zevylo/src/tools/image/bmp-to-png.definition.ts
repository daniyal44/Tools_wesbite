import { ToolDefinition } from '@/lib/tools/types';

export const bmpToPngDefinition: ToolDefinition = {
  id: 'bmp-to-png',
  slug: 'bmp-to-png',
  name: 'BMP to PNG Converter (Ezgif BMP Converter)',
  shortDescription: 'Convert bitmap BMP images into compressed PNG format with transparency preservation.',
  longDescription: 'Convert uncompressed Windows Bitmap (BMP) images into high-compression, web-friendly PNG format. Drastically reduce file sizes while preserving original pixel clarity with 100% private in-browser processing.',
  category: 'image',
  icon: 'file-image',
  keywords: ['bmp to png', 'ezgif bmp to png', 'convert bmp to png', 'bitmap to png', 'free bmp converter'],
  searchableText: 'bmp to png convert bitmap to png images offline fast client side free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'BMP to PNG Converter — Convert Bitmap to PNG Online Free | Zevylo',
    description: 'Convert BMP images to PNG format online for free. Compress large bitmap files into lightweight PNGs with zero server uploads.',
    keywords: ['bmp to png online', 'convert bmp to png', 'ezgif bmp to png', 'free bitmap to png'],
  },
  faq: [
    {
      question: 'Why convert BMP to PNG?',
      answer: 'BMP files are uncompressed and take up huge amounts of storage space. PNG uses lossless compression, producing identical image quality at a fraction of the file size.',
    },
    {
      question: 'Is conversion fast?',
      answer: 'Yes! Because conversion runs in your browser via HTML5 Canvas, large BMPs convert in milliseconds without upload delays.',
    },
    {
      question: 'Can I convert multiple BMP files?',
      answer: 'Yes, batch conversion is fully supported.',
    },
  ],
  relatedTools: ['png-to-jpg', 'png-to-webp', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 31,
  component: 'bmp-to-png',
};
