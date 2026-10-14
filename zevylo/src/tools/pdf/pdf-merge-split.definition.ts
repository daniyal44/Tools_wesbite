import { ToolDefinition } from '@/lib/tools/types';

export const pdfMergeSplitDefinition: ToolDefinition = {
  id: 'pdf-merge-split',
  slug: 'pdf-merge-split',
  name: 'PDF Merge & Combine Tool',
  shortDescription: 'Merge multiple PDF documents client-side without uploading to any remote server.',
  longDescription: 'Easily combine multiple PDF documents into a single consolidated file directly in your browser. Reorder pages, check file sizes, and download the combined document instantly with 100% privacy guarantee. The Stirling-PDF & TinyWow alternative.',
  category: 'pdf',
  icon: 'layers',
  keywords: ['merge pdf', 'combine pdf', 'pdf merger online', 'stirling pdf alternative', 'tinywow alternative', 'private pdf merger'],
  searchableText: 'merge pdf combine pdf documents stirling-pdf tinywow private client-side no upload',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'PDF Merge & Combine Tool — 100% Private in Browser | Zevylo',
    description: 'Merge and combine multiple PDF documents directly in your browser without uploading to external servers. Fast, secure, and free.',
  },
  faq: [
    {
      question: 'Are my confidential PDF documents uploaded to your server?',
      answer: 'No. All processing and byte merging happens completely inside your browser memory. Your documents never touch any cloud server.',
    },
    {
      question: 'Is there a file size limit or daily usage cap?',
      answer: 'No! Because processing happens on your local device, Zevylo enforces zero file caps, zero wait times, and zero subscriptions.',
    },
  ],
  relatedTools: ['image-compressor', 'sketch-canvas', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'pdf-merge-split',
};
