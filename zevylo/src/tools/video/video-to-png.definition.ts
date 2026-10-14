import { ToolDefinition } from '@/lib/tools/types';

export const videoToPngDefinition: ToolDefinition = {
  id: 'video-to-png',
  slug: 'video-to-png',
  name: 'Video to PNG Converter (Lossless Frame Extractor)',
  shortDescription: 'Extract uncompressed, lossless PNG pictures and frames from MP4, WebM, and MOV videos with zero quality loss.',
  longDescription: 'Turn video clips into pristine lossless PNG images with zero compression artifacts. Scrub to any exact millisecond to take crystal-clear snapshots, or batch extract high-fidelity PNG frame sequences at custom time intervals with 1-click ZIP download. 100% private in-browser canvas execution.',
  category: 'video',
  icon: 'film',
  keywords: ['video to png', 'convert video to png', 'extract png from video', 'lossless video frame extractor', 'mp4 to png', 'webm to png', 'save video frame as png lossless'],
  searchableText: 'video to png convert video to png lossless frame extractor mp4 to png webm mov high fidelity screenshot snapshot canvas timeline client side zip download',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Video to PNG Converter — Extract Lossless PNG Frames | Zevylo',
    description: 'Convert MP4, WebM, and MOV videos to lossless PNG image sequences online. Zero compression artifacts, maximum resolution, instant clipboard copy, and batch ZIP export.',
    keywords: ['video to png', 'convert video to png online', 'lossless video frames', 'extract png from mp4', 'video snapshot png'],
  },
  faq: [
    {
      question: 'Why extract frames as PNG instead of JPG?',
      answer: 'PNG uses lossless compression, meaning every pixel is preserved with 100% precision and zero compression artifacts. It is ideal for graphic design, video editing assets, text overlays, and high-detail captures.',
    },
    {
      question: 'Can I copy extracted PNG frames directly to my clipboard?',
      answer: 'Yes! Every extracted PNG frame features an instant 1-click "Copy" button that places the PNG directly onto your system clipboard for immediate pasting into Figma, Photoshop, Discord, or Slack.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Because all processing happens locally in your web browser memory, there are no arbitrary upload limits or server bottlenecks.',
    },
  ],
  relatedTools: ['video-to-jpg', 'video-to-frames', 'video-to-gif', 'video-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'video-to-png',
};
