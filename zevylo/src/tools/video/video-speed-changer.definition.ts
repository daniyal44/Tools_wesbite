import { ToolDefinition } from '@/lib/tools/types';

export const videoSpeedChangerDefinition: ToolDefinition = {
  id: 'video-speed-changer',
  slug: 'video-speed-changer',
  name: 'Video Speed Changer (Fast & Slow Motion)',
  shortDescription: 'Speed up or slow down videos from 0.25x to 4x playback rates with pure client-side processing.',
  longDescription: 'Change video speed online to make slow-motion clips or timelapse fast-forward videos. Supports 0.25x to 4x playback rates with pure client-side processing and instant export.',
  category: 'video',
  icon: 'gauge',
  keywords: ['video speed changer', 'speed up video online', 'slow motion video', 'ezgif speed', 'timelapse maker'],
  searchableText: 'video speed changer slow motion fast motion 2x speed 0.5x speed timelapse mp4 webm ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Video Speed Changer — Fast & Slow Motion Video Online | Zevylo',
    description: 'Change video speed online for free. Create slow motion or accelerated fast forward videos from 0.25x to 4x with zero watermarks.',
    keywords: ['video speed changer', 'speed up video online', 'slow motion video maker', 'ezgif video speed'],
  },
  faq: [
    {
      question: 'How do I create a slow-motion video?',
      answer: 'Upload your clip, select a speed multiplier under 1.0x (such as 0.5x or 0.25x), and click Export. The video will be re-encoded in smooth slow motion.',
    },
    {
      question: 'Can I speed up long videos to make a timelapse?',
      answer: 'Yes! Select 2x, 3x, or up to 4x speed to condense long clips into fast-paced timelapses.',
    },
    {
      question: 'Are my files kept private?',
      answer: 'Yes! Everything is encoded locally in your browser using modern Web Media APIs. Zero server uploads.',
    },
  ],
  relatedTools: ['video-trimmer', 'reverse-video', 'rotate-video'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'video-speed-changer',
};
