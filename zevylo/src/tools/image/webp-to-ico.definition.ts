import { ToolDefinition } from '@/lib/tools/types';

export const webpToIcoDefinition: ToolDefinition = {
  id: 'webp-to-ico',
  slug: 'webp-to-ico',
  name: 'WebP to ICO Converter',
  shortDescription: 'Convert a WebP image into a multi-resolution Windows .ico icon.',
  longDescription:
    'Convert a WebP image into a Windows .ico file containing multiple sizes (16–256 px). Perfect for turning a modern WebP logo into a favicon or app icon. Choose which resolutions to include and download instantly — processed entirely in your browser.',
  category: 'image',
  icon: 'image',
  keywords: ['webp to ico', 'convert webp to ico', 'favicon generator', 'ico converter', 'windows icon'],
  searchableText: 'webp to ico converter favicon windows icon multi resolution',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'WebP to ICO Converter — Free Favicon .ico Generator | Zevylo',
    description: 'Convert WebP to a multi-resolution Windows .ico favicon for free. Choose sizes 16–256px. 100% private, in-browser.',
  },
  faq: [
    { question: 'Does the icon keep transparency?', answer: 'Yes. Transparency from the WebP source is preserved in the PNG-based ICO entries.' },
    { question: 'Which sizes should I include?', answer: '16 and 32 px are essential for favicons; 48 and 256 px help on Windows and high-DPI screens.' },
  ],
  relatedTools: ['png-to-ico', 'jpg-to-ico', 'favicon-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 58,
  component: 'webp-to-ico',
};
