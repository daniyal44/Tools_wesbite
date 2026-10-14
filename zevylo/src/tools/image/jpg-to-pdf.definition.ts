import { ToolDefinition } from '@/lib/tools/types';

export const jpgToPdfDefinition: ToolDefinition = {
  id: 'jpg-to-pdf',
  slug: 'jpg-to-pdf',
  name: 'JPG to PDF Converter (Ezgif JPG to PDF)',
  shortDescription: 'Convert JPG / JPEG photos into high-quality PDF documents with custom page sizing.',
  longDescription: 'Convert single or multiple JPG images into a single printable PDF document online. Set page margins, orientation (Portrait/Landscape), and A4 / Letter page sizing with zero server uploads.',
  category: 'image',
  icon: 'file-text',
  keywords: ['jpg to pdf', 'ezgif jpg to pdf', 'convert jpg to pdf', 'jpeg to pdf', 'images to pdf online', 'combine jpg to pdf'],
  searchableText: 'jpg to pdf convert jpeg to pdf combine multiple photos document a4 letter client side free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'JPG to PDF Converter — Free Online JPEG to PDF | Zevylo',
    description: 'Convert JPG and JPEG images to PDF online for free. Combine multiple photos into a single PDF document with custom margins and page sizes.',
    keywords: ['jpg to pdf online', 'convert jpg to pdf', 'ezgif jpg to pdf', 'free jpeg to pdf'],
  },
  faq: [
    {
      question: 'How do I combine multiple JPGs into one PDF?',
      answer: 'Upload your JPG images, reorder them if needed, select your page size (A4, Letter, or Fit), and click "Generate PDF Document".',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes! The entire PDF generation runs inside your browser memory. No images or documents are uploaded to our servers.',
    },
    {
      question: 'Can I choose the page orientation?',
      answer: 'You can select Portrait, Landscape, or Auto (which rotates each page to match the image dimensions).',
    },
  ],
  relatedTools: ['image-to-pdf', 'pdf-merge-split', 'pdf-to-image'],
  status: 'active',
  visibility: 'public',
  sortOrder: 28,
  component: 'jpg-to-pdf',
};
