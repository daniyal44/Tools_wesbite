import { ToolDefinition } from '@/lib/tools/types';

export const imageToPdfDefinition: ToolDefinition = {
  id: 'image-to-pdf',
  slug: 'image-to-pdf',
  name: 'Image to PDF Converter',
  shortDescription: 'Combine JPG, PNG and WebP images into a single PDF — reorder pages, pick size.',
  longDescription:
    'Turn one or many images (JPG, PNG, WebP and more) into a single PDF document, one image per page. Reorder pages by drag-free up/down controls, choose A4, US Letter or fit-to-image page sizes, set margins and output quality. The PDF is generated entirely in your browser with no uploads.',
  category: 'image',
  icon: 'file-text',
  keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'photos to pdf', 'combine images pdf'],
  searchableText: 'image to pdf converter jpg png webp combine photos document a4 letter pages',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image to PDF Converter — Free JPG/PNG → PDF Tool | Zevylo',
    description: 'Convert images to PDF online for free. Merge multiple JPG/PNG/WebP into one PDF, reorder pages, choose A4 or Letter. 100% private.',
  },
  faq: [
    { question: 'Can I combine several images into one PDF?', answer: 'Yes. Add multiple images, arrange their order, and they become sequential pages in a single PDF.' },
    { question: 'Are my images uploaded anywhere?', answer: 'No. The PDF is built locally in your browser; your images never leave your device.' },
  ],
  relatedTools: ['pdf-merge-split', 'image-combiner', 'image-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 59,
  component: 'image-to-pdf',
};
