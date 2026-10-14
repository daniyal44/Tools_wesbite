import { ToolDefinition } from '@/lib/tools/types';

export const screenRecorderDefinition: ToolDefinition = {
  id: 'screen-recorder',
  slug: 'screen-recorder',
  name: 'Free Online Screen Recorder (No Watermark)',
  shortDescription: 'Record your screen, browser tab, or app window with audio directly in your browser.',
  longDescription: 'Record your entire desktop, specific application window, or browser tab with optional audio. Zero watermarks, zero time limits, and no software download required.',
  category: 'video',
  icon: 'monitor-play',
  keywords: ['screen recorder', 'ezgif screen recorder', 'record screen online', 'record desktop', 'record chrome tab', 'browser screen recorder'],
  searchableText: 'screen recorder online record desktop window chrome tab audio free no watermark ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Online Screen Recorder — No Watermark & No Download | Zevylo',
    description: 'Record your screen, tab, or window online for free. No watermark, no software installation, and 100% private in-browser capture.',
    keywords: ['screen recorder online', 'free screen recorder no watermark', 'record browser tab', 'ezgif screen recorder'],
  },
  faq: [
    {
      question: 'Do I need to install any extension or software?',
      answer: 'No! Modern browsers (Chrome, Edge, Firefox, Safari) have built-in screen capture capabilities. Zevylo triggers native screen capture with zero extensions required.',
    },
    {
      question: 'Is there a recording duration limit?',
      answer: 'No time limits! You can record short clips or hours-long tutorials depending only on your device memory.',
    },
    {
      question: 'Is any audio recorded?',
      answer: 'You can choose to include tab/system audio when selecting the screen or window to record.',
    },
  ],
  relatedTools: ['video-trimmer', 'video-to-gif', 'video-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 10,
  component: 'screen-recorder',
};
