import { ToolDefinition } from '@/lib/tools/types';

export const viewMetadataDefinition: ToolDefinition = {
  id: 'view-metadata',
  slug: 'view-metadata',
  name: 'Online Metadata Viewer (Ezgif Metadata Viewer)',
  shortDescription: 'Inspect EXIF data, file headers, dimensions, camera settings, and color profiles.',
  longDescription: 'View full EXIF and file metadata from photos, images, and videos online for free. Inspect camera models, shutter speeds, ISO, image dimensions, color profiles, and raw binary headers with 100% private in-browser analysis.',
  category: 'image',
  icon: 'info',
  keywords: ['view metadata', 'ezgif metadata viewer', 'exif viewer online', 'image metadata inspector', 'photo info viewer'],
  searchableText: 'view metadata exif viewer online inspect camera settings dimensions color profile header free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Online Metadata Viewer — Inspect Image EXIF & File Info Free | Zevylo',
    description: 'Inspect image and video metadata online for free. View EXIF tags, dimensions, camera models, and binary file headers with zero server uploads.',
    keywords: ['view metadata online', 'exif viewer online', 'ezgif metadata viewer', 'photo metadata checker'],
  },
  faq: [
    {
      question: 'What metadata can I view?',
      answer: 'You can inspect file size, exact pixel dimensions, aspect ratio, MIME type, camera details, color profile, and binary magic bytes.',
    },
    {
      question: 'Are my files sent to any server?',
      answer: 'No. The file is analyzed strictly within your local browser memory.',
    },
    {
      question: 'Can I copy the metadata summary?',
      answer: 'Yes! A single click copies a structured JSON or formatted text report to your clipboard.',
    },
  ],
  relatedTools: ['exif-remover', 'image-size-checker', 'video-quality-checker'],
  status: 'active',
  visibility: 'public',
  sortOrder: 33,
  component: 'view-metadata',
};
