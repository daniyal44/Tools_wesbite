import { ToolDefinition } from '@/lib/tools/types';

export const bulkQrGeneratorDefinition: ToolDefinition = {
  id: 'bulk-qr-generator',
  slug: 'bulk-qr-generator',
  name: 'Bulk QR Code Generator',
  shortDescription: 'Generate hundreds of QR codes at once — one per line — and download them all.',
  longDescription:
    'Create QR codes in bulk for free. Paste a list of URLs, texts, phone numbers or emails (one per line), choose the size, colours and error-correction level, and the tool renders a QR code for every line at once. Preview the whole batch, then download each PNG or copy any code. Generation runs with a local JavaScript QR engine, so your links and data stay in your browser.',
  category: 'generators',
  icon: 'qr-code',
  keywords: [
    'bulk qr code generator',
    'batch qr codes',
    'generate multiple qr codes',
    'mass qr code creator',
    'qr code from csv list',
    'bulk qr generator free',
  ],
  searchableText:
    'bulk qr code generator batch multiple qr codes at once mass csv list urls links generate download png free browser privacy',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Bulk QR Code Generator — Create Multiple QR Codes Free | Zevylo',
    description:
      'Generate multiple QR codes at once from a list. Customise size, colours and error correction, then download every PNG for free — 100% in your browser.',
    keywords: [
      'bulk qr code generator',
      'generate multiple qr codes',
      'batch qr code creator',
      'free qr code generator',
    ],
  },
  faq: [
    {
      question: 'How do I generate many QR codes at once?',
      answer:
        'Paste one value per line in the input box — URLs, plain text, phone numbers or emails. The generator creates a QR code for every line instantly.',
    },
    {
      question: 'Can I download all QR codes together?',
      answer:
        'Yes. Use “Download All” to save every PNG one after another, or download individual codes from the preview grid.',
    },
    {
      question: 'Are my links stored on a server?',
      answer:
        'No. QR generation is done locally with JavaScript. Your list of links never leaves your browser and is cleared when you close the tab.',
    },
    {
      question: 'Do these QR codes expire?',
      answer:
        'No. These are static QR codes that encode your data directly, so they never expire and need no redirect service.',
    },
  ],
  relatedTools: ['qr-code-generator', 'utm-builder', 'bulk-email-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 210,
  component: 'bulk-qr-generator',
};
