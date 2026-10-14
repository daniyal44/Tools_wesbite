import { ToolDefinition } from '@/lib/tools/types';

export const pngToIcoDefinition: ToolDefinition = {
  id: 'png-to-ico',
  slug: 'png-to-ico',
  name: 'PNG to ICO Converter',
  shortDescription: 'Turn a PNG into a multi-resolution Windows .ico favicon file.',
  longDescription:
    'Convert a PNG image into a true Windows .ico file containing multiple resolutions (16, 32, 48, 64, 128 and 256 px). Ideal for website favicons and desktop app icons. Choose exactly which sizes to embed — all generated locally in your browser.',
  category: 'image',
  icon: 'image',
  keywords: ['png to ico', 'convert png to ico', 'favicon generator', 'ico converter', 'windows icon'],
  searchableText: 'png to ico converter favicon windows icon multi resolution 16 32 48 256',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'PNG to ICO Converter — Free Favicon .ico Generator | Zevylo',
    description: 'Convert PNG to a multi-resolution Windows .ico favicon for free. Pick sizes 16–256px. 100% client-side and private.',
  },
  faq: [
    { question: 'What sizes should a favicon include?', answer: '16×16 and 32×32 cover most browsers; adding 48 and 256 improves Windows and high-DPI displays.' },
    { question: 'Is this a real .ico file?', answer: 'Yes. It produces a standards-compliant ICO containing PNG-compressed entries, supported by all modern systems.' },
  ],
  relatedTools: ['favicon-generator', 'jpg-to-ico', 'png-to-webp'],
  status: 'active',
  visibility: 'public',
  sortOrder: 56,
  component: 'png-to-ico',
};
