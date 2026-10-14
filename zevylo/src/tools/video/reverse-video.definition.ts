import { ToolDefinition } from '@/lib/tools/types';

export const reverseVideoDefinition: ToolDefinition = {
  id: 'reverse-video',
  slug: 'reverse-video',
  name: 'Reverse Video Online (Rewind Video)',
  shortDescription: 'Play and save your video backwards in reverse motion online with custom speed options.',
  longDescription: 'Play and save your video backwards in rewind motion online. 100% private client-side processing without uploading files, with custom speed multiplier controls.',
  category: 'video',
  icon: 'history',
  keywords: ['reverse video', 'ezgif reverse', 'rewind video', 'backward video', 'play backwards', 'reverse mp4'],
  searchableText: 'reverse video rewind backwards play backwards rewind clip ezgif mp4 webm free fast client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Reverse Video Online — Rewind MP4 Video Backwards Free | Zevylo',
    description: 'Reverse video online for free without watermarks. Play and save videos backwards in rewind motion with zero server uploads.',
    keywords: ['reverse video online', 'rewind video', 'ezgif reverse video', 'video backwards maker'],
  },
  faq: [
    {
      question: 'How does client-side reverse video work?',
      answer: 'The browser decodes each video frame and renders them onto an HTML5 canvas in reverse chronological order, recording the reversed stream into a new file.',
    },
    {
      question: 'Will reverse video affect video quality?',
      answer: 'Our exporter maintains original frame resolution and high bitrate encoding to minimize any perceptible quality loss.',
    },
    {
      question: 'Is it free with no watermark?',
      answer: 'Yes! Zevylo adds zero watermarks, imposes no signups, and processes everything locally on your computer.',
    },
  ],
  relatedTools: ['video-speed-changer', 'rotate-video', 'video-to-gif'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'reverse-video',
};
