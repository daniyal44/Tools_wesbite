import { ToolDefinition } from '@/lib/tools/types';

export const videoToFramesDefinition: ToolDefinition = {
  id: 'video-to-frames',
  slug: 'video-to-frames',
  name: 'Video to Frames & JPG Extractor',
  shortDescription: 'Extract high-resolution JPG, PNG, and WebP image frames from MP4, WebM, and MOV videos online.',
  longDescription: 'Turn video clips into high-quality JPG, PNG, or WebP photo frames. Scrub through any video to capture exact millisecond snapshots, or batch extract frames with custom time ranges, exact intervals (0.1s to 10s), and 1-click ZIP export. 100% private in-browser canvas processing.',
  category: 'video',
  icon: 'film',
  keywords: ['video to frames', 'video to jpg', 'extract frames from video', 'video to image sequence', 'save video frame as png', 'video snapshot tool', 'convert video to pictures'],
  searchableText: 'video to frames video to jpg extract frames video to image mp4 to jpg mp4 to png webm mov screenshot snapshot canvas timeline client side download zip',
  version: '2.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Video to Frames & JPG Extractor — Extract Images from Video | Zevylo',
    description: 'Extract crystal-clear JPG, PNG, and WebP frame sequences and snapshots from any video file in your browser. Batch extraction, custom time ranges, and 1-click ZIP download.',
    keywords: ['video to frames', 'video to jpg', 'extract video frames online', 'video frame snapshot', 'convert video to pictures'],
  },
  faq: [
    {
      question: 'Are my videos uploaded to your servers?',
      answer: 'No. All frame extraction is performed natively in your browser using HTML5 Canvas and video hardware acceleration. Your video files never leave your device.',
    },
    {
      question: 'What video file formats are supported?',
      answer: 'Standard browser-supported video formats including MP4 (H.264), WebM (VP8/VP9), MOV, and MKV files are fully supported.',
    },
    {
      question: 'Can I download all extracted frames at once?',
      answer: 'Yes! Zevylo includes an integrated client-side ZIP builder that bundles all your extracted frames into a single ZIP archive (.zip) for instant download with zero server delay.',
    },
  ],
  relatedTools: ['video-to-gif', 'video-quality-checker', 'video-trimmer', 'crop-video'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'video-to-frames',
};
