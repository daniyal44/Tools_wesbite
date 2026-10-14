import { ToolDefinition } from '@/lib/tools/types';

export const pdfWatermarkDefinition: ToolDefinition = {
  id: 'pdf-watermark',
  slug: 'pdf-watermark',
  name: 'PDF Watermark Applier',
  shortDescription: 'Add custom security text watermarks or stamps to PDF documents in your browser.',
  longDescription: 'Protect confidential documents, contracts, drafts, and invoices by applying customizable watermark stamps (such as "CONFIDENTIAL", "DRAFT", "COPY", or custom text). Customize opacity, angle (45° diagonal or horizontal), font size, and color. Generates download-ready watermarked PDFs client-side without any server processing. Stirling-PDF and TinyWow alternative.',
  category: 'pdf',
  icon: 'stamp',
  keywords: ['pdf watermark', 'add watermark to pdf', 'watermark pdf online', 'confidential watermark', 'stirling pdf watermark', 'tinywow watermark alternative'],
  searchableText: 'pdf watermark add watermark confidential draft stamp opacity angle font stirling pdf tinywow client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: false,
  seo: {
    title: 'Add Watermark to PDF Online - Free PDF Stamp & Watermarker',
    description: 'Add custom text watermarks, confidential stamps, and copyright marks to PDF files client-side. Fast, free, and completely private.',
    keywords: ['pdf watermark', 'add watermark to pdf', 'watermark pdf free', 'pdf stamp online'],
  },
  faq: [
    {
      question: 'What watermark text presets are provided?',
      answer: 'Popular presets include "CONFIDENTIAL", "DO NOT COPY", "DRAFT", "APPROVED", "SAMPLE", or you can type any custom text.',
    },
    {
      question: 'Can I adjust the watermark angle and transparency?',
      answer: 'Yes! You can choose between diagonal (45°) and horizontal (0°) orientation, and adjust opacity from subtle (15%) to prominent (60%).',
    },
  ],
  relatedTools: ['pdf-merge-split', 'pdf-rotator', 'pdf-to-text'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'src/tools/pdf/pdf-watermark',
};
