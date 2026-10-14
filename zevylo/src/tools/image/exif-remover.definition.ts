import { ToolDefinition } from '@/lib/tools/types';

export const exifRemoverDefinition: ToolDefinition = {
  id: 'exif-remover',
  slug: 'exif-remover',
  name: 'Remove EXIF Metadata from Images (EXIF Cleaner)',
  shortDescription: 'Strip camera details, GPS location data, timestamps, and device info from photos.',
  longDescription: 'Wipe camera specs, GPS latitude and longitude, shooting date and timestamps from photos before sharing online. 100% private in-browser metadata cleaner.',
  category: 'image',
  icon: 'shield-alert',
  keywords: ['exif remover', 'ezgif metadata', 'remove exif', 'strip photo metadata', 'remove gps from photo', 'exif cleaner online'],
  searchableText: 'exif remover metadata strip gps location camera model clean photos privacy ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Remove EXIF Metadata Online — Clean Photo GPS & Privacy | Zevylo',
    description: 'Strip EXIF metadata, camera info, and GPS location coordinates from photos online for free. Protect privacy with zero server uploads.',
    keywords: ['remove exif data online', 'strip photo metadata', 'ezgif exif remover', 'exif cleaner free'],
  },
  faq: [
    {
      question: 'Why should I remove EXIF metadata before posting photos?',
      answer: 'Photos taken with smartphones often embed your exact GPS location, camera serial number, and timestamp. Stripping EXIF protects your home location and personal privacy.',
    },
    {
      question: 'Does this degrade the visual image quality?',
      answer: 'No! The actual pixel data is preserved at maximum quality while stripping binary metadata headers.',
    },
    {
      question: 'Is my photo uploaded to your server?',
      answer: 'Never. The scrubbing process executes 100% on your local device inside your browser.',
    },
  ],
  relatedTools: ['image-compressor', 'image-resizer', 'image-comparator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 26,
  component: 'exif-remover',
};
