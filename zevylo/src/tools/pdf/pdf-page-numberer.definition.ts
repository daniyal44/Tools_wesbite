import { ToolDefinition } from '@/lib/tools/types';

export const pdfPageNumbererDefinition: ToolDefinition = {
  id: 'pdf-page-numberer',
  slug: 'pdf-page-numberer',
  name: 'Add Page Numbers to PDF',
  shortDescription: 'Insert custom page numbers into PDF documents with position, margin, and format controls.',
  longDescription: 'Easily stamp page numbers onto multi-page PDF documents directly in your browser. Choose position (Bottom Center, Bottom Right, Top Right), numbering format ("Page X of Y", "X/Y", or simple numbers), custom starting number, font size, and text color with 100% client-side privacy.',
  category: 'pdf',
  icon: 'file-text',
  keywords: ['add page numbers to pdf', 'pdf page numberer', 'number pdf pages free', 'paginate pdf', 'insert page numbers pdf online'],
  searchableText: 'add page numbers to pdf paginate number pdf pages bottom center right header footer pdf-lib client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Add Page Numbers to PDF Online — 100% Free & Private | Zevylo',
    description: 'Number PDF pages online in your browser. Choose placement, format (Page X of Y), font size, and start number with zero file uploads.',
    keywords: ['add page numbers to pdf', 'number pdf pages free', 'paginate pdf online', 'pdf numbering tool'],
  },
  faq: [
    {
      question: 'Are my confidential PDF documents uploaded to a server?',
      answer: 'No. All PDF processing runs 100% client-side inside your browser using pdf-lib. Your files never touch external servers.',
    },
    {
      question: 'Can I format page numbers as "Page X of Y"?',
      answer: 'Yes! You can choose between "Page X of Y", "X / Y", or simple digit formats like "1, 2, 3".',
    },
  ],
  relatedTools: ['pdf-merge-split', 'pdf-watermark', 'crop-pdf'],
  status: 'active',
  visibility: 'public',
  sortOrder: 15,
  component: 'pdf-page-numberer',
};
