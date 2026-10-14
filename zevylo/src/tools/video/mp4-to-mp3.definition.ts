import { ToolDefinition } from '@/lib/tools/types';

export const mp4ToMp3Definition: ToolDefinition = {
  id: 'mp4-to-mp3',
  slug: 'mp4-to-mp3',
  name: 'MP4 to MP3 Audio Converter (Ezgif Video to Audio)',
  shortDescription: 'Extract high-fidelity audio tracks from MP4, WebM, and MOV video clips into MP3 / WAV audio.',
  longDescription: 'Convert MP4 videos into high-quality audio files directly in your browser. Extract speeches, background songs, and podcast sound tracks with zero server uploads and no watermark.',
  category: 'video',
  icon: 'music',
  keywords: ['mp4 to mp3', 'ezgif mp4 to mp3', 'convert video to mp3', 'video to audio converter', 'extract mp3 from mp4', 'rip audio from video'],
  searchableText: 'mp4 to mp3 convert video to audio wav sound extract music speech offline free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'MP4 to MP3 Converter — Extract Audio from Video Online Free | Zevylo',
    description: 'Convert MP4 to MP3 and extract audio tracks from video files online for free. Pure client-side audio decoding with zero server uploads.',
    keywords: ['mp4 to mp3 online', 'convert mp4 to audio', 'ezgif mp4 to mp3', 'free video to mp3'],
  },
  faq: [
    {
      question: 'How do I extract audio from an MP4 video?',
      answer: 'Select your video file and click "Extract Audio". The browser will decode the audio stream and produce a high-fidelity downloadable audio file.',
    },
    {
      question: 'Is this conversion completely private?',
      answer: 'Yes! Your video file stays 100% on your device. Audio decoding runs strictly inside your local browser memory.',
    },
    {
      question: 'What video files can I extract audio from?',
      answer: 'Supports MP4, WebM, MOV, MKV, and any browser-supported video formats.',
    },
  ],
  relatedTools: ['mute-video', 'voice-to-text', 'video-trimmer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 13,
  component: 'mp4-to-mp3',
};
