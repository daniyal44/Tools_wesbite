import { ToolDefinition } from '@/lib/tools/types';

export const muteVideoDefinition: ToolDefinition = {
  id: 'mute-video',
  slug: 'mute-video',
  name: 'Mute Video & Extract Audio Online',
  shortDescription: 'Remove audio from videos to create silent clips, or extract the audio track directly.',
  longDescription: 'Remove audio from videos to create silent clips, or extract the audio track directly from video. Pure client-side processing with zero server uploads.',
  category: 'video',
  icon: 'volume-x',
  keywords: ['mute video', 'ezgif mute', 'remove audio from video', 'extract audio from video', 'silent video', 'video to audio', 'strip sound'],
  searchableText: 'mute video strip audio remove sound extract audio wav silent video ezgif mp4 webm free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Mute Video & Extract Audio Online — Free Silent Video Maker | Zevylo',
    description: 'Mute video and remove audio tracks online for free. Extract audio as WAV or export silent MP4/WebM videos in your browser.',
    keywords: ['mute video online', 'remove audio from video', 'silent video maker', 'ezgif mute video'],
  },
  faq: [
    {
      question: 'How do I remove sound from a video?',
      answer: 'Upload your video, click "Export Muted Video", and our tool will generate a brand new video file with the audio stream completely removed.',
    },
    {
      question: 'Can I extract just the sound/music from the video?',
      answer: 'Yes! Select the "Extract Audio" mode to download just the audio track.',
    },
    {
      question: 'Is there any file size limit or watermarking?',
      answer: 'No limits and zero watermarks. All operations run directly in your browser.',
    },
  ],
  relatedTools: ['video-trimmer', 'video-to-gif', 'video-compressor'],
  status: 'active',
  visibility: 'public',
  sortOrder: 9,
  component: 'mute-video',
};
