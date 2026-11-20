import { ToolDefinition } from '@/lib/tools/types';

export const imageCompressorDefinition: ToolDefinition = {
  id: 'image-compressor',
  slug: 'image-compressor',
  name: 'Image Compressor & WebP Converter',
  shortDescription:
    'Reduce PNG, JPEG, and WebP file size in your browser with adjustable quality and resizing.',
  longDescription:
    'Re-encode images in your browser with HTML5 Canvas and download the result as WebP, JPEG, or PNG. Adjust the quality level and optional maximum width/height, then compare the original and output file sizes before downloading. JPEG and WebP output is lossy: lower quality settings reduce size but can introduce visible artifacts. PNG output is re-encoded losslessly but may not shrink every image.',
  category: 'image',
  icon: 'image',
  keywords: ['image compressor', 'compress image', 'convert png to webp', 'reduce image size online', 'resize image browser'],
  searchableText: 'image compressor reduce png jpg webp convert resize client-side canvas quality',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Image Compressor & WebP Converter — Browser-Based | Zevylo',
    description:
      'Compress and resize PNG, JPEG, or WebP images in your browser with an adjustable quality setting. Compare file sizes and download the result; lossy output may show artifacts at low quality.',
  },
  faq: [
    {
      question: 'Are my photos uploaded to a server?',
      answer:
        'No. The image is read and re-encoded by JavaScript in the page using HTML5 Canvas. Zevylo has no application server that receives the image.',
    },
    {
      question: 'Which image formats are supported?',
      answer:
        'You can open PNG, JPEG, and WebP images and export as WebP, JPEG, or PNG. Browser support for WebP encoding varies slightly by browser version.',
    },
    {
      question: 'Is the compression lossless?',
      answer:
        'Not for JPEG or WebP output. Those formats discard visual information to reduce size, and aggressive quality settings can produce visible artifacts. PNG output avoids additional lossy compression but can still be larger than an optimized PNG from a dedicated encoder.',
    },
    {
      question: 'How much smaller will my file be?',
      answer:
        'It depends on the source image, dimensions, format, and quality setting. A photographic JPEG re-encoded to WebP often gets noticeably smaller, while an already-optimized image may barely change or may grow. The tool shows both sizes so you can check before downloading.',
    },
  ],
  relatedTools: ['sketch-canvas', 'code-to-image', 'qr-code-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'image-compressor',
};
