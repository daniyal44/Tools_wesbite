import { ToolDefinition } from '@/lib/tools/types';

export const videoTrimmerDefinition: ToolDefinition = {
  id: 'video-trimmer',
  slug: 'video-trimmer',
  name: 'Video Trimmer & Cutter (No Upload)',
  shortDescription: 'Cut and trim video clips online directly in your browser with interactive start/end scrubbers.',
  longDescription: 'Easily slice and extract video highlights from MP4, WebM, and MOV files. Select custom start and end timestamps, preview the trimmed region in real time, and download the exported clip with 100% private client-side processing.',
  category: 'video',
  icon: 'scissors',
  keywords: ['video trimmer', 'cut video online', 'trim video without upload', 'free video cutter', 'split video clip'],
  searchableText: 'video trimmer cut video slice video clip mp4 webm start end timestamp timeline preview client side no upload',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Video Trimmer — Cut & Trim Videos Online | Zevylo',
    description: 'Trim MP4 and WebM videos in your browser. Choose start and end points and download the trimmed clip instantly with zero server upload.',
    keywords: ['video trimmer', 'cut video online free', 'trim video no watermark', 'client side video cutter'],
  },
  faq: [
    {
      question: 'Is there a file size limit on video trimming?',
      answer: 'Since trimming runs locally in your web browser, file size is limited only by your computer available RAM.',
    },
    {
      question: 'Does trimming add any watermark?',
      answer: 'No. Zevylo leaves your video 100% untouched and clean with zero watermarks.',
    },
  ],
  relatedTools: ['video-to-frames', 'video-compressor', 'video-quality-checker'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'video-trimmer',
};
