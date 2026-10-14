import { ToolDefinition } from '@/lib/tools/types';

export const pdfRotatorDefinition: ToolDefinition = {
  id: 'pdf-rotator',
  slug: 'pdf-rotator',
  name: 'PDF Page Rotator',
  shortDescription: 'Permanently rotate PDF document pages by 90, 180, or 270 degrees client-side.',
  longDescription: 'Rotate upside-down or sideways PDF scans and documents permanently. Select clockwise 90°, 180°, or 270° counter-clockwise rotations across all pages. Processes files directly in your web browser with zero server uploads, keeping sensitive documents and financial records 100% confidential. Direct Stirling-PDF and TinyWow alternative.',
  category: 'pdf',
  icon: 'rotate-cw',
  keywords: ['rotate pdf', 'pdf rotator', 'rotate pdf pages', 'stirling pdf alternative', 'tinywow alternative', 'turn pdf upside down', 'fix scanned pdf rotation'],
  searchableText: 'rotate pdf rotator pages orientation 90 180 270 degrees clock wise stirling pdf tinywow client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: false,
  seo: {
    title: 'Rotate PDF Online - Free PDF Page Rotator (No Upload)',
    description: 'Permanently rotate PDF files by 90, 180, or 270 degrees. Client-side processing ensures complete privacy for your sensitive documents.',
    keywords: ['rotate pdf', 'pdf rotator online', 'rotate pdf 90 degrees', 'stirling-pdf alternative', 'free pdf rotate'],
  },
  faq: [
    {
      question: 'Are my PDF files uploaded to a remote server to be rotated?',
      answer: 'No! All PDF modifications happen completely inside your browser using client-side binary stream manipulation. Your files never leave your computer.',
    },
    {
      question: 'Can I rotate scanned PDFs?',
      answer: 'Yes! Both digital and scanned PDF files can be rotated 90° clockwise, 180° upside down, or 270° counter-clockwise.',
    },
  ],
  relatedTools: ['pdf-merge-split', 'pdf-to-text', 'pdf-watermark'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'src/tools/pdf/pdf-rotator',
};
