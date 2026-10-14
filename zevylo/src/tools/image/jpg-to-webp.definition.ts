import { ToolDefinition } from '@/lib/tools/types';

export const jpgToWebpDefinition: ToolDefinition = {
  id: 'jpg-to-webp',
  slug: 'jpg-to-webp',
  name: 'JPG to WebP Converter',
  shortDescription: 'Convert JPG/JPEG images to WebP for smaller, faster-loading files.',
  longDescription:
    'Convert JPG (JPEG) photos into efficient WebP images to shrink file size and speed up your website. Includes batch conversion and an adjustable quality slider. All processing happens locally in your browser — your photos are never uploaded.',
  category: 'image',
  icon: 'file-image',
  keywords: ['jpg to webp', 'jpeg to webp', 'convert jpg to webp', 'webp converter', 'optimize images'],
  searchableText: 'jpg jpeg to webp converter optimize image batch quality web performance',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'JPG to WebP Converter — Free Batch JPEG → WebP Tool | Zevylo',
    description: 'Convert JPG to WebP online for free. Smaller files, batch mode, adjustable quality, 100% private in-browser conversion.',
  },
  faq: [
    { question: 'Is WebP supported everywhere?', answer: 'All modern browsers support WebP. For very old browsers, keep a JPG fallback.' },
    { question: 'Can I control the output size?', answer: 'Yes, use the quality slider — lower quality yields smaller files.' },
  ],
  relatedTools: ['webp-to-jpg', 'jpg-to-png', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 53,
  component: 'jpg-to-webp',
};
