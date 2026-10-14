import { ToolDefinition } from '@/lib/tools/types';

export const faviconGeneratorDefinition: ToolDefinition = {
  id: 'favicon-generator',
  slug: 'favicon-generator',
  name: 'Favicon Generator & HTML Icon Tags',
  shortDescription: 'Generate standard multi-size website favicons (16x16, 32x32, 48x48, 180x180) and HTML link tags.',
  longDescription: 'Turn any image or logo into standard cross-platform website icons. Generates 16x16 browser tab icons, 32x32 taskbar icons, 48x48 desktop icons, and 180x180 Apple Touch Icons. Includes interactive browser tab preview and HTML meta tags copy.',
  category: 'image',
  icon: 'globe',
  keywords: ['favicon generator', 'make favicon', 'apple touch icon', 'website icon generator', 'ico generator', 'squoosh alternative', 'tinywow alternative'],
  searchableText: 'favicon generator website icon apple touch 16x16 32x32 48x48 180x180 browser tab meta tags',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Favicon Generator — Multi-Size Browser & Apple Touch Icons | Zevylo',
    description: 'Generate 16x16, 32x32, 48x48, and 180x180 website favicons online. Instant PNG downloads and HTML meta tags. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What sizes should a modern website favicon package include?',
      answer: 'The standard minimum package includes 16x16 (browser tabs), 32x32 (taskbar/shortcuts), 48x48 (desktop high-DPI), and 180x180 (iOS Apple Touch icon).',
    },
    {
      question: 'How do I add the generated favicon to my HTML website?',
      answer: 'Place the exported icon files in your root public folder and paste the generated <link rel="icon"> tags into your HTML <head> section.',
    },
  ],
  relatedTools: ['image-compressor', 'svg-to-png', 'meta-tag-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 41,
  component: 'favicon-generator',
};
