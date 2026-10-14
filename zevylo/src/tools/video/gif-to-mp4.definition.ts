import { ToolDefinition } from '@/lib/tools/types';

export const gifToMp4Definition: ToolDefinition = {
  id: 'gif-to-mp4',
  slug: 'gif-to-mp4',
  name: 'GIF to MP4 & WebM Video Converter',
  shortDescription: 'Convert animated GIFs into lightweight, hardware-accelerated MP4 and WebM videos.',
  longDescription: 'Reduce animated GIF file sizes by up to 90% by converting them to modern MP4 or WebM video format. Features loop duration control, crisp hardware video encoding via MediaRecorder, and instant 1-click video downloads with zero server uploads.',
  category: 'video',
  icon: 'film',
  keywords: ['gif to mp4', 'convert gif to video', 'gif to webm', 'ezgif gif to mp4', 'compress gif to mp4', 'animated gif converter'],
  searchableText: 'gif to mp4 convert gif to video webm animation hardware encode size reduction ezgif alternative client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'GIF to MP4 Converter — Free Online GIF to Video Tool | Zevylo',
    description: 'Convert animated GIFs to fast, lightweight MP4 videos online for free. Cut file size by up to 90% with 100% private in-browser encoding.',
    keywords: ['gif to mp4', 'convert gif to mp4 online', 'ezgif gif to mp4 converter', 'free gif to video maker'],
  },
  faq: [
    {
      question: 'Why convert a GIF to MP4?',
      answer: 'MP4 videos use modern H.264/WebM compression, making them up to 10x smaller in file size while supporting smoother 60 FPS playback on web pages and social media.',
    },
    {
      question: 'Are my GIF files uploaded to any server?',
      answer: 'No. The conversion is rendered directly inside your browser using HTML5 Canvas and the MediaStream Recording API.',
    },
  ],
  relatedTools: ['video-to-gif', 'video-compressor', 'video-to-frames'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'gif-to-mp4',
};
