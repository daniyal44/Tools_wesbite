import { ToolDefinition } from '@/lib/tools/types';

export const pdfToImageDefinition: ToolDefinition = {
  id: 'pdf-to-image',
  slug: 'pdf-to-image',
  name: 'PDF to Image Converter (PNG, JPG, WebP)',
  shortDescription: 'Convert PDF pages and embedded graphics into high-resolution PNG, JPG, or WebP images.',
  longDescription: 'Turn your PDF documents into crisp high-resolution images. Extract embedded photo streams or rasterize document pages into PNG, JPEG, or WebP formats at up to 300 DPI with 100% private browser processing.',
  category: 'pdf',
  icon: 'file-image',
  keywords: ['pdf to image', 'convert pdf to png', 'pdf to jpg', 'pdf to webp', 'extract images from pdf', 'free pdf converter'],
  searchableText: 'pdf to image convert pdf to png jpg webp rasterize document extract high resolution 300 dpi client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'PDF to Image Converter — Free Online PNG, JPG & WebP Extractor | Zevylo',
    description: 'Convert PDF files to high-resolution PNG, JPG, or WebP images online for free. 100% private client-side processing.',
    keywords: ['pdf to image', 'pdf to png converter', 'pdf to jpg free', 'online pdf to image extractor'],
  },
  faq: [
    {
      question: 'Which image formats can I export to?',
      answer: 'You can convert your PDF into PNG (lossless), JPG/JPEG (compressed small size), or WebP (modern web format).',
    },
    {
      question: 'Are my PDF documents uploaded to a server?',
      answer: 'No. The rasterization and extraction occurs 100% locally on your machine via HTML5 Canvas. Your documents remain strictly private.',
    },
  ],
  relatedTools: ['image-to-pdf', 'pdf-to-text', 'pdf-merge-split'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'pdf-to-image',
};
