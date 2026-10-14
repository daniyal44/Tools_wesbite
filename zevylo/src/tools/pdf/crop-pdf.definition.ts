import { ToolDefinition } from '@/lib/tools/types';

export const cropPdfDefinition: ToolDefinition = {
  id: 'crop-pdf',
  slug: 'crop-pdf',
  name: 'Crop PDF Online (Ezgif PDF Cropper)',
  shortDescription: 'Crop PDF page margins, trim white space, or crop to custom bounding boxes online.',
  longDescription: 'Crop PDF documents online for free. Trim unneeded page margins, remove extra blank white borders, or specify custom crop margins with 100% private in-browser execution.',
  category: 'pdf',
  icon: 'crop',
  keywords: ['crop pdf', 'ezgif crop pdf', 'trim pdf margins', 'crop pdf pages online', 'remove white borders pdf'],
  searchableText: 'crop pdf trim margins whitespace borders resize pages document client side free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Crop PDF Online — Trim PDF Page Margins & Borders Free | Zevylo',
    description: 'Crop PDF margins and trim white borders online for free. Adjust page boundaries with zero server uploads and no watermark.',
    keywords: ['crop pdf online', 'trim pdf margins', 'ezgif crop pdf', 'free pdf cropper'],
  },
  faq: [
    {
      question: 'How do I trim white margins from a PDF?',
      answer: 'Upload your PDF document, select "Trim White Margins" or set custom margin values, and click "Export Cropped PDF".',
    },
    {
      question: 'Are my confidential documents uploaded to a server?',
      answer: 'No. The entire PDF cropping process takes place locally within your web browser.',
    },
    {
      question: 'Does cropping reduce PDF quality?',
      answer: 'No, cropping adjusts document crop boxes and viewBox boundaries without rasterizing vector text.',
    },
  ],
  relatedTools: ['pdf-rotator', 'pdf-merge-split', 'pdf-to-image'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'crop-pdf',
};
