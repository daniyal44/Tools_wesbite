import { ToolDefinition } from '@/lib/tools/types';

export const videoToGifDefinition: ToolDefinition = {
  id: 'video-to-gif',
  slug: 'video-to-gif',
  name: 'Video to Animated GIF Converter',
  shortDescription: 'Convert MP4, WebM, and MOV video clips into lightweight, looping animated GIFs.',
  longDescription: 'Turn your video clips into high-quality animated GIFs. Choose custom resolution widths, adjust frame rates (5 to 15 FPS), set duration limits, and download looping GIF files with 100% private client-side processing.',
  category: 'video',
  icon: 'film',
  keywords: ['video to gif', 'convert mp4 to gif', 'webm to gif', 'ezgif alternative', 'free video to gif maker', 'gif converter'],
  searchableText: 'video to gif convert mp4 to gif webm mov animated loop fps resolution ezgif alternative client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Video to GIF Converter — Free Online MP4 to GIF Maker | Zevylo',
    description: 'Convert MP4, WebM, and MOV video clips to animated GIFs online for free. Custom FPS and dimensions with 100% private in-browser encoding.',
    keywords: ['video to gif', 'convert mp4 to gif online', 'ezgif video to gif', 'free gif maker from video'],
  },
  faq: [
    {
      question: 'Which video formats are supported?',
      answer: 'You can convert MP4, WebM, MOV, and standard HTML5-compatible video files.',
    },
    {
      question: 'Are my videos uploaded to a server?',
      answer: 'No. The video is decoded, quantized, and encoded into GIF89a directly in your browser. No video data ever leaves your device.',
    },
  ],
  relatedTools: ['video-to-frames', 'video-trimmer', 'video-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'video-to-gif',
};
