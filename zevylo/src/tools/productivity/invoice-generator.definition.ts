import { ToolDefinition } from '@/lib/tools/types';

export const invoiceGeneratorDefinition: ToolDefinition = {
  id: 'invoice-generator',
  slug: 'invoice-generator',
  name: 'Free Invoice Generator (Print & PDF)',
  shortDescription: 'Professional client-side invoice maker with customizable line items, tax rates, and 1-click Print/PDF export.',
  longDescription: 'Create clean, professional commercial invoices in seconds. Customize sender and client details, itemized goods and services, tax percentages, discounts, and payment terms with zero watermark and 100% private client-side processing.',
  category: 'business',
  icon: 'file-text',
  keywords: ['invoice generator', 'free invoice maker', 'create invoice pdf', 'printable invoice', 'freelance invoice template'],
  searchableText: 'invoice generator invoice maker create invoice pdf print invoice freelance billing line items tax vat discount receipt',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Invoice Generator — Create & Download Invoices PDF | Zevylo',
    description: 'Create professional invoices online for free. Add line items, taxes, and discounts, then print or download as PDF with zero watermarks.',
    keywords: ['free invoice generator', 'invoice maker online', 'create invoice pdf', 'printable invoice template'],
  },
  faq: [
    {
      question: 'Is this invoice generator really 100% free with no watermarks?',
      answer: 'Yes! Zevylo produces clean, unbranded, watermark-free invoices ready for immediate client billing.',
    },
    {
      question: 'Are my clients or billing data stored on your servers?',
      answer: 'No. Everything runs exclusively in your browser session. No financial details or client names are saved or transferred anywhere.',
    },
  ],
  relatedTools: ['profit-loss-calculator', 'sales-tax-calculator', 'signature-pad'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'invoice-generator',
};
