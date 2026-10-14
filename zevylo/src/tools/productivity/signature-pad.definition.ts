import { ToolDefinition } from '@/lib/tools/types';

export const signaturePadDefinition: ToolDefinition = {
  id: 'signature-pad',
  slug: 'signature-pad',
  name: 'Digital Signature Pad (Draw & Download PNG)',
  shortDescription: 'Smooth online canvas to draw digital signatures with custom pen stroke width, colors, and transparent PNG download.',
  longDescription: 'Create clean, legally-valid electronic signatures for documents, PDFs, and contracts. Features smooth bezier curve rendering, multiple pen ink colors, adjustable stroke width, and 1-click transparent PNG export.',
  category: 'productivity',
  icon: 'pen-tool',
  keywords: ['signature pad', 'digital signature maker', 'draw signature online', 'create electronic signature', 'signature transparent png'],
  searchableText: 'signature pad digital signature draw signature e-signature electronic signature transparent png sign pdf document contract',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Digital Signature Pad — Draw & Download Signature PNG | Zevylo',
    description: 'Draw your signature online and download high-res transparent PNGs for signing contracts, letters, and PDF documents. Free and secure.',
    keywords: ['digital signature pad', 'draw signature online', 'create e-signature', 'signature png transparent'],
  },
  faq: [
    {
      question: 'Is the downloaded signature transparent?',
      answer: 'Yes! The default setting exports a transparent PNG background so you can paste your signature over white or colored document pages smoothly.',
    },
    {
      question: 'Does it work on mobile phones and tablets?',
      answer: 'Yes, full touch screen support allows you to draw smooth signatures with your finger or stylus on smartphones and tablets.',
    },
  ],
  relatedTools: ['invoice-generator', 'sketch-canvas', 'image-to-pdf'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'signature-pad',
};
