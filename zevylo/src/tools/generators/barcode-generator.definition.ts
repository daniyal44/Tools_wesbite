import { ToolDefinition } from '@/lib/tools/types';

export const barcodeGeneratorDefinition: ToolDefinition = {
  id: 'barcode-generator',
  slug: 'barcode-generator',
  name: 'Barcode Generator (Code 128)',
  shortDescription: 'Free online Code 128 barcode generator with instant PNG and SVG vector download.',
  longDescription: 'Generate standard Code 128 barcodes for products, SKUs, inventory tracking, and shipping labels. Fully customizable bar height, thickness, colors, text labels, and zero-dependency SVG vector export.',
  category: 'generators',
  icon: 'barcode',
  keywords: ['barcode generator', 'code 128 generator', 'free barcode maker', 'create barcode svg', 'sku barcode'],
  searchableText: 'barcode generator code 128 sku retail inventory tracking label svg png barcode maker online',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Barcode Generator (Code 128) — Download PNG & SVG | Zevylo',
    description: 'Create standard Code 128 barcodes online instantly. Download sharp SVG vectors or high-res PNGs for product labels and packaging.',
    keywords: ['barcode generator', 'code 128 barcode generator', 'free barcode creator', 'barcode svg png'],
  },
  faq: [
    {
      question: 'What is Code 128 barcode format?',
      answer: 'Code 128 is a high-density linear barcode symbology capable of encoding all 128 ASCII characters. It is the international standard for shipping, logistics, and supply chain labels.',
    },
    {
      question: 'Can I download vector SVG for crisp printing?',
      answer: 'Yes, Zevylo provides both vector SVG for unlimited scalability on packaging and high-resolution PNG for digital use.',
    },
  ],
  relatedTools: ['qr-code-generator', 'uuid-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'barcode-generator',
};
