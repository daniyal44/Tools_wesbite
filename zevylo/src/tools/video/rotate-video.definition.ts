import { ToolDefinition } from '@/lib/tools/types';

export const rotateVideoDefinition: ToolDefinition = {
  id: 'rotate-video',
  slug: 'rotate-video',
  name: 'Rotate & Flip Video Online',
  shortDescription: 'Rotate video 90°, 180°, 270° clockwise or counter-clockwise, and flip horizontally or vertically.',
  longDescription: 'Rotate videos 90, 180, or 270 degrees clockwise or counter-clockwise, and mirror flip horizontally or vertically. Pure client-side processing with zero server uploads.',
  category: 'video',
  icon: 'rotate-cw',
  keywords: ['rotate video', 'ezgif rotate', 'flip video', 'turn video 90 degrees', 'rotate mp4', 'mirror video'],
  searchableText: 'rotate video ezgif flip turn 90 180 270 clockwise counter-clockwise mirror horizontal vertical mp4 webm',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Rotate Video Online — Turn & Flip MP4 WebM 90° 180° Free | Zevylo',
    description: 'Rotate videos 90, 180, 270 degrees or flip horizontally and vertically online for free. Fast, in-browser processing with no watermark.',
    keywords: ['rotate video online', 'ezgif rotate video', 'flip video horizontally', 'rotate mp4 90 degrees'],
  },
  faq: [
    {
      question: 'Can I rotate a vertical smartphone video to horizontal?',
      answer: 'Yes! Simply select 90° clockwise or counter-clockwise to rotate portrait phone videos to widescreen landscape.',
    },
    {
      question: 'Is my video uploaded to any server?',
      answer: 'Never. The entire rotation and re-encoding process happens securely in your web browser using HTML5 Canvas.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'Supports all modern browser-compatible video files including MP4, WebM, MOV, and MKV.',
    },
  ],
  relatedTools: ['video-trimmer', 'video-to-gif', 'video-speed-changer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'rotate-video',
};
