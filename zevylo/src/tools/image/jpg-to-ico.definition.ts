import { ToolDefinition } from '@/lib/tools/types';

export const jpgToIcoDefinition: ToolDefinition = {
  id: 'jpg-to-ico',
  slug: 'jpg-to-ico',
  name: 'JPG to ICO Converter',
  shortDescription: 'Convert a JPG/JPEG image into a multi-resolution Windows .ico icon.',
  longDescription:
    'Convert a JPG (JPEG) image into a Windows .ico file with multiple embedded resolutions (16–256 px). Great for creating favicons and app icons from a photo or logo. Select the sizes you need and download — all processed in your browser.',
  category: 'image',
  icon: 'image',
  keywords: ['jpg to ico', 'jpeg to ico', 'convert jpg to ico', 'favicon generator', 'ico converter'],
  searchableText: 'jpg jpeg to ico converter favicon windows icon multi resolution',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'JPG to ICO Converter — Free Favicon .ico Generator | Zevylo',
    description: 'Convert JPG to a multi-resolution Windows .ico favicon for free. Choose sizes 16–256px. 100% private, in-browser.',
  },
  faq: [
    { question: 'Should I use a square image?', answer: 'Yes. Icons are square, so a square source avoids letterboxing. Non-square images are centered and padded.' },
    { question: 'Does the icon keep transparency?', answer: 'JPG has no transparency, so the icon background will be solid. Use PNG to ICO if you need a transparent icon.' },
  ],
  relatedTools: ['png-to-ico', 'webp-to-ico', 'favicon-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 57,
  component: 'jpg-to-ico',
};
